import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { VectorServiceInterface } from '../interfaces/vector.service.interface';
import type { VectorRepository } from '../../../domain/repositories/vector.repository.interface';
import type { VectorIndexRepository } from '../../../domain/repositories/vector-index.repository.interface';
import { VectorEntity } from '../../../domain/entities/vector.entity';
import { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../../../domain/value-objects/primitives/vector-name.vo';
import { VectorDimensionVO } from '../../../domain/value-objects/primitives/vector-dimension.vo';
import { VectorIndexService as VectorIndexDomainService } from '../../../domain/services/vector-index.service';
import { VectorIndexNotReadyError } from '../../errors/vector.errors';
import type { SearchVectorRequestDTO } from '../../dtos/requests/vector/search-vector.dto';
import type { VectorSearchResponseDTO } from '../../dtos/responses/vector-response.dto';

@Injectable()
export class VectorService
  extends BaseService<VectorEntity, VectorIdVO>
  implements VectorServiceInterface
{
  readonly name = 'VectorService';

  constructor(
    private readonly vectorRepo: VectorRepository,
    private readonly indexRepo: VectorIndexRepository,
    private readonly indexService: VectorIndexDomainService,
  ) {
    super();
  }

  async search(input: SearchVectorRequestDTO): Promise<VectorSearchResponseDTO> {
    const index = await this.indexRepo.findById(VectorIdVO.create(input.indexId));
    if (!index || !index.isReady()) {
      throw new VectorIndexNotReadyError(input.indexId);
    }

    const dimension = VectorDimensionVO.create(input.vector.length);
    const name = VectorNameVO.create('query');
    const query = VectorEntity.create({
      name,
      dimension,
      values: input.vector,
      index: null,
      metadata: {},
    });

    const start = Date.now();
    const matches = this.indexService.search(
      query.values,
      [],
      input.topK,
      input.metric === 'dot' ? 'cosine' : input.metric,
    );

    return {
      indexId: input.indexId,
      matches: matches.map((m) => ({ vectorId: m.vectorId, distance: m.distance })),
      tookMs: Date.now() - start,
    };
  }

  async index(vectorId: string, indexId: string): Promise<void> {
    const vector = await this.vectorRepo.findById(VectorIdVO.create(vectorId));
    if (!vector) throw new VectorIndexNotReadyError(indexId);

    const index = await this.indexRepo.findById(VectorIdVO.create(indexId));
    if (!index) throw new VectorIndexNotReadyError(indexId);

    await this.indexRepo.save(index.withEntryCount(index.entryCount + 1));
  }

  async rebuildIndex(indexId: string, force?: boolean): Promise<void> {
    void force;
    const index = await this.indexRepo.findById(VectorIdVO.create(indexId));
    if (!index) throw new VectorIndexNotReadyError(indexId);
    await this.indexRepo.save(index.markReady());
  }
}
