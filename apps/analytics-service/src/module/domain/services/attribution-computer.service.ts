/**
 * Attribution Computer Service
 * @module analytics-service/domain/services
 *
 * Multi-touch attribution models: first, last, linear, time-decay.
 */
import { TrafficSourceVO } from '../value-objects/composites/traffic-source.vo.js';
import { AttributionVO } from '../value-objects/composites/attribution.vo.js';
import { ANALYTICS_ATTRIBUTION_MODEL } from '@vubon/shared-constants/platform/analytics';

export interface TouchpointInput {
  readonly source: TrafficSourceVO;
  readonly timestamp: number;
}

export class AttributionComputerService {
  /**
   * Compute attribution based on model
   */
  compute(params: {
    conversionId: string;
    conversionValue: number;
    touchpoints: readonly TouchpointInput[];
    model: string;
  }): AttributionVO {
    if (params.touchpoints.length === 0) {
      throw new Error('At least one touchpoint required');
    }

    const sorted = [...params.touchpoints].sort((a, b) => a.timestamp - b.timestamp);

    switch (params.model) {
      case ANALYTICS_ATTRIBUTION_MODEL.FIRST_TOUCH:
        return this.firstTouch(params.conversionId, params.conversionValue, sorted);
      case ANALYTICS_ATTRIBUTION_MODEL.LAST_TOUCH:
        return this.lastTouch(params.conversionId, params.conversionValue, sorted);
      case ANALYTICS_ATTRIBUTION_MODEL.LINEAR:
        return this.linear(params.conversionId, params.conversionValue, sorted);
      case ANALYTICS_ATTRIBUTION_MODEL.TIME_DECAY:
        return this.timeDecay(params.conversionId, params.conversionValue, sorted);
      case ANALYTICS_ATTRIBUTION_MODEL.POSITION_BASED:
        return this.positionBased(params.conversionId, params.conversionValue, sorted);
      default:
        return this.lastTouch(params.conversionId, params.conversionValue, sorted);
    }
  }

  /**
   * First-touch: 100% to first
   */
  firstTouch(
    conversionId: string,
    value: number,
    sorted: readonly TouchpointInput[]
  ): AttributionVO {
    const weighted = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: i === 0 ? 1 : 0,
    }));
    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.FIRST_TOUCH,
      conversionId,
      conversionValue: value,
      touchpoints: weighted,
    });
  }

  /**
   * Last-touch: 100% to last
   */
  lastTouch(
    conversionId: string,
    value: number,
    sorted: readonly TouchpointInput[]
  ): AttributionVO {
    const lastIdx = sorted.length - 1;
    const weighted = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: i === lastIdx ? 1 : 0,
    }));
    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.LAST_TOUCH,
      conversionId,
      conversionValue: value,
      touchpoints: weighted,
    });
  }

  /**
   * Linear: equal weight
   */
  linear(
    conversionId: string,
    value: number,
    sorted: readonly TouchpointInput[]
  ): AttributionVO {
    const n = sorted.length;
    const baseWeight = Math.floor((1 / n) * 10000) / 10000;
    const remainder = Math.round((1 - baseWeight * n) * 10000) / 10000;

    const weighted = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: i === 0 ? baseWeight + remainder : baseWeight,
    }));

    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.LINEAR,
      conversionId,
      conversionValue: value,
      touchpoints: weighted,
    });
  }

  /**
   * Time-decay: recent touchpoints get more credit (7-day half-life)
   */
  timeDecay(
    conversionId: string,
    value: number,
    sorted: readonly TouchpointInput[]
  ): AttributionVO {
    const conversionTime = sorted[sorted.length - 1].timestamp;
    const HALF_LIFE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

    const rawWeights = sorted.map((tp) => {
      const ageMs = conversionTime - tp.timestamp;
      return Math.pow(0.5, ageMs / HALF_LIFE_MS);
    });

    const total = rawWeights.reduce((s, w) => s + w, 0);
    const weights = rawWeights.map((w) => Math.floor((w / total) * 10000) / 10000);

    // Fix rounding
    const sum = weights.reduce((s, w) => s + w, 0);
    const diff = Math.round((1 - sum) * 10000) / 10000;
    weights[weights.length - 1] = weights[weights.length - 1] + diff;

    const weighted = sorted.map((tp, i) => ({
      source: tp.source,
      timestamp: tp.timestamp,
      weight: weights[i],
    }));

    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.TIME_DECAY,
      conversionId,
      conversionValue: value,
      touchpoints: weighted,
    });
  }

  /**
   * Position-based: 40% first, 40% last, 20% middle
   */
  positionBased(
    conversionId: string,
    value: number,
    sorted: readonly TouchpointInput[]
  ): AttributionVO {
    const n = sorted.length;
    if (n === 1) {
      return this.firstTouch(conversionId, value, sorted);
    }
    if (n === 2) {
      const weighted = sorted.map((tp, i) => ({
        source: tp.source,
        timestamp: tp.timestamp,
        weight: 0.5,
      }));
      return AttributionVO.create({
        model: ANALYTICS_ATTRIBUTION_MODEL.POSITION_BASED,
        conversionId,
        conversionValue: value,
        touchpoints: weighted,
      });
    }

    const firstWeight = 0.4;
    const lastWeight = 0.4;
    const middleTotal = 0.2;
    const middleWeight = Math.floor((middleTotal / (n - 2)) * 10000) / 10000;

    const weighted = sorted.map((tp, i) => {
      let w = middleWeight;
      if (i === 0) w = firstWeight;
      else if (i === n - 1) w = lastWeight;

      return {
        source: tp.source,
        timestamp: tp.timestamp,
        weight: w,
      };
    });

    // Fix rounding
    const sum = weighted.reduce((s, w) => s + w.weight, 0);
    const diff = Math.round((1 - sum) * 10000) / 10000;
    weighted[weighted.length - 1].weight += diff;

    return AttributionVO.create({
      model: ANALYTICS_ATTRIBUTION_MODEL.POSITION_BASED,
      conversionId,
      conversionValue: value,
      touchpoints: weighted,
    });
  }
}
