/**
 * ScheduleService
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - ScheduleCalculatorService (next run computation)
 *  - Event publishing
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  SCHEDULE_REPOSITORY,
  type ScheduleRepository,
  type ScheduleListOptions,
} from '@domain/repositories/schedule.repository.interface.js';
import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ScheduleVO } from '@domain/value-objects/composites/schedule.vo.js';
import { ScheduleCalculatorService } from '@domain/services/schedule-calculator.service.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { ScheduleQueue } from '@infrastructure/queues/schedule.queue.js';

import { ScheduleMapper } from '@application/mappers/schedule.mapper.js';
import {
  ScheduleNotFoundApplicationError,
  ScheduleCreationError,
  ScheduleUpdateError,
  ScheduleCancelError,
  ScheduleValidationError,
} from '@application/errors/schedule.errors.js';

import type {
  IScheduleService,
  ScheduleListOptionsDTO,
} from '@application/services/interfaces/schedule.service.interface.js';
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  CancelScheduleRequestDTO,
} from '@application/dtos/requests/schedule/index.js';
import type {
  ScheduleResponseDTO,
  ScheduleListResponseDTO,
} from '@application/dtos/responses/schedule-response.dto.js';

@Injectable()
export class ScheduleService implements IScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly repo: ScheduleRepository,
    private readonly eventBridge: DomainEventBridgeService,
    private readonly scheduleQueue: ScheduleQueue,
  ) {}

  async create(
    dto: CreateScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO> {
    const now = new Date().toISOString();

    if (!dto.scheduledAt && !dto.cronExpression) {
      throw new ScheduleValidationError(
        'Either scheduledAt or cronExpression required',
        'scheduledAt',
      );
    }

    // Compute next run
    let nextRunAt: string | undefined;
    if (dto.scheduledAt) {
      nextRunAt = dto.scheduledAt;
    } else if (dto.cronExpression) {
      nextRunAt = ScheduleCalculatorService.nextRun({
        frequency: dto.recurrence,
        from: now,
      }).nextRunAt;
    }

    const id = randomUUID();
    let entity: ScheduleEntity;
    try {
      entity = await this.buildAndCreate({ id, dto, nextRunAt, now });

      // ─── Auto-activate schedule (pending → active) ───
      // Without this, isRunnable() returns false and trigger is skipped
      if (dto.type === 'scheduled' || dto.type === 'delayed' || dto.type === 'recurring') {
        entity.activate(nextRunAt, now);
        this.logger.log(`Schedule ${id} auto-activated (will fire at ${nextRunAt ?? 'N/A'})`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ScheduleCreationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    // ─── Enqueue trigger job ───
    if (saved.nextRunAt) {
      try {
        const scheduleTime = new Date(saved.nextRunAt).getTime();
        const delayMs = Math.max(0, scheduleTime - Date.now());
        await this.scheduleQueue.enqueueTrigger(
          {
            scheduleId: saved.id,
            scheduledFor: saved.nextRunAt,
          },
          delayMs,
        );
        this.logger.log(
          `⏰ Schedule ${saved.id} trigger enqueued — fires at ${saved.nextRunAt} (delay: ${Math.round(delayMs/1000)}s)`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`Failed to enqueue schedule trigger for ${saved.id}: ${msg}`);
      }
    }

    this.logger.log(`Schedule ${saved.id} created by ${actorId ?? 'system'}`);
    return ScheduleMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: CreateScheduleRequestDTO;
    nextRunAt?: string;
    now: string;
  }): Promise<ScheduleEntity> {
    const { id, dto, nextRunAt, now } = args;

    // ─── Primitive VOs ───
    const idVO = ScheduleIdVO.create(id);
    const typeVO = ScheduleTypeVO.create(dto.type);
    const statusVO = ScheduleStatusVO.pending();
    const frequencyVO = ScheduleFrequencyVO.create(dto.recurrence);
    const timeVO = ScheduleTimeVO.create({
      scheduledAt: dto.scheduledAt ?? now,
      timezone: dto.timezone ?? 'Asia/Dhaka',
    });
    const templateIdVO = TemplateIdVO.create(dto.templateId ?? id);
    const recipientIdsVO = (dto.recipientIds ?? []).map((rid) => UserIdVO.create(rid));

    // ─── Composite VO ───
    const vo = ScheduleVO.create({
      id: idVO,
      name: dto.name,
      type: typeVO,
      status: statusVO,
      frequency: frequencyVO,
      time: timeVO,
      templateId: templateIdVO,
      recipientIds: recipientIdsVO,
      cronExpression: dto.cronExpression,
      nextRunAt,
      lastRunAt: undefined,
      runCount: 0,
    });

    return ScheduleEntity.create({ id: idVO, vo, now });
  }

  async update(
    dto: UpdateScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    const now = new Date().toISOString();

    try {
      if (dto.scheduledAt) {
        entity.activate(dto.scheduledAt, now);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ScheduleUpdateError(dto.scheduleId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Schedule ${saved.id} updated by ${actorId ?? 'system'}`);
    return ScheduleMapper.toResponse(saved);
  }

  async cancel(
    dto: CancelScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    const now = new Date().toISOString();

    try {
      entity.cancel(dto.reason, dto.cancelledBy ?? actorId, now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ScheduleCancelError(dto.scheduleId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Schedule ${saved.id} cancelled by ${actorId ?? 'system'}`);
    return ScheduleMapper.toResponse(saved);
  }

  async getById(id: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(id);
    return ScheduleMapper.toResponse(entity);
  }

  async list(options: ScheduleListOptionsDTO): Promise<ScheduleListResponseDTO> {
    const result = await this.repo.findPaginated(options as ScheduleListOptions);
    return ScheduleMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async load(id: string): Promise<ScheduleEntity> {
    const vo = ScheduleIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new ScheduleNotFoundApplicationError(id);
    return entity;
  }
}
