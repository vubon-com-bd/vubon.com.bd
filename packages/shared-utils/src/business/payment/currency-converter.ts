export class PaymentCurrencyConverter {
  private rates: Map<string, number> = new Map();

  setRate(from: string, to: string, rate: number): void {
    this.rates.set(`${from}_${to}`, rate);
  }

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;
    const rate = this.rates.get(`${from}_${to}`);
    if (rate) return amount * rate;
    const reverseRate = this.rates.get(`${to}_${from}`);
    if (reverseRate) return amount / reverseRate;
    return amount;
  }

  convertToBDT(amount: number, from: string): number {
    return this.convert(amount, from, 'BDT');
  }

  convertFromBDT(amount: number, to: string): number {
    return this.convert(amount, 'BDT', to);
  }
}
