export function calculateDeliveryTime(
  distanceKm: number,
  avgSpeedKmh = 30,
): number {
  if (avgSpeedKmh <= 0) return 0;
  return Math.ceil((distanceKm / avgSpeedKmh) * 60);
}
