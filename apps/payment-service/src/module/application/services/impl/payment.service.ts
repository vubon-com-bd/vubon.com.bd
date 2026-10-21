/**
 * PaymentService — orchestrates payment use cases
 * @module payment-service/application/services/impl
 *
 * Real business logic:
 *  - Idempotency check (cache + repo)
 *  - Event publishing via DomainEventBridge
 *  - Error wrapping (domain → application errors)
 *  - Rich logging
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  IPaymentService,
  PaymentListOptionsDTO,
} from '@application/services/interfaces/payment.service.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';
import { PaymentEntity } from '@domain/entities/payment.entity.js';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { PaymentValidationService } from '@domain/services/payment-validation.service.js';

import {
  PaymentInitiationError,
  PaymentConfirmationError,
  PaymentCancellationError,
  PaymentRetryError,
  PaymentVerificationError,
  PaymentNotFoundApplicationError,
} from '@application/errors/payment.errors.js';

import type {
  InitiatePaymentRequestDTO,
  ConfirmPaymentRequestDTO,
  CancelPaymentRequestDTO,
  RetryPaymentRequestDTO,
  VerifyPaymentRequestDTO,
} from '@application/dtos/requests/payment/index.js';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentListResponseDTO,
  PaymentStatsResponseDTO,
  PaymentInitiateResponseDTO,
} from '@application/dtos/responses/payment-response.dto.js';

/**
 * Domain event bridge — injected from infrastructure.
 * Interface is defined locally to avoid deep kernel coupling.
 */
export interface IDomainEventBridge {
  publishFromEntity(entity: PaymentEntity): Promise<void>;
}
export const DOMAIN_EVENT_BRIDGE = Symbol('DOMAIN_EVENT_BRIDGE');

@Injectable()
export class PaymentService implements IPaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
    @Inject(DOMAIN_EVENT_BRIDGE)
    private readonly eventBridge: IDomainEventBridge,
  ) {}

  // ═══════════════ INITIATE ═══════════════
  async initiate(
    dto: InitiatePaymentRequestDTO,
    userId: string,
  ): Promise<PaymentInitiateResponseDTO> {
    const now = new Date().toISOString();
    try {
      const id = randomUUID();
      const amountVO = PaymentAmountVO.create(dto.amount, dto.currency);
      const currencyVO = PaymentCurrencyVO.create(dto.currency);
      const methodVO = PaymentMethodTypeVO.create(dto.method, this.inferMethodType(dto.method));
      const provider = dto.gateway
        ? PaymentMethodProviderVO.create(dto.gateway, 'production')
        : undefined;

      const entity = PaymentEntity.create({
        id: PaymentIdVO.create(id),
        now,
        props: {
          orderId: OrderIdVO.create(dto.orderId),
          userId: UserIdVO.create(userId),
          amount: amountVO,
          currency: currencyVO,
          method: methodVO,
          provider,
          metadata: dto.metadata,
        },
      });

      PaymentValidationService.assertValid(entity);
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(
        `Payment ${saved.id} initiated — amount=${dto.amount} ${dto.currency} by ${userId}`,
      );

      return {
        success: true,
        paymentId: saved.id,
        status: saved.status.value,
        redirectUrl: dto.returnUrl,
      };
    } catch (e) {
      if (e instanceof PaymentInitiationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentInitiationError(msg);
    }
  }

  // ═══════════════ CONFIRM ═══════════════
  async confirm(
    dto: ConfirmPaymentRequestDTO,
    actorId?: string,
  ): Promise<PaymentResponseDTO> {
    try {
      const entity = await this.loadEntity(dto.paymentId);
      if (dto.gatewayReference) {
        entity.capture(dto.confirmedAmount ?? entity.amount.amount, dto.gatewayReference);
      } else {
        entity.markPaid();
      }
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Payment ${saved.id} confirmed by ${actorId ?? 'system'}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof PaymentNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentConfirmationError(dto.paymentId, msg);
    }
  }

  // ═══════════════ CANCEL ═══════════════
  async cancel(
    dto: CancelPaymentRequestDTO,
    actorId?: string,
  ): Promise<PaymentResponseDTO> {
    try {
      const entity = await this.loadEntity(dto.paymentId);
      entity.cancel(dto.reason, actorId ?? 'system');
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Payment ${saved.id} cancelled by ${actorId ?? 'system'}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof PaymentNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentCancellationError(dto.paymentId, msg);
    }
  }

  // ═══════════════ RETRY ═══════════════
  async retry(
    dto: RetryPaymentRequestDTO,
    actorId?: string,
  ): Promise<PaymentResponseDTO> {
    try {
      const entity = await this.loadEntity(dto.paymentId);
      entity.startProcessing();
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Payment ${saved.id} retried by ${actorId ?? 'system'}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof PaymentNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentRetryError(dto.paymentId, msg);
    }
  }

  // ═══════════════ VERIFY ═══════════════
  async verify(
    dto: VerifyPaymentRequestDTO,
    userId: string,
  ): Promise<PaymentResponseDTO> {
    try {
      const entity = await this.loadEntity(dto.paymentId);
      PaymentValidationService.assertValid(entity);
      this.logger.log(`Payment ${entity.id} verified by ${userId}`);
      return this.toResponse(entity);
    } catch (e) {
      if (e instanceof PaymentNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentVerificationError(dto.paymentId, msg);
    }
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<PaymentResponseDTO> {
    const entity = await this.loadEntity(id);
    return this.toResponse(entity);
  }

  async getPublic(id: string): Promise<PaymentPublicResponseDTO> {
    const entity = await this.loadEntity(id);
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      status: entity.status.value,
      method: entity.method.method,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      refundedAmount: entity.refundedAmount,
      createdAt: entity.createdAt,
      capturedAt: entity.capturedAt,
    };
  }

  async list(options: PaymentListOptionsDTO): Promise<PaymentListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((e) => ({
        id: e.id,
        orderId: e.orderId.value,
        status: e.status.value,
        amount: e.amount.amount,
        currency: e.currency.value,
        createdAt: e.createdAt,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getStats(userId?: string): Promise<PaymentStatsResponseDTO> {
    const stats = await this.repo.getStats(userId);
    return {
      total: stats.total,
      totalAmount: stats.totalAmount,
      averageAmount: stats.total > 0 ? stats.totalAmount / stats.total : 0,
      currency: stats.currency,
      byStatus: stats.byStatus,
      byMethod: stats.byMethod ?? {},
    };
  }

  // ═══════════════ Helpers ═══════════════
  private async loadEntity(id: string): Promise<PaymentEntity> {
    const vo = PaymentIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new PaymentNotFoundApplicationError(id);
    return entity;
  }

  private toResponse(e: PaymentEntity): PaymentResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId.value,
      userId: e.userId.value,
      status: e.status.value,
      method: e.method.method,
      gateway: e.provider?.provider,
      amount: e.amount.amount,
      currency: e.currency.value,
      gatewayReference: e.gatewayReference?.value,
      refundedAmount: e.refundedAmount || undefined,
      failureReason: e.failureReason,
      failureCode: e.failureCode,
      authorizedAt: e.authorizedAt,
      capturedAt: e.capturedAt,
      paidAt: e.paidAt,
      metadata: e.metadata,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  private inferMethodType(method: string): string {
    switch (method) {
      case 'cash_on_delivery':
        return 'offline';
      case 'wallet':
      case 'mobile_banking':
        return 'instant';
      case 'credit_card':
      case 'debit_card':
      case 'card':
        return 'online';
      default:
        return 'online';
    }
  }
}
