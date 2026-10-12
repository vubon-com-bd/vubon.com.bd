/**
 * Cohort Calculator Service (internal)
 */
import { Injectable, Logger } from '@nestjs/common';
import { CohortAnalyzerService as DomainAnalyzer } from '../../../domain/services/cohort-analyzer.service.js';

@Injectable()
export class CohortCalculatorInternalService {
  private readonly logger = new Logger(CohortCalculatorInternalService.name);
  private readonly analyzer = new DomainAnalyzer();

  async computeRetention(params: {
    cohortLabel: string;
    cohortUserIds: readonly string[];
    cohortStartMs: number;
    periodMs: number;
    maxPeriods: number;
    activities: readonly { userId: string; activeAt: number }[];
  }): Promise<{ readonly retentionRates: readonly number[]; readonly cohortSize: number }> {
    const result = this.analyzer.analyzeCohort(params);
    return {
      retentionRates: result.retentionRates,
      cohortSize: result.cohortSize,
    };
  }
}
