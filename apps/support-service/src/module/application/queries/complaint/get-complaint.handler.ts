/**
 * GetComplaintHandler
 * @module support-service/application/queries/complaint
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetComplaintQuery } from './get-complaint.query';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';

export class GetComplaintHandler extends BaseQueryHandler<
  GetComplaintQuery,
  ComplaintResponseDTO
> {
  readonly queryType = 'support.complaint.get';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(query: GetComplaintQuery): Promise<ComplaintResponseDTO> {
    return this.complaintService.getById(query.complaintId);
  }
}
