import { ScoreValueVO } from '../value-objects/primitives/score-value.vo';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';

export interface PerformanceMetrics {
  readonly totalOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly avgResponseTimeHours: number;
  readonly onTimeDeliveryRate: number;
  readonly averageRating: number;
}

export class PerformanceCalculatorService {
  calculateScore(metrics: PerformanceMetrics): ScoreValueVO {
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

    const score = Math.max(0, Math.min(100, Math.round(raw * 100)));
    return ScoreValueVO.create(score);
  }

  calculateRating(metrics: PerformanceMetrics): RatingValueVO {
    return RatingValueVO.create(
      Math.max(0, Math.min(5, metrics.averageRating)),
    );
  }
}
