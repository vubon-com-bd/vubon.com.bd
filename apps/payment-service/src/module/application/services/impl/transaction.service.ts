/**
 * TransactionService — orchestrates transaction recording
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ITransactionService } from '../interfaces/transaction.service.interface.js';
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from '../../../domain/repositories/transaction.repository.interface.js';
import { TransactionEntity } from '../../../domain/entities/transaction.entity.js';
import { TransactionIdVO } from '../../../domain/value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../domain/value-objects/primitives/transaction-reference.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

import { TransactionMapper } from '../../mappers/transaction.mapper.js';
import { TransactionNotFoundApplicationError } from '../../errors/transaction.errors.js';

import type {
  CreateTransactionRequestDTO,
  ListTransactionsRequestDTO,
} from '../../dtos/requests/transaction/transaction.dto.js';
import type {
  TransactionResponseDTO,
  TransactionListResponseDTO,
} from '../../dtos/responses/transaction-response.dto.js';

@Injectable()
export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly txRepo: TransactionRepository,
  ) {}

  async record(
    dto: CreateTransactionRequestDTO,
    _actorId?: string,
  ): Promise<TransactionResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const entity = TransactionEntity.create({
      id,
      now,
      props: {
        paymentId: PaymentIdVO.create(dto.paymentId),
        orderId: dto.orderId ? OrderIdVO.create(dto.orderId) : undefined,
        userId: dto.userId ? UserIdVO.create(dto.userId) : undefined,
        type: TransactionTypeVO.create(dto.type),
        amount: dto.amount,
        currency: dto.currency,
        gateway: dto.gateway,
        gatewayTransactionId: dto.gatewayTransactionId,
        reference: dto.reference ? TransactionReferenceVO.create(dto.reference) : undefined,
        idempotencyKey: dto.idempotencyKey,
        metadata: dto.metadata,
      },
    });

    const saved = await this.txRepo.save(entity);
    this.logger.debug(
      `Transaction ${saved.id} recorded — ${saved.type.value} ${saved.amount} ${saved.currency}`,
    );
    return TransactionMapper.toResponse(saved);
  }

  async markSucceeded(
    transactionId: string,
    gatewayTransactionId?: string,
  ): Promise<TransactionResponseDTO> {
    const tx = await this.loadTransaction(transactionId);
    tx.markSucceeded(gatewayTransactionId);
    const saved = await this.txRepo.save(tx);
    return TransactionMapper.toResponse(saved);
  }

  async markFailed(
    transactionId: string,
    reason: string,
    code?: string,
  ): Promise<TransactionResponseDTO> {
    const tx = await this.loadTransaction(transactionId);
    const reasonVO = FailureReasonVO.create(reason);
    const codeVO = code ? FailureCodeVO.create(code) : undefined;
    tx.markFailed(reasonVO, codeVO);
    const saved = await this.txRepo.save(tx);
    return TransactionMapper.toResponse(saved);
  }

  async getById(transactionId: string): Promise<TransactionResponseDTO> {
    const tx = await this.loadTransaction(transactionId);
    return TransactionMapper.toResponse(tx);
  }

  async listByPayment(paymentId: string): Promise<readonly TransactionResponseDTO[]> {
    const vo = PaymentIdVO.create(paymentId);
    const list = await this.txRepo.findByPaymentId(vo);
    return list.map((t) => TransactionMapper.toResponse(t));
  }

  async listByOrder(orderId: string): Promise<readonly TransactionResponseDTO[]> {
    const vo = OrderIdVO.create(orderId);
    const list = await this.txRepo.findByOrderId(vo);
    return list.map((t) => TransactionMapper.toResponse(t));
  }

  async list(options: ListTransactionsRequestDTO): Promise<TransactionListResponseDTO> {
    const result = await this.txRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: {
        paymentId: options.paymentId,
        orderId: options.orderId,
        userId: options.userId,
        type: options.type,
        status: options.status,
        gateway: options.gateway,
        fromDate: options.fromDate,
        toDate: options.toDate,
      },
    });
    return TransactionMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async loadTransaction(id: string): Promise<TransactionEntity> {
    const vo = TransactionIdVO.create(id);
    const tx = await this.txRepo.findByIdVO(vo);
    if (!tx) throw new TransactionNotFoundApplicationError(id);
    return tx;
  }
}
