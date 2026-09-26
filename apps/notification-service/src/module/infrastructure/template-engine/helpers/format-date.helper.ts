export function formatDateHelper(
  date: Date | string,
  locale = 'en-US',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch {
    return d.toISOString().split('T')[0] ?? '';
  }
}
