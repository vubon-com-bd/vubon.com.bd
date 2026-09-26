/**
 * SatisfactionCalculatorService — CSAT score aggregation
 * @module support-service/domain/services
 */
import { TicketSatisfactionEntity } from '../entities/ticket-satisfaction.entity';
import { SatisfactionScoreVO } from '../value-objects/primitives/satisfaction-score.vo';

export interface SatisfactionStats {
  readonly count: number;
  readonly average: number;
  readonly positiveRate: number;
  readonly negativeRate: number;
  readonly csatPercent: number;
}

const MAX_SCORE = 5;
const POSITIVE_THRESHOLD = 4;

export class SatisfactionCalculatorService {
  stats(records: readonly TicketSatisfactionEntity[]): SatisfactionStats {
    const count = records.length;
    if (count === 0) {
      return { count: 0, average: 0, positiveRate: 0, negativeRate: 0, csatPercent: 0 };
    }
    const total = records.reduce((sum, r) => sum + r.score.value, 0);
    const positive = records.filter((r) => r.isPositive).length;
    const negative = records.filter((r) => r.isNegative).length;
    const average = total / count;
    return {
      count,
      average: Math.round(average * 100) / 100,
      positiveRate: (positive / count) * 100,
      negativeRate: (negative / count) * 100,
      csatPercent: (positive / count) * 100,
    };
  }

  csatPercent(scores: readonly SatisfactionScoreVO[]): number {
    if (scores.length === 0) return 0;
    const positive = scores.filter((s) => s.value >= POSITIVE_THRESHOLD).length;
    return (positive / scores.length) * 100;
  }

  average(scores: readonly SatisfactionScoreVO[]): number {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, s) => sum + s.value, 0);
    return Math.round((total / scores.length) * 100) / 100;
  }

  normalizeToPercent(score: SatisfactionScoreVO): number {
    return (score.value / MAX_SCORE) * 100;
  }
}
