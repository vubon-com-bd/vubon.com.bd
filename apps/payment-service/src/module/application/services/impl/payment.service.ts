/**
 * PaymentService — orchestrates payment use cases
 * @module payment-service/application/services/impl
 *
 * Real business logic:
 *  - Idempotency: same key → same payment returned
 *  - Gateway routing via PaymentGatewayRouterService
 *  - Fee + VAT calculation via PaymentFeeService
 *  - Transaction recording + ledger entries
 *  - Retry with backoff
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type {
  IPaymentService,
  PaymentListOptionsDTO,
} from '../interfaces/payment.service.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../../domain/repositories/payment.repository.interface.js';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../../../domain/repositories/transaction.repository.interface.js';
import { PaymentEntity } from '../../../domain/entities/payment.entity.js';
import { TransactionEntity } from '../../../domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { PaymentStatusVO } from '../../../domain/value-objects/primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../../../domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../domain/value-objects/primitives/payment-gateway.vo.js';
import { PaymentAmountVO } from '../../../domain/value-objects/primitives/payment-amount.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { CurrencyVO } from '../../../domain/value-objects/primitives/currency.vo.js';
import { TransactionIdVO } from '../../../domain/value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../domain/value-objects/primitives/transaction-reference.vo.js';
import { IdempotencyKeyVO } from '../../../domain/value-objects/primitives/idempotency-key.vo.js';
import { GatewayPaymentIdVO } from '../../../domain/value-objects/primitives/gateway-payment-id.vo.js';
import { GatewaySignatureVO } from '../../../domain/value-objects/primitives/gateway-signature.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

import { PaymentGatewayRouterService } from '../../../domain/services/payment-gateway-router.service.js';
import { PaymentFeeService } from '../../../domain/services/payment-fee.service.js';
import { PaymentIdempotencyService } from '../../../domain/services/payment-idempotency.service.js';
import { PaymentTransactionLedgerService } from '../../../domain/services/payment-transaction-ledger.service.js';

import { PaymentMapper } from '../../mappers/payment.mapper.js';
import {
  PaymentNotFoundApplicationError,
  PaymentIdempotencyConflictError,
  PaymentInitiationError,
} from '../../errors/payment.errors.js';

import type {
  InitiatePaymentRequestDTO,
  VerifyPaymentRequestDTO,
  CapturePaymentRequestDTO,
  FailPaymentRequestDTO,
  CancelPaymentRequestDTO,
  RetryPaymentRequestDTO,
  MarkChargebackRequestDTO,
} from '../../dtos/requests/payment/initiate-payment.dto.js';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentInitiateResponseDTO,
  PaymentListResponseDTO,
  PaymentStatsResponseDTO,
  PaymentDetailResponseDTO,
} from '../../dtos/responses/payment-response.dto.js';

@Injectable()
export class PaymentService implements IPaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    @Inject(TRANSACTION_REPOSITORY) private readonly transactionRepo: TransactionRepository,
  ) {}

  // ═══════════════ INITIATE ═══════════════
  async initiate(
    dto: InitiatePaymentRequestDTO,
    userId: string,
    _actorId?: string,
  ): Promise<PaymentInitiateResponseDTO> {
    const now = new Date().toISOString();
    const orderIdVO = OrderIdVO.create(dto.orderId);
    const userIdVO = UserIdVO.create(userId);
    const currencyVO = CurrencyVO.create(dto.currency);
    const methodVO = PaymentMethodVO.create(dto.method);
    const amountVO = PaymentAmountVO.create(dto.amount, currencyVO.value);

    // ─── Idempotency check ───
    let idempotencyKey: IdempotencyKeyVO | undefined;
    if (dto.idempotencyKey) {
      idempotencyKey = IdempotencyKeyVO.create(dto.idempotencyKey);
      const existing = await this.paymentRepo.findByIdempotencyKey(idempotencyKey);
      if (existing) {
        this.logger.debug(`Idempotent hit for key ${idempotencyKey.value}`);
        return {
          success: true,
          paymentId: existing.id,
          status: existing.status.value as never,
          gatewayPaymentId: existing.gatewayPaymentId?.value,
        };
      }
    } else {
      idempotencyKey = PaymentIdempotencyService.deriveKey({
        orderId: orderIdVO.value,
        userId: userIdVO.value,
        amount: amountVO.amount,
        method: methodVO.value,
      });
      const existing = await this.paymentRepo.findByIdempotencyKey(idempotencyKey);
      if (existing) {
        return {
          success: true,
          paymentId: existing.id,
          status: existing.status.value as never,
          gatewayPaymentId: existing.gatewayPaymentId?.value,
        };
      }
    }

    // ─── Gateway routing ───
    const preferredGateway = dto.gateway
      ? PaymentGatewayVO.create(dto.gateway)
      : undefined;
    const routing = PaymentGatewayRouterService.select({
      method: methodVO,
      currency: currencyVO,
      amount: amountVO.amount,
      preferredGateway,
    });

    // ─── Create entity ───
    const id = randomUUID();
    let payment: PaymentEntity;
    try {
      payment = PaymentEntity.create({
        id,
        now,
        props: {
          orderId: orderIdVO,
          userId: userIdVO,
          type: PaymentTypeVO.oneTime(),
          method: methodVO,
          gateway: routing.gateway ?? undefined,
          amount: amountVO.amount,
          currency: currencyVO.value,
          idempotencyKey,
          metadata: dto.metadata,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentInitiationError(msg);
    }

    const saved = await this.paymentRepo.save(payment);

    // ─── Record ledger-side "intent" transaction (pending) ───
    const tx = TransactionEntity.create({
      id: randomUUID(),
      now,
      props: {
        paymentId: saved.toIdVO,
        orderId: orderIdVO,
        userId: userIdVO,
        type: TransactionTypeVO.create('payment'),
        amount: amountVO.amount,
        currency: currencyVO.value,
        gateway: saved.gateway?.value,
        reference: TransactionReferenceVO.create(`init:${saved.id}`),
        idempotencyKey: idempotencyKey?.value,
      },
    });
    await this.transactionRepo.save(tx);

    // ─── Compute fee breakdown for logging ───
    const fee = PaymentFeeService.calculate({
      amount: amountVO.amount,
      currency: currencyVO.value,
      gateway: saved.gateway ?? null,
    });
    this.logger.log(
      `Payment ${saved.id} initiated — amount=${amountVO.amount} ${currencyVO.value} gateway=${saved.gateway?.value ?? 'none'} fee=${fee.totalFee} net=${fee.netAmount}`,
    );

    // ─── Response ───
    const redirectUrl = saved.gateway?.requiresRedirect()
      ? `https://${saved.gateway.value}.vubon.com.bd/checkout/${saved.id}`
      : undefined;

    return {
      success: true,
      paymentId: saved.id,
      status: saved.status.value as never,
      redirectUrl,
      gatewayPaymentId: saved.gatewayPaymentId?.value,
    };
  }

  // ═══════════════ VERIFY ═══════════════
  async verify(
    dto: VerifyPaymentRequestDTO,
    _actorId?: string,
  ): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);

    // Simulated gateway signature check
    if (dto.gatewaySignature) {
      const sig = GatewaySignatureVO.create(dto.gatewaySignature);
      payment.status.isAuthorized()
        ? null
        : payment.authorize(
            payment.gatewayPaymentId ?? GatewayPaymentIdVO.create(`gw_${payment.id}`),
            sig,
          );
    }

    const saved = await this.paymentRepo.save(payment);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ CAPTURE ═══════════════
  async capture(
    dto: CapturePaymentRequestDTO,
    _actorId?: string,
  ): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);
    payment.capture(dto.amount);
    const saved = await this.paymentRepo.save(payment);

    // Record a successful "capture" transaction
    await this.recordSuccessfulTransaction(
      saved,
      TransactionTypeVO.create('payment'),
      saved.amount,
      `capture:${saved.id}`,
    );

    this.logger.log(`Payment ${saved.id} captured — amount=${saved.amount}`);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ MARK PAID ═══════════════
  async markPaid(paymentId: string, _actorId?: string): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(paymentId);
    payment.markPaid();
    const saved = await this.paymentRepo.save(payment);
    this.logger.log(`Payment ${saved.id} marked PAID`);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ FAIL ═══════════════
  async fail(dto: FailPaymentRequestDTO, _actorId?: string): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);
    const reason = FailureReasonVO.create(dto.reason);
    const code = dto.code ? FailureCodeVO.create(dto.code) : undefined;
    payment.fail(reason, code);
    const saved = await this.paymentRepo.save(payment);
    this.logger.warn(`Payment ${saved.id} failed — ${reason.value}`);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ CANCEL ═══════════════
  async cancel(dto: CancelPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);
    payment.cancel(dto.reason, actorId);
    const saved = await this.paymentRepo.save(payment);
    this.logger.log(`Payment ${saved.id} cancelled`);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ RETRY ═══════════════
  async retry(dto: RetryPaymentRequestDTO, _actorId?: string): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);
    payment.retry();
    const saved = await this.paymentRepo.save(payment);
    this.logger.log(
      `Payment ${saved.id} retried — attempt ${saved.retryAttempts}`,
    );
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ CHARGEBACK ═══════════════
  async chargeback(
    dto: MarkChargebackRequestDTO,
    _actorId?: string,
  ): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(dto.paymentId);
    payment.markChargeback(dto.amount, dto.reason);
    const saved = await this.paymentRepo.save(payment);
    this.logger.warn(`Payment ${saved.id} marked CHARGEBACK`);
    return PaymentMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(paymentId: string): Promise<PaymentResponseDTO> {
    const payment = await this.loadPayment(paymentId);
    return PaymentMapper.toResponse(payment);
  }

  async getPublic(paymentId: string): Promise<PaymentPublicResponseDTO> {
    const payment = await this.loadPayment(paymentId);
    return PaymentMapper.toPublicResponse(payment);
  }

  async getDetail(paymentId: string): Promise<PaymentDetailResponseDTO> {
    const payment = await this.loadPayment(paymentId);
    const txs = await this.transactionRepo.findByPaymentId(payment.toIdVO);
    return PaymentMapper.toDetail(payment, txs);
  }

  async listByOrder(orderId: string): Promise<readonly PaymentResponseDTO[]> {
    const vo = OrderIdVO.create(orderId);
    const list = await this.paymentRepo.findByOrderId(vo);
    return list.map((p) => PaymentMapper.toResponse(p));
  }

  async listByUser(
    userId: string,
    options: PaymentListOptionsDTO,
  ): Promise<PaymentListResponseDTO> {
    return this.list({
      ...options,
      filter: { ...options.filter, userId },
    });
  }

  async list(options: PaymentListOptionsDTO): Promise<PaymentListResponseDTO> {
    const result = await this.paymentRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return PaymentMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async getStats(userId?: string, gateway?: string): Promise<PaymentStatsResponseDTO> {
    const stats = await this.paymentRepo.getStats(userId, gateway);
    return {
      totalPayments: stats.totalPayments,
      totalCaptured: stats.totalCaptured,
      totalRefunded: stats.totalRefunded,
      averageAmount: stats.averageAmount,
      currency: stats.currency,
      byStatus: stats.byStatus,
      byGateway: stats.byGateway,
    };
  }

  // ═══════════════ Helpers ═══════════════
  private async loadPayment(paymentId: string): Promise<PaymentEntity> {
    const vo = PaymentIdVO.create(paymentId);
    const payment = await this.paymentRepo.findByIdVO(vo);
    if (!payment) throw new PaymentNotFoundApplicationError(paymentId);
    return payment;
  }

  private async recordSuccessfulTransaction(
    payment: PaymentEntity,
    type: TransactionTypeVO,
    amount: number,
    reference: string,
  ): Promise<void> {
    const now = new Date().toISOString();
    const tx = TransactionEntity.create({
      id: randomUUID(),
      now,
      props: {
        paymentId: payment.toIdVO,
        orderId: payment.orderId,
        userId: payment.userId,
        type,
        amount,
        currency: payment.currency,
        gateway: payment.gateway?.value,
        reference: TransactionReferenceVO.create(reference),
      },
    });
    tx.markSucceeded(undefined, now);
    await this.transactionRepo.save(tx);

    const entries = PaymentTransactionLedgerService.buildEntries(tx);
    if (!PaymentTransactionLedgerService.isBalanced(entries)) {
      this.logger.warn(`Ledger imbalance for tx ${tx.id}`);
    }
  }
}
