/**
 * RecurringPaymentService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  IRecurringPaymentService,
  RecurringListOptionsDTO,
} from '@application/services/interfaces/recurring-payment.service.interface.js';
import {
  RECURRING_PAYMENT_REPOSITORY,
  type RecurringPaymentRepository,
} from '@domain/repositories/recurring-payment.repository.interface.js';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity.js';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { RecurringScheduleService } from '@domain/services/recurring-schedule.service.js';

import type {
  CreateRecurringRequestDTO,
  PauseRecurringRequestDTO,
  CancelRecurringRequestDTO,
} from '@application/dtos/requests/recurring/index.js';
import type {
  RecurringResponseDTO,
  RecurringListResponseDTO,
} from '@application/dtos/responses/recurring-response.dto.js';

@Injectable()
export class RecurringPaymentService implements IRecurringPaymentService {
  private readonly logger = new Logger(RecurringPaymentService.name);

  constructor(
    @Inject(RECURRING_PAYMENT_REPOSITORY)
    private readonly repo: RecurringPaymentRepository,
  ) {}

  async create(
    dto: CreateRecurringRequestDTO,
    userId: string,
  ): Promise<RecurringResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();
    const frequency = RecurringFrequencyVO.create(dto.interval, dto.intervalCount);
    const schedule = RecurringScheduleService.computeNextRun({
      frequency,
      startAt: dto.startAt,
      endAt: dto.endAt,
    });

    const entity = RecurringPaymentEntity.create({
      id: RecurringIdVO.create(id),
      now,
      props: {
        paymentId: PaymentIdVO.create(dto.paymentId),
        frequency,
        amount: PaymentAmountVO.create(dto.amount, dto.currency),
        startAt: dto.startAt,
        endAt: dto.endAt,
        nextRunAt: schedule.nextRunAt,
      },
    });
    entity.activate();
    const saved = await this.repo.save(entity);
    this.logger.log(`Recurring ${saved.id} created for ${userId}`);
    return this.toResponse(saved);
  }

  async pause(
    dto: PauseRecurringRequestDTO,
    actorId?: string,
  ): Promise<RecurringResponseDTO> {
    const entity = await this.load(dto.recurringId);
    entity.pause();
    const saved = await this.repo.save(entity);
    this.logger.log(`Recurring ${saved.id} paused by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async cancel(
    dto: CancelRecurringRequestDTO,
    actorId?: string,
  ): Promise<RecurringResponseDTO> {
    const entity = await this.load(dto.recurringId);
    entity.cancel(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Recurring ${saved.id} cancelled by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async getById(id: string): Promise<RecurringResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByPayment(paymentId: string): Promise<readonly RecurringResponseDTO[]> {
    const entities = await this.repo.findByPayment(paymentId);
    return entities.map((e) => this.toResponse(e));
  }

  async list(options: RecurringListOptionsDTO): Promise<RecurringListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      filter: options.filter,
    });
    return {
      items: result.items.map((e) => ({
        id: e.id,
        status: e.status.value,
        amount: e.amount.amount,
        currency: e.amount.currency,
        nextRunAt: e.nextRunAt,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  private async load(id: string): Promise<RecurringPaymentEntity> {
    const vo = RecurringIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new Error(`Recurring "${id}" not found`);
    return entity;
  }

  private toResponse(e: RecurringPaymentEntity): RecurringResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      status: e.status.value,
      interval: e.frequency.interval,
      intervalCount: e.frequency.intervalCount,
      amount: e.amount.amount,
      currency: e.amount.currency,
      startAt: e.startAt,
      endAt: e.endAt,
      nextRunAt: e.nextRunAt,
      attemptCount: e.attemptCount,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
