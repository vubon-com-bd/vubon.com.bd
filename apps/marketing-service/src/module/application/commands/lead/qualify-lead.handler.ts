import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { QualifyLeadCommand } from './qualify-lead.command';
import type { LeadServiceInterface } from '../../services/interfaces/lead.service.interface';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

@CommandHandler(QualifyLeadCommand)
export class QualifyLeadHandler
  extends BaseCommandHandler<QualifyLeadCommand, LeadResponseDTO>
  implements ICommandHandler<QualifyLeadCommand> {
  readonly commandType = 'marketing.lead.qualify';
  constructor(private readonly leadService: LeadServiceInterface) { super(); }
  async execute(command: QualifyLeadCommand): Promise<LeadResponseDTO> {
    return this.leadService.qualify(command.leadId);
  }
}
