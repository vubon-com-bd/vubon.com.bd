import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetOptimizerService {
  suggest(currentRoi: number): { action: string; reason: string } {
    if (currentRoi < 1) return { action: 'reduce', reason: 'ROI below 1' };
    if (currentRoi > 3) return { action: 'increase', reason: 'Strong ROI' };
    return { action: 'keep', reason: 'Stable' };
  }

  allocate(totalBudget: number, weights: readonly number[]): readonly number[] {
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum === 0) return weights.map(() => 0);
    return weights.map((w) => (w / sum) * totalBudget);
  }
}
