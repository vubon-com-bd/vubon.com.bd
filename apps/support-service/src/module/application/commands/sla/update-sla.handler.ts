import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSlaCommand } from './update-sla.command';
import type { SlaRepository } from '../../../domain/repositories/sla.repository.interface';
import { SlaIdVO } from '../../../domain/value-objects/primitives/sla-id.vo';

@CommandHandler(UpdateSlaCommand)
export class UpdateSlaHandler
  extends BaseCommandHandler<UpdateSlaCommand, void>
  implements ICommandHandler<UpdateSlaCommand>
{
  readonly commandType = 'support.sla.update';

  constructor(private readonly slaRepo: SlaRepository) {
    super();
  }

  async execute(command: UpdateSlaCommand): Promise<void> {
    const existing = await this.slaRepo.findById(SlaIdVO.create(command.slaId));
    if (!existing) {
      throw new Error(`SLA not found: ${command.slaId}`);
    }
  }
}
