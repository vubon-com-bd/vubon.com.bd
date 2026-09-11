export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface RouteGeoData {
  startPoint: GeoPoint;
  waypoints: GeoPoint[];
  endPoint: GeoPoint;
}

export const calculateGeoDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateRouteGeoDistance = (route: RouteGeoData): number => {
  let totalDistance = 0;
  const points = [route.startPoint, ...route.waypoints, route.endPoint];
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateGeoDistance(
      points[i].latitude,
      points[i].longitude,
      points[i + 1].latitude,
      points[i + 1].longitude
    );
  }
  return totalDistance;
};

export const calculateTotalGeoDistance = (routes: RouteGeoData[]): number => {
  return routes.reduce((sum, r) => sum + calculateRouteGeoDistance(r), 0);
};
