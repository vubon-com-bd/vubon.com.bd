/**
 * Human-readable relative time
 * @module shared-utils/common/date
 *
 * @example
 * relativeTime(pastDate, now) // '2 hours ago'
 */
export function relativeTime(date: Date, reference: Date = new Date()): string {
  const diffMs = reference.getTime() - date.getTime();
  const abs = Math.abs(diffMs);
  const future = diffMs < 0;
  const suffix = future ? 'from now' : 'ago';

  const seconds = Math.floor(abs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 45) return future ? 'in a moment' : 'just now';
  if (seconds < 90) return `a minute ${suffix}`;
  if (minutes < 45) return `${minutes} minutes ${suffix}`;
  if (minutes < 90) return `an hour ${suffix}`;
  if (hours < 22) return `${hours} hours ${suffix}`;
  if (hours < 36) return `a day ${suffix}`;
  if (days < 26) return `${days} days ${suffix}`;
  if (days < 46) return `a month ${suffix}`;
  if (days < 320) return `${months} months ${suffix}`;
  if (days < 548) return `a year ${suffix}`;
  return `${years} years ${suffix}`;
}
