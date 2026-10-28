/**
 * OrderTrackingService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { IOrderTrackingService } from '../interfaces/order-tracking.service.interface.js';
import {
  ORDER_TRACKING_REPOSITORY,
  type OrderTrackingRepository,
} from '../../../domain/repositories/order-tracking.repository.interface.js';
import { OrderTrackingEntity } from '../../../domain/entities/order-tracking.entity.js';
import { OrderTrackingVO } from '../../../domain/value-objects/composites/order-tracking.vo.js';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../../../domain/value-objects/primitives/tracking-status.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingMapper } from '../../mappers/tracking.mapper.js';
import { TrackingNotFoundApplicationError } from '../../errors/tracking.errors.js';
import type {
  AddTrackingCommandDTO,
  UpdateTrackingCommandDTO,
} from '../../dtos/requests/tracking/index.js';
import type {
  TrackingEntryResponseDTO,
  TrackingSummaryResponseDTO,
  TrackingListResponseDTO,
} from '../../dtos/responses/tracking-response.dto.js';

@Injectable()
export class OrderTrackingService implements IOrderTrackingService {
  private readonly logger = new Logger(OrderTrackingService.name);

  constructor(
    @Inject(ORDER_TRACKING_REPOSITORY)
    private readonly repo: OrderTrackingRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async add(
    dto: AddTrackingCommandDTO,
    actorId?: string,
  ): Promise<TrackingEntryResponseDTO> {
    this.logger.log(`Adding tracking for order ${dto.orderId}`);

    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = OrderTrackingVO.create({
      id: TrackingIdVO.create(id),
      orderId: OrderIdVO.create(dto.orderId),
      trackingNumber: TrackingNumberVO.create(dto.trackingNumber ?? `TN-${id.slice(0, 8)}`),
      status: TrackingStatusVO.create(dto.event ?? 'pending'),
      message: dto.message ?? 'Tracking created',
      occurredAt: now,
    });

    const entity = OrderTrackingEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Tracking ${saved.id} added by ${actorId ?? 'system'}`);
    return TrackingMapper.toResponse(saved);
  }

  async update(
    dto: UpdateTrackingCommandDTO,
    actorId?: string,
  ): Promise<TrackingEntryResponseDTO> {
    const entity = await this.loadById(dto.trackingId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`✅ Tracking ${saved.id} updated by ${actorId ?? 'system'}`);
    return TrackingMapper.toResponse(saved);
  }

  async getById(id: string): Promise<TrackingEntryResponseDTO> {
    const entity = await this.loadById(id);
    return TrackingMapper.toResponse(entity);
  }

  async getSummaryByOrder(orderId: string): Promise<TrackingSummaryResponseDTO> {
    const entries = await this.repo.findByOrder(orderId);
    return TrackingMapper.toSummary(orderId, entries);
  }

  async listByOrder(orderId: string): Promise<TrackingListResponseDTO> {
    const entries = await this.repo.findByOrder(orderId);
    return TrackingMapper.toListResponse(entries);
  }

  async listByTrackingNumber(
    trackingNumber: string,
  ): Promise<TrackingListResponseDTO> {
    const entries = await this.repo.findByTrackingNumber(trackingNumber);
    return TrackingMapper.toListResponse(entries);
  }

  private async loadById(id: string): Promise<OrderTrackingEntity> {
    const vo = TrackingIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new TrackingNotFoundApplicationError(id);
    return entity;
  }
}
