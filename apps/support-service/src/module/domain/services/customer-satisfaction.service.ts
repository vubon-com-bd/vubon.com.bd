export interface SatisfactionSummary {
  readonly total: number;
  readonly average: number;
  readonly positivePercent: number;
  readonly negativePercent: number;
}

export class CustomerSatisfactionService {
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
