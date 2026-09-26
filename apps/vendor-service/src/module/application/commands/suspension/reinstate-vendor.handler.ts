import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReinstateVendorCommand } from './reinstate-vendor.command';
import type { VendorSuspensionRepository } from '../../../domain/repositories/vendor-suspension.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(ReinstateVendorCommand)
export class ReinstateVendorHandler
  extends BaseCommandHandler<ReinstateVendorCommand, void>
  implements ICommandHandler<ReinstateVendorCommand>
{
  readonly commandType = 'vendor.suspension.reinstate';

  constructor(
    private readonly suspensionRepo: VendorSuspensionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReinstateVendorCommand): Promise<void> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const active = await this.suspensionRepo.findActive(vendorId);
    if (!active) {
      throw new VendorNotFoundAppError(command.vendorId);
    }
    void this.eventBus;
    throw new Error('reinstate orchestration not yet wired');
  }
}
