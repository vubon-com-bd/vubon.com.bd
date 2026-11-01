/**
 * VendorAddressService — address management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_ADDRESS_REPOSITORY,
  type VendorAddressRepository,
} from '../../../domain/repositories/vendor-address.repository.interface.js';
import { VendorAddressEntity } from '../../../domain/entities/vendor-address.entity.js';
import { VendorAddressVO } from '../../../domain/value-objects/composites/vendor-address.vo.js';
import { AddressIdVO } from '../../../domain/value-objects/primitives/address-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { AddressLabelVO } from '../../../domain/value-objects/primitives/address-label.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorMapper } from '../../mappers/vendor.mapper.js';
import { VendorValidationError } from '../../errors/vendor.errors.js';
import type { AddressSummaryDTO } from '../../dtos/responses/vendor-detail-response.dto.js';
import type { IVendorAddressService, AddressInputDTO } from '../interfaces/vendor-address.service.interface.js';

@Injectable()
export class VendorAddressService implements IVendorAddressService {
  private readonly logger = new Logger(VendorAddressService.name);

  constructor(
    @Inject(VENDOR_ADDRESS_REPOSITORY)
    private readonly repo: VendorAddressRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async add(vendorId: string, input: AddressInputDTO, _actorId?: string): Promise<AddressSummaryDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = VendorAddressVO.create({
      id: AddressIdVO.create(id),
      vendorId: VendorIdVO.create(vendorId),
      label: AddressLabelVO.create(input.label),
      addressType: input.addressType,
      line1: input.line1,
      line2: input.line2,
      area: input.area,
      city: input.city,
      district: input.district,
      division: input.division,
      postalCode: input.postalCode,
      country: input.country,
      latitude: input.latitude,
      longitude: input.longitude,
      isPrimary: false,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorAddressEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.addressToSummary(saved as never);
  }

  async update(addressId: string, patch: Partial<AddressInputDTO>, _actorId?: string): Promise<AddressSummaryDTO> {
    const entity = await this.loadAddress(addressId);
    if (patch.label) entity.updateLabel(AddressLabelVO.create(patch.label));
    if (patch.latitude !== undefined || patch.longitude !== undefined) {
      entity.updateCoordinates(patch.latitude, patch.longitude);
    }
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.addressToSummary(saved as never);
  }

  async remove(addressId: string, _actorId?: string): Promise<{ readonly success: true }> {
    await this.repo.delete(addressId);
    return { success: true };
  }

  async verify(addressId: string, _actorId: string): Promise<AddressSummaryDTO> {
    const entity = await this.loadAddress(addressId);
    entity.verify();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.addressToSummary(saved as never);
  }

  async markPrimary(addressId: string, _actorId: string): Promise<AddressSummaryDTO> {
    const entity = await this.loadAddress(addressId);
    entity.markPrimary();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VendorMapper.addressToSummary(saved as never);
  }

  async listByVendor(vendorId: string): Promise<readonly AddressSummaryDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => VendorMapper.addressToSummary(e as never));
  }

  async getPrimary(vendorId: string): Promise<AddressSummaryDTO | null> {
    const entity = await this.repo.findPrimaryByVendor(VendorIdVO.create(vendorId));
    return entity ? VendorMapper.addressToSummary(entity as never) : null;
  }

  private async loadAddress(id: string): Promise<VendorAddressEntity> {
    const vo = AddressIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorValidationError(`Address "${id}" not found`, 'addressId');
    return entity;
  }
}
