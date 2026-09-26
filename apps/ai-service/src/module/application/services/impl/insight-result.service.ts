import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { InsightResultServiceInterface } from '../interfaces/insight-result.service.interface';
import type { InsightResultRepository } from '../../../domain/repositories/insight-result.repository.interface';
import { InsightResultEntity } from '../../../domain/entities/insight-result.entity';
import { InsightIdVO } from '../../../domain/value-objects/primitives/insight-id.vo';

@Injectable()
export class InsightResultService
  extends BaseService<InsightResultEntity, InsightIdVO>
  implements InsightResultServiceInterface
{
  readonly name = 'InsightResultService';

  constructor(private readonly resultRepo: InsightResultRepository) {
    super();
  }

  async findByInsightId(insightId: string): Promise<InsightResultEntity | null> {
    return this.resultRepo.findByInsightId(InsightIdVO.create(insightId));
  }
}
