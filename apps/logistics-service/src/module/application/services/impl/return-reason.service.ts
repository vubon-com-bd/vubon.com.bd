import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  RETURN_REASON_REPOSITORY,
  type ReturnReasonRepository,
} from '@domain/repositories/return-reason.repository.interface';
import { ReturnReasonEntity } from '@domain/entities/return-reason.entity';
import { ReturnReasonIdVO } from '@domain/primitives/return-reason-id.vo';
import { ReturnReasonTypeVO } from '@domain/primitives/return-reason-type.vo';
import { ReturnReasonLabelVO } from '@domain/primitives/return-reason-label.vo';

import { ReturnReasonMapper } from '@application/mappers/return-reason/return-reason.mapper';
import { ReturnReasonValidator } from '@application/validators/return-reason/return-reason.validator';

import {
  RETURN_REASON_SERVICE,
  type IReturnReasonService,
  type ReturnReasonListOptionsDTO,
} from '@application/services/interfaces/return-reason.service.interface';

import type {
  ReturnReasonResponseDTO,
  ReturnReasonListResponseDTO,
  ReturnReasonStatsResponseDTO,
} from '@application/dtos/responses/return-reason/index.js';

import type {
  CreateReturnReasonRequestDTO,
  UpdateReturnReasonRequestDTO,
  ReturnReasonActionRequestDTO,
  DeactivateReturnReasonRequestDTO,
} from '@application/dtos/requests/return-reason/index.js';

import {
  ReturnReasonNotFoundApplicationError,
  ReturnReasonByCodeNotFoundError,
  CreateReturnReasonError,
  ReturnReasonAlreadyExistsError,
  ReturnReasonOperationError,
} from '@application/errors/return-reason.errors';

export interface IReturnReasonEventBridge {
  publishFromEntity(entity: ReturnReasonEntity): Promise<void>;
}
export const RETURN_REASON_EVENT_BRIDGE = Symbol('RETURN_REASON_EVENT_BRIDGE');

@Injectable()
export class ReturnReasonService implements IReturnReasonService {
  private readonly logger = new Logger(ReturnReasonService.name);

  constructor(
    @Inject(RETURN_REASON_REPOSITORY)
    private readonly repo: ReturnReasonRepository,
    @Inject(RETURN_REASON_EVENT_BRIDGE)
    private readonly eventBridge: IReturnReasonEventBridge,
  ) {}

  async create(dto: CreateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO> {
    this.logger.log(`create return reason code=${dto.code}`);
    try {
      const v = ReturnReasonValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new ReturnReasonAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const entity = ReturnReasonEntity.create({
        id: ReturnReasonIdVO.create(randomUUID()),
        now,
        props: {
          code: v.code,
          type: ReturnReasonTypeVO.create(v.type),
          label: ReturnReasonLabelVO.create(v.label),
          description: v.description,
          requiresPhoto: v.requiresPhoto,
          autoApprove: v.autoApprove,
          isActive: true,
          priority: v.priority ?? 0,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return ReturnReasonMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO> {
    const v = ReturnReasonValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.reasonId);
    entity.updateDetails({
      label: v.label ? ReturnReasonLabelVO.create(v.label) : undefined,
      description: v.description,
      requiresPhoto: v.requiresPhoto,
      autoApprove: v.autoApprove,
      priority: v.priority,
    });
    return this.persistAndPublish(entity);
  }

  async activate(dto: ReturnReasonActionRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO> {
    const v = ReturnReasonValidator.validateAction(dto);
    const entity = await this.loadEntity(v.reasonId);
    entity.activate();
    return this.persistAndPublish(entity);
  }

  async deactivate(dto: DeactivateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO> {
    const v = ReturnReasonValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.reasonId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<ReturnReasonResponseDTO> {
    const entity = await this.loadEntity(id);
    return ReturnReasonMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<ReturnReasonResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new ReturnReasonByCodeNotFoundError(code);
    return ReturnReasonMapper.toResponse(entity);
  }
  async list(options: ReturnReasonListOptionsDTO): Promise<ReturnReasonListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return ReturnReasonMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listActive(): Promise<ReturnReasonListResponseDTO> {
    const items = await this.repo.findActive();
    return ReturnReasonMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByType(type: string): Promise<ReturnReasonListResponseDTO> {
    const items = await this.repo.findByType(type);
    return ReturnReasonMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<ReturnReasonStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return ReturnReasonMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<ReturnReasonEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new ReturnReasonNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: ReturnReasonEntity): Promise<ReturnReasonResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ReturnReasonMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateReturnReasonError(err.message);
      return new ReturnReasonOperationError(op, err.message);
    }
    return new ReturnReasonOperationError(op, String(err));
  }
}
