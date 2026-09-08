export class CurrencyConverter {
  private rates: Record<string, number> = {};

  setRate(from: string, to: string, rate: number): void {
    this.rates[`${from}_${to}`] = rate;
  }

  convert(amount: number, from: string, to: string): number {
    const key = `${from}_${to}`;
    if (!this.rates[key]) {
      throw new Error(`Exchange rate not found for ${from} to ${to}`);
    }
    return amount * this.rates[key];
  }

  getRate(from: string, to: string): number {
    return this.rates[`${from}_${to}`] || 0;
  }
}
