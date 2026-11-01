/**
 * DeliveryService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type {
  IDeliveryService,
  DeliveryListOptionsDTO,
} from '../interfaces/delivery.service.interface.js';
import {
  DELIVERY_REPOSITORY,
  type DeliveryRepository,
} from '../../../domain/repositories/delivery.repository.interface.js';
import { DeliveryEntity } from '../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { DeliveryVO } from '../../../domain/value-objects/composites/delivery.vo.js';
import { randomUUID } from 'node:crypto';
import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import { DeliveryNotFoundApplicationError } from '../../errors/delivery.errors.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type {
  ScheduleDeliveryCommandDTO,
  RescheduleDeliveryCommandDTO,
  ConfirmDeliveryCommandDTO,
} from '../../dtos/requests/delivery/index.js';
import type {
  DeliveryResponseDTO,
  DeliveryListResponseDTO,
} from '../../dtos/responses/delivery-response.dto.js';

@Injectable()
export class DeliveryService implements IDeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly repo: DeliveryRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async schedule(
    dto: ScheduleDeliveryCommandDTO,
    actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    this.logger.log(`Scheduling delivery for order ${dto.orderId}`);

    try {
      const now = new Date().toISOString();
      const id = randomUUID();

      const vo = DeliveryVO.create({
        id: DeliveryIdVO.create(id),
        orderId: OrderIdVO.create(dto.orderId),
        methodId: DeliveryMethodIdVO.create(dto.deliveryMethodId ?? randomUUID()),
        status: DeliveryStatusVO.pending(),
        type: DeliveryTypeVO.create(dto.type ?? 'standard'),
        estimatedAt: dto.estimatedAt,
        attempts: 0,
      });

      const entity = DeliveryEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(`✅ Delivery ${saved.id} scheduled for order ${dto.orderId} by ${actorId ?? 'system'}`);
      return DeliveryMapper.toResponse(saved);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      this.logger.error(`Failed to schedule delivery for order ${dto.orderId}: ${msg}`);
      throw err;
    }
  }

  async reschedule(
    dto: RescheduleDeliveryCommandDTO,
    _actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    const entity = await this.loadById(dto.deliveryId);
    entity.reschedule(dto.reason, dto.newEstimatedAt);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async confirm(
    dto: ConfirmDeliveryCommandDTO,
    _actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    const entity = await this.loadById(dto.deliveryId);
    const now = new Date().toISOString();
    const status = entity.status.value;

    this.logger.log(`Confirming delivery ${dto.deliveryId} (status: ${status})`);

    // Fast-track: mark as delivered directly (state machine now allows pending/scheduled → delivered)
    this.logger.log(`  → marking as delivered`);
    entity.markDelivered(dto.receivedBy, dto.signature, now);

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`✅ Delivery ${saved.id} confirmed for order ${saved.orderId.value}`);
    return DeliveryMapper.toResponse(saved);
  }

  async getById(id: string): Promise<DeliveryResponseDTO> {
    const entity = await this.loadById(id);
    return DeliveryMapper.toResponse(entity);
  }

  async list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO> {
    const page = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return DeliveryMapper.toListResponse(
      page.items,
      page.total,
      page.page,
      page.limit,
    );
  }

  private async loadById(id: string): Promise<DeliveryEntity> {
    const vo = DeliveryIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new DeliveryNotFoundApplicationError(id);
    return entity;
  }
}
