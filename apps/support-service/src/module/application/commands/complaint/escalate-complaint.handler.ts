/**
 * EscalateComplaintHandler
 * @module support-service/application/commands/complaint
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EscalateComplaintCommand } from './escalate-complaint.command';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';

export class EscalateComplaintHandler extends BaseCommandHandler<
  EscalateComplaintCommand,
  ComplaintResponseDTO
> {
  readonly commandType = 'support.complaint.escalate';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(command: EscalateComplaintCommand): Promise<ComplaintResponseDTO> {
    return this.complaintService.escalate(command.payload);
  }
}
