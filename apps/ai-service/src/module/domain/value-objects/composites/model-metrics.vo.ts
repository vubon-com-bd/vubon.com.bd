import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface ModelMetricsProps {
  readonly accuracy: number | null;
  readonly precision: number | null;
  readonly recall: number | null;
  readonly f1Score: number | null;
  readonly latencyMs: number | null;
}

export class ModelMetricsVO extends BaseVO<ModelMetricsProps> {
  static create(props: ModelMetricsProps): ModelMetricsVO {
    const bounded: readonly number[] = [
      props.accuracy,
      props.precision,
      props.recall,
      props.f1Score,
    ].filter((v): v is number => v !== null);

    for (const v of bounded) {
      if (v < 0 || v > 1) {
        throw new Error(`ModelMetrics: metric must be in [0,1], got ${v}`);
      }
    }
    if (props.latencyMs !== null && props.latencyMs < 0) {
      throw new Error('ModelMetrics: latencyMs cannot be negative');
    }
    return new ModelMetricsVO(props);
  }

  private constructor(props: ModelMetricsProps) {
    super(Object.freeze({ ...props }));
  }

  get accuracy(): number | null { return this.value.accuracy; }
  get precision(): number | null { return this.value.precision; }
  get recall(): number | null { return this.value.recall; }
  get f1Score(): number | null { return this.value.f1Score; }
  get latencyMs(): number | null { return this.value.latencyMs; }

  isProductionReady(): boolean {
    return (this.value.accuracy ?? 0) >= 0.8 && (this.value.latencyMs ?? Infinity) <= 500;
  }
}
