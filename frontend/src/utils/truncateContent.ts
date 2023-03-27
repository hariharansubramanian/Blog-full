/**
 * Truncate the content upto a maximum length and trail with '...'
 */
export const truncateContent = (content: string, maxLength: number): string => {
    if (content.length <= maxLength) {
        return content;

    }
    return content.slice(0, maxLength) + '...';
}
