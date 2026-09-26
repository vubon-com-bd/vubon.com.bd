const QUALIFIED_THRESHOLD = 60;

export class LeadQualificationService {
  isQualified(score: number): boolean {
    return score >= QUALIFIED_THRESHOLD;
  }
}
