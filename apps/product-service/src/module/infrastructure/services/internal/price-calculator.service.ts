import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceCalculatorService {
  applyDiscount(amount: number, percent: number): number {
    if (percent < 0 || percent > 100) {
      throw new Error(`Invalid discount percent: ${percent}`);
    }
    return Math.round(amount * (1 - percent / 100) * 100) / 100;
  }

  applyTax(amount: number, taxPercent: number): number {
    if (taxPercent < 0) {
      throw new Error(`Invalid tax percent: ${taxPercent}`);
    }
    return Math.round(amount * (1 + taxPercent / 100) * 100) / 100;
  }

  calculateFinal(base: number, discount: number, tax: number): number {
    const afterDiscount = this.applyDiscount(base, discount);
    return this.applyTax(afterDiscount, tax);
  }
}
