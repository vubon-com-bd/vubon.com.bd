/**
 * Format Date Helper — Bangladesh Edition
 * @module notification-service/infrastructure/template-engine/helpers
 *
 * Formats dates with BD timezone (Asia/Dhaka) + locale (en-BD / bn-BD)।
 */
export class FormatDateHelper {
  static readonly helperName = 'formatDate';

  static format(
    input: string | Date | null | undefined,
    style: 'short' | 'medium' | 'long' | 'full' = 'medium',
    locale = 'en-BD',
    timezone = 'Asia/Dhaka',
  ): string {
    if (!input) return '';

    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) return '';

    const options: Record<typeof style, Intl.DateTimeFormatOptions> = {
      short: { year: '2-digit', month: '2-digit', day: '2-digit' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      },
    };

    try {
      return new Intl.DateTimeFormat(locale, {
        ...options[style],
        timeZone: timezone,
      }).format(date);
    } catch {
      return date.toISOString();
    }
  }

  static relative(
    input: string | Date | null | undefined,
    now: Date = new Date(),
  ): string {
    if (!input) return '';
    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) return '';

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    return this.format(input, 'medium');
  }
}
