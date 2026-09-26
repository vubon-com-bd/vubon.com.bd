import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LeadScoreEntity } from '../../../domain/entities/lead-score.entity';

export interface LeadScoreServiceInterface
  extends BaseServiceInterface<LeadScoreEntity, string> {
  calculate(input: {
    emailProvided: boolean;
    phoneProvided: boolean;
    companyProvided: boolean;
    source: string;
  }): Promise<number>;
}
