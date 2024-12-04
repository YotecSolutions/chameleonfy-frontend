/**
 * @fileoverview BubbleChart component for visualizing music tracks based on mood and genre
 * @module BubbleChart
 */

import React, { useState, useEffect, useRef, MouseEvent, useCallback } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, BubbleController, LinearScale, PointElement, Tooltip, Legend, Title, ChartOptions } from 'chart.js';
import genresWithColors from '../../data/genres';
import styles from './BubbleChart.module.css';
import axios from 'axios';
import { RawTrackData, Track, ProcessedTrack } from '../../types/track';
import { GenreButton } from '../../types/genre';
import { Position, BubblesDataState } from '../../types/chart';

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend, Title);

/**
 * BubbleChart component for displaying music track data as bubbles on a chart.
 */
const BubbleChart: React.FC = () => {
  const [bubblesData, setBubblesData] = useState<BubblesDataState>({ datasets: [] });
  const [genreButtons, setGenreButtons] = useState<GenreButton[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDecades] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState<Position>({ x: 0, y: 0 });

  /**
   * Handles the mouse down event to initiate dragging.
   * @param {MouseEvent<HTMLDivElement>} e - The mouse down event.
   */
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setScrollPos({ x: containerRef.current.scrollLeft, y: containerRef.current.scrollTop });
    containerRef.current.style.cursor = 'grabbing';
  };

  /**
   * Handles the mouse move event to perform dragging.
   * @param {MouseEvent<HTMLDivElement>} e - The mouse move event.
   */
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    containerRef.current.scrollLeft = scrollPos.x - dx;
    containerRef.current.scrollTop = scrollPos.y - dy;
  };

  /**
   * Handles the mouse up event to stop dragging.
   */
  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  /**
   * Maps a decade string to a more readable format.
   * @param {string} decade - The decade string to map.
   * @returns {string} The mapped decade string.
   */
  const mapDecade = (decade: string): string => {
    const decadeMapping: { [key: string]: string } = {
      "1900-1960": ">60s",
      "1970-1979": "70s",
      "1980-1989": "80s",
      "1990-1999": "90s",
      "2000-2009": "2000s",
      "2010-2019": "2010s",
      "2020-2029": "2020s",
    };
    return decadeMapping[decade] || decade;
  };

  /**
   * Chart options for the bubble chart.
   */
  const chartOptions: ChartOptions<'bubble'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => '',
          label: (context) => {
            const { trackName, artistName } = context.raw as Track;
            return `${trackName} by ${artistName}`;
          },
        },
      },
    },
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        display: false,
        min: -0.1,
        max: 1.1,
      },
      y: {
        display: false,
        min: -0.1,
        max: 1.1,
      },
    },
    elements: {
      point: {
        radius: 10,
        hoverRadius: 15,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
    onHover: (event, chartElement) => {
      const chartCanvas = event.native?.target as HTMLCanvasElement;
      chartCanvas.style.cursor = chartElement.length ? 'pointer' : 'default';
    },
    onClick: (event, elements, chart) => {
      const elementsAtEvent = chart.getElementsAtEventForMode(event as unknown as Event, 'nearest', { intersect: true }, false);
      if (elementsAtEvent.length > 0) {
        const firstElement = elementsAtEvent[0];
        const datasetIndex = firstElement.datasetIndex;
        const index = firstElement.index;

        const bubbleData = bubblesData.datasets[datasetIndex].data[index];
        const selectedData: Track = {
          trackName: bubbleData.name,
          artistName: bubbleData.artist,
          spotifyUrl: '',
          albumPhotoUrl: '',
          energy: bubbleData.y,
          valence: bubbleData.x,
          genre: bubbleData.genre,
          decade: bubbleData.decade,
          releaseDate: ''
        };
        setSelectedTrack(selectedData);
      }
    },
  };

  /**
 * Generates bubble chart data from track information.
 * @param {Track[]} tracks - The list of tracks to generate data for.
 */
  const generateBubblesData = useCallback((tracks: Track[]) => {
    const genreColorMap = createGenreColorMap(selectedGenres);
    const datasets = tracks.map((track, index) => createDataset(track, index, genreColorMap));
    setBubblesData({ datasets });
  }, [selectedGenres]);

  /**
   * Fetches playlists from the backend and generates bubble data.
   */
  const fetchPlaylists = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      selectedGenres.forEach((genre) => params.append('genre', genre));
      selectedDecades.forEach((decade) => params.append('decade', decade));
      params.append('limit', '200');

      const response = await axios.get(`/recommendation/database-tracks?${params.toString()}`);
      const tracks = response.data.map((track: RawTrackData): ProcessedTrack => mapTrackData(track));
      generateBubblesData(tracks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching tracks:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error while fetching tracks:", error);
      }
    }
  }, [selectedGenres, selectedDecades, generateBubblesData]);

  /**
   * Maps raw track data from the backend to the Track interface.
   * @param {RawTrackData} track - The raw track data to map.
   * @returns {Track} The mapped track data.
   */
  const mapTrackData = (track: RawTrackData): ProcessedTrack => {
    return {
      id: track.id,
      name: track.name,
      artist: track.artist,
      genre: track.genre,
      decade: track.decade,
      energy: track.energy,
      valence: track.valence,
      danceability: track.danceability,
      tempo: track.tempo,
      duration: track.durationMs / 1000,
      previewUrl: track.previewUrl || null,
      albumCover: track.albumCover || null
    };
  };

  /**
   * Creates a map of genres to their corresponding colors.
   * @param {string[]} genres - The list of genres to map.
   * @returns {object} A map of genre names to colors.
   */
  const createGenreColorMap = (genres: string[]): { [genre: string]: string } => {
    const map: { [genre: string]: string } = {};
    genres.forEach((genre) => {
      map[genre] = genresWithColors.find((g) => g.name === genre)?.color || 'rgb(76, 175, 80)';
    });
    return map;
  };

  /**
   * Creates a dataset for a track.
   * @param {Track} track - The track data.
   * @param {number} index - The index of the track.
   * @param {object} genreColorMap - The map of genres to colors.
   * @returns {object} The dataset for the track.
   */
  const createDataset = (track: Track, index: number, genreColorMap: { [genre: string]: string }) => {
    const genreColor = genreColorMap[track.genre] || 'rgb(76, 175, 80)';
    return {
      label: `${track.trackName} by ${track.artistName || 'Unknown Artist'}`,
      data: [
        {
          x: track.valence,
          y: track.energy,
          r: 10,
          id: index.toString(),
          name: track.trackName,
          artist: track.artistName,
          genre: track.genre,
          decade: track.decade
        },
      ],
      backgroundColor: genreColor,
      borderColor: genreColor,
      borderWidth: 2,
    };
  };

  /**
   * Toggles the selection of a genre.
   * @param {string} genre - The genre to toggle.
   */
  const toggleGenreSelection = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre) ? prevGenres.filter((g) => g !== genre) : [...prevGenres, genre]
    );
  };

  useEffect(() => {
    /* Fetch playlists when genres or decades change */
    if (selectedGenres.length > 0 || selectedDecades.length > 0) {
      fetchPlaylists();
    } else {
      setBubblesData({ datasets: [] });
    }
  }, [selectedGenres, selectedDecades, fetchPlaylists]);

  useEffect(() => {
    /* Generate genre buttons 
    * This function generates the genre buttons in random positions around the circular chart.
    */
    const generateGenreButtons = () => {
      const buttons: GenreButton[] = [];
      const takenPositions: Position[] = [];
      const circularChartWrapperRadius = 400;
      const circularChartWrapperCenter = { x: 50, y: 50 };
      const buttonRadius = 30;

      const circleWidth = circularChartWrapperRadius * 2;
      const diagonal = Math.sqrt(circleWidth ** 2 + circleWidth ** 2);

      const minDistanceFromCircle = (diagonal / 2) + buttonRadius - 50;

      const doesOverlap = (newPosition: Position, takenPositions: Position[]): boolean => {
        for (const pos of takenPositions) {
          const dx = (newPosition.x - pos.x) * 8;
          const dy = (newPosition.y - pos.y) * 8;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < buttonRadius * 2) {
            return true;
          }
        }
        return false;
      };

      genresWithColors.forEach((genre) => {
        let position: Position = { x: 0, y: 0 };
        let attempts = 0;
        const maxAttempts = 300;

        while (attempts < maxAttempts) {
          const angle = Math.random() * 2 * Math.PI; // Ângulo aleatório
          const distance = minDistanceFromCircle + Math.random() * 1000; // Gera uma distância fora do círculo azul

          const x = circularChartWrapperCenter.x + (distance * Math.cos(angle)) / 30;
          const y = circularChartWrapperCenter.y + (distance * Math.sin(angle)) / 10;
          position = { x, y };

          if (!doesOverlap(position, takenPositions)) {
            takenPositions.push(position);
            break;
          }

          attempts++;
        }

        if (attempts < maxAttempts) {
          buttons.push({
            name: genre.name,
            color: genre.color,
            position,
          });
        } else {
          console.warn(`Não foi possível encontrar uma posição válida para o gênero: ${genre.name}`);
        }
      });

      setGenreButtons(buttons);
    };

    generateGenreButtons();
  }, []);

  return (
    <main className={styles['main-bubble-chart']}>
      <div
        className={styles['chart-container']}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className={styles['circular-chart-wrapper']}>
          <div className={`${styles['mood-label']} ${styles['label-energetic']}`}>Energetic</div>
          <div className={`${styles['mood-label']} ${styles['label-calm']}`}>Calm</div>
          <div className={`${styles['mood-label']} ${styles['label-melancholic']}`}>Melancholic</div>
          <div className={`${styles['mood-label']} ${styles['label-optimistic']}`}>Optimistic</div>
          <Bubble data={bubblesData} options={chartOptions} />
        </div>
        {genreButtons.map((button) => (
          <button
            key={button.name}
            className={`${styles['genre-button']} ${selectedGenres.includes(button.name) ? styles['active-genre'] : ''}`}
            style={{
              backgroundColor: button.color,
              top: `${button.position.y}%`,
              left: `${button.position.x}%`,
            }}
            onClick={() => toggleGenreSelection(button.name)}
          >
            {button.name}
          </button>
        ))}

        {selectedTrack && (
          <div className={styles['player']}>
            {selectedTrack.albumPhotoUrl ? (
              <img
                src={selectedTrack.albumPhotoUrl}
                alt={`${selectedTrack.trackName} album cover`}
                className={styles['album-cover']}
                onError={(e) => { e.currentTarget.src = '/path/to/placeholder.jpg'; }}
              />
            ) : (
              <p>Image URL not available</p>
            )}
            <div className={styles['track-info']}>
              <h4>{selectedTrack.trackName}</h4>
              <p>by {selectedTrack.artistName}</p>
              <p>Genre: {selectedTrack.genre || "Unknown"}</p>
              <p>Decade: {mapDecade(selectedTrack.decade) || "Unknown"}</p>
              <a href={selectedTrack.spotifyUrl} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BubbleChart;
