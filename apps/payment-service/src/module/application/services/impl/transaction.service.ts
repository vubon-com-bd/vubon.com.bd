/**
 * TransactionService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  ITransactionService,
  TransactionListOptionsDTO,
} from '@application/services/interfaces/transaction.service.interface.js';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '@domain/repositories/transaction.repository.interface.js';
import { TransactionEntity } from '@domain/entities/transaction.entity.js';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';

import type {
  CreateTransactionRequestDTO,
  ReverseTransactionRequestDTO,
} from '@application/dtos/requests/transaction/index.js';
import type {
  TransactionResponseDTO,
  TransactionListResponseDTO,
  TransactionStatsResponseDTO,
} from '@application/dtos/responses/transaction-response.dto.js';
import {
  TransactionNotFoundApplicationError,
  TransactionCreationError,
  TransactionReversalError,
} from '@application/errors/transaction.errors.js';

@Injectable()
export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly repo: TransactionRepository,
  ) {}

  async create(
    dto: CreateTransactionRequestDTO,
    actorId?: string,
  ): Promise<TransactionResponseDTO> {
    try {
      const now = new Date().toISOString();
      const id = randomUUID();
      const entity = TransactionEntity.create({
        id: TransactionIdVO.create(id),
        now,
        props: {
          paymentId: PaymentIdVO.create(dto.paymentId),
          type: TransactionTypeVO.create(dto.type),
          amount: PaymentAmountVO.create(dto.amount, dto.currency),
        },
      });
      const saved = await this.repo.save(entity);
      this.logger.log(`Transaction ${saved.id} created by ${actorId ?? 'system'}`);
      return this.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new TransactionCreationError(dto.paymentId, msg);
    }
  }

  async reverse(
    dto: ReverseTransactionRequestDTO,
    actorId?: string,
  ): Promise<TransactionResponseDTO> {
    try {
      const entity = await this.load(dto.transactionId);
      entity.reverse(dto.reason);
      const saved = await this.repo.save(entity);
      this.logger.log(`Transaction ${saved.id} reversed by ${actorId ?? 'system'}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof TransactionNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new TransactionReversalError(dto.transactionId, msg);
    }
  }

  async getById(id: string): Promise<TransactionResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]> {
    const entities = await this.repo.findByPayment(paymentId);
    return entities.map((e) => this.toResponse(e));
  }

  async list(options: TransactionListOptionsDTO): Promise<TransactionListResponseDTO> {
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
        type: e.type.value,
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

  async getStats(paymentId?: string): Promise<TransactionStatsResponseDTO> {
    const stats = await this.repo.getStats(paymentId);
    return {
      total: stats.total,
      totalAmount: stats.totalAmount,
      currency: stats.currency,
      byType: stats.byType,
      byStatus: stats.byStatus,
    };
  }

  private async load(id: string): Promise<TransactionEntity> {
    const vo = TransactionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new TransactionNotFoundApplicationError(id);
    return entity;
  }

  private toResponse(e: TransactionEntity): TransactionResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      type: e.type.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      gatewayReference: e.gatewayReference?.value,
      failureReason: e.failureReason,
      settledAt: e.settledAt,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
