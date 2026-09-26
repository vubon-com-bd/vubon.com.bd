import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ForecastIdVO } from '../primitives/forecast-id.vo';

export interface ForecastDataPointProps {
  readonly timestamp: Date;
  readonly value: number;
  readonly confidenceLower: number;
  readonly confidenceUpper: number;
}

export interface ForecastResultProps {
  readonly id: ForecastIdVO;
  readonly points: readonly ForecastDataPointProps[];
  readonly model: string;
}

export class ForecastResultVO extends BaseVO<ForecastResultProps> {
  static create(props: ForecastResultProps): ForecastResultVO {
    for (const point of props.points) {
      if (point.confidenceLower > point.confidenceUpper) {
        throw new Error('ForecastResult: confidenceLower > confidenceUpper');
      }
      if (point.value < point.confidenceLower || point.value > point.confidenceUpper) {
        throw new Error('ForecastResult: value outside confidence interval');
      }
    }
    return new ForecastResultVO(props);
  }

  private constructor(props: ForecastResultProps) {
    super(
      Object.freeze({
        ...props,
        points: Object.freeze(props.points.map((p) => Object.freeze({ ...p }))),
      }),
    );
  }

  get id(): ForecastIdVO { return this.value.id; }
  get points(): readonly ForecastDataPointProps[] { return this.value.points; }
  get model(): string { return this.value.model; }

  size(): number {
    return this.value.points.length;
  }

  latest(): ForecastDataPointProps | null {
    return this.value.points[this.value.points.length - 1] ?? null;
  }
}
