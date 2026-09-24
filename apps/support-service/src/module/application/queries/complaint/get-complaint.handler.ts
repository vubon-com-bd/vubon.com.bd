import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetComplaintQuery } from './get-complaint.query';
import type { ComplaintRepository } from '../../../domain/repositories/complaint.repository.interface';
import { ComplaintIdVO } from '../../../domain/value-objects/primitives/complaint-id.vo';
import { ComplaintNotFoundError } from '../../errors/complaint.errors';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';

@QueryHandler(GetComplaintQuery)
export class GetComplaintHandler
  extends BaseQueryHandler<GetComplaintQuery, ComplaintResponseDTO>
  implements IQueryHandler<GetComplaintQuery>
{
  readonly queryType = 'support.complaint.get';

  constructor(private readonly complaintRepo: ComplaintRepository) {
    super();
  }

  async execute(query: GetComplaintQuery): Promise<ComplaintResponseDTO> {
    const c = await this.complaintRepo.findById(ComplaintIdVO.create(query.complaintId));
    if (!c) throw new ComplaintNotFoundError(query.complaintId);
    return {
      id: c.id.value,
      userId: c.userId.value,
      type: c.type.value,
      severity: c.severity.value,
      status: c.status.value,
      content: c.content,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  }
}
