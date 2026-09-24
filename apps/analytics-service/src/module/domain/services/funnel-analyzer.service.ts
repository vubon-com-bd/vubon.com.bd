import { FunnelEntity } from '../entities/funnel.entity';
import { FunnelAnalysisVO } from '../value-objects/composites/funnel-analysis.vo';

export interface StepEvent {
  readonly userId: string;
  readonly step: string;
  readonly occurredAt: Date;
}

export class FunnelAnalyzerService {
  /**
   * Analyze funnel — count users who progressed through each step.
   */
  analyze(
    funnel: FunnelEntity,
    events: readonly StepEvent[],
  ): FunnelAnalysisVO {
    const userSteps = new Map<string, Set<string>>();
    for (const e of events) {
      const set = userSteps.get(e.userId) ?? new Set();
      set.add(e.step.toLowerCase());
      userSteps.set(e.userId, set);
    }

    const counts: number[] = [];
    for (let i = 0; i < funnel.steps.length; i++) {
      const required = funnel.steps
        .slice(0, i + 1)
        .map((s) => s.normalized);
      let usersInStep = 0;
      for (const steps of userSteps.values()) {
        if (required.every((r) => steps.has(r))) usersInStep++;
      }
      counts.push(usersInStep);
    }

    return FunnelAnalysisVO.create({
      funnelId: funnel.id,
      steps: funnel.steps,
      counts,
    });
  }
}
