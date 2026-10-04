/**
 * Convert a UTC Date to a specific timezone's wall-clock representation
 * @module shared-utils/converter/timezone
 *
 * Returns a Date whose UTC parts represent the target timezone wall-clock.
 */
export function convertToTimezone(date: Date, timezone: string): Date {
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);

  const [datePart, timePart] = formatted.split(', ');
  const [month, day, year] = datePart.split('/');
  const [hour, minute, second] = timePart.split(':');
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    )
  );
}
