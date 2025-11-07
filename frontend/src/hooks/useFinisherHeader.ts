import { useEffect } from 'react';

declare global {
    interface Window {
        FinisherHeader: any;
    }
}

export const useFinisherHeader = () => {
    useEffect(() => {
        document.body.classList.add('auth-page');

        let headerInstance: any;
        if (typeof window !== 'undefined' && typeof window.FinisherHeader !== 'undefined') {
            headerInstance = new window.FinisherHeader({
                count: 12,
                size: {
                    min: 1300,
                    max: 1500,
                    pulse: 0,
                },
                speed: {
                    x: {
                        min: 0.6,
                        max: 3,
                    },
                    y: {
                        min: 0.6,
                        max: 3,
                    },
                },
                colors: {
                    background: '#953eff',
                    particles: ['#ff681c', '#87ddfe', '#231efe', '#ff0a53'],
                },
                blending: 'lighten',
                opacity: {
                    center: 0.6,
                    edge: 0,
                },
                skew: -1,
                shapes: ['c'],
            });
        }

        return () => {
            document.body.classList.remove('auth-page');

            if (headerInstance && typeof headerInstance.destroy === 'function') {
                headerInstance.destroy();
            }

            const existingCanvas = document.getElementById('finisher-canvas');
            if (existingCanvas && existingCanvas.parentNode) {
                existingCanvas.parentNode.removeChild(existingCanvas);
            }
        };
    }, []);
};

