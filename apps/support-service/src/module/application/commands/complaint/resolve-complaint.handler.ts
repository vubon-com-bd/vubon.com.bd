import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResolveComplaintCommand } from './resolve-complaint.command';
import type { ComplaintServiceInterface } from '../../services/interfaces/complaint.service.interface';
import { ComplaintIdVO } from '../../../domain/value-objects/primitives/complaint-id.vo';

@CommandHandler(ResolveComplaintCommand)
export class ResolveComplaintHandler
  extends BaseCommandHandler<ResolveComplaintCommand, void>
  implements ICommandHandler<ResolveComplaintCommand>
{
  readonly commandType = 'support.complaint.resolve';

  constructor(private readonly complaintService: ComplaintServiceInterface) {
    super();
  }

  async execute(command: ResolveComplaintCommand): Promise<void> {
    await this.complaintService.resolve(
      ComplaintIdVO.create(command.complaintId),
      command.resolution,
    );
  }
}
