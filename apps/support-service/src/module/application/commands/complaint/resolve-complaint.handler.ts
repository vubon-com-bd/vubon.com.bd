/**
 * ResolveComplaintHandler
 * @module support-service/application/commands/complaint
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResolveComplaintCommand } from './resolve-complaint.command';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';

export class ResolveComplaintHandler extends BaseCommandHandler<
  ResolveComplaintCommand,
  ComplaintResponseDTO
> {
  readonly commandType = 'support.complaint.resolve';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(command: ResolveComplaintCommand): Promise<ComplaintResponseDTO> {
    return this.complaintService.resolve(command.payload);
  }
}
