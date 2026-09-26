/**
 * SlaCalculationService — Compute SLA targets and status
 * @module support-service/domain/services
 */
import { SlaEntity } from '../entities/sla.entity';
import { SlaTargetVO } from '../value-objects/primitives/sla-target.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { TICKET_PRIORITY } from '@vubon/shared-constants/support';

export interface SlaPolicy {
  readonly responseMinutes: number;
  readonly resolutionMinutes: number;
}

const DEFAULT_POLICIES: Readonly<Record<string, SlaPolicy>> = {
  [TICKET_PRIORITY.LOW]: { responseMinutes: 480, resolutionMinutes: 2880 },
  [TICKET_PRIORITY.NORMAL]: { responseMinutes: 240, resolutionMinutes: 1440 },
  [TICKET_PRIORITY.HIGH]: { responseMinutes: 120, resolutionMinutes: 720 },
  [TICKET_PRIORITY.URGENT]: { responseMinutes: 60, resolutionMinutes: 240 },
  [TICKET_PRIORITY.CRITICAL]: { responseMinutes: 30, resolutionMinutes: 120 },
};

export interface SlaReport {
  readonly target: number;
  readonly elapsed: number;
  readonly remaining: number;
  readonly usedPercent: number;
  readonly atRisk: boolean;
  readonly breached: boolean;
}

export class SlaCalculationService {
  policyFor(priority: TicketPriorityVO): SlaPolicy {
    return (
      DEFAULT_POLICIES[priority.value] ?? {
        responseMinutes: 240,
        resolutionMinutes: 1440,
      }
    );
  }

  targetFor(priority: TicketPriorityVO, kind: 'response' | 'resolution'): SlaTargetVO {
    const policy = this.policyFor(priority);
    return kind === 'response'
      ? SlaTargetVO.create(policy.responseMinutes)
      : SlaTargetVO.create(policy.resolutionMinutes);
  }

  report(sla: SlaEntity): SlaReport {
    const target = sla.target.value;
    const elapsed = sla.elapsedMinutes;
    const remaining = target - elapsed;
    const usedPercent = Math.min(100, (elapsed / target) * 100);
    return {
      target,
      elapsed,
      remaining,
      usedPercent,
      atRisk: usedPercent >= 80 && remaining > 0,
      breached: remaining < 0,
    };
  }

  isBreached(elapsedMinutes: number, target: SlaTargetVO): boolean {
    return elapsedMinutes > target.value;
  }

  remainingMinutes(elapsedMinutes: number, target: SlaTargetVO): number {
    return target.value - elapsedMinutes;
  }
}
