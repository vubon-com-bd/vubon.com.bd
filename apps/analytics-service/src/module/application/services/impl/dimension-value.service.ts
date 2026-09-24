import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DimensionValueEntity } from '../../../domain/entities/dimension-value.entity';
import { DimensionIdVO } from '../../../domain/value-objects/primitives/dimension-id.vo';
import { DimensionAnalyzerService } from '../../../domain/services/dimension-analyzer.service';
import type { DimensionValueRepository } from '../../../domain/repositories/dimension-value.repository.interface';
import type { DimensionValueServiceInterface } from '../interfaces/dimension-value.service.interface';

@Injectable()
export class DimensionValueService
  extends BaseService<DimensionValueEntity, string>
  implements DimensionValueServiceInterface
{
  readonly name = 'DimensionValueService';

  constructor(
    private readonly repo: DimensionValueRepository,
    private readonly analyzer: DimensionAnalyzerService,
  ) {
    super();
  }

  async findByDimensionId(dimensionId: string): Promise<readonly DimensionValueEntity[]> {
    return this.repo.findByDimensionId(DimensionIdVO.create(dimensionId));
  }

  async breakdown(
    dimensionId: string,
    limit: number,
  ): Promise<readonly {
    readonly value: string;
    readonly count: number;
    readonly percentage: number;
  }[]> {
    const values = await this.repo.findByDimensionId(
      DimensionIdVO.create(dimensionId),
    );
    return this.analyzer.breakdown(values, limit);
  }
}
