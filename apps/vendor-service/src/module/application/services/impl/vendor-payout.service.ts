/**
 * VendorPayoutService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_PAYOUT_REPOSITORY,
  type VendorPayoutRepository,
} from '../../../domain/repositories/vendor-payout.repository.interface.js';
import { VendorPayoutEntity } from '../../../domain/entities/vendor-payout.entity.js';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutMethodVO } from '../../../domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../domain/value-objects/primitives/payout-cycle.vo.js';
import { CommissionAmountVO } from '../../../domain/value-objects/primitives/commission-amount.vo.js';
import { VendorPayoutMapper } from '../../mappers/vendor-payout.mapper.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
  type VendorPayoutListOptionsDto,
} from '../interfaces/vendor-payout.service.interface.js';
import type { ConfigurePayoutRequestDto } from '../../dtos/requests/configure-payout.dto.js';
import type { RequestPayoutRequestDto } from '../../dtos/requests/request-payout.dto.js';
import type { ApprovePayoutRequestDto } from '../../dtos/requests/approve-payout.dto.js';
import type { RejectPayoutRequestDto } from '../../dtos/requests/reject-payout.dto.js';
import type { ProcessPayoutRequestDto } from '../../dtos/requests/process-payout.dto.js';
import type { MarkPayoutPaidRequestDto } from '../../dtos/requests/mark-payout-paid.dto.js';
import type { FailPayoutRequestDto } from '../../dtos/requests/fail-payout.dto.js';
import type { CancelPayoutRequestDto } from '../../dtos/requests/cancel-payout.dto.js';
import type {
  VendorPayoutResponseDto,
  VendorPayoutSummaryDto,
  VendorPayoutListResponseDto,
} from '../../dtos/responses/vendor-payout-response.dto.js';
import { PayoutNotFoundError } from '../../errors/payout.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorPayoutService implements IVendorPayoutService {
  constructor(
    @Inject(VENDOR_PAYOUT_REPOSITORY)
    private readonly repo: VendorPayoutRepository,
  ) {}

  async configure(dto: ConfigurePayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    // Stub: configure stored on vendor aggregate in later batches
    throw new Error('configure() not yet implemented — handled by VendorService');
  }

  async request(dto: RequestPayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const now = new Date().toISOString();
    const method = dto.method
      ? PayoutMethodVO.create(dto.method)
      : PayoutMethodVO.reconstitute('bank_transfer');

    const entity = VendorPayoutEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      now,
      props: {
        vendorId: dto.vendorId,
        payoutNumber: VendorIdGeneratorService.generatePayoutNumber(),
        method,
        cycle: PayoutCycleVO.reconstitute('on_demand'),
        amount: PayoutAmountVO.create(dto.amount, dto.currency),
        netAmount: PayoutAmountVO.create(dto.amount, dto.currency),
        periodStart: now,
        periodEnd: now,
        bankAccountId: dto.bankAccountId,
        notes: dto.notes,
      },
    });

    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async approve(dto: ApprovePayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.approve(dto.approvedBy, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async reject(dto: RejectPayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.reject(dto.reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async process(dto: ProcessPayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.startProcessing(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async markPaid(dto: MarkPayoutPaidRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.markPaid(dto.transactionId, dto.reference, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async fail(dto: FailPayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.fail(dto.reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async cancel(dto: CancelPayoutRequestDto, _actorId?: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(dto.payoutId);
    entity.cancel(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return VendorPayoutMapper.toResponse(saved);
  }

  async getById(payoutId: string): Promise<VendorPayoutResponseDto> {
    const entity = await this.requirePayout(payoutId);
    return VendorPayoutMapper.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorPayoutResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return VendorPayoutMapper.toResponseList(entities);
  }

  async list(options: VendorPayoutListOptionsDto): Promise<VendorPayoutListResponseDto> {
    const result = await this.repo.findPaginated(options);
    return VendorPayoutMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async getSummary(vendorId: string): Promise<VendorPayoutSummaryDto> {
    const summary = await this.repo.getSummary(vendorId);
    return {
      vendorId: summary.vendorId,
      totalPaid: summary.totalPaid,
      totalPending: summary.totalPending,
      currency: summary.currency,
      lastPayoutAt: summary.lastPayoutAt,
      nextPayoutAt: summary.nextPayoutAt,
    };
  }

  private async requirePayout(payoutId: string): Promise<VendorPayoutEntity> {
    const entity = await this.repo.findById(payoutId);
    if (!entity) throw new PayoutNotFoundError(payoutId);
    return entity;
  }
}
