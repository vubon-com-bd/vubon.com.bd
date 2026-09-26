import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDigestQuery } from './get-digest.query';
import type { DigestRepository } from '../../../domain/repositories/digest.repository.interface';
import { DigestIdVO } from '../../../domain/value-objects/primitives/digest-id.vo';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';

@QueryHandler(GetDigestQuery)
export class GetDigestHandler
  extends BaseQueryHandler<GetDigestQuery, DigestResponseDTO | null>
  implements IQueryHandler<GetDigestQuery>
{
  readonly queryType = 'digest.get';

  constructor(private readonly digestRepo: DigestRepository) {
    super();
  }

  async execute(query: GetDigestQuery): Promise<DigestResponseDTO | null> {
    const entity = await this.digestRepo.findById(DigestIdVO.create(query.digestId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      frequency: entity.period.value,
      status: entity.status.value,
      scheduledAt: entity.scheduledAt.toISOString(),
      sentAt: entity.sentAt?.toISOString() ?? null,
      itemCount: 0,
    };
  }
}
