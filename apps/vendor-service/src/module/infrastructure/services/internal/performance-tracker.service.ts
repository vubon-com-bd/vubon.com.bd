import { Injectable } from '@nestjs/common';

export interface PerformanceMetricsInput {
  readonly totalOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly avgResponseTimeHours: number;
  readonly onTimeDeliveryRate: number;
  readonly averageRating: number;
}

@Injectable()
export class PerformanceTrackerService {
  calculateScore(metrics: PerformanceMetricsInput): number {
    const completionRate =
      metrics.totalOrders === 0 ? 0 : metrics.completedOrders / metrics.totalOrders;
    const cancelPenalty =
      metrics.totalOrders === 0 ? 0 : metrics.cancelledOrders / metrics.totalOrders;
    const responseScore = Math.max(0, 1 - metrics.avgResponseTimeHours / 48);
    const deliveryScore = Math.max(0, Math.min(1, metrics.onTimeDeliveryRate));
    const ratingScore = Math.max(0, Math.min(1, metrics.averageRating / 5));

    const raw =
      completionRate * 0.3 +
      responseScore * 0.2 +
      deliveryScore * 0.3 +
      ratingScore * 0.2 -
      cancelPenalty * 0.5;

    return Math.max(0, Math.min(100, Math.round(raw * 100)));
  }
}
