/**
 * Haversine distance between two lat/lng points (in km)
 * @module shared-utils/calculator/logistics
 */
export interface LatLng {
  readonly lat: number;
  readonly lng: number;
}

export function calculateDistance(a: LatLng, b: LatLng): number {
  if (!isValidLatLng(a) || !isValidLatLng(b)) return 0;

  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return round2(R * c);
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function isValidLatLng(p: LatLng): boolean {
  return (
    Number.isFinite(p.lat) &&
    Number.isFinite(p.lng) &&
    p.lat >= -90 &&
    p.lat <= 90 &&
    p.lng >= -180 &&
    p.lng <= 180
  );
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
