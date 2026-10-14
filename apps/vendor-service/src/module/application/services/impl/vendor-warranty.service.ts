/**
 * VendorWarrantyService — warranty configuration
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_WARRANTY_REPOSITORY,
  type VendorWarrantyRepository,
} from '../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { WarrantyMapper } from '../../mappers/warranty.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type { UpdateWarrantyRequestDTO } from '../../dtos/requests/warranty/index.js';
import type {
  IVendorWarrantyService,
  WarrantyDTO,
} from '../interfaces/vendor-warranty.service.interface.js';

@Injectable()
export class VendorWarrantyService implements IVendorWarrantyService {
  private readonly logger = new Logger(VendorWarrantyService.name);

  constructor(
    @Inject(VENDOR_WARRANTY_REPOSITORY)
    private readonly repo: VendorWarrantyRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateWarrantyRequestDTO, _actorId?: string): Promise<WarrantyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(dto.vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(dto.vendorId);

    if (dto.periodDays !== undefined) entity.setPeriod(dto.periodDays);
    if (dto.coverShipping === true) entity.enableShippingCoverage();
    else if (dto.coverShipping === false) entity.disableShippingCoverage();

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Warranty updated for vendor ${dto.vendorId}`);
    return WarrantyMapper.toResponse(saved as never);
  }

  async addExcludedCategory(vendorId: string, categoryId: string, _actorId?: string): Promise<WarrantyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.addExcludedCategory(categoryId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return WarrantyMapper.toResponse(saved as never);
  }

  async removeExcludedCategory(vendorId: string, categoryId: string, _actorId?: string): Promise<WarrantyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.removeExcludedCategory(categoryId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return WarrantyMapper.toResponse(saved as never);
  }

  async getByVendorId(vendorId: string): Promise<WarrantyDTO | null> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    return entity ? WarrantyMapper.toResponse(entity as never) : null;
  }

  async isWithinWarranty(vendorId: string, daysSincePurchase: number): Promise<boolean> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) return false;
    return entity.isWithinWarranty(daysSincePurchase);
  }
}
