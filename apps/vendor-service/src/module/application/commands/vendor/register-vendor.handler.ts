import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterVendorCommand } from './register-vendor.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorEntity } from '../../../domain/entities/vendor.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../../../domain/value-objects/primitives/vendor-name.vo';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo';
import { VendorTypeVO } from '../../../domain/value-objects/primitives/vendor-type.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { VendorAlreadyExistsError } from '../../errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@CommandHandler(RegisterVendorCommand)
export class RegisterVendorHandler
  extends BaseCommandHandler<RegisterVendorCommand, VendorResponseDto>
  implements ICommandHandler<RegisterVendorCommand>
{
  readonly commandType = 'vendor.register';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RegisterVendorCommand): Promise<VendorResponseDto> {
    const ownerId = UserIdVO.create(command.ownerId);
    const existing = await this.vendorRepo.findByOwnerId(ownerId);
    if (existing) {
      throw new VendorAlreadyExistsError(command.ownerId);
    }

    const baseSlug = command.businessName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    let slug = VendorSlugVO.create(baseSlug);
    let counter = 1;
    while (await this.vendorRepo.existsBySlug(slug)) {
      slug = VendorSlugVO.create(`${baseSlug}-${counter++}`);
    }

    const vendor = VendorEntity.create({
      ownerId,
      name: VendorNameVO.create(command.businessName),
      slug,
      status: 'pending_verification' as never,
      type: VendorTypeVO.create(command.businessType),
      tier: 'bronze' as never,
    });

    await this.vendorRepo.save(vendor);

    const events = vendor.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: vendor.id.value,
      ownerId: vendor.ownerId.value,
      name: vendor.name.value,
      slug: vendor.slug.value,
      status: vendor.status.value,
      type: vendor.type.value,
      tier: vendor.tier.value,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }
}
