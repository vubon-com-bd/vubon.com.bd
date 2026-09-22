import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitVerificationCommand } from './submit-verification.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorVerificationRepository } from '../../../domain/repositories/vendor-verification.repository.interface';
import { VendorVerificationEntity } from '../../../domain/entities/vendor-verification.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VerificationIdVO } from '../../../domain/value-objects/primitives/verification-id.vo';
import { VerificationStatusVO } from '../../../domain/value-objects/primitives/verification-status.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VerificationResponseDto } from '../../dtos/responses/verification-response.dto';

@CommandHandler(SubmitVerificationCommand)
export class SubmitVerificationHandler
  extends BaseCommandHandler<SubmitVerificationCommand, VerificationResponseDto>
  implements ICommandHandler<SubmitVerificationCommand>
{
  readonly commandType = 'vendor.verification.submit';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly verificationRepo: VendorVerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SubmitVerificationCommand): Promise<VerificationResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const entity = VendorVerificationEntity.create({
      vendorId,
      status: VerificationStatusVO.create('pending'),
      documents: [],
      submittedAt: new Date(),
      verifiedAt: null,
    });

    await this.verificationRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      submittedAt: entity.submittedAt?.toISOString() ?? null,
      verifiedAt: entity.verifiedAt?.toISOString() ?? null,
      documentCount: command.documents.length,
    };
  }
}
