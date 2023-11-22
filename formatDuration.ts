export function formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const secondsPart = seconds % 60;
    const minutesPart = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${minutesPart}m ${secondsPart}s`;
    } else if (minutes > 0) {
        return `${minutesPart}m ${secondsPart}s`;
    } else {
        return `${secondsPart}s`;
    }
}