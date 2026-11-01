/**
 * RouteOptimizationService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Nearest-neighbor heuristic for stop ordering
 *   - Haversine distance calculation
 *   - Returns optimized stops array with new order
 */
import type { RouteStopEntity } from '../entities/route.entity.js';

export interface RoutePoint {
  readonly id: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface OptimizationInput {
  readonly origin: RoutePoint;
  readonly stops: readonly RouteStopEntity[];
}

export interface OptimizationResult {
  readonly orderedStops: readonly RouteStopEntity[];
  readonly totalDistanceKm: number;
  readonly algorithm: 'nearest_neighbor';
}

export class RouteOptimizationService {
  private static readonly EARTH_RADIUS_KM = 6371;

  static optimize(input: OptimizationInput): OptimizationResult {
    const remaining = [...input.stops].filter(
      (s) => s.latitude !== undefined && s.longitude !== undefined,
    );

    if (remaining.length === 0) {
      return {
        orderedStops: input.stops,
        totalDistanceKm: 0,
        algorithm: 'nearest_neighbor',
      };
    }

    let currentLat = input.origin.latitude;
    let currentLng = input.origin.longitude;
    const ordered: RouteStopEntity[] = [];
    let totalDistance = 0;

    while (remaining.length > 0) {
      let nearestIdx = 0;
      let nearestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < remaining.length; i++) {
        const stop = remaining[i];
        const d = this.haversine(
          currentLat,
          currentLng,
          stop.latitude ?? 0,
          stop.longitude ?? 0,
        );
        if (d < nearestDist) {
          nearestDist = d;
          nearestIdx = i;
        }
      }
      const chosen = remaining.splice(nearestIdx, 1)[0];
      totalDistance += nearestDist;
      currentLat = chosen.latitude ?? currentLat;
      currentLng = chosen.longitude ?? currentLng;
      ordered.push(chosen);
    }

    // Reorder with sequential order indices
    const reordered = ordered.map((s, idx) => ({ ...s, order: idx + 1 }));

    return {
      orderedStops: reordered,
      totalDistanceKm: Math.round(totalDistance * 100) / 100,
      algorithm: 'nearest_neighbor',
    };
  }

  static haversine(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.EARTH_RADIUS_KM * c;
  }
}
