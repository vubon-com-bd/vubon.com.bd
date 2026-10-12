/**
 * Funnel Builder Service
 * @module analytics-service/domain/services
 *
 * User events থেকে funnel build করে।
 * Business Rule:
 * - Sequential step progression required
 * - Step order must be preserved
 * - Time window enforced
 */
export interface FunnelEvent {
  readonly userId: string;
  readonly stepName: string;
  readonly occurredAt: number;
  readonly sessionId?: string;
}

export interface FunnelStepResult {
  readonly stepName: string;
  readonly stepOrder: number;
  readonly userCount: number;
  readonly dropOff: number;
  readonly dropOffRate: number;
  readonly conversionRate: number;
}

export class FunnelBuilderService {
  /**
   * Build funnel step counts from events
   */
  build(params: {
    stepNames: readonly string[];
    events: readonly FunnelEvent[];
    windowMs: number;
  }): readonly FunnelStepResult[] {
    if (params.stepNames.length < 2) {
      throw new Error('Funnel requires at least 2 steps');
    }

    // Group events by user
    const userEvents = new Map<string, FunnelEvent[]>();
    for (const e of params.events) {
      const arr = userEvents.get(e.userId) ?? [];
      arr.push(e);
      userEvents.set(e.userId, arr);
    }

    // For each user, track how far they progressed
    const userProgress = new Map<string, number>();
    for (const [userId, events] of userEvents.entries()) {
      const sorted = [...events].sort((a, b) => a.occurredAt - b.occurredAt);
      let stepIdx = 0;
      let firstStepTime: number | null = null;

      for (const e of sorted) {
        if (firstStepTime !== null && e.occurredAt - firstStepTime > params.windowMs) {
          break;
        }
        if (e.stepName === params.stepNames[stepIdx]) {
          if (stepIdx === 0) firstStepTime = e.occurredAt;
          stepIdx++;
          if (stepIdx >= params.stepNames.length) break;
        }
      }

      userProgress.set(userId, stepIdx);
    }

    // Count users reaching each step
    const stepCounts = new Array(params.stepNames.length).fill(0);
    for (const progress of userProgress.values()) {
      for (let i = 0; i < progress; i++) {
        stepCounts[i]++;
      }
    }

    // Build results
    const results: FunnelStepResult[] = [];
    for (let i = 0; i < params.stepNames.length; i++) {
      const prev = i === 0 ? stepCounts[0] : stepCounts[i - 1];
      const current = stepCounts[i];
      const dropOff = prev - current;

      results.push({
        stepName: params.stepNames[i],
        stepOrder: i + 1,
        userCount: current,
        dropOff,
        dropOffRate: prev > 0 ? Math.round((dropOff / prev) * 10000) / 10000 : 0,
        conversionRate: prev > 0 ? Math.round((current / prev) * 10000) / 10000 : 0,
      });
    }

    return results;
  }

  /**
   * Identify biggest drop-off step
   */
  biggestDropOffStep(steps: readonly FunnelStepResult[]): FunnelStepResult | null {
    let worst: FunnelStepResult | null = null;
    let maxDrop = 0;
    for (const s of steps) {
      if (s.dropOffRate > maxDrop) {
        maxDrop = s.dropOffRate;
        worst = s;
      }
    }
    return worst;
  }

  /**
   * Overall conversion rate
   */
  overallConversionRate(steps: readonly FunnelStepResult[]): number {
    if (steps.length === 0) return 0;
    const entry = steps[0].userCount;
    const final = steps[steps.length - 1].userCount;
    if (entry === 0) return 0;
    return Math.round((final / entry) * 10000) / 10000;
  }
}
