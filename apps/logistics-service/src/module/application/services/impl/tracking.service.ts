/**
 * TrackingService — orchestrates tracking timeline
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { ITrackingService, TrackingListOptionsDTO } from '../interfaces/tracking.service.interface.js';
import { TRACKING_REPOSITORY, type TrackingRepository } from '../../../domain/repositories/tracking.repository.interface.js';
import { TrackingEntity } from '../../../domain/entities/tracking.entity.js';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';

import { TrackingMapper } from '../../mappers/tracking.mapper.js';
import { TrackingNotFoundApplicationError, TrackingOperationFailedApplicationError } from '../../errors/tracking.errors.js';

import type {
  StartTrackingRequestDTO, RecordTrackingEventRequestDTO, UpdateTrackingEtaRequestDTO,
} from '../../dtos/requests/tracking/tracking.dto.js';
import type {
  TrackingResponseDTO, TrackingPublicResponseDTO, TrackingListResponseDTO,
} from '../../dtos/responses/tracking/tracking-response.dto.js';

@Injectable()
export class TrackingService implements ITrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(@Inject(TRACKING_REPOSITORY) private readonly repo: TrackingRepository) {}

  async start(dto: StartTrackingRequestDTO, actorId?: string): Promise<TrackingResponseDTO> {
    const now = new Date().toISOString();
    const trackingNumberVO = TrackingNumberVO.create(dto.trackingNumber);
    if (await this.repo.existsByTrackingNumber(trackingNumberVO)) {
      throw new TrackingOperationFailedApplicationError('start', `tracking exists: ${dto.trackingNumber}`);
    }
    const id = randomUUID();
    const entity = TrackingEntity.start({
      id, now,
      trackingNumber: trackingNumberVO,
      shipmentId: dto.shipmentId ? ShipmentIdVO.create(dto.shipmentId) : undefined,
      orderId: dto.orderId ? OrderIdVO.create(dto.orderId) : undefined,
      courierCode: dto.courierCode,
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Tracking ${saved.id} started by ${actorId ?? 'system'}`);
    return TrackingMapper.toResponse(saved);
  }

  async recordEvent(dto: RecordTrackingEventRequestDTO, actorId?: string): Promise<TrackingResponseDTO> {
    const entity = await this.load(dto.trackingId);
    entity.recordEvent({
      id: randomUUID(),
      event: dto.event,
      status: dto.status,
      source: dto.source,
      message: dto.message,
      location: dto.location,
      latitude: dto.latitude,
      longitude: dto.longitude,
      occurredAt: dto.occurredAt,
      metadata: dto.metadata,
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Tracking ${saved.id} event recorded by ${actorId ?? 'system'}`);
    return TrackingMapper.toResponse(saved);
  }

  async updateEta(dto: UpdateTrackingEtaRequestDTO, actorId?: string): Promise<TrackingResponseDTO> {
    const entity = await this.load(dto.trackingId);
    entity.updateEstimatedDelivery(dto.newEta);
    const saved = await this.repo.save(entity);
    this.logger.log(`Tracking ${saved.id} ETA updated by ${actorId ?? 'system'}`);
    return TrackingMapper.toResponse(saved);
  }

  async getById(trackingId: string): Promise<TrackingResponseDTO> {
    return TrackingMapper.toResponse(await this.load(trackingId));
  }

  async getByTrackingNumber(trackingNumber: string): Promise<TrackingResponseDTO> {
    const vo = TrackingNumberVO.create(trackingNumber);
    const t = await this.repo.findByTrackingNumber(vo);
    if (!t) throw new TrackingNotFoundApplicationError(trackingNumber);
    return TrackingMapper.toResponse(t);
  }

  async getPublicByTrackingNumber(trackingNumber: string): Promise<TrackingPublicResponseDTO> {
    const vo = TrackingNumberVO.create(trackingNumber);
    const t = await this.repo.findPublicByTrackingNumber(vo);
    if (!t) throw new TrackingNotFoundApplicationError(trackingNumber);
    return TrackingMapper.toPublicResponse(t);
  }

  async list(options: TrackingListOptionsDTO): Promise<TrackingListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return TrackingMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<TrackingEntity> {
    const vo = TrackingIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new TrackingNotFoundApplicationError(id);
    return e;
  }
}
