import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateLeadCommand } from './create-lead.command';
import type { LeadServiceInterface } from '../../services/interfaces/lead.service.interface';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

@CommandHandler(CreateLeadCommand)
export class CreateLeadHandler
  extends BaseCommandHandler<CreateLeadCommand, LeadResponseDTO>
  implements ICommandHandler<CreateLeadCommand> {
  readonly commandType = 'marketing.lead.create';
  constructor(private readonly leadService: LeadServiceInterface) { super(); }
  async execute(command: CreateLeadCommand): Promise<LeadResponseDTO> {
    return this.leadService.create({ name: command.name, email: command.email, source: command.source } as never);
  }
}
