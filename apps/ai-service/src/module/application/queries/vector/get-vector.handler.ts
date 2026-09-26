import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVectorQuery } from './get-vector.query';
import type { VectorRepository } from '../../../domain/repositories/vector.repository.interface';
import { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import { VectorNotFoundError } from '../../errors/vector.errors';
import type { VectorResponseDTO } from '../../dtos/responses/vector-response.dto';

@QueryHandler(GetVectorQuery)
export class GetVectorHandler
  extends BaseQueryHandler<GetVectorQuery, VectorResponseDTO>
  implements IQueryHandler<GetVectorQuery>
{
  readonly queryType = 'ai.vector.get';
  constructor(private readonly vectorRepo: VectorRepository) { super(); }

  async execute(query: GetVectorQuery): Promise<VectorResponseDTO> {
    const entity = await this.vectorRepo.findById(VectorIdVO.create(query.vectorId));
    if (!entity) throw new VectorNotFoundError(query.vectorId);
    return {
      id: entity.id.value,
      name: entity.name.value,
      dimension: entity.dimension.value,
      values: entity.values,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
    };
  }
}
