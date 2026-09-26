import { Injectable } from '@nestjs/common';

export interface LeadScoreInput {
  readonly emailProvided: boolean;
  readonly phoneProvided: boolean;
  readonly companyProvided: boolean;
  readonly source: string;
}

@Injectable()
export class LeadScoringService {
  calculate(input: LeadScoreInput): number {
    let score = 0;
    if (input.emailProvided) score += 20;
    if (input.phoneProvided) score += 30;
    if (input.companyProvided) score += 25;
    if (input.source === 'referral') score += 25;
    else if (input.source === 'organic') score += 15;
    else score += 5;
    return Math.min(score, 100);
  }
}
