export interface OptimizableStop {
  stopId: string;
  latitude: number;
  longitude: number;
  order: number;
}

export interface OptimizableRoute {
  stops: OptimizableStop[];
  isOptimized: boolean;
}

export const optimizeRoute = (route: OptimizableRoute): OptimizableRoute => {
  const stops = [...route.stops];
  stops.sort((a, b) => a.order - b.order);
  return { ...route, stops, isOptimized: true };
};

export const calculateHaversineDistance = (
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

export const calculateOptimalRoute = (
  points: { latitude: number; longitude: number }[]
): number[] => {
  const visited = new Set<number>();
  const order: number[] = [];
  let current = 0;
  visited.add(0);
  order.push(0);
  while (visited.size < points.length) {
    let nearest = -1;
    let nearestDist = Infinity;
    for (let i = 0; i < points.length; i++) {
      if (!visited.has(i)) {
        const dist = calculateHaversineDistance(
          points[current].latitude,
          points[current].longitude,
          points[i].latitude,
          points[i].longitude
        );
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      }
    }
    if (nearest !== -1) {
      visited.add(nearest);
      order.push(nearest);
      current = nearest;
    }
  }
  return order;
};
