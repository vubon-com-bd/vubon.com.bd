/**
 * Format duration in seconds to human-readable (H:M:S or M:S)
 * @module shared-utils/formatter/date-time
 */
export function formatDuration(totalSeconds: number, forceHours = false): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    throw new RangeError('totalSeconds must be a non-negative finite number');
  }

  const seconds = Math.floor(totalSeconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0 || forceHours) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
