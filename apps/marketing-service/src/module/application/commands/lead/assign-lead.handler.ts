import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignLeadCommand } from './assign-lead.command';
import type { LeadServiceInterface } from '../../services/interfaces/lead.service.interface';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

@CommandHandler(AssignLeadCommand)
export class AssignLeadHandler
  extends BaseCommandHandler<AssignLeadCommand, LeadResponseDTO>
  implements ICommandHandler<AssignLeadCommand> {
  readonly commandType = 'marketing.lead.assign';
  constructor(private readonly leadService: LeadServiceInterface) { super(); }
  async execute(command: AssignLeadCommand): Promise<LeadResponseDTO> {
    return this.leadService.assign(command.leadId, command.assigneeId);
  }
}
