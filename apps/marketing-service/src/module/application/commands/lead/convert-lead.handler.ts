import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ConvertLeadCommand } from './convert-lead.command';
import type { LeadServiceInterface } from '../../services/interfaces/lead.service.interface';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

@CommandHandler(ConvertLeadCommand)
export class ConvertLeadHandler
  extends BaseCommandHandler<ConvertLeadCommand, LeadResponseDTO>
  implements ICommandHandler<ConvertLeadCommand> {
  readonly commandType = 'marketing.lead.convert';
  constructor(private readonly leadService: LeadServiceInterface) { super(); }
  async execute(command: ConvertLeadCommand): Promise<LeadResponseDTO> {
    return this.leadService.convert(command.leadId, command.userId);
  }
}
