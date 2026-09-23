import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LeadScoreServiceInterface } from '../interfaces/lead-score.service.interface';
import type { LeadScoreRepository } from '../../../domain/repositories/lead-score.repository.interface';
import { LeadScoreEntity } from '../../../domain/entities/lead-score.entity';
import { LeadScoringService as DomainService } from '../../../domain/services/lead-scoring.service';

@Injectable()
export class LeadScoreService
  extends BaseService<LeadScoreEntity, string>
  implements LeadScoreServiceInterface
{
  readonly name = 'LeadScoreService';

  constructor(
    private readonly repo: LeadScoreRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async calculate(input: {
    emailProvided: boolean;
    phoneProvided: boolean;
    companyProvided: boolean;
    source: string;
  }): Promise<number> {
    void this.repo;
    return this.domain.calculate(input);
  }
}
