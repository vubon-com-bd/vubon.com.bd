export interface OptimizationSuggestion {
  readonly action: string;
  readonly reason: string;
}

export class CampaignOptimizationService {
  suggest(currentRoi: number): OptimizationSuggestion {
    if (currentRoi < 1) {
      return { action: 'reduce_budget', reason: 'ROI below break-even' };
    }
    if (currentRoi > 3) {
      return { action: 'increase_budget', reason: 'Strong ROI' };
    }
    return { action: 'keep', reason: 'Stable performance' };
  }
}
