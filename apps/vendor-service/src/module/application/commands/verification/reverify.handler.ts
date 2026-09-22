import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReverifyCommand } from './reverify.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(ReverifyCommand)
export class ReverifyHandler
  extends BaseCommandHandler<ReverifyCommand, void>
  implements ICommandHandler<ReverifyCommand>
{
  readonly commandType = 'vendor.verification.reverify';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReverifyCommand): Promise<void> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(command.vendorId),
    );
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);
    throw new Error('reverify orchestration not yet wired');
  }
}
