/**
 * RouteOptimizationService — reorder stops by nearest-neighbor heuristic
 * @module logistics-service/domain/services
 *
 * Uses shared-utils calculateDistance (Haversine).
 * Real production would use a TSP solver; this is a fast greedy pass.
 */
import { calculateDistance } from '@vubon/shared-utils/calculator';
import type { RouteStopVO } from '../value-objects/composites/route-stop.vo.js';
import { RouteOptimizationVO } from '../value-objects/primitives/route-optimization.vo.js';

export interface OptimizationInput {
  readonly stops: readonly RouteStopVO[];
  readonly startLat?: number;
  readonly startLng?: number;
  readonly mode: RouteOptimizationVO;
}

export interface OptimizationResult {
  readonly orderedStopIds: readonly string[];
  readonly totalDistanceKm: number;
  readonly estimatedDurationMinutes: number;
}

export class RouteOptimizationService {
  static optimize(input: OptimizationInput): OptimizationResult {
    const stopsWithGeo = input.stops.filter((s) => s.hasGeo());
    const stopsWithoutGeo = input.stops.filter((s) => !s.hasGeo());

    if (stopsWithGeo.length === 0) {
      return {
        orderedStopIds: input.stops.map((s) => s.id),
        totalDistanceKm: 0,
        estimatedDurationMinutes: 0,
      };
    }

    const remaining = [...stopsWithGeo];
    const ordered: RouteStopVO[] = [];
    let currentLat = input.startLat ?? remaining[0]!.latitude!;
    let currentLng = input.startLng ?? remaining[0]!.longitude!;
    let totalDistance = 0;

    while (remaining.length > 0) {
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < remaining.length; i++) {
        const s = remaining[i]!;
        const d = calculateDistance(
          { lat: currentLat, lng: currentLng },
          { lat: s.latitude!, lng: s.longitude! },
        );
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      const picked = remaining.splice(bestIdx, 1)[0]!;
      ordered.push(picked);
      totalDistance += bestDist;
      currentLat = picked.latitude!;
      currentLng = picked.longitude!;
    }

    // Append geo-less stops at end
    const finalOrdered = [...ordered, ...stopsWithoutGeo];
    // Rough duration: 30km/h average + 5 min per stop
    const estimatedDurationMinutes = Math.round((totalDistance / 30) * 60 + finalOrdered.length * 5);

    return {
      orderedStopIds: finalOrdered.map((s) => s.id),
      totalDistanceKm: Math.round(totalDistance * 100) / 100,
      estimatedDurationMinutes,
    };
  }
}
