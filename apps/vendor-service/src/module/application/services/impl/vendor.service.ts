import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { VendorEntity } from '../../../domain/entities/vendor.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorNotFoundError } from '../../../domain/errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';
import { VendorMapper } from '../../mappers/vendor.mapper';

@Injectable()
export class VendorService {
  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {}

  async findById(id: VendorIdVO): Promise<VendorEntity> {
    const vendor = await this.vendorRepo.findById(id);
    if (!vendor) throw new VendorNotFoundError(id.value);
    return vendor;
  }

  async save(vendor: VendorEntity): Promise<void> {
    await this.vendorRepo.save(vendor);
    const events = vendor.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }

  toDto(vendor: VendorEntity): VendorResponseDto {
    return VendorMapper.toDto(vendor);
  }
}
