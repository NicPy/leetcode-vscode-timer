

export const formatTime = (timestamp: number) => {
    const totalSeconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const fMinutes = String(minutes).padStart(2, '0');
    const fSeconds = String(seconds).padStart(2, '0');

    return `${fMinutes}:${fSeconds}`;
}