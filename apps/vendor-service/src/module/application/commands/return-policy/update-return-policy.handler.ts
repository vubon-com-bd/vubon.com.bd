import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateReturnPolicyCommand } from './update-return-policy.command';
import type { VendorReturnPolicyRepository } from '../../../domain/repositories/vendor-return-policy.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { ReturnPolicyTypeVO } from '../../../domain/value-objects/primitives/return-policy-type.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateReturnPolicyCommand)
export class UpdateReturnPolicyHandler
  extends BaseCommandHandler<UpdateReturnPolicyCommand, void>
  implements ICommandHandler<UpdateReturnPolicyCommand>
{
  readonly commandType = 'vendor.return-policy.update';

  constructor(
    private readonly policyRepo: VendorReturnPolicyRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateReturnPolicyCommand): Promise<void> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const policy = await this.policyRepo.findByVendorId(vendorId);
    if (!policy) throw new VendorNotFoundAppError(command.vendorId);

    const updated = policy.update(
      ReturnPolicyTypeVO.create(command.policyType),
      command.returnWindowDays,
      command.conditions ?? null,
    );
    await this.policyRepo.save(updated);
    void this.eventBus;
  }
}
