/**
 * Calculate Shipping
 * শিপিং ক্যালকুলেট করা
 */
export const calculateShipping = {
  /**
   * Calculate shipping by weight
   * ওজন অনুযায়ী শিপিং ক্যালকুলেট করা
   */
  byWeight: (
    weight: number,
    rates: { minWeight: number; maxWeight: number | null; rate: number }[]
  ): number => {
    for (const rate of rates) {
      if (weight >= rate.minWeight) {
        if (rate.maxWeight === null || weight <= rate.maxWeight) {
          return rate.rate;
        }
      }
    }
    return 0;
  },

  /**
   * Calculate shipping by distance
   * দূরত্ব অনুযায়ী শিপিং ক্যালকুলেট করা
   */
  byDistance: (distance: number, baseRate: number, perKmRate: number): number => {
    return baseRate + distance * perKmRate;
  },

  /**
   * Calculate shipping by zone (Bangladesh)
   * জোন অনুযায়ী শিপিং ক্যালকুলেট করা
   */
  byZone: (
    zone:
      | 'dhaka'
      | 'chittagong'
      | 'rajshahi'
      | 'khulna'
      | 'barisal'
      | 'sylhet'
      | 'rangpur'
      | 'mymensingh',
    weight: number
  ): number => {
    const baseRates = {
      dhaka: 60,
      chittagong: 80,
      rajshahi: 100,
      khulna: 100,
      barisal: 120,
      sylhet: 120,
      rangpur: 140,
      mymensingh: 100,
    };

    const baseRate = baseRates[zone] || 100;
    const weightCharge = Math.ceil(weight) * 20; // 20 BDT per kg

    return baseRate + weightCharge;
  },

  /**
   * Calculate shipping by courier (Bangladesh)
   * কুরিয়ার অনুযায়ী শিপিং ক্যালকুলেট করা
   */
  byCourier: (
    courier: 'sa_paribahan' | 'redx' | 'pathao' | 'steadfast' | 'sundarban',
    weight: number,
    location: 'city' | 'suburb' | 'rural'
  ): number => {
    const baseRates = {
      sa_paribahan: { city: 80, suburb: 100, rural: 120 },
      redx: { city: 60, suburb: 80, rural: 100 },
      pathao: { city: 50, suburb: 70, rural: 90 },
      steadfast: { city: 70, suburb: 90, rural: 110 },
      sundarban: { city: 65, suburb: 85, rural: 105 },
    };

    const courierRates = baseRates[courier];
    const baseRate = courierRates[location] || courierRates.city;
    const weightCharge = Math.ceil(weight) * 15; // 15 BDT per kg

    return baseRate + weightCharge;
  },

  /**
   * Calculate international shipping
   * আন্তর্জাতিক শিপিং ক্যালকুলেট করা
   */
  international: (
    country: string,
    weight: number,
    dimensions: { length: number; width: number; height: number }
  ): { base: number; volumetricWeight: number; total: number } => {
    // Dimensional weight calculation (in kg)
    const volWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
    const chargeableWeight = Math.max(weight, volWeight);

    const internationalRates: Record<string, number> = {
      US: 2000,
      UK: 1800,
      AE: 1500,
      IN: 500,
      SG: 1200,
      MY: 1000,
      default: 1500,
    };

    const baseRate = internationalRates[country] || internationalRates.default;
    const total = baseRate + Math.ceil(chargeableWeight) * 100;

    return {
      base: baseRate,
      volumetricWeight: Math.round(volWeight * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  },

  /**
   * Calculate COD (Cash on Delivery) charge
   * সিওডি চার্জ ক্যালকুলেট করা
   */
  cod: (amount: number, rate: number = 0.5): number => {
    return Math.max((amount * rate) / 100, 30); // Minimum 30 BDT
  },

  /**
   * Calculate estimated delivery date
   * ডেলিভারি তারিখ অনুমান করা
   */
  deliveryDate: (
    shippingMethod: 'standard' | 'express' | 'same_day',
    currentDate: Date = new Date()
  ): { estimatedDate: Date; days: number } => {
    const deliveryDays = {
      standard: 3,
      express: 2,
      same_day: 1,
    };

    const days = deliveryDays[shippingMethod] || 3;
    const estimatedDate = new Date(currentDate);
    estimatedDate.setDate(estimatedDate.getDate() + days);

    return {
      estimatedDate,
      days,
    };
  },
};
