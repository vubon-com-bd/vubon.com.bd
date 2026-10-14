/**
 * VendorReturnPolicyService — return policy management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_RETURN_POLICY_REPOSITORY,
  type VendorReturnPolicyRepository,
} from '../../../domain/repositories/vendor-return-policy.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ReturnPolicyMapper } from '../../mappers/return-policy.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type { UpdateReturnPolicyRequestDTO } from '../../dtos/requests/return-policy/index.js';
import type {
  IVendorReturnPolicyService,
  ReturnPolicyDTO,
} from '../interfaces/vendor-return-policy.service.interface.js';

@Injectable()
export class VendorReturnPolicyService implements IVendorReturnPolicyService {
  private readonly logger = new Logger(VendorReturnPolicyService.name);

  constructor(
    @Inject(VENDOR_RETURN_POLICY_REPOSITORY)
    private readonly repo: VendorReturnPolicyRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateReturnPolicyRequestDTO, _actorId?: string): Promise<ReturnPolicyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(dto.vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(dto.vendorId);

    if (dto.windowDays !== undefined) entity.setWindowDays(dto.windowDays);
    if (dto.restockFeePercent !== undefined) entity.setRestockFee(dto.restockFeePercent);
    if (dto.autoApprove === true) entity.enableAutoApprove();
    else if (dto.autoApprove === false) entity.disableAutoApprove();

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Return policy updated for vendor ${dto.vendorId}`);
    return ReturnPolicyMapper.toResponse(saved as never);
  }

  async addExcludedCategory(vendorId: string, categoryId: string, _actorId?: string): Promise<ReturnPolicyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.addExcludedCategory(categoryId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReturnPolicyMapper.toResponse(saved as never);
  }

  async removeExcludedCategory(vendorId: string, categoryId: string, _actorId?: string): Promise<ReturnPolicyDTO> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    entity.removeExcludedCategory(categoryId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return ReturnPolicyMapper.toResponse(saved as never);
  }

  async getByVendorId(vendorId: string): Promise<ReturnPolicyDTO | null> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    return entity ? ReturnPolicyMapper.toResponse(entity as never) : null;
  }

  async calculateRefund(vendorId: string, orderAmount: number): Promise<number> {
    const entity = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    if (!entity) throw new VendorNotFoundApplicationError(vendorId);
    return entity.calculateRefund(orderAmount);
  }
}
