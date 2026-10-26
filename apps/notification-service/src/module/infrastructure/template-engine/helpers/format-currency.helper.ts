/**
 * Format Currency Helper
 * @module notification-service/infrastructure/template-engine/helpers
 *
 * Formats amounts with currency symbol + locale.
 * BD default: BDT with Bengali/English locale।
 */
export class FormatCurrencyHelper {
  static readonly helperName = 'formatCurrency';

  static format(
    amount: number | string | null | undefined,
    currency = 'BDT',
    locale = 'en-BD',
  ): string {
    const num = typeof amount === 'string' ? Number(amount) : amount ?? 0;
    if (Number.isNaN(num)) return `${currency} 0.00`;

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    } catch {
      // Fallback for unsupported locales/currencies
      return `${currency} ${num.toFixed(2)}`;
    }
  }

  static plain(amount: number | string | null | undefined): string {
    const num = typeof amount === 'string' ? Number(amount) : amount ?? 0;
    if (Number.isNaN(num)) return '0';
    return new Intl.NumberFormat('en-BD').format(num);
  }
}
