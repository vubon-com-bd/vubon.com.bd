/**
 * VendorSettlementService — periodic settlement batches
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_SETTLEMENT_REPOSITORY,
  type VendorSettlementRepository,
  type VendorSettlementListFilter,
} from '../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VendorSettlementEntity } from '../../../domain/entities/vendor-settlement.entity.js';
import { VendorSettlementVO } from '../../../domain/value-objects/composites/vendor-settlement.vo.js';
import { SettlementIdVO } from '../../../domain/value-objects/primitives/settlement-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SettlementStatusVO } from '../../../domain/value-objects/primitives/settlement-status.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { SettlementMapper } from '../../mappers/settlement.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import { SettlementNotFoundApplicationError } from '../../errors/payout.errors.js';
import type {
  CreateSettlementRequestDTO,
  CompleteSettlementRequestDTO,
} from '../../dtos/requests/settlement/index.js';
import type {
  SettlementResponseDTO,
  SettlementListResponseDTO,
  SettlementStatsResponseDTO,
} from '../../dtos/responses/settlement-response.dto.js';
import type {
  IVendorSettlementService,
  SettlementListOptionsDTO,
} from '../interfaces/vendor-settlement.service.interface.js';

@Injectable()
export class VendorSettlementService implements IVendorSettlementService {
  private readonly logger = new Logger(VendorSettlementService.name);

  constructor(
    @Inject(VENDOR_SETTLEMENT_REPOSITORY)
    private readonly repo: VendorSettlementRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateSettlementRequestDTO, _actorId: string): Promise<SettlementResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // Simplified: trust input amounts, reconciliation enforced by VO
    const vo = VendorSettlementVO.create({
      id: SettlementIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      status: SettlementStatusVO.pending(),
      periodStart: dto.periodStart,
      periodEnd: dto.periodEnd,
      grossAmount: 0,
      commissionAmount: 0,
      refundAmount: 0,
      adjustmentAmount: 0,
      netAmount: 0,
      currency: 'BDT',
      orderCount: dto.orderIds?.length ?? 0,
      notes: dto.notes,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorSettlementEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Settlement ${saved.id} created for vendor ${dto.vendorId}`);
    return SettlementMapper.toResponse(saved as never);
  }

  async complete(dto: CompleteSettlementRequestDTO, _actorId: string): Promise<SettlementResponseDTO> {
    const entity = await this.load(dto.settlementId);
    if (entity.isPending()) entity.startProcessing();
    entity.complete(dto.payoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Settlement ${saved.id} completed`);
    return SettlementMapper.toResponse(saved as never);
  }

  async cancel(settlementId: string, _actorId: string, reason?: string): Promise<SettlementResponseDTO> {
    const entity = await this.load(settlementId);
    entity.cancel(undefined, reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return SettlementMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<SettlementResponseDTO> {
    const entity = await this.load(id);
    return SettlementMapper.toResponse(entity);
  }

  async listByVendor(vendorId: string, options?: SettlementListOptionsDTO): Promise<SettlementListResponseDTO> {
    const all = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    void options;
    return SettlementMapper.toListResponse(all as never, all.length, 1, all.length);
  }

  async list(options: SettlementListOptionsDTO): Promise<SettlementListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as VendorSettlementListFilter | undefined,
    });
    return SettlementMapper.toListResponse(result.items as never, result.total, result.page, result.limit);
  }

  async getStats(vendorId?: string): Promise<SettlementStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      totalGross: stats.totalGross,
      totalNet: stats.totalNet,
      totalCommission: stats.totalCommission,
      totalRefunds: stats.totalRefunds,
      averageNetAmount: stats.averageNetAmount,
      byStatus: stats.byStatus,
    };
  }

  private async load(id: string): Promise<VendorSettlementEntity> {
    const vo = SettlementIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new SettlementNotFoundApplicationError(id);
    return entity;
  }
}
