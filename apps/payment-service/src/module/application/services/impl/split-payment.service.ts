/**
 * SplitPaymentService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  ISplitPaymentService,
  SplitListOptionsDTO,
} from '@application/services/interfaces/split-payment.service.interface.js';
import {
  SPLIT_PAYMENT_REPOSITORY,
  type SplitPaymentRepository,
} from '@domain/repositories/split-payment.repository.interface.js';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity.js';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { SplitCalculationService } from '@domain/services/split-calculation.service.js';

import type { CreateSplitPaymentRequestDTO } from '@application/dtos/requests/split/index.js';
import type {
  SplitResponseDTO,
  SplitListResponseDTO,
} from '@application/dtos/responses/split-response.dto.js';

@Injectable()
export class SplitPaymentService implements ISplitPaymentService {
  private readonly logger = new Logger(SplitPaymentService.name);

  constructor(
    @Inject(SPLIT_PAYMENT_REPOSITORY)
    private readonly repo: SplitPaymentRepository,
  ) {}

  async create(
    dto: CreateSplitPaymentRequestDTO,
    actorId?: string,
  ): Promise<SplitResponseDTO> {
    const typeVO = SplitTypeVO.create(dto.type);
    const calc = SplitCalculationService.calculate({
      totalAmount: dto.totalAmount,
      currency: dto.currency,
      type: typeVO,
      receivers: dto.receivers,
    });

    const now = new Date().toISOString();
    const id = randomUUID();

    const entity = SplitPaymentEntity.create({
      id: SplitIdVO.create(id),
      now,
      props: {
        paymentId: PaymentIdVO.create(dto.paymentId),
        type: typeVO,
        totalAmount: dto.totalAmount,
        currency: dto.currency,
        receivers: calc.receivers.map((r) => ({
          receiverId: r.receiverId,
          amount: SplitAmountVO.create(r.amount, dto.currency),
          percentage: r.percentage > 0 ? SplitPercentageVO.create(r.percentage) : undefined,
        })),
      },
    });

    const saved = await this.repo.save(entity);
    this.logger.log(`SplitPayment ${saved.id} created by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async execute(splitId: string, actorId?: string): Promise<SplitResponseDTO> {
    const entity = await this.load(splitId);
    entity.execute();
    const saved = await this.repo.save(entity);
    this.logger.log(`SplitPayment ${saved.id} executed by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async getById(id: string): Promise<SplitResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByPayment(paymentId: string): Promise<readonly SplitResponseDTO[]> {
    const entities = await this.repo.findByPayment(paymentId);
    return entities.map((e) => this.toResponse(e));
  }

  async list(options: SplitListOptionsDTO): Promise<SplitListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      filter: options.filter,
    });
    return {
      items: result.items.map((e) => this.toResponse(e)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  private async load(id: string): Promise<SplitPaymentEntity> {
    const vo = SplitIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new Error(`SplitPayment "${id}" not found`);
    return entity;
  }

  private toResponse(e: SplitPaymentEntity): SplitResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      type: e.type.value,
      totalAmount: e.totalAmount,
      currency: e.currency,
      receivers: e.receivers.map((r) => ({
        receiverId: r.receiverId,
        amount: r.amount.amount,
        percentage: r.percentage?.value,
      })),
      isExecuted: e.isExecuted(),
      executedAt: e.executedAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
