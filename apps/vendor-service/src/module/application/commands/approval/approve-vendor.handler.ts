import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveVendorCommand } from './approve-vendor.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorApprovalRepository } from '../../../domain/repositories/vendor-approval.repository.interface';
import { VendorApprovalEntity } from '../../../domain/entities/vendor-approval.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { ApprovalStatusVO } from '../../../domain/value-objects/primitives/approval-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { ApprovalResponseDto } from '../../dtos/responses/approval-response.dto';

@CommandHandler(ApproveVendorCommand)
export class ApproveVendorHandler
  extends BaseCommandHandler<ApproveVendorCommand, ApprovalResponseDto>
  implements ICommandHandler<ApproveVendorCommand>
{
  readonly commandType = 'vendor.approval.approve';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly approvalRepo: VendorApprovalRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApproveVendorCommand): Promise<ApprovalResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const entity = VendorApprovalEntity.create({
      vendorId,
      status: ApprovalStatusVO.create('approved'),
      reason: null,
      reviewedBy: UserIdVO.create(command.reviewedBy),
      reviewedAt: new Date(),
    });

    await this.approvalRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      reason: entity.reason?.value ?? null,
      reviewedBy: entity.reviewedBy?.value ?? null,
      reviewedAt: entity.reviewedAt?.toISOString() ?? null,
    };
  }
}
