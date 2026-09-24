export interface SatisfactionSummary {
  readonly total: number;
  readonly average: number;
  readonly positivePercent: number;
  readonly negativePercent: number;
}

export class SatisfactionCalculatorService {
  average(scores: readonly number[]): number {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, s) => sum + s, 0);
    return total / scores.length;
  }

  isPositive(score: number): boolean {
    return score >= 4;
  }

  isNegative(score: number): boolean {
    return score <= 2;
  }

  summarize(scores: readonly number[]): SatisfactionSummary {
    if (scores.length === 0) {
      return { total: 0, average: 0, positivePercent: 0, negativePercent: 0 };
    }
    const total = scores.length;
    const sum = scores.reduce((s, x) => s + x, 0);
    const positive = scores.filter((s) => s >= 4).length;
    const negative = scores.filter((s) => s <= 2).length;
    return {
      total,
      average: sum / total,
      positivePercent: (positive / total) * 100,
      negativePercent: (negative / total) * 100,
    };
  }
}
