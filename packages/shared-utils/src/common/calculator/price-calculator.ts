/**
 * Calculate Price
 * মূল্য ক্যালকুলেট করা
 */
export const calculatePrice = {
  /**
   * Calculate total price
   * মোট মূল্য ক্যালকুলেট করা
   */
  total: (items: { price: number; quantity: number }[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * Calculate subtotal
   * সাবটোটাল ক্যালকুলেট করা
   */
  subtotal: (items: { price: number; quantity: number }[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * Calculate profit margin
   * লাভের মার্জিন ক্যালকুলেট করা
   */
  profitMargin: (costPrice: number, sellingPrice: number): number => {
    if (costPrice === 0) return 0;
    return ((sellingPrice - costPrice) / costPrice) * 100;
  },

  /**
   * Calculate markup
   * মার্কআপ ক্যালকুলেট করা
   */
  markup: (costPrice: number, markupPercent: number): number => {
    return costPrice * (1 + markupPercent / 100);
  },

  /**
   * Calculate average price
   * গড় মূল্য ক্যালকুলেট করা
   */
  average: (prices: number[]): number => {
    if (prices.length === 0) return 0;
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
  },

  /**
   * Calculate price per unit
   * ইউনিট প্রতি মূল্য ক্যালকুলেট করা
   */
  pricePerUnit: (totalPrice: number, units: number): number => {
    if (units === 0) return 0;
    return totalPrice / units;
  },

  /**
   * Calculate final price with all adjustments
   * সব অ্যাডজাস্টমেন্ট সহ চূড়ান্ত মূল্য ক্যালকুলেট করা
   */
  final: (
    basePrice: number,
    discountPercent: number = 0,
    taxPercent: number = 0,
    shippingCost: number = 0
  ): { price: number; discount: number; tax: number; total: number } => {
    const discount = (basePrice * discountPercent) / 100;
    const afterDiscount = basePrice - discount;
    const tax = (afterDiscount * taxPercent) / 100;
    const total = afterDiscount + tax + shippingCost;

    return {
      price: basePrice,
      discount,
      tax,
      total: Math.round(total * 100) / 100,
    };
  },
};
