/**
 * VendorSettlementService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_SETTLEMENT_REPOSITORY,
  type VendorSettlementRepository,
} from '../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VendorSettlementEntity } from '../../../domain/entities/vendor-settlement.entity.js';
import { SettlementAmountVO } from '../../../domain/value-objects/primitives/settlement-amount.vo.js';
import { CommissionAmountVO } from '../../../domain/value-objects/primitives/commission-amount.vo.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../interfaces/vendor-settlement.service.interface.js';
import type { CreateSettlementRequestDto } from '../../dtos/requests/create-settlement.dto.js';
import type { CompleteSettlementRequestDto } from '../../dtos/requests/complete-settlement.dto.js';
import type { VendorSettlementResponseDto } from '../../dtos/responses/vendor-settlement-response.dto.js';
import { SettlementNotFoundError } from '../../errors/payout.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorSettlementService implements IVendorSettlementService {
  constructor(
    @Inject(VENDOR_SETTLEMENT_REPOSITORY)
    private readonly repo: VendorSettlementRepository,
  ) {}

  async create(dto: CreateSettlementRequestDto, _actorId?: string): Promise<VendorSettlementResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorSettlementEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      now,
      props: {
        vendorId: dto.vendorId,
        settlementNumber: VendorIdGeneratorService.generateSettlementNumber(),
        grossAmount: SettlementAmountVO.create(dto.grossAmount, dto.currency),
        commissionAmount: CommissionAmountVO.create(dto.commissionAmount, dto.currency),
        netAmount: SettlementAmountVO.create(dto.netAmount, dto.currency),
        periodStart: dto.periodStart,
        periodEnd: dto.periodEnd,
        orderCount: dto.orderCount,
      },
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async startProcessing(settlementId: string, _actorId?: string): Promise<VendorSettlementResponseDto> {
    const entity = await this.requireSettlement(settlementId);
    entity.startProcessing(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async complete(dto: CompleteSettlementRequestDto, _actorId?: string): Promise<VendorSettlementResponseDto> {
    const entity = await this.requireSettlement(dto.settlementId);
    entity.complete(dto.payoutId, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async fail(settlementId: string, reason: string, _actorId?: string): Promise<VendorSettlementResponseDto> {
    const entity = await this.requireSettlement(settlementId);
    entity.fail(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async cancel(settlementId: string, _actorId?: string): Promise<VendorSettlementResponseDto> {
    const entity = await this.requireSettlement(settlementId);
    entity.cancel(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(settlementId: string): Promise<VendorSettlementResponseDto> {
    const entity = await this.requireSettlement(settlementId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorSettlementResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  private async requireSettlement(id: string): Promise<VendorSettlementEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new SettlementNotFoundError(id);
    return entity;
  }

  private toResponse(entity: VendorSettlementEntity): VendorSettlementResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      settlementNumber: entity.settlementNumber,
      status: entity.status,
      grossAmount: entity.grossAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.grossAmount.currency,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      orderCount: entity.orderCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
