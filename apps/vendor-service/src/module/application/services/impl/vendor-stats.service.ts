/**
 * VendorStatsService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_STATS_REPOSITORY,
  type VendorStatsRepository,
} from '../../../domain/repositories/vendor-stats.repository.interface.js';
import { VendorStatsEntity } from '../../../domain/entities/vendor-stats.entity.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_STATS_SERVICE,
  type IVendorStatsService,
  type VendorStatsDto,
} from '../interfaces/vendor-stats.service.interface.js';

@Injectable()
export class VendorStatsService implements IVendorStatsService {
  constructor(
    @Inject(VENDOR_STATS_REPOSITORY)
    private readonly repo: VendorStatsRepository,
  ) {}

  async initializePeriod(vendorId: string, periodStart: string, periodEnd: string, currency: string, _actorId?: string): Promise<VendorStatsDto> {
    const now = new Date().toISOString();
    const entity = VendorStatsEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      periodStart,
      periodEnd,
      currency,
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toDto(saved);
  }

  async recordOrder(vendorId: string, amount: number, _actorId?: string): Promise<VendorStatsDto> {
    const entity = await this.requireLatest(vendorId);
    entity.recordOrder(amount, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toDto(saved);
  }

  async recordRefund(vendorId: string, amount: number, _actorId?: string): Promise<VendorStatsDto> {
    const entity = await this.requireLatest(vendorId);
    entity.recordRefund(amount, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toDto(saved);
  }

  async recordPayout(vendorId: string, amount: number, _actorId?: string): Promise<VendorStatsDto> {
    const entity = await this.requireLatest(vendorId);
    entity.recordPayout(amount, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toDto(saved);
  }

  async recordCancellation(vendorId: string, _actorId?: string): Promise<VendorStatsDto> {
    const entity = await this.requireLatest(vendorId);
    entity.recordCancellation(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toDto(saved);
  }

  async getLatestByVendorId(vendorId: string): Promise<VendorStatsDto | null> {
    const entity = await this.repo.findLatestByVendorId(vendorId);
    return entity ? this.toDto(entity) : null;
  }

  async listByVendor(vendorId: string): Promise<readonly VendorStatsDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toDto(e));
  }

  private async requireLatest(vendorId: string): Promise<VendorStatsEntity> {
    const entity = await this.repo.findLatestByVendorId(vendorId);
    if (!entity) {
      throw new Error(`Stats record not found for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toDto(entity: VendorStatsEntity): VendorStatsDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      totalProducts: entity.totalProducts,
      totalOrders: entity.totalOrders,
      totalRevenue: entity.totalRevenue,
      totalCommission: entity.totalCommission,
      totalPayout: entity.totalPayout,
      totalRefund: entity.totalRefund,
      totalCancelled: entity.totalCancelled,
      currency: entity.currency,
      cancellationRate: entity.getCancellationRate(),
      refundRate: entity.getRefundRate(),
      payoutRatio: entity.getPayoutRatio(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
