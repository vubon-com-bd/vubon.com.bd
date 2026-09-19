/**
 * Get timezone offset in minutes for a given timezone
 * @module shared-utils/converter/timezone
 */
export function getTimezoneOffset(timezone: string, date: Date = new Date()): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  });
  const parts = dtf.formatToParts(date);
  const offsetPart = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const match = offsetPart.match(/GMT([+-]?\d+)(?::(\d+))?/);
  if (!match) return 0;
  const hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  return hours * 60 + (hours < 0 ? -minutes : minutes);
}
