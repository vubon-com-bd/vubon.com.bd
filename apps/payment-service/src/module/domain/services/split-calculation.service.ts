export interface SplitShare {
  readonly recipientId: string;
  readonly percentage: number;
}

export interface SplitResult {
  readonly recipientId: string;
  readonly amount: number;
}

export class SplitCalculationService {
  calculate(total: number, shares: readonly SplitShare[]): readonly SplitResult[] {
    const sum = shares.reduce((acc, s) => acc + s.percentage, 0);
    if (Math.abs(sum - 100) > 0.0001) {
      throw new Error('Split percentages must sum to 100');
    }
    return shares.map((s) => ({
      recipientId: s.recipientId,
      amount: Math.round(((total * s.percentage) / 100) * 100) / 100,
    }));
  }
}
