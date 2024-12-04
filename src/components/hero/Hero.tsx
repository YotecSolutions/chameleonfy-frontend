/**
 * @fileoverview The Hero component displays a typewriter effect for rotating phrases
 * @module Hero
 */

import React, { useEffect, useMemo, useState } from 'react';
import styles from './Hero.module.css';

/**
 * The Hero component displays a typewriter effect for rotating phrases
 * and a subtitle encouraging mood-based song discovery.
 * @returns {JSX.Element} The rendered Hero component.
 */
const Hero: React.FC = () => {
    const phrases = useMemo(() => [
        "How are you feeling today?",
        "¿Cómo te sientes hoy?",
        "Comment te sens-tu aujourd'hui?",
        "Wie fühlst du dich heute?",
        "Come ti senti oggi?",
        "你今天感觉如何？",
        "今日はどんな気分ですか？",
        "오늘 기분이 어때요?",
        "Como você está se sentindo hoje?",
    ], []);

    const [currentPhrase, setCurrentPhrase] = useState<string>(phrases[0]);
    const [phraseIndex, setPhraseIndex] = useState<number>(0);
    const [typing, setTyping] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTyping(false);
            setTimeout(() => {
                const nextIndex = (phraseIndex + 1) % phrases.length;
                setPhraseIndex(nextIndex);
                setCurrentPhrase(phrases[nextIndex]);
                setTyping(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [phraseIndex, phrases]);

    return (
        <div className={styles.hero}>
            <div
                key={phraseIndex}
                className={`${styles.typewriter} ${typing ? styles.typing : ''}`}
            >
                <h1>{currentPhrase}</h1>
            </div>
            <p className={styles.subtitle}>Discover songs that match your mood</p>
        </div>
    );
};

export default Hero;
