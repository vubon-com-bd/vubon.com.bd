import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListComplaintsByUserQuery } from './list-complaints-by-user.query';
import type { ComplaintRepository } from '../../../domain/repositories/complaint.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';

@QueryHandler(ListComplaintsByUserQuery)
export class ListComplaintsByUserHandler
  extends BaseQueryHandler<ListComplaintsByUserQuery, readonly ComplaintResponseDTO[]>
  implements IQueryHandler<ListComplaintsByUserQuery>
{
  readonly queryType = 'support.complaint.list-by-user';

  constructor(private readonly complaintRepo: ComplaintRepository) {
    super();
  }

  async execute(query: ListComplaintsByUserQuery): Promise<readonly ComplaintResponseDTO[]> {
    const items = await this.complaintRepo.findByUser(UserIdVO.create(query.userId));
    return items.map((c) => ({
      id: c.id.value,
      userId: c.userId.value,
      type: c.type.value,
      severity: c.severity.value,
      status: c.status.value,
      content: c.content,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }
}
