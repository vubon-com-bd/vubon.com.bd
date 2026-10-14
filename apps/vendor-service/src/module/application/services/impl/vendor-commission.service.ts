/**
 * VendorCommissionService — commission configuration + calculation
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_COMMISSION_REPOSITORY,
  type VendorCommissionRepository,
} from '../../../domain/repositories/vendor-commission.repository.interface.js';
import { VendorCommissionEntity } from '../../../domain/entities/vendor-commission.entity.js';
import { VendorCommissionVO } from '../../../domain/value-objects/composites/vendor-commission.vo.js';
import { CommissionIdVO } from '../../../domain/value-objects/primitives/commission-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CommissionTypeVO } from '../../../domain/value-objects/primitives/commission-type.vo.js';
import { CommissionRateVO } from '../../../domain/value-objects/primitives/commission-rate.vo.js';
import { CommissionCalculatorService } from '../../../domain/services/commission-calculator.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CommissionMapper } from '../../mappers/commission.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  UpdateCommissionRequestDTO,
  CalculateCommissionRequestDTO,
} from '../../dtos/requests/commission/index.js';
import type {
  CommissionResponseDTO,
  CommissionSummaryResponseDTO,
  CommissionListResponseDTO,
  CommissionCalculationResponseDTO,
  CommissionStatsResponseDTO,
} from '../../dtos/responses/commission-response.dto.js';
import type { IVendorCommissionService } from '../interfaces/vendor-commission.service.interface.js';

@Injectable()
export class VendorCommissionService implements IVendorCommissionService {
  private readonly logger = new Logger(VendorCommissionService.name);

  constructor(
    @Inject(VENDOR_COMMISSION_REPOSITORY)
    private readonly repo: VendorCommissionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateCommissionRequestDTO, _actorId: string): Promise<CommissionResponseDTO> {
    const now = new Date().toISOString();

    // ─── Find existing active commission ───
    let entity = await this.repo.findActiveByVendor(VendorIdVO.create(dto.vendorId));

    if (entity && dto.type === undefined && dto.rate !== undefined) {
      // Update rate on existing entity
      entity.updateRate(CommissionRateVO.create(dto.rate));
    } else {
      // Deactivate old, create new
      if (entity) {
        entity.deactivate();
        await this.repo.save(entity);
      }

      const id = randomUUID();
      const vo = VendorCommissionVO.create({
        id: CommissionIdVO.create(id),
        vendorId: VendorIdVO.create(dto.vendorId),
        type: CommissionTypeVO.create(dto.type ?? 'percentage'),
        rate: CommissionRateVO.create(dto.rate ?? 15),
        fixedAmount: dto.fixedAmount,
        minAmount: dto.minAmount,
        maxAmount: dto.maxAmount,
        categoryOverrides: dto.categoryOverrides,
        effectiveFrom: dto.effectiveFrom ?? now,
        effectiveTo: dto.effectiveTo,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      entity = VendorCommissionEntity.create({ id, vo, now });
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Commission updated for vendor ${dto.vendorId}`);
    return CommissionMapper.toResponse(saved as never);
  }

  async calculate(dto: CalculateCommissionRequestDTO): Promise<CommissionCalculationResponseDTO> {
    const commission = await this.repo.findActiveByVendor(VendorIdVO.create(dto.vendorId));
    if (!commission) {
      throw new VendorNotFoundApplicationError(`Active commission for vendor ${dto.vendorId}`);
    }

    const breakdown = CommissionCalculatorService.calculate(
      commission.vo,
      {
        orderAmount: dto.orderAmount,
        categoryId: dto.categoryId,
        shippingAmount: dto.shippingAmount,
        taxAmount: dto.taxAmount,
        discountAmount: dto.discountAmount,
      },
      dto.currency ?? 'BDT',
    );

    return {
      orderAmount: breakdown.orderAmount,
      taxableAmount: breakdown.taxableAmount,
      commissionType: breakdown.commissionType,
      commissionRate: breakdown.commissionRate,
      commissionAmount: breakdown.commissionAmount,
      vatAmount: breakdown.vatAmount,
      totalDeduction: breakdown.totalDeduction,
      netPayout: breakdown.netPayout,
      appliedConstraints: breakdown.appliedConstraints,
    };
  }

  async activate(commissionId: string, _actorId: string): Promise<CommissionResponseDTO> {
    const entity = await this.load(commissionId);
    entity.activate();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return CommissionMapper.toResponse(saved as never);
  }

  async deactivate(commissionId: string, _actorId: string): Promise<CommissionResponseDTO> {
    const entity = await this.load(commissionId);
    entity.deactivate();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return CommissionMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<CommissionResponseDTO> {
    const entity = await this.load(id);
    return CommissionMapper.toResponse(entity);
  }

  async getActive(vendorId: string): Promise<CommissionResponseDTO | null> {
    const entity = await this.repo.findActiveByVendor(VendorIdVO.create(vendorId));
    return entity ? CommissionMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string): Promise<CommissionListResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return CommissionMapper.toListResponse(entities as never, entities.length, 1, entities.length);
  }

  async getStats(vendorId?: string): Promise<CommissionStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      active: stats.active,
      expired: stats.expired,
      averageRate: stats.averageRate,
      byType: stats.byType,
    };
  }

  private async load(id: string): Promise<VendorCommissionEntity> {
    const vo = CommissionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
