export interface SeoScoreInput {
  readonly titleLength: number;
  readonly descriptionLength: number;
  readonly keywordCount: number;
  readonly hasH1: boolean;
}

export class SeoContentOptimizationService {
  calculateScore(input: SeoScoreInput): number {
    let score = 0;
    if (input.titleLength >= 30 && input.titleLength <= 60) score += 25;
    if (input.descriptionLength >= 120 && input.descriptionLength <= 160) score += 25;
    if (input.keywordCount >= 1 && input.keywordCount <= 5) score += 25;
    if (input.hasH1) score += 25;
    return score;
  }
}
