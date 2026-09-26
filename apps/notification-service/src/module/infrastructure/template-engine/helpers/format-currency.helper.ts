export function formatCurrencyHelper(
  amount: number,
  currency = 'BDT',
  locale = 'en-BD',
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
