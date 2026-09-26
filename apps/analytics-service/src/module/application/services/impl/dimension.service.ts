import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DimensionEntity } from '../../../domain/entities/dimension.entity';
import { DimensionIdVO } from '../../../domain/value-objects/primitives/dimension-id.vo';
import { DimensionNameVO } from '../../../domain/value-objects/primitives/dimension-name.vo';
import type { DimensionRepository } from '../../../domain/repositories/dimension.repository.interface';
import type { DimensionServiceInterface } from '../interfaces/dimension.service.interface';

@Injectable()
export class DimensionService
  extends BaseService<DimensionEntity, DimensionIdVO>
  implements DimensionServiceInterface
{
  readonly name = 'DimensionService';

  constructor(private readonly repo: DimensionRepository) {
    super();
  }

  async findByName(name: string): Promise<DimensionEntity | null> {
    return this.repo.findByName(DimensionNameVO.create(name));
  }
}
