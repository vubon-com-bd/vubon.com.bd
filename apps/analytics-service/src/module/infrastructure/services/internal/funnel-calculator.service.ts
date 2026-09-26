import { Injectable } from '@nestjs/common';

export interface FunnelEvent {
  readonly userId: string;
  readonly step: string;
  readonly occurredAt: Date;
}

export interface FunnelResult {
  readonly stepCounts: readonly number[];
  readonly conversionRates: readonly number[];
  readonly dropOffRates: readonly number[];
  readonly overallConversionRate: number;
}

@Injectable()
export class FunnelCalculatorService {
  /**
   * Compute funnel conversion — count users who completed each step in order.
   */
  calculate(steps: readonly string[], events: readonly FunnelEvent[]): FunnelResult {
    if (steps.length === 0) {
      return {
        stepCounts: [],
        conversionRates: [],
        dropOffRates: [],
        overallConversionRate: 0,
      };
    }

    const normalizedSteps = steps.map((s) => s.toLowerCase());
    const userEvents = new Map<string, FunnelEvent[]>();
    for (const e of events) {
      const arr = userEvents.get(e.userId) ?? [];
      arr.push(e);
      userEvents.set(e.userId, arr);
    }

    const counts = new Array<number>(steps.length).fill(0);

    for (const evts of userEvents.values()) {
      const sorted = [...evts].sort(
        (a, b) => a.occurredAt.getTime() - b.occurredAt.getTime(),
      );
      let stepIdx = 0;
      for (const e of sorted) {
        if (stepIdx >= normalizedSteps.length) break;
        if (e.step.toLowerCase() === normalizedSteps[stepIdx]) {
          counts[stepIdx] += 1;
          stepIdx++;
        }
      }
    }

    const initial = counts[0] ?? 0;
    const conversionRates = counts.map((c, i) => {
      if (i === 0) return 100;
      const prev = counts[i - 1] ?? 0;
      return prev === 0 ? 0 : (c / prev) * 100;
    });
    const dropOffRates = conversionRates.map((c, i) => (i === 0 ? 0 : 100 - c));
    const final = counts[counts.length - 1] ?? 0;
    const overall = initial === 0 ? 0 : (final / initial) * 100;

    return {
      stepCounts: counts,
      conversionRates,
      dropOffRates,
      overallConversionRate: overall,
    };
  }
}
