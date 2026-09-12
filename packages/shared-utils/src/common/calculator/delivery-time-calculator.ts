/**
 * Delivery Time Calculator — uses CALCULATOR constants.
 */
import { CALCULATOR } from '@vubon/shared-constants/src/common/calculator.constants';

export const calculateDeliveryTime = (
  distance: number,
  speed: number = CALCULATOR.DEFAULT_SPEED_KMH
): number => {
  if (!Number.isFinite(distance) || distance < 0) {
    throw new Error('Distance must be non-negative');
  }
  if (!Number.isFinite(speed) || speed <= 0) {
    throw new Error('Speed must be positive');
  }
  return distance / speed;
};

export const calculateEstimatedDelivery = (
  distance: number,
  trafficFactor: number = 1,
  speed: number = CALCULATOR.DEFAULT_SPEED_KMH
): number => {
  if (!Number.isFinite(trafficFactor) || trafficFactor <= 0) {
    throw new Error('Traffic factor must be positive');
  }
  if (trafficFactor > CALCULATOR.MAX_TRAFFIC_FACTOR) {
    throw new Error(`Traffic factor must not exceed ${CALCULATOR.MAX_TRAFFIC_FACTOR}`);
  }
  return calculateDeliveryTime(distance, speed) * trafficFactor;
};
