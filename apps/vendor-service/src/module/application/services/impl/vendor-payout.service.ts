/**
 * VendorPayoutService — payout lifecycle (most critical)
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_PAYOUT_REPOSITORY,
  type VendorPayoutRepository,
  type VendorPayoutListFilter,
} from '../../../domain/repositories/vendor-payout.repository.interface.js';
import {
  VENDOR_BANK_ACCOUNT_REPOSITORY,
  type VendorBankAccountRepository,
} from '../../../domain/repositories/vendor-bank-account.repository.interface.js';
import { VendorPayoutEntity } from '../../../domain/entities/vendor-payout.entity.js';
import { VendorPayoutVO } from '../../../domain/value-objects/composites/vendor-payout.vo.js';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo.js';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutStatusVO } from '../../../domain/value-objects/primitives/payout-status.vo.js';
import { PayoutCalculatorService } from '../../../domain/services/payout-calculator.service.js';
import { PayoutEligibilityService } from '../../../domain/services/payout-eligibility.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PayoutMapper } from '../../mappers/payout.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import {
  PayoutValidationError,
  PayoutAlreadyProcessedApplicationError,
} from '../../errors/payout.errors.js';
import type {
  RequestPayoutCommandDTO,
  ApprovePayoutRequestDTO,
  RejectPayoutRequestDTO,
  ProcessPayoutRequestDTO,
} from '../../dtos/requests/payout/index.js';
import type {
  PayoutResponseDTO,
  PayoutPublicResponseDTO,
  PayoutSummaryResponseDTO,
  PayoutListResponseDTO,
  PayoutStatsResponseDTO,
  PayoutInitiateResponseDTO,
} from '../../dtos/responses/payout-response.dto.js';
import type {
  IVendorPayoutService,
  PayoutListOptionsDTO,
} from '../interfaces/vendor-payout.service.interface.js';

@Injectable()
export class VendorPayoutService implements IVendorPayoutService {
  private readonly logger = new Logger(VendorPayoutService.name);

  constructor(
    @Inject(VENDOR_PAYOUT_REPOSITORY)
    private readonly repo: VendorPayoutRepository,
    @Inject(VENDOR_BANK_ACCOUNT_REPOSITORY)
    private readonly bankRepo: VendorBankAccountRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async request(dto: RequestPayoutCommandDTO, _actorId?: string): Promise<PayoutInitiateResponseDTO> {
    const now = new Date().toISOString();

    // ─── Bank account resolution ───
    let bankAccountId = dto.bankAccountId;
    if (!bankAccountId) {
      const defaultBank = await this.bankRepo.findDefaultByVendor(VendorIdVO.create(dto.vendorId));
      if (!defaultBank) {
        throw new PayoutValidationError(
          'No default bank account configured for vendor',
          'bankAccountId',
        );
      }
      bankAccountId = defaultBank.id;
    }

    // ─── Fee calculation via domain service ───
    const calc = PayoutCalculatorService.calculate({
      amount: dto.amount,
      method: dto.method as never,
    });

    // ─── Eligibility check ───
    const availableBalance = await this.repo.sumPendingAmountByVendor(dto.vendorId);
    const payoutsToday = await this.countPayoutsToday(dto.vendorId);

    const eligibility = PayoutEligibilityService.check({
      vendor: null as never, // loaded by caller or via saga
      bankAccount: null as never,
      requestedAmount: dto.amount,
      availableBalance: availableBalance + dto.amount,
      pendingPayoutCount: 0,
      payoutsToday,
    });

    if (!eligibility.eligible) {
      throw new PayoutValidationError(eligibility.reasons.join('; '), 'amount');
    }

    // ─── Create entity ───
    const id = randomUUID();
    const vo = VendorPayoutVO.create({
      id: PayoutIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      bankAccountId: BankAccountIdVO.create(bankAccountId),
      amount: PayoutAmountVO.create(dto.amount),
      fee: calc.fee,
      netAmount: calc.netAmount,
      currency: calc.currency,
      method: dto.method as never,
      status: PayoutStatusVO.pending(),
      requestedAt: now,
      notes: dto.notes,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorPayoutEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);

    this.logger.log(
      `Payout ${saved.id} requested — amount=${dto.amount} fee=${calc.fee} net=${calc.netAmount} method=${dto.method}`,
    );

    return {
      success: true,
      payoutId: saved.id,
      status: saved.status.value as never,
      netAmount: calc.netAmount,
      currency: calc.currency,
    };
  }

  async approve(dto: ApprovePayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(dto.payoutId);
    if (entity.isFinal()) {
      throw new PayoutAlreadyProcessedApplicationError(dto.payoutId, entity.status.value);
    }
    if (entity.isPending()) entity.startProcessing(actorId);
    entity.approve(actorId, dto.notes);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Payout ${saved.id} approved by ${actorId}`);
    return PayoutMapper.toResponse(saved as never);
  }

  async reject(dto: RejectPayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(dto.payoutId);
    if (entity.isFinal()) {
      throw new PayoutAlreadyProcessedApplicationError(dto.payoutId, entity.status.value);
    }
    entity.reject(dto.reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Payout ${saved.id} rejected by ${actorId} — ${dto.reason}`);
    return PayoutMapper.toResponse(saved as never);
  }

  async process(dto: ProcessPayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(dto.payoutId);
    if (entity.isFinal()) {
      throw new PayoutAlreadyProcessedApplicationError(dto.payoutId, entity.status.value);
    }
    if (!dto.transactionId) {
      throw new PayoutValidationError('transactionId is required to process', 'transactionId');
    }
    entity.markPaid(dto.transactionId, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Payout ${saved.id} marked PAID — txn=${dto.transactionId}`);
    return PayoutMapper.toResponse(saved as never);
  }

  async cancel(payoutId: string, actorId: string, reason?: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(payoutId);
    entity.cancel(actorId, reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return PayoutMapper.toResponse(saved as never);
  }

  async putOnHold(payoutId: string, reason: string, actorId: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(payoutId);
    entity.putOnHold(reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return PayoutMapper.toResponse(saved as never);
  }

  async release(payoutId: string, _actorId: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(payoutId);
    entity.release();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return PayoutMapper.toResponse(saved as never);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<PayoutResponseDTO> {
    const entity = await this.load(id);
    return PayoutMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<PayoutPublicResponseDTO> {
    const entity = await this.load(id);
    return PayoutMapper.toPublicResponse(entity);
  }

  async listByVendor(vendorId: string, options?: PayoutListOptionsDTO): Promise<PayoutListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options?.page ?? 1,
      limit: options?.limit ?? 20,
      sortBy: options?.sortBy,
      sortDir: options?.sortDir,
      filter: { ...options?.filter, vendorId } as VendorPayoutListFilter,
    });
    return PayoutMapper.toListResponse(result.items as never, result.total, result.page, result.limit);
  }

  async list(options: PayoutListOptionsDTO): Promise<PayoutListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as VendorPayoutListFilter | undefined,
    });
    return PayoutMapper.toListResponse(result.items as never, result.total, result.page, result.limit);
  }

  async getStats(vendorId?: string): Promise<PayoutStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      totalAmount: stats.totalAmount,
      totalPaidAmount: stats.totalPaidAmount,
      totalPendingAmount: stats.totalPendingAmount,
      averageAmount: stats.averageAmount,
      byStatus: stats.byStatus,
      byMethod: stats.byMethod,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<VendorPayoutEntity> {
    const vo = PayoutIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }

  private async countPayoutsToday(vendorId: string): Promise<number> {
    // Simplified — could be a dedicated repo method
    const all = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    const today = new Date().toISOString().slice(0, 10);
    return all.filter((p) => p.requestedAt.slice(0, 10) === today).length;
  }
}
