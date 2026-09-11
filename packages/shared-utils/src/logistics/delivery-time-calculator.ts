export const calculateShipmentDeliveryTime = (distance: number, speed: number = 30): number => {
  if (speed <= 0) return 0;
  return distance / speed;
};

export interface DeliveryTimeData {
  route: { totalDistance?: number };
  scheduledDate: Date;
}

export const calculateEstimatedDeliveryTime = (delivery: DeliveryTimeData): Date => {
  const baseTime = calculateShipmentDeliveryTime(delivery.route.totalDistance || 0);
  const trafficFactor = 1.2;
  const estimatedHours = baseTime * trafficFactor;
  const estimatedDate = new Date(delivery.scheduledDate);
  estimatedDate.setHours(estimatedDate.getHours() + estimatedHours);
  return estimatedDate;
};

export const calculateDeliveryWindow = (delivery: DeliveryTimeData): { start: Date; end: Date } => {
  const start = new Date(delivery.scheduledDate);
  const end = new Date(start);
  end.setHours(end.getHours() + 4);
  return { start, end };
};
