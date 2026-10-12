/**
 * VendorReturnPolicyService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_RETURN_POLICY_REPOSITORY,
  type VendorReturnPolicyRepository,
} from '../../../domain/repositories/vendor-return-policy.repository.interface.js';
import { VendorReturnPolicyEntity } from '../../../domain/entities/vendor-return-policy.entity.js';
import { ReturnTypeVO } from '../../../domain/value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../../../domain/value-objects/primitives/return-window-days.vo.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../interfaces/vendor-return-policy.service.interface.js';

@Injectable()
export class VendorReturnPolicyService implements IVendorReturnPolicyService {
  constructor(
    @Inject(VENDOR_RETURN_POLICY_REPOSITORY)
    private readonly repo: VendorReturnPolicyRepository,
  ) {}

  async initialize(vendorId: string, _actorId?: string): Promise<VendorReturnPolicyResponseDto> {
    const existing = await this.repo.findByVendorId(vendorId);
    if (existing) return this.toResponse(existing);

    const now = new Date().toISOString();
    const entity = VendorReturnPolicyEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateType(vendorId: string, type: string, _actorId?: string): Promise<VendorReturnPolicyResponseDto> {
    const entity = await this.requirePolicy(vendorId);
    entity.updateType(ReturnTypeVO.create(type), new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateWindow(vendorId: string, days: number, _actorId?: string): Promise<VendorReturnPolicyResponseDto> {
    const entity = await this.requirePolicy(vendorId);
    entity.updateWindow(ReturnWindowDaysVO.create(days), new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async addExclusion(vendorId: string, term: string, _actorId?: string): Promise<VendorReturnPolicyResponseDto> {
    const entity = await this.requirePolicy(vendorId);
    entity.addExclusion(term, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async removeExclusion(vendorId: string, term: string, _actorId?: string): Promise<VendorReturnPolicyResponseDto> {
    const entity = await this.requirePolicy(vendorId);
    entity.removeExclusion(term, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async canReturn(vendorId: string, deliveredAt: string): Promise<boolean> {
    const entity = await this.requirePolicy(vendorId);
    return entity.canReturnAt(new Date(deliveredAt));
  }

  async calculateRestockFee(vendorId: string, refundAmount: number): Promise<number> {
    const entity = await this.requirePolicy(vendorId);
    return entity.calculateRestockFee(refundAmount);
  }

  async getByVendorId(vendorId: string): Promise<VendorReturnPolicyResponseDto> {
    const entity = await this.requirePolicy(vendorId);
    return this.toResponse(entity);
  }

  private async requirePolicy(vendorId: string): Promise<VendorReturnPolicyEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) {
      throw new Error(`Return policy not found for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorReturnPolicyEntity): VendorReturnPolicyResponseDto {
    return {
      vendorId: entity.vendorId,
      type: entity.type.value,
      windowDays: entity.window.days,
      freeReturn: entity.freeReturn,
      restockFeePercent: entity.restockFeePercent,
      requireReason: entity.requireReason,
      requireImages: entity.requireImages,
      maxImages: entity.maxImages,
      autoApprove: entity.autoApprove,
      approvalSlaHours: entity.approvalSlaHours,
      exclusions: entity.exclusions,
      notes: entity.note?.value,
      updatedAt: entity.updatedAt,
    };
  }
}
