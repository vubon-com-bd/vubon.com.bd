/**
 * CustomerSatisfactionService — CSAT/NPS scoring helpers
 * @module support-service/domain/services
 */
import { SatisfactionScoreVO } from '../value-objects/primitives/satisfaction-score.vo';
import { TicketSatisfactionEntity } from '../entities/ticket-satisfaction.entity';

export interface NpsStats {
  readonly promoters: number;
  readonly passives: number;
  readonly detractors: number;
  readonly nps: number; // -100 .. 100
}

export interface CsatStats {
  readonly totalResponses: number;
  readonly satisfied: number;
  readonly unsatisfied: number;
  readonly csatPercent: number;
}

export class CustomerSatisfactionService {
  csat(records: readonly TicketSatisfactionEntity[]): CsatStats {
    const total = records.length;
    if (total === 0) {
      return { totalResponses: 0, satisfied: 0, unsatisfied: 0, csatPercent: 0 };
    }
    const satisfied = records.filter((r) => r.isPositive).length;
    const unsatisfied = records.filter((r) => r.isNegative).length;
    return {
      totalResponses: total,
      satisfied,
      unsatisfied,
      csatPercent: Math.round((satisfied / total) * 100),
    };
  }

  nps(scores: readonly SatisfactionScoreVO[]): NpsStats {
    const total = scores.length;
    if (total === 0) {
      return { promoters: 0, passives: 0, detractors: 0, nps: 0 };
    }
    const promoters = scores.filter((s) => s.value >= 4).length;
    const passives = scores.filter((s) => s.value === 3).length;
    const detractors = scores.filter((s) => s.value <= 2).length;
    const nps = Math.round(((promoters - detractors) / total) * 100);
    return { promoters, passives, detractors, nps };
  }

  isHealthy(csatPercent: number, nps: number): boolean {
    return csatPercent >= 80 && nps >= 0;
  }

  requiresAttention(csatPercent: number): boolean {
    return csatPercent < 60;
  }
}
