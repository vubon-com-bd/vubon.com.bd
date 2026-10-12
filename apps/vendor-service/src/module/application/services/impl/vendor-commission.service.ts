/**
 * VendorCommissionService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_COMMISSION_REPOSITORY,
  type VendorCommissionRepository,
} from '../../../domain/repositories/vendor-commission.repository.interface.js';
import { VendorCommissionEntity } from '../../../domain/entities/vendor-commission.entity.js';
import { CommissionPercentVO } from '../../../domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../domain/value-objects/primitives/commission-amount.vo.js';
import { VendorCommissionCalculatorService } from '../../../domain/services/vendor-commission-calculator.service.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../interfaces/vendor-commission.service.interface.js';
import type { ConfigureCommissionRequestDto } from '../../dtos/requests/configure-commission.dto.js';
import type { CalculateCommissionRequestDto } from '../../dtos/requests/calculate-commission.dto.js';
import type {
  VendorCommissionResponseDto,
  CommissionCalculationResponseDto,
} from '../../dtos/responses/vendor-commission-response.dto.js';
import {
  CommissionConfigNotFoundError,
} from '../../errors/commission.errors.js';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorCommissionService implements IVendorCommissionService {
  constructor(
    @Inject(VENDOR_COMMISSION_REPOSITORY)
    private readonly repo: VendorCommissionRepository,
  ) {}

  async configure(dto: ConfigureCommissionRequestDto, _actorId?: string): Promise<VendorCommissionResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorCommissionEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: dto.vendorId,
      type: dto.type,
      percent: CommissionPercentVO.create(dto.percent),
      fixedAmount: dto.fixedAmount !== undefined
        ? CommissionAmountVO.create(dto.fixedAmount, dto.currency)
        : undefined,
      currency: dto.currency,
      minPercent: VENDOR_COMMISSION.MIN_PERCENT,
      maxPercent: VENDOR_COMMISSION.MAX_PERCENT,
      applyOnShipping: dto.applyOnShipping,
      applyOnTax: dto.applyOnTax,
      effectiveFrom: dto.effectiveFrom,
      now,
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async calculate(dto: CalculateCommissionRequestDto): Promise<CommissionCalculationResponseDto> {
    const active = await this.repo.findActiveByVendorId(dto.vendorId);
    if (!active) throw new CommissionConfigNotFoundError(dto.vendorId);

    const breakdown = VendorCommissionCalculatorService.calculate(active, {
      orderAmount: dto.orderAmount,
      currency: dto.currency,
      applyOnShipping: active.applyOnShipping,
      shippingAmount: dto.shippingAmount,
      taxAmount: dto.taxAmount,
    });

    return {
      vendorId: dto.vendorId,
      orderAmount: breakdown.orderAmount,
      baseAmount: breakdown.baseAmount,
      percentPart: breakdown.percentPart,
      fixedPart: breakdown.fixedPart,
      totalCommission: breakdown.totalCommission,
      vendorEarning: breakdown.vendorEarning,
      currency: breakdown.currency,
      calculatedAt: new Date().toISOString(),
    };
  }

  async activate(commissionId: string, _actorId?: string): Promise<VendorCommissionResponseDto> {
    const entity = await this.requireCommission(commissionId);
    entity.activate(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async deactivate(commissionId: string, _actorId?: string): Promise<VendorCommissionResponseDto> {
    const entity = await this.requireCommission(commissionId);
    entity.deactivate(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(commissionId: string): Promise<VendorCommissionResponseDto> {
    const entity = await this.requireCommission(commissionId);
    return this.toResponse(entity);
  }

  async getActiveByVendorId(vendorId: string): Promise<VendorCommissionResponseDto> {
    const entity = await this.repo.findActiveByVendorId(vendorId);
    if (!entity) throw new CommissionConfigNotFoundError(vendorId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorCommissionResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  private async requireCommission(id: string): Promise<VendorCommissionEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new CommissionConfigNotFoundError(id);
    return entity;
  }

  private toResponse(entity: VendorCommissionEntity): VendorCommissionResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type as VendorCommissionResponseDto['type'],
      percent: entity.percent.value,
      fixedAmount: entity.fixedAmount?.amount,
      currency: entity.fixedAmount?.currency ?? 'BDT',
      minPercent: 0,
      maxPercent: 50,
      applyOnShipping: entity.applyOnShipping,
      applyOnTax: entity.applyOnTax,
      effectiveFrom: entity.effectiveFrom,
      effectiveTo: entity.effectiveTo,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
