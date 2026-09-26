import { RouteDistanceVO } from '../value-objects/primitives/route-distance.vo';

export class DeliveryTimeService {
  estimate(distance: RouteDistanceVO, avgSpeedKmh = 30): number {
    const hours = distance.toKm() / avgSpeedKmh;
    return Math.ceil(hours * 60);
  }
}
