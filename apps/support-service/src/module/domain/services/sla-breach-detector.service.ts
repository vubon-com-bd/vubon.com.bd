/**
 * SlaBreachDetectorService — Detect SLA breach and at-risk state
 * @module support-service/domain/services
 */
import { SlaEntity } from '../entities/sla.entity';
import { SlaTargetVO } from '../value-objects/primitives/sla-target.vo';

export interface SlaState {
  readonly breached: boolean;
  readonly atRisk: boolean;
  readonly remainingMinutes: number;
  readonly usedPercent: number;
}

const AT_RISK_THRESHOLD = 80;

export class SlaBreachDetectorService {
  inspect(sla: SlaEntity): SlaState {
    const target = sla.target.value;
    const elapsed = sla.elapsedMinutes;
    const remaining = target - elapsed;
    const usedPercent = Math.min(100, (elapsed / target) * 100);
    return {
      breached: remaining < 0,
      atRisk: usedPercent >= AT_RISK_THRESHOLD && remaining > 0,
      remainingMinutes: remaining,
      usedPercent,
    };
  }

  isBreached(elapsedMinutes: number, target: SlaTargetVO): boolean {
    return elapsedMinutes > target.value;
  }

  isAtRisk(elapsedMinutes: number, target: SlaTargetVO): boolean {
    if (this.isBreached(elapsedMinutes, target)) return false;
    const used = (elapsedMinutes / target.value) * 100;
    return used >= AT_RISK_THRESHOLD;
  }

  minutesUntilBreach(elapsedMinutes: number, target: SlaTargetVO): number {
    const remaining = target.value - elapsedMinutes;
    return remaining > 0 ? remaining : 0;
  }

  breachedBy(elapsedMinutes: number, target: SlaTargetVO): number {
    const overshoot = elapsedMinutes - target.value;
    return overshoot > 0 ? overshoot : 0;
  }
}
