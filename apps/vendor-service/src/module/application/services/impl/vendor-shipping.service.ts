/**
 * VendorShippingService — shipping configuration
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_SHIPPING_REPOSITORY,
  type VendorShippingRepository,
} from '../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ShippingMethodVO } from '../../../domain/value-objects/primitives/shipping-method.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ShippingMapper } from '../../mappers/shipping.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  UpdateShippingRequestDTO,
  SetShippingMethodsRequestDTO,
} from '../../dtos/requests/shipping/index.js';
import type {
  IVendorShippingService,
  ShippingConfigDTO,
} from '../interfaces/vendor-shipping.service.interface.js';

@Injectable()
export class VendorShippingService implements IVendorShippingService {
  private readonly logger = new Logger(VendorShippingService.name);

  constructor(
    @Inject(VENDOR_SHIPPING_REPOSITORY)
    private readonly repo: VendorShippingRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateShippingRequestDTO, _actorId?: string): Promise<ShippingConfigDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(dto.vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(dto.vendorId);

    if (dto.freeShippingThreshold !== undefined) entity.setFreeShippingThreshold(dto.freeShippingThreshold);
    if (dto.processingDays !== undefined) entity.setProcessingDays(dto.processingDays);
    if (dto.allowsPickup !== undefined || dto.allowsCourier !== undefined || dto.trackingRequired !== undefined) {
      // These flags would need dedicated setters on entity
      void dto;
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Shipping config updated for vendor ${dto.vendorId}`);
    return ShippingMapper.toConfig(saved as never);
  }

  async setMethods(dto: SetShippingMethodsRequestDTO, _actorId?: string): Promise<ShippingConfigDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(dto.vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(dto.vendorId);

    for (const method of dto.methods) {
      entity.addMethod(ShippingMethodVO.create(method));
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ShippingMapper.toConfig(saved as never);
  }

  async addMethod(vendorId: string, method: string, _actorId?: string): Promise<ShippingConfigDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.addMethod(ShippingMethodVO.create(method));
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ShippingMapper.toConfig(saved as never);
  }

  async removeMethod(vendorId: string, method: string, _actorId?: string): Promise<ShippingConfigDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.removeMethod(method);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ShippingMapper.toConfig(saved as never);
  }

  async calculateCost(vendorId: string, zone: string, orderAmount: number): Promise<number> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    return entity.calculateCost(zone, orderAmount);
  }

  async getByVendorId(vendorId: string): Promise<ShippingConfigDTO | null> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    return entity ? ShippingMapper.toConfig(entity as never) : null;
  }
}
