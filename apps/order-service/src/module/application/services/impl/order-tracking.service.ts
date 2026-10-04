/**
 * OrderTrackingService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IOrderTrackingService } from '../interfaces/order-tracking.service.interface.js';
import {
  ORDER_TRACKING_REPOSITORY,
  type OrderTrackingRepository,
} from '../../../domain/repositories/order-tracking.repository.interface.js';
import { OrderTrackingEntity } from '../../../domain/entities/order-tracking.entity.js';
import { TrackingStatusVO } from '../../../domain/value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingMapper } from '../../mappers/tracking.mapper.js';
import { TrackingNotFoundApplicationError } from '../../errors/tracking.errors.js';
import type { AddTrackingRequestDTO } from '../../dtos/requests/tracking/add-tracking.dto.js';
import type { UpdateTrackingRequestDTO } from '../../dtos/requests/tracking/update-tracking.dto.js';
import type {
  TrackingResponseDTO,
  TrackingSummaryResponseDTO,
} from '../../dtos/responses/tracking-response.dto.js';

@Injectable()
export class OrderTrackingService implements IOrderTrackingService {
  constructor(
    @Inject(ORDER_TRACKING_REPOSITORY) private readonly repo: OrderTrackingRepository,
  ) {}

  async add(dto: AddTrackingRequestDTO, actorId?: string): Promise<TrackingResponseDTO> {
    const now = new Date().toISOString();
    const entity = OrderTrackingEntity.create({
      id: randomUUID(),
      now,
      props: {
        orderId: OrderIdVO.create(dto.orderId),
        event: TrackingStatusVO.create(dto.event),
        message: dto.message,
        location: dto.location,
        latitude: dto.latitude,
        longitude: dto.longitude,
        trackingNumber: dto.trackingNumber,
        createdBy: actorId,
        metadata: dto.metadata,
        occurredAt: dto.occurredAt ?? now,
      },
    });
    const saved = await this.repo.save(entity);
    return TrackingMapper.toResponse(saved);
  }

  async update(dto: UpdateTrackingRequestDTO, _actorId?: string): Promise<TrackingResponseDTO> {
    const entity = await this.load(dto.trackingId);
    const now = new Date().toISOString();
    const updated = OrderTrackingEntity.create({
      id: entity.id,
      now,
      props: {
        orderId: entity.orderId,
        event: TrackingStatusVO.create(dto.event),
        message: dto.message,
        location: dto.location ?? entity.location,
        latitude: entity.latitude,
        longitude: entity.longitude,
        trackingNumber: entity.trackingNumber,
        createdBy: entity.createdBy,
        metadata: entity.metadata,
        occurredAt: entity.occurredAt,
      },
    });
    const saved = await this.repo.save(updated);
    return TrackingMapper.toResponse(saved);
  }

  async getById(trackingId: string): Promise<TrackingResponseDTO> {
    const entity = await this.load(trackingId);
    return TrackingMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly TrackingResponseDTO[]> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return TrackingMapper.toList(list);
  }

  async getSummary(orderId: string): Promise<TrackingSummaryResponseDTO> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return TrackingMapper.toSummary(orderId, list);
  }

  private async load(trackingId: string): Promise<OrderTrackingEntity> {
    const entity = await this.repo.findById(trackingId);
    if (!entity) throw new TrackingNotFoundApplicationError(trackingId);
    return entity;
  }
}
