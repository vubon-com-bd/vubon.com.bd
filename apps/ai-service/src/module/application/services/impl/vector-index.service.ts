import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { VectorIndexServiceInterface } from '../interfaces/vector-index.service.interface';
import type { VectorIndexRepository } from '../../../domain/repositories/vector-index.repository.interface';
import { VectorIndexEntity } from '../../../domain/entities/vector-index.entity';
import { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../../../domain/value-objects/primitives/vector-name.vo';
import { VectorIndexNotReadyError } from '../../errors/vector.errors';

@Injectable()
export class VectorIndexService
  extends BaseService<VectorIndexEntity, VectorIdVO>
  implements VectorIndexServiceInterface
{
  readonly name = 'VectorIndexService';

  constructor(private readonly indexRepo: VectorIndexRepository) {
    super();
  }

  async findByName(name: string): Promise<VectorIndexEntity | null> {
    return this.indexRepo.findByName(VectorNameVO.create(name));
  }

  async markReady(indexId: string): Promise<void> {
    const entity = await this.indexRepo.findById(VectorIdVO.create(indexId));
    if (!entity) throw new VectorIndexNotReadyError(indexId);
    await this.indexRepo.save(entity.markReady());
  }

  async updateEntryCount(indexId: string, count: number): Promise<void> {
    const entity = await this.indexRepo.findById(VectorIdVO.create(indexId));
    if (!entity) throw new VectorIndexNotReadyError(indexId);
    await this.indexRepo.save(entity.withEntryCount(count));
  }
}
