/**
 * Attribution Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Multi-touch attribution result for a conversion।
 * Business Rule:
 * - Touchpoints ordered by time
 * - Weights sum ≤ 1
 * - Model determines weight distribution
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_ATTRIBUTION_MODEL } from '@vubon/shared-constants/platform/analytics';
import { TrafficSourceVO } from './traffic-source.vo.js';

type AttributionModel = (typeof ANALYTICS_ATTRIBUTION_MODEL)[keyof typeof ANALYTICS_ATTRIBUTION_MODEL];

export interface AttributionTouchpoint {
  readonly source: TrafficSourceVO;
  readonly weight: number;
  readonly timestamp: number;
}

export interface AttributionVOProps {
  readonly model: AttributionModel;
  readonly conversionId: string;
  readonly conversionValue: number;
  readonly touchpoints: readonly AttributionTouchpoint[];
}

export class AttributionVO extends BaseVO<AttributionVOProps> {
  private constructor(props: AttributionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: AttributionVOProps): AttributionVO {
    if (!props.model || !props.conversionId) {
      throw new Error('AttributionVO requires model, conversionId');
    }
    if (props.touchpoints.length === 0) {
      throw new Error('AttributionVO requires at least one touchpoint');
    }
    if (!Number.isFinite(props.conversionValue) || props.conversionValue < 0) {
      throw new Error('AttributionVO conversionValue must be non-negative');
    }

    let weightSum = 0;
    for (const tp of props.touchpoints) {
      if (tp.weight < 0 || tp.weight > 1) {
        throw new Error('AttributionVO touchpoint weight must be 0-1');
      }
      weightSum += tp.weight;
    }

    if (Math.abs(weightSum - 1) > 0.001) {
      throw new Error(`AttributionVO weights must sum to 1 (got ${weightSum})`);
    }

    return new AttributionVO(props);
  }

  /** First-touch attribution */
  static firstTouch(
    conversionId: string,
    conversionValue: number,
    touchpoints: readonly { source: TrafficSourceVO; timestamp: number }[]
  ): AttributionVO {
    if (touchpoints.length === 0) {
      throw new Error('AttributionVO requires touchpoints');
    }
    const sorted = [...touchpoints].sort((a, b) => a.timestamp - b.timestamp);
    const weighted: AttributionTouchpoint[] = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: i === 0 ? 1 : 0,
    }));
    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.FIRST_TOUCH,
      conversionId,
      conversionValue,
      touchpoints: weighted,
    });
  }

  /** Last-touch attribution */
  static lastTouch(
    conversionId: string,
    conversionValue: number,
    touchpoints: readonly { source: TrafficSourceVO; timestamp: number }[]
  ): AttributionVO {
    if (touchpoints.length === 0) {
      throw new Error('AttributionVO requires touchpoints');
    }
    const sorted = [...touchpoints].sort((a, b) => a.timestamp - b.timestamp);
    const weighted: AttributionTouchpoint[] = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: i === sorted.length - 1 ? 1 : 0,
    }));
    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.LAST_TOUCH,
      conversionId,
      conversionValue,
      touchpoints: weighted,
    });
  }

  /** Linear attribution (equal weight) */
  static linear(
    conversionId: string,
    conversionValue: number,
    touchpoints: readonly { source: TrafficSourceVO; timestamp: number }[]
  ): AttributionVO {
    if (touchpoints.length === 0) {
      throw new Error('AttributionVO requires touchpoints');
    }
    const w = Math.round((1 / touchpoints.length) * 10000) / 10000;
    const weighted: AttributionTouchpoint[] = touchpoints.map((tp) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: w,
    }));
    // Fix rounding — add remainder to first
    const sum = weighted.reduce((s, t) => s + t.weight, 0);
    const diff = Math.round((1 - sum) * 10000) / 10000;
    if (diff !== 0) {
      weighted[0] = { ...weighted[0], weight: weighted[0].weight + diff };
    }
    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.LINEAR,
      conversionId,
      conversionValue,
      touchpoints: weighted,
    });
  }

  get model(): AttributionModel {
    return this.value.model;
  }

  get conversionId(): string {
    return this.value.conversionId;
  }

  get conversionValue(): number {
    return this.value.conversionValue;
  }

  get touchpoints(): readonly AttributionTouchpoint[] {
    return this.value.touchpoints;
  }

  touchpointCount(): number {
    return this.touchpoints.length;
  }

  /** Revenue credited to a touchpoint */
  creditedRevenue(touchpointIndex: number): number {
    const tp = this.touchpoints[touchpointIndex];
    if (!tp) return 0;
    return Math.round(tp.weight * this.value.conversionValue * 100) / 100;
  }

  /** Credit per channel */
  creditByChannel(): Record<string, number> {
    const result: Record<string, number> = {};
    for (let i = 0; i < this.touchpoints.length; i++) {
      const channel = this.touchpoints[i].source.channel();
      result[channel] = (result[channel] ?? 0) + this.creditedRevenue(i);
    }
    return result;
  }

  isFirstTouch(): boolean {
    return this.model === ANALYTICS_ATTRIBUTION_MODEL.FIRST_TOUCH;
  }

  isLastTouch(): boolean {
    return this.model === ANALYTICS_ATTRIBUTION_MODEL.LAST_TOUCH;
  }

  isLinear(): boolean {
    return this.model === ANALYTICS_ATTRIBUTION_MODEL.LINEAR;
  }
}
