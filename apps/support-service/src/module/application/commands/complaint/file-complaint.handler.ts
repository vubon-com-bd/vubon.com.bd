import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { FileComplaintCommand } from './file-complaint.command';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';

@CommandHandler(FileComplaintCommand)
export class FileComplaintHandler
  extends BaseCommandHandler<FileComplaintCommand, ComplaintResponseDTO>
  implements ICommandHandler<FileComplaintCommand>
{
  readonly commandType = 'support.complaint.file';

  constructor(
    private readonly complaintService: ComplaintServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: FileComplaintCommand): Promise<ComplaintResponseDTO> {
    void this.eventBus;
    return this.complaintService.file({
      userId: command.userId,
      type: command.type_,
      severity: command.severity,
      content: command.content,
    });
  }
}
