import React, { useState } from 'react';
import styles from './Home.module.css';
import Hero from '../../components/hero/Hero';
import Logo from '../../components/logo/Logo';
import DecadeSelectorHome from '../../components/decadeSelectorHome/DecadeSelectorHome';
import GenreSelectorHome from '../../components/genreSelectorHome/GenreSelectorHome';
import genres from '../../data/genres';
import { Recommendation } from '../../types/recommendation';

/**
 * Home component representing the main landing page.
 * @component
 * @returns {JSX.Element} The rendered Home page.
 */
const Home: React.FC = () => {
    const [moodText, setMoodText] = useState<string>('');
    const [recommendations] = useState<Recommendation[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<{ name: string } | null>(null);
    const [selectedDecade, setSelectedDecade] = useState<string>('2020-2029');

    /**
     * Handles fetching music recommendations.
     * The function would include an axios call to fetch data.
     */
    const handleRecommendation = async () => {
        // TODO: Implement fetching recommendations/*  */
    };

    return (
        <main className={styles['main']}>
            <Logo />
            <Hero />
            <form onSubmit={(e) => e.preventDefault()} className={styles['form']}>
                {/* Input for entering mood */}
                <input
                    type="text"
                    value={moodText}
                    onChange={(e) => setMoodText(e.target.value)}
                    placeholder="Enter your mood"
                    className={styles['input']}
                />
                {/* Genre and Decade Selectors */}
                <div className={styles['selectors']}>
                    <GenreSelectorHome
                        genres={genres}
                        selectedGenre={selectedGenre?.name || ''}
                        onGenreSelect={(genre) => setSelectedGenre({ name: genre })}
                    />
                    <DecadeSelectorHome
                        startDecade="2020-2029"
                        onDecadeChange={(decade) => setSelectedDecade(decade)}
                    />
                </div>
                {/* Recommendation button */}
                <button
                    onClick={handleRecommendation}
                    className={styles['recommend-button']}
                    disabled={!selectedGenre || !selectedDecade}
                >
                    Get Recommendation
                </button>
            </form>

            {/* Displaying Recommendations */}
            <section className={styles['recommendations']}>
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        style={{ color: rec.color }}
                        className={styles['recommendation-item']}
                    >
                        {rec.trackName} by {rec.artistName}
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Home;
