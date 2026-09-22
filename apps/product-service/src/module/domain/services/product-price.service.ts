import { PriceAmountVO } from '../value-objects/primitives/price-amount.vo';

export class ProductPriceService {
  static applyDiscount(base: PriceAmountVO, percent: number): PriceAmountVO {
    return base.withDiscount(percent);
  }

  static calculateTax(price: PriceAmountVO, taxPercent: number): PriceAmountVO {
    return PriceAmountVO.create(price.value * (1 + taxPercent / 100));
  }

  static finalPrice(base: PriceAmountVO, discount: number, tax: number): PriceAmountVO {
    const afterDiscount = ProductPriceService.applyDiscount(base, discount);
    return ProductPriceService.calculateTax(afterDiscount, tax);
  }
}
