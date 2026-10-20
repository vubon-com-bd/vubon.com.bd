/**
 * OrderFulfillmentService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type {
  IOrderFulfillmentService,
  FulfillmentListOptionsDTO,
} from '../interfaces/order-fulfillment.service.interface.js';
import {
  ORDER_FULFILLMENT_REPOSITORY,
  type OrderFulfillmentRepository,
} from '../../../domain/repositories/order-fulfillment.repository.interface.js';
import type { OrderFulfillmentEntity } from '../../../domain/entities/order-fulfillment.entity.js';
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
  ) {}

  async start(
    dto: StartFulfillmentCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    this.logger.log(`Starting fulfillment for order ${dto.orderId}`);
    throw new FulfillmentNotFoundApplicationError('new-fulfillment');
  }

  async pack(
    dto: PackOrderCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadById(dto.fulfillmentId);
    const saved = await this.repo.save(entity);
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
    return FulfillmentMapper.toResponse(saved);
  }

  async complete(
    dto: CompleteFulfillmentCommandDTO,
    _actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadById(dto.fulfillmentId);
    const saved = await this.repo.save(entity);
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
