/**
 * OrderFulfillmentService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { OrderFulfillmentVO } from '../../../domain/value-objects/composites/order-fulfillment.vo.js';
import { FulfillmentStatusVO } from '../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderFulfillmentEntity } from '../../../domain/entities/order-fulfillment.entity.js';
import type {
  IOrderFulfillmentService,
  FulfillmentListOptionsDTO,
} from '../interfaces/order-fulfillment.service.interface.js';
import {
  ORDER_FULFILLMENT_REPOSITORY,
  type OrderFulfillmentRepository,
} from '../../../domain/repositories/order-fulfillment.repository.interface.js';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentMapper } from '../../mappers/fulfillment.mapper.js';
import { FulfillmentNotFoundApplicationError } from '../../errors/fulfillment.errors.js';
import type {
  StartFulfillmentCommandDTO,
  PackOrderCommandDTO,
  ShipOrderCommandDTO,
  CompleteFulfillmentCommandDTO,
} from '../../dtos/requests/fulfillment/index.js';
import type {
  FulfillmentResponseDTO,
  FulfillmentListResponseDTO,
} from '../../dtos/responses/fulfillment-response.dto.js';

@Injectable()
export class OrderFulfillmentService implements IOrderFulfillmentService {
  private readonly logger = new Logger(OrderFulfillmentService.name);

  constructor(
    @Inject(ORDER_FULFILLMENT_REPOSITORY)
    private readonly repo: OrderFulfillmentRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async start(
    dto: StartFulfillmentCommandDTO,
    actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    this.logger.log(`Starting fulfillment for order ${dto.orderId}`);

    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = OrderFulfillmentVO.create({
      id: FulfillmentIdVO.create(id),
      orderId: OrderIdVO.create(dto.orderId),
      itemIds: (dto.itemIds ?? []) as readonly string[],
      status: FulfillmentStatusVO.create('unfulfilled'),
      trackingNumber: undefined,
      fulfilledAt: undefined,
    });

    const entity = OrderFulfillmentEntity.create({ id, vo, now });
    entity.start(now);

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Fulfillment ${saved.id} started by ${actorId ?? 'system'}`);
    return FulfillmentMapper.toResponse(saved);
  }

  async pack(
    dto: PackOrderCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadById(dto.fulfillmentId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return FulfillmentMapper.toResponse(saved);
  }

  async ship(
    dto: ShipOrderCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    if (!dto.fulfillmentId) {
      throw new FulfillmentNotFoundApplicationError('missing-fulfillment-id');
    }
    const entity = await this.loadById(dto.fulfillmentId);
    entity.fulfill(dto.trackingNumber);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return FulfillmentMapper.toResponse(saved);
  }

  async complete(
    dto: CompleteFulfillmentCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadById(dto.fulfillmentId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return FulfillmentMapper.toResponse(saved);
  }

  async getById(id: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadById(id);
    return FulfillmentMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly FulfillmentResponseDTO[]> {
    const entities = await this.repo.findByOrder(orderId);
    return entities.map((e) => FulfillmentMapper.toResponse(e));
  }

  async list(
    options: FulfillmentListOptionsDTO,
  ): Promise<FulfillmentListResponseDTO> {
    const entities = await this.repo.findAll();
    const filtered = entities.filter((e) => {
      const f = options.filter;
      if (!f) return true;
      if (f.orderId && e.orderId.value !== f.orderId) return false;
      if (f.status && e.status.value !== f.status) return false;
      return true;
    });
    return FulfillmentMapper.toListResponse(
      filtered,
      filtered.length,
      options.page,
      options.limit,
    );
  }

  private async loadById(id: string): Promise<OrderFulfillmentEntity> {
    const vo = FulfillmentIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new FulfillmentNotFoundApplicationError(id);
    return entity;
  }
}
