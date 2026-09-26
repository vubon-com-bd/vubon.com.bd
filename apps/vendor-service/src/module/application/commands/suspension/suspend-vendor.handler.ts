import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendVendorCommand } from './suspend-vendor.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorSuspensionRepository } from '../../../domain/repositories/vendor-suspension.repository.interface';
import { VendorSuspensionEntity } from '../../../domain/entities/vendor-suspension.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { SuspensionIdVO } from '../../../domain/value-objects/primitives/suspension-id.vo';
import { SuspensionReasonVO } from '../../../domain/value-objects/primitives/suspension-reason.vo';
import { SuspensionStatusVO } from '../../../domain/value-objects/primitives/suspension-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SuspensionResponseDto } from '../../dtos/responses/suspension-response.dto';

@CommandHandler(SuspendVendorCommand)
export class SuspendVendorHandler
  extends BaseCommandHandler<SuspendVendorCommand, SuspensionResponseDto>
  implements ICommandHandler<SuspendVendorCommand>
{
  readonly commandType = 'vendor.suspension.suspend';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly suspensionRepo: VendorSuspensionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SuspendVendorCommand): Promise<SuspensionResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const entity = VendorSuspensionEntity.create({
      vendorId,
      reason: SuspensionReasonVO.create(command.reason),
      status: SuspensionStatusVO.create('active'),
      suspendedBy: UserIdVO.create(command.suspendedBy),
      suspendedAt: new Date(),
      reinstatedAt: null,
    });

    await this.suspensionRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      suspendedBy: entity.suspendedBy.value,
      suspendedAt: entity.suspendedAt.toISOString(),
      reinstatedAt: entity.reinstatedAt?.toISOString() ?? null,
    };
  }
}
