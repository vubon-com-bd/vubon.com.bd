/**
 * RefundService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  IRefundService,
  RefundListOptionsDTO,
} from '@application/services/interfaces/refund.service.interface.js';
import {
  REFUND_REPOSITORY,
  type RefundRepository,
} from '@domain/repositories/refund.repository.interface.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';
import { RefundEntity } from '@domain/entities/refund.entity.js';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentIdVO as _PaymentIdVO } from '@domain/primitives/payment-id.vo';

import type {
  RequestRefundRequestDTO,
  ApproveRefundRequestDTO,
  RejectRefundRequestDTO,
  PartialRefundRequestDTO,
} from '@application/dtos/requests/refund/index.js';
import type {
  RefundResponseDTO,
  RefundListResponseDTO,
  RefundStatsResponseDTO,
  RefundInitiateResponseDTO,
} from '@application/dtos/responses/refund-response.dto.js';
import {
  RefundNotFoundApplicationError,
  RefundRequestError,
  RefundApprovalError,
  RefundRejectionError,
  PartialRefundError,
} from '@application/errors/refund.errors.js';

@Injectable()
export class RefundService implements IRefundService {
  private readonly logger = new Logger(RefundService.name);

  constructor(
    @Inject(REFUND_REPOSITORY)
    private readonly repo: RefundRepository,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepo: PaymentRepository,
  ) {}

  async request(
    dto: RequestRefundRequestDTO,
    actorId?: string,
  ): Promise<RefundInitiateResponseDTO> {
    try {
      const payment = await this.paymentRepo.findByIdVO(PaymentIdVO.create(dto.paymentId));
      if (!payment) {
        throw new RefundNotFoundApplicationError(dto.paymentId);
      }
      const amount = dto.amount ?? payment.remainingRefundableAmount();
      const now = new Date().toISOString();
      const id = randomUUID();
      const entity = RefundEntity.create({
        id: RefundIdVO.create(id),
        now,
        props: {
          paymentId: PaymentIdVO.create(dto.paymentId),
          amount: RefundAmountVO.create(amount, payment.currency.value),
          reason: RefundReasonVO.create('customer_request', dto.reason),
          requestedBy: actorId,
        },
      });
      const saved = await this.repo.save(entity);
      this.logger.log(`Refund ${saved.id} requested for payment ${dto.paymentId}`);
      return {
        success: true,
        refundId: saved.id,
        status: saved.status.value,
      };
    } catch (e) {
      if (e instanceof RefundNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RefundRequestError(dto.paymentId, msg);
    }
  }

  async approve(
    dto: ApproveRefundRequestDTO,
    approvedBy: string,
  ): Promise<RefundResponseDTO> {
    try {
      const entity = await this.load(dto.refundId);
      entity.approve(approvedBy);
      entity.startProcessing();
      const saved = await this.repo.save(entity);
      this.logger.log(`Refund ${saved.id} approved by ${approvedBy}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof RefundNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RefundApprovalError(dto.refundId, msg);
    }
  }

  async reject(
    dto: RejectRefundRequestDTO,
    rejectedBy: string,
  ): Promise<RefundResponseDTO> {
    try {
      const entity = await this.load(dto.refundId);
      entity.reject(dto.reason);
      const saved = await this.repo.save(entity);
      this.logger.log(`Refund ${saved.id} rejected by ${rejectedBy}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof RefundNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RefundRejectionError(dto.refundId, msg);
    }
  }

  async partial(
    dto: PartialRefundRequestDTO,
    actorId?: string,
  ): Promise<RefundResponseDTO> {
    try {
      const payment = await this.paymentRepo.findByIdVO(PaymentIdVO.create(dto.paymentId));
      if (!payment) throw new RefundNotFoundApplicationError(dto.paymentId);
      const now = new Date().toISOString();
      const id = randomUUID();
      const entity = RefundEntity.create({
        id: RefundIdVO.create(id),
        now,
        props: {
          paymentId: _PaymentIdVO.create(dto.paymentId),
          amount: RefundAmountVO.create(dto.amount, dto.currency),
          reason: RefundReasonVO.create('customer_request', dto.reason),
          requestedBy: actorId,
        },
      });
      const saved = await this.repo.save(entity);
      this.logger.log(`Partial refund ${saved.id} created for ${dto.paymentId}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof RefundNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PartialRefundError(dto.paymentId, msg);
    }
  }

  async getById(id: string): Promise<RefundResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]> {
    const entities = await this.repo.findByPayment(paymentId);
    return entities.map((e) => this.toResponse(e));
  }

  async list(options: RefundListOptionsDTO): Promise<RefundListResponseDTO> {
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
        status: e.status.value,
        amount: e.amount.amount,
        currency: e.amount.currency,
        createdAt: e.createdAt,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getStats(paymentId?: string): Promise<RefundStatsResponseDTO> {
    const stats = await this.repo.getStats(paymentId);
    return {
      total: stats.total,
      totalRefunded: stats.totalRefunded,
      currency: stats.currency,
      byStatus: stats.byStatus,
      byReason: stats.byReason,
    };
  }

  private async load(id: string): Promise<RefundEntity> {
    const vo = RefundIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new RefundNotFoundApplicationError(id);
    return entity;
  }

  private toResponse(e: RefundEntity): RefundResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      reason: e.reason.reason,
      note: e.reason.note,
      approvedBy: e.approvedBy,
      completedAt: e.completedAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
