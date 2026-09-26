/**
 * FileComplaintHandler
 * @module support-service/application/commands/complaint
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { FileComplaintCommand } from './file-complaint.command';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';

export class FileComplaintHandler extends BaseCommandHandler<
  FileComplaintCommand,
  ComplaintResponseDTO
> {
  readonly commandType = 'support.complaint.file';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(command: FileComplaintCommand): Promise<ComplaintResponseDTO> {
    return this.complaintService.file(command.payload);
  }
}
