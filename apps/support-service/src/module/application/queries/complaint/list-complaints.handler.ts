/**
 * ListComplaintsHandler
 * @module support-service/application/queries/complaint
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListComplaintsQuery } from './list-complaints.query';
import type { ComplaintListResponseDTO } from '../../dtos/responses/complaint-list-response.dto';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';

export class ListComplaintsHandler extends BaseQueryHandler<
  ListComplaintsQuery,
  ComplaintListResponseDTO
> {
  readonly queryType = 'support.complaint.list';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(query: ListComplaintsQuery): Promise<ComplaintListResponseDTO> {
    return this.complaintService.list(query.page, query.limit);
  }
}
