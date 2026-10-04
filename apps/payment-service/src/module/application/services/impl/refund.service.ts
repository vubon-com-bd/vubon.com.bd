/**
 * RefundService — orchestrates refund use cases
 * @module payment-service/application/services/impl
 *
 * Real business logic:
 *  - Eligibility check via PaymentRefundPolicyService
 *  - Partial refund when allowed
 *  - Payment entity is updated with refunded amount
 *  - Refund transaction recorded with ledger entries
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type {
  IRefundService,
  RefundListOptionsDTO,
} from '../interfaces/refund.service.interface.js';
import {
  REFUND_REPOSITORY,
  type RefundRepository,
} from '../../../domain/repositories/refund.repository.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../../domain/repositories/payment.repository.interface.js';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../../../domain/repositories/transaction.repository.interface.js';

import { RefundEntity } from '../../../domain/entities/refund.entity.js';
import { TransactionEntity } from '../../../domain/entities/transaction.entity.js';

import { RefundIdVO } from '../../../domain/value-objects/primitives/refund-id.vo.js';
import { RefundStatusVO } from '../../../domain/value-objects/primitives/refund-status.vo.js';
import { RefundReasonVO } from '../../../domain/value-objects/primitives/refund-reason.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { TransactionTypeVO } from '../../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../domain/value-objects/primitives/transaction-reference.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

import { PaymentRefundPolicyService } from '../../../domain/services/payment-refund-policy.service.js';
import { PaymentTransactionLedgerService } from '../../../domain/services/payment-transaction-ledger.service.js';

import { RefundMapper } from '../../mappers/refund.mapper.js';
import {
  RefundNotFoundApplicationError,
  RefundRequestError,
  RefundNotEligibleError,
  RefundAmountExceededApplicationError,
} from '../../errors/refund.errors.js';
import { PaymentNotFoundApplicationError } from '../../errors/payment.errors.js';

import type {
  RequestRefundRequestDTO,
  ApproveRefundRequestDTO,
  ProcessRefundRequestDTO,
  CompleteRefundRequestDTO,
  FailRefundRequestDTO,
  CancelRefundRequestDTO,
} from '../../dtos/requests/refund/refund.dto.js';
import type {
  RefundResponseDTO,
  RefundPublicResponseDTO,
  RefundRequestResponseDTO,
  RefundListResponseDTO,
} from '../../dtos/responses/refund-response.dto.js';

@Injectable()
export class RefundService implements IRefundService {
  private readonly logger = new Logger(RefundService.name);

  constructor(
    @Inject(REFUND_REPOSITORY) private readonly refundRepo: RefundRepository,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    @Inject(TRANSACTION_REPOSITORY) private readonly txRepo: TransactionRepository,
  ) {}

  // ═══════════════ REQUEST ═══════════════
  async request(
    dto: RequestRefundRequestDTO,
    actorId?: string,
  ): Promise<RefundRequestResponseDTO> {
    const now = new Date().toISOString();
    const paymentIdVO = PaymentIdVO.create(dto.paymentId);
    const payment = await this.paymentRepo.findByIdVO(paymentIdVO);
    if (!payment) throw new PaymentNotFoundApplicationError(dto.paymentId);

    const requestedAmount = dto.amount ?? payment.refundableRemaining;

    // Eligibility
    const eligibility = PaymentRefundPolicyService.checkEligibility({
      payment,
      requestedAmount,
    });
    if (!eligibility.eligible) {
      throw new RefundNotEligibleError(dto.paymentId, eligibility.reason ?? 'unknown');
    }
    if (requestedAmount > eligibility.maxRefundable) {
      throw new RefundAmountExceededApplicationError(
        dto.paymentId,
        requestedAmount,
        eligibility.maxRefundable,
        payment.currency,
      );
    }

    const reason = dto.reason ? RefundReasonVO.create(dto.reason) : undefined;
    const requestedBy = actorId ? UserIdVO.create(actorId) : undefined;

    const id = randomUUID();
    let refund: RefundEntity;
    try {
      refund = RefundEntity.request({
        id,
        now,
        props: {
          paymentId: paymentIdVO,
          orderId: payment.orderId,
          amount: requestedAmount,
          currency: payment.currency,
          reason,
          requestedBy,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RefundRequestError(dto.paymentId, msg);
    }

    const saved = await this.refundRepo.save(refund);

    this.logger.log(
      `Refund ${saved.id} requested for payment ${payment.id} — amount=${requestedAmount} ${payment.currency}`,
    );

    return {
      success: true,
      refundId: saved.id,
      status: saved.status.value,
      refundedAmount: saved.amount,
    };
  }

  // ═══════════════ APPROVE ═══════════════
  async approve(
    dto: ApproveRefundRequestDTO,
    actorId?: string,
  ): Promise<RefundResponseDTO> {
    const refund = await this.loadRefund(dto.refundId);
    const approvedBy = (dto.approvedBy ?? actorId)
      ? UserIdVO.create(dto.approvedBy ?? actorId!)
      : undefined;
    refund.approve(approvedBy);
    const saved = await this.refundRepo.save(refund);
    return RefundMapper.toResponse(saved);
  }

  // ═══════════════ PROCESS ═══════════════
  async process(
    dto: ProcessRefundRequestDTO,
    _actorId?: string,
  ): Promise<RefundResponseDTO> {
    const refund = await this.loadRefund(dto.refundId);
    refund.startProcessing(dto.gatewayRefundId);
    const saved = await this.refundRepo.save(refund);
    return RefundMapper.toResponse(saved);
  }

  // ═══════════════ COMPLETE (SUCCESS) ═══════════════
  async complete(
    dto: CompleteRefundRequestDTO,
    _actorId?: string,
  ): Promise<RefundResponseDTO> {
    const now = new Date().toISOString();
    const refund = await this.loadRefund(dto.refundId);

    // Mark refund succeeded
    refund.succeed(dto.gatewayRefundId, now);
    const savedRefund = await this.refundRepo.save(refund);

    // Update payment aggregate — refunded amount
    const payment = await this.paymentRepo.findByIdVO(refund.paymentId);
    if (payment) {
      payment.markRefunded(refund.amount, refund.id, now);
      await this.paymentRepo.save(payment);
    }

    // Record refund transaction with ledger
    const tx = TransactionEntity.create({
      id: randomUUID(),
      now,
      props: {
        paymentId: refund.paymentId,
        orderId: refund.orderId,
        type: TransactionTypeVO.create('refund'),
        amount: refund.amount,
        currency: refund.currency,
        gateway: payment?.gateway?.value,
        reference: TransactionReferenceVO.create(`refund:${refund.id}`),
      },
    });
    tx.markSucceeded(dto.gatewayRefundId, now);
    await this.txRepo.save(tx);

    const entries = PaymentTransactionLedgerService.buildEntries(tx);
    if (!PaymentTransactionLedgerService.isBalanced(entries)) {
      this.logger.warn(`Ledger imbalance for refund tx ${tx.id}`);
    }

    this.logger.log(
      `Refund ${savedRefund.id} completed — amount=${savedRefund.amount} ${savedRefund.currency}`,
    );
    return RefundMapper.toResponse(savedRefund);
  }

  // ═══════════════ FAIL ═══════════════
  async fail(dto: FailRefundRequestDTO, _actorId?: string): Promise<RefundResponseDTO> {
    const refund = await this.loadRefund(dto.refundId);
    const reason = FailureReasonVO.create(dto.reason);
    const code = dto.code ? FailureCodeVO.create(dto.code) : undefined;
    refund.fail(reason, code);
    const saved = await this.refundRepo.save(refund);
    this.logger.warn(`Refund ${saved.id} failed — ${reason.value}`);
    return RefundMapper.toResponse(saved);
  }

  // ═══════════════ CANCEL ═══════════════
  async cancel(dto: CancelRefundRequestDTO, _actorId?: string): Promise<RefundResponseDTO> {
    const refund = await this.loadRefund(dto.refundId);
    refund.cancel(dto.reason);
    const saved = await this.refundRepo.save(refund);
    return RefundMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(refundId: string): Promise<RefundResponseDTO> {
    const refund = await this.loadRefund(refundId);
    return RefundMapper.toResponse(refund);
  }

  async getPublic(refundId: string): Promise<RefundPublicResponseDTO> {
    const refund = await this.loadRefund(refundId);
    return RefundMapper.toPublicResponse(refund);
  }

  async listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]> {
    const vo = PaymentIdVO.create(paymentId);
    const list = await this.refundRepo.findByPaymentId(vo);
    return list.map((r) => RefundMapper.toResponse(r));
  }

  async list(options: RefundListOptionsDTO): Promise<RefundListResponseDTO> {
    const result = await this.refundRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: {
        paymentId: options.paymentId,
        orderId: options.orderId,
        status: options.status,
        fromDate: options.fromDate,
        toDate: options.toDate,
      },
    });
    return RefundMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  // ═══════════════ Helpers ═══════════════
  private async loadRefund(refundId: string): Promise<RefundEntity> {
    const vo = RefundIdVO.create(refundId);
    const refund = await this.refundRepo.findByIdVO(vo);
    if (!refund) throw new RefundNotFoundApplicationError(refundId);
    return refund;
  }
}
