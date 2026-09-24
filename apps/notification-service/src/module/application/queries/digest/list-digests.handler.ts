import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDigestsQuery } from './list-digests.query';
import type { DigestRepository } from '../../../domain/repositories/digest.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';

@QueryHandler(ListDigestsQuery)
export class ListDigestsHandler
  extends BaseQueryHandler<ListDigestsQuery, readonly DigestResponseDTO[]>
  implements IQueryHandler<ListDigestsQuery>
{
  readonly queryType = 'digest.list';

  constructor(private readonly digestRepo: DigestRepository) {
    super();
  }

  async execute(query: ListDigestsQuery): Promise<readonly DigestResponseDTO[]> {
    const entities = await this.digestRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      type: e.type.value,
      frequency: e.period.value,
      status: e.status.value,
      scheduledAt: e.scheduledAt.toISOString(),
      sentAt: e.sentAt?.toISOString() ?? null,
      itemCount: 0,
    }));
  }
}
