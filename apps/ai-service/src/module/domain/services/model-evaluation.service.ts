import { ModelEntity } from '../entities/model.entity';
import { ModelMetricsVO } from '../value-objects/composites/model-metrics.vo';

export interface EvaluationResult {
  readonly isProductionReady: boolean;
  readonly score: number;
  readonly reasons: readonly string[];
}

export class ModelEvaluationService {
  private static readonly ACCURACY_THRESHOLD = 0.8;
  private static readonly LATENCY_THRESHOLD_MS = 500;

  evaluate(model: ModelEntity): EvaluationResult {
    const reasons: string[] = [];
    const metrics = model.metrics;

    if (!metrics) {
      return {
        isProductionReady: false,
        score: 0,
        reasons: ['No metrics available'],
      };
    }

    const accuracy = metrics.accuracy ?? 0;
    const latency = metrics.latencyMs ?? Infinity;

    if (accuracy < ModelEvaluationService.ACCURACY_THRESHOLD) {
      reasons.push(
        `Accuracy ${accuracy} below threshold ${ModelEvaluationService.ACCURACY_THRESHOLD}`,
      );
    }

    if (latency > ModelEvaluationService.LATENCY_THRESHOLD_MS) {
      reasons.push(
        `Latency ${latency}ms exceeds threshold ${ModelEvaluationService.LATENCY_THRESHOLD_MS}ms`,
      );
    }

    return {
      isProductionReady: reasons.length === 0,
      score: this.calculateScore(metrics),
      reasons,
    };
  }

  private calculateScore(metrics: ModelMetricsVO): number {
    const accuracy = metrics.accuracy ?? 0;
    const precision = metrics.precision ?? 0;
    const recall = metrics.recall ?? 0;
    const f1 = metrics.f1Score ?? 0;

    return (accuracy + precision + recall + f1) / 4;
  }
}
