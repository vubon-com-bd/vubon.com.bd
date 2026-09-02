/**
 * Calculate Discount
 * ডিসকাউন্ট ক্যালকুলেট করা
 */
export const calculateDiscount = {
  /**
   * Calculate discount amount
   * ডিসকাউন্টের পরিমাণ ক্যালকুলেট করা
   */
  amount: (price: number, discountPercent: number): number => {
    return (price * discountPercent) / 100;
  },

  /**
   * Calculate price after discount
   * ডিসকাউন্ট পরবর্তী মূল্য ক্যালকুলেট করা
   */
  priceAfterDiscount: (price: number, discountPercent: number): number => {
    const discount = (price * discountPercent) / 100;
    return price - discount;
  },

  /**
   * Calculate discount percentage
   * ডিসকাউন্ট শতাংশ ক্যালকুলেট করা
   */
  percentage: (originalPrice: number, discountedPrice: number): number => {
    if (originalPrice === 0) return 0;
    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  },

  /**
   * Calculate savings
   * সেভিংস ক্যালকুলেট করা
   */
  savings: (
    originalPrice: number,
    discountedPrice: number
  ): {
    amount: number;
    percentage: number;
  } => {
    const amount = originalPrice - discountedPrice;
    const percentage = originalPrice === 0 ? 0 : (amount / originalPrice) * 100;

    return {
      amount: Math.round(amount * 100) / 100,
      percentage: Math.round(percentage * 100) / 100,
    };
  },

  /**
   * Calculate bulk discount
   * বাল্ক ডিসকাউন্ট ক্যালকুলেট করা
   */
  bulk: (
    unitPrice: number,
    quantity: number,
    discountTiers: { minQty: number; discount: number }[]
  ): { total: number; discount: number; savings: number } => {
    // Find applicable discount
    let applicableDiscount = 0;
    for (const tier of discountTiers) {
      if (quantity >= tier.minQty) {
        applicableDiscount = tier.discount;
      }
    }

    const total = unitPrice * quantity;
    const discount = (total * applicableDiscount) / 100;

    return {
      total,
      discount: Math.round(discount * 100) / 100,
      savings: Math.round(discount * 100) / 100,
    };
  },

  /**
   * Calculate coupon discount
   * কুপন ডিসকাউন্ট ক্যালকুলেট করা
   */
  coupon: (
    total: number,
    couponType: 'percentage' | 'fixed',
    couponValue: number,
    maxDiscount: number = Infinity
  ): { discount: number; finalTotal: number } => {
    let discount = 0;

    if (couponType === 'percentage') {
      discount = (total * couponValue) / 100;
    } else {
      discount = couponValue;
    }

    // Apply max discount limit
    discount = Math.min(discount, maxDiscount);

    // Ensure discount doesn't exceed total
    discount = Math.min(discount, total);

    const finalTotal = total - discount;

    return {
      discount: Math.round(discount * 100) / 100,
      finalTotal: Math.round(finalTotal * 100) / 100,
    };
  },

  /**
   * Calculate seasonal discount
   * সিজনাল ডিসকাউন্ট ক্যালকুলেট করা
   */
  seasonal: (
    price: number,
    season: 'summer' | 'winter' | 'rainy' | 'festival'
  ): { discountPercent: number; finalPrice: number } => {
    const discountRates = {
      summer: 10,
      winter: 15,
      rainy: 5,
      festival: 20,
    };

    const discountPercent = discountRates[season];
    const finalPrice = calculateDiscount.priceAfterDiscount(price, discountPercent);

    return {
      discountPercent,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  },
};
