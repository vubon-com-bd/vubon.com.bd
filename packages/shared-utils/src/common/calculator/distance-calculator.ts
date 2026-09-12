/**
 * Distance Calculator — Haversine formula.
 */
import { CALCULATOR } from '@vubon/shared-constants/src/common/calculator.constants';

const R = CALCULATOR.EARTH_RADIUS_KM;

const isValidLat = (lat: number): boolean => lat >= -90 && lat <= 90;
const isValidLon = (lon: number): boolean => lon >= -180 && lon <= 180;

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  if (!isValidLat(lat1) || !isValidLat(lat2))
    throw new Error('Latitude must be between -90 and 90');
  if (!isValidLon(lon1) || !isValidLon(lon2))
    throw new Error('Longitude must be between -180 and 180');

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
