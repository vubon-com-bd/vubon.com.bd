import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AppealSuspensionCommand } from './appeal-suspension.command';
import type { VendorSuspensionRepository } from '../../../domain/repositories/vendor-suspension.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(AppealSuspensionCommand)
export class AppealSuspensionHandler
  extends BaseCommandHandler<AppealSuspensionCommand, void>
  implements ICommandHandler<AppealSuspensionCommand>
{
  readonly commandType = 'vendor.suspension.appeal';

  constructor(
    private readonly suspensionRepo: VendorSuspensionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AppealSuspensionCommand): Promise<void> {
    const active = await this.suspensionRepo.findActive(
      VendorIdVO.create(command.vendorId),
    );
    if (!active) {
      throw new VendorNotFoundAppError(command.vendorId);
    }
    void this.eventBus;
    throw new Error('appeal orchestration not yet wired');
  }
}
