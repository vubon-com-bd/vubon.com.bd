import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSlaCommand } from './create-sla.command';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

@CommandHandler(CreateSlaCommand)
export class CreateSlaHandler
  extends BaseCommandHandler<CreateSlaCommand, SlaResponseDTO>
  implements ICommandHandler<CreateSlaCommand>
{
  readonly commandType = 'support.sla.create';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(command: CreateSlaCommand): Promise<SlaResponseDTO> {
    return this.slaService.create({
      name: command.name,
      type: command.type_,
      target: command.target,
      priority: command.priority,
      businessHoursOnly: command.businessHoursOnly,
    });
  }
}
