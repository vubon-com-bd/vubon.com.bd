/**
 * VendorWarrantyService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_WARRANTY_REPOSITORY,
  type VendorWarrantyRepository,
} from '../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VendorWarrantyEntity } from '../../../domain/entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../../../domain/value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../domain/value-objects/primitives/warranty-period-days.vo.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../interfaces/vendor-warranty.service.interface.js';

@Injectable()
export class VendorWarrantyService implements IVendorWarrantyService {
  constructor(
    @Inject(VENDOR_WARRANTY_REPOSITORY)
    private readonly repo: VendorWarrantyRepository,
  ) {}

  async initialize(vendorId: string, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const existing = await this.repo.findByVendorId(vendorId);
    if (existing) return this.toResponse(existing);

    const now = new Date().toISOString();
    const entity = VendorWarrantyEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateType(vendorId: string, type: string, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    entity.updateDefaultType(WarrantyTypeVO.create(type), new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updatePeriod(vendorId: string, days: number, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    entity.updateDefaultPeriod(WarrantyPeriodDaysVO.create(days), new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateTerms(vendorId: string, terms: string | undefined, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    entity.updateTerms(terms, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async addExclusion(vendorId: string, term: string, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    entity.addExclusion(term, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async removeExclusion(vendorId: string, term: string, _actorId?: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    entity.removeExclusion(term, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async calculateExpiry(vendorId: string, purchasedAt: string): Promise<string> {
    const entity = await this.requireWarranty(vendorId);
    return entity.calculateExpiry(new Date(purchasedAt)).toISOString();
  }

  async getByVendorId(vendorId: string): Promise<VendorWarrantyResponseDto> {
    const entity = await this.requireWarranty(vendorId);
    return this.toResponse(entity);
  }

  private async requireWarranty(vendorId: string): Promise<VendorWarrantyEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) {
      throw new Error(`Warranty config not found for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorWarrantyEntity): VendorWarrantyResponseDto {
    return {
      vendorId: entity.vendorId,
      defaultType: entity.defaultType.value,
      defaultPeriodDays: entity.defaultPeriod.days,
      coversShipping: entity.coversShipping,
      requireProof: entity.requireProof,
      autoRegister: entity.autoRegister,
      terms: entity.terms,
      exclusions: entity.exclusions,
      updatedAt: entity.updatedAt,
    };
  }
}
