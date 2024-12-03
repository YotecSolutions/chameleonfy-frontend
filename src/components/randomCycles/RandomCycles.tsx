import React, { useState, useEffect } from 'react';
import styles from './RandomCycles.module.css';

interface Circle {
    id: number;
    position: {
        x: number;
        y: number;
    };
    color: string;
}

const RandomCircles: React.FC = () => {
    const [circles, setCircles] = useState<Circle[]>([]);

    useEffect(() => {
        const generateCircles = () => {
            const colors = ['#FF5733', '#33FF57', '#3357FF', '#F5A623', '#C70039'];
            const newCircles: Circle[] = Array.from({ length: 10 }, (_, index) => ({
                id: index,
                position: {
                    x: Math.random() * 90 + 5, // Random position between 5% and 95%
                    y: Math.random() * 90 + 5,
                },
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
            setCircles(newCircles);
        };

        generateCircles();
    }, []);

    return (
        <div className={styles.container}>
            <h1>merda</h1>
            {circles.map((circle) => (
                <div
                    key={circle.id}
                    className={styles.circle}
                    style={{
                        top: `${circle.position.y}%`,
                        left: `${circle.position.x}%`,
                        backgroundColor: circle.color,
                    }}
                />
            ))}
        </div>
    );
};

export default RandomCircles;
