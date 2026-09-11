export interface TieredDiscount {
  min: number;
  max?: number;
  discount: number;
}

export interface VolumeDiscount {
  min: number;
  discount: number;
}

export const calculateTieredDiscount = (quantity: number, tiers: TieredDiscount[]): number => {
  for (const tier of tiers) {
    if (quantity >= tier.min && (!tier.max || quantity <= tier.max)) {
      return tier.discount;
    }
  }
  return 0;
};

export const calculateVolumeDiscount = (
  quantity: number,
  basePrice: number,
  volumeTiers: VolumeDiscount[]
): number => {
  let discount = 0;
  for (const tier of volumeTiers) {
    if (quantity >= tier.min) {
      discount = Math.max(discount, tier.discount);
    }
  }
  return (basePrice * discount) / 100;
};
