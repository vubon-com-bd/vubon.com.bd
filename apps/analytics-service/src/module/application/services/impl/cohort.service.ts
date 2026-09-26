import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { CohortEntity } from '../../../domain/entities/cohort.entity';
import { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo';
import { CohortNameVO } from '../../../domain/value-objects/primitives/cohort-name.vo';
import { CohortPeriodVO } from '../../../domain/value-objects/primitives/cohort-period.vo';
import { CohortAnalyzerService } from '../../../domain/services/cohort-analyzer.service';
import type { CohortRepository } from '../../../domain/repositories/cohort.repository.interface';
import type { CohortServiceInterface } from '../interfaces/cohort.service.interface';
import type { CreateCohortDTO, AnalyzeCohortDTO } from '../../dtos/requests/cohort';
import {
  type CohortResponseDTO,
  type CohortAnalysisResponseDTO,
  toCohortResponse,
  toCohortAnalysisResponse,
} from '../../dtos/responses';

@Injectable()
export class CohortService
  extends BaseService<CohortEntity, CohortIdVO>
  implements CohortServiceInterface
{
  readonly name = 'CohortService';

  constructor(
    private readonly cohortRepo: CohortRepository,
    private readonly analyzer: CohortAnalyzerService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateCohortDTO): Promise<CohortResponseDTO> {
    const entity = CohortEntity.create({
      name: CohortNameVO.create(input.name),
      period: CohortPeriodVO.create(input.period),
      startDate: new Date(input.fromDate),
      endDate: new Date(input.toDate),
      userIds: input.userIds,
    });
    await this.cohortRepo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toCohortResponse(entity);
  }

  async analyze(input: AnalyzeCohortDTO): Promise<CohortAnalysisResponseDTO> {
    const cohort = await this.cohortRepo.findById(CohortIdVO.create(input.cohortId));
    if (!cohort) throw new Error(`Cohort not found: ${input.cohortId}`);

    const analysis = this.analyzer.analyze(cohort, [], input.periods);
    const marked = cohort.markAnalyzed();
    await this.cohortRepo.save(marked);
    const events = marked.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);

    return toCohortAnalysisResponse(analysis);
  }
}
