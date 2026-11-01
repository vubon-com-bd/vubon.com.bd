import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  TRACKING_REPOSITORY,
  type TrackingRepository,
} from '@domain/repositories/tracking.repository.interface';
import { TrackingEntity } from '@domain/entities/tracking.entity';
import { TrackingIdVO } from '@domain/primitives/tracking-id.vo';
import { TrackingNumberVO } from '@domain/primitives/tracking-number.vo';
import { TrackingSourceVO } from '@domain/primitives/tracking-source.vo';

import { TrackingMapper } from '@application/mappers/tracking/tracking.mapper';
import { TrackingValidator } from '@application/validators/tracking/tracking.validator';

import {
  TRACKING_SERVICE,
  type ITrackingService,
  type TrackingListOptionsDTO,
} from '@application/services/interfaces/tracking.service.interface';

import type {
  TrackingResponseDTO,
  TrackingPublicResponseDTO,
  TrackingListResponseDTO,
  TrackingStatsResponseDTO,
} from '@application/dtos/responses/tracking/index.js';

import type {
  CreateTrackingRequestDTO,
  AddTrackingEventRequestDTO,
  ActivateTrackingRequestDTO,
  CompleteTrackingRequestDTO,
  FailTrackingRequestDTO,
  ExpireTrackingRequestDTO,
} from '@application/dtos/requests/tracking/index.js';

import {
  TrackingNotFoundApplicationError,
  TrackingByNumberNotFoundError,
  TrackingByShipmentNotFoundError,
  CreateTrackingError,
  TrackingAlreadyExistsError,
  TrackingOperationError,
} from '@application/errors/tracking.errors';

export interface ITrackingEventBridge {
  publishFromEntity(entity: TrackingEntity): Promise<void>;
}
export const TRACKING_EVENT_BRIDGE = Symbol('TRACKING_EVENT_BRIDGE');

@Injectable()
export class TrackingService implements ITrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(
    @Inject(TRACKING_REPOSITORY)
    private readonly repo: TrackingRepository,
    @Inject(TRACKING_EVENT_BRIDGE)
    private readonly eventBridge: ITrackingEventBridge,
  ) {}

  async create(dto: CreateTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    this.logger.log(`create tracking ${dto.trackingNumber}`);
    try {
      const v = TrackingValidator.validateCreate(dto);
      const exists = await this.repo.existsByTrackingNumber(v.trackingNumber);
      if (exists) throw new TrackingAlreadyExistsError(v.trackingNumber);

      const now = new Date().toISOString();
      const entity = TrackingEntity.create({
        id: TrackingIdVO.create(randomUUID()),
        now,
        props: {
          trackingNumber: TrackingNumberVO.create(v.trackingNumber),
          shipmentId: v.shipmentId,
          orderId: v.orderId,
          courierCode: v.courierCode,
          source: TrackingSourceVO.create(v.source),
          estimatedDeliveryAt: v.estimatedDeliveryAt,
          expiresAt: v.expiresAt,
        },
      });

      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return TrackingMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async addEvent(dto: AddTrackingEventRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    const v = TrackingValidator.validateAddEvent(dto);
    const entity = await this.loadEntity(v.trackingId);
    entity.addEvent({
      eventId: v.eventId,
      eventType: v.eventType,
      eventStatus: v.eventStatus,
      currentLocation: v.currentLocation,
    });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TrackingMapper.toResponse(saved);
  }

  async activate(dto: ActivateTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    const v = TrackingValidator.validateActivate(dto);
    const entity = await this.loadEntity(v.trackingId);
    entity.activate();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TrackingMapper.toResponse(saved);
  }

  async complete(dto: CompleteTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    const v = TrackingValidator.validateComplete(dto);
    const entity = await this.loadEntity(v.trackingId);
    entity.complete();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TrackingMapper.toResponse(saved);
  }

  async fail(dto: FailTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    const v = TrackingValidator.validateFail(dto);
    const entity = await this.loadEntity(v.trackingId);
    entity.markFailed(v.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TrackingMapper.toResponse(saved);
  }

  async expire(dto: ExpireTrackingRequestDTO, actorId: string): Promise<TrackingResponseDTO> {
    const v = TrackingValidator.validateExpire(dto);
    const entity = await this.loadEntity(v.trackingId);
    entity.expire();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return TrackingMapper.toResponse(saved);
  }

  async getById(id: string): Promise<TrackingResponseDTO> {
    const entity = await this.loadEntity(id);
    return TrackingMapper.toResponse(entity);
  }
  async getByNumber(num: string): Promise<TrackingPublicResponseDTO> {
    const entity = await this.repo.findByTrackingNumber(num);
    if (!entity) throw new TrackingByNumberNotFoundError(num);
    return TrackingMapper.toPublicResponse(entity);
  }
  async getByShipmentId(shipmentId: string): Promise<TrackingResponseDTO> {
    const entity = await this.repo.findByShipmentId(shipmentId);
    if (!entity) throw new TrackingByShipmentNotFoundError(shipmentId);
    return TrackingMapper.toResponse(entity);
  }
  async list(options: TrackingListOptionsDTO): Promise<TrackingListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return TrackingMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByOrder(orderId: string): Promise<TrackingListResponseDTO> {
    const items = await this.repo.findByOrderId(orderId);
    return TrackingMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<TrackingStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return TrackingMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<TrackingEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new TrackingNotFoundApplicationError(id);
    return entity;
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateTrackingError(err.message);
      return new TrackingOperationError(op, err.message);
    }
    return new TrackingOperationError(op, String(err));
  }
}
