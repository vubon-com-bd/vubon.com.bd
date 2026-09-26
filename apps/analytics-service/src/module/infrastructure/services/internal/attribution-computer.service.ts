import { Injectable } from '@nestjs/common';
import { ATTRIBUTION_CONFIG } from '../../config/attribution.config';

export interface TouchpointRecord {
  readonly touchpoint: string;
  readonly occurredAt: Date;
}

export interface AttributionCredit {
  readonly touchpoint: string;
  readonly credit: number;
  readonly weight: number;
}

@Injectable()
export class AttributionComputerService {
  /**
   * Compute per-touchpoint attribution credits for a conversion.
   */
  compute(
    model: string,
    touchpoints: readonly TouchpointRecord[],
    conversionValue: number,
  ): readonly AttributionCredit[] {
    if (touchpoints.length === 0) return [];

    const weights = this.weights(model, touchpoints);
    return touchpoints.map((tp, i) => ({
      touchpoint: tp.touchpoint,
      weight: weights[i] ?? 0,
      credit: (weights[i] ?? 0) * conversionValue,
    }));
  }

  private weights(
    model: string,
    touchpoints: readonly TouchpointRecord[],
  ): readonly number[] {
    const n = touchpoints.length;
    if (n === 0) return [];
    if (n === 1) return [1];

    switch (model) {
      case 'first_touch': {
        const w = new Array<number>(n).fill(0);
        w[0] = 1;
        return w;
      }
      case 'last_touch': {
        const w = new Array<number>(n).fill(0);
        w[n - 1] = 1;
        return w;
      }
      case 'linear':
        return new Array<number>(n).fill(1 / n);
      case 'time_decay': {
        const halfLifeDays = ATTRIBUTION_CONFIG.timeDecayHalfLifeDays;
        const last = touchpoints[n - 1]!.occurredAt.getTime();
        const raw = touchpoints.map((tp) => {
          const daysBefore = (last - tp.occurredAt.getTime()) / (24 * 60 * 60 * 1000);
          return Math.pow(0.5, daysBefore / halfLifeDays);
        });
        const sum = raw.reduce((a, b) => a + b, 0);
        return raw.map((v) => v / sum);
      }
      case 'position_based': {
        const w = new Array<number>(n).fill(
          (1 - ATTRIBUTION_CONFIG.positionBasedFirstWeight * 2) /
            Math.max(1, n - 2),
        );
        w[0] = ATTRIBUTION_CONFIG.positionBasedFirstWeight;
        w[n - 1] = ATTRIBUTION_CONFIG.positionBasedLastWeight;
        return w;
      }
      case 'data_driven':
      default:
        return new Array<number>(n).fill(1 / n);
    }
  }

  /**
   * Return the top-converting touchpoint for a set of credits.
   */
  topTouchpoint(credits: readonly AttributionCredit[]): AttributionCredit | null {
    if (credits.length === 0) return null;
    return credits.reduce((top, c) => (c.credit > top.credit ? c : top), credits[0]!);
  }
}
