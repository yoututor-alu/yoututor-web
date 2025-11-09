/**
 * Converts a timestamp string in format [HH:MM:SS] or [MM:SS] to seconds
 * @param timestamp - Timestamp string like "[00:05:30]" or "[05:30]"
 * @returns Number of seconds, or null if invalid
 */
export const parseTimestamp = (timestamp: string): number | null => {
  // Remove brackets and whitespace
  const cleaned = timestamp.replace(/[\[\]]/g, "").trim();

  // Split by colon
  const parts = cleaned.split(":").map(Number);

  // Validate all parts are numbers
  if (parts.some(isNaN)) {
    return null;
  }

  // Handle [MM:SS] format (2 parts)
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  // Handle [HH:MM:SS] format (3 parts)
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
};

/**
 * Finds all timestamp patterns in text and returns them with their positions
 * Handles both single timestamps [00:00:00] and ranges [00:00:54-00:00:59]
 * For ranges, uses the first (start) timestamp
 * @param text - Text to search for timestamps
 * @returns Array of {match, index, seconds}
 */
export const findTimestamps = (
  text: string
): Array<{
  match: string;
  index: number;
  seconds: number;
}> => {
  // Match patterns like [00:00:00], [00:00], or [00:00:54-00:00:59]
  // This regex matches:
  // - Single timestamps: [HH:MM:SS] or [MM:SS]
  // - Ranges: [HH:MM:SS-HH:MM:SS] or [MM:SS-MM:SS]
  const timestampRegex = /\[(\d{1,2}:\d{2}(?::\d{2})?)(?:-(\d{1,2}:\d{2}(?::\d{2})?))?\]/g;
  const matches: Array<{ match: string; index: number; seconds: number }> = [];
  let match;

  while ((match = timestampRegex.exec(text)) !== null) {
    // For ranges, match[1] is the first timestamp, match[2] is the second (if present)
    // We always use the first timestamp (start time)
    const firstTimestamp = `[${match[1]}]`;
    const seconds = parseTimestamp(firstTimestamp);
    
    if (seconds !== null) {
      matches.push({
        match: match[0], // The full match including range if present
        index: match.index,
        seconds
      });
    }
  }

  return matches;
};
