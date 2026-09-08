export const calculateDeliveryTime = (distance: number, speed: number = 30): number => {
  return distance / speed;
};

export const calculateEstimatedDelivery = (distance: number, trafficFactor: number = 1): number => {
  const baseTime = calculateDeliveryTime(distance);
  return baseTime * trafficFactor;
};
