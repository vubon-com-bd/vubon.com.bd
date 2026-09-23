import { RouteDistanceVO } from '../value-objects/primitives/route-distance.vo';

export interface Location {
  readonly id: string;
  readonly lat: number;
  readonly lng: number;
}

export class RouteOptimizationService {
  calculateDistance(a: Location, b: Location): RouteDistanceVO {
    const dx = a.lat - b.lat;
    const dy = a.lng - b.lng;
    const km = Math.sqrt(dx * dx + dy * dy) * 111;
    return RouteDistanceVO.create(Number(km.toFixed(2)));
  }
}
