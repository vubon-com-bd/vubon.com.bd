export interface CourierRate {
  zone: string;
  baseRate: number;
  perKgRate: number;
}

export interface CourierData {
  isActive: boolean;
  rates: CourierRate[];
}

export const calculateCourierRate = (
  courier: CourierData,
  weight: number,
  zone: string
): number => {
  const rate = courier.rates.find((r) => r.zone === zone);
  if (!rate) return 0;
  return rate.baseRate + weight * rate.perKgRate;
};

export const getBestCourierRate = <T extends CourierData>(
  couriers: T[],
  weight: number,
  zone: string
): T | null => {
  let bestCourier: T | null = null;
  let bestRate = Infinity;
  for (const courier of couriers) {
    const rate = calculateCourierRate(courier, weight, zone);
    if (rate < bestRate && courier.isActive) {
      bestRate = rate;
      bestCourier = courier;
    }
  }
  return bestCourier;
};
