/**
 * OrderFulfillmentService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IOrderFulfillmentService } from '../interfaces/order-fulfillment.service.interface.js';
import {
  ORDER_FULFILLMENT_REPOSITORY,
  type OrderFulfillmentRepository,
} from '../../../domain/repositories/order-fulfillment.repository.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderFulfillmentEntity } from '../../../domain/entities/order-fulfillment.entity.js';
import { FulfillmentStatusVO } from '../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { FulfillmentMapper } from '../../mappers/fulfillment.mapper.js';
import { FulfillmentNotFoundApplicationError } from '../../errors/fulfillment.errors.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/start-fulfillment.dto.js';
import type { PackOrderRequestDTO } from '../../dtos/requests/fulfillment/pack-order.dto.js';
import type { ShipOrderRequestDTO } from '../../dtos/requests/fulfillment/ship-order.dto.js';
import type { CompleteFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/complete-fulfillment.dto.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@Injectable()
export class OrderFulfillmentService implements IOrderFulfillmentService {
  constructor(
    @Inject(ORDER_FULFILLMENT_REPOSITORY) private readonly repo: OrderFulfillmentRepository,
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async start(dto: StartFulfillmentRequestDTO, _actorId?: string): Promise<FulfillmentResponseDTO> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);

    const now = new Date().toISOString();
    const entity = OrderFulfillmentEntity.create({
      id: randomUUID(),
      now,
      props: {
        orderId: OrderIdVO.create(dto.orderId),
        vendorId: dto.vendorId ? VendorIdVO.create(dto.vendorId) : undefined,
        status: FulfillmentStatusVO.unfulfilled(),
        type: dto.type,
        itemIds: dto.itemIds.map((id) => OrderItemIdVO.create(id)),
        courierId: dto.courierId,
        warehouseId: dto.warehouseId,
        currency: order.currency,
      },
    });
    const saved = await this.repo.save(entity);
    return FulfillmentMapper.toResponse(saved);
  }

  async pack(dto: PackOrderRequestDTO, _actorId?: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.load(dto.fulfillmentId);
    entity.pack(dto.packageCount, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return FulfillmentMapper.toResponse(saved);
  }

  async ship(dto: ShipOrderRequestDTO, _actorId?: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.load(dto.fulfillmentId ?? '');
    const tracking = dto.trackingNumber ? TrackingNumberVO.create(dto.trackingNumber) : undefined;
    entity.ship(tracking, dto.courierId, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return FulfillmentMapper.toResponse(saved);
  }

  async complete(dto: CompleteFulfillmentRequestDTO, _actorId?: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.load(dto.fulfillmentId);
    entity.complete(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return FulfillmentMapper.toResponse(saved);
  }

  async getById(fulfillmentId: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.load(fulfillmentId);
    return FulfillmentMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly FulfillmentResponseDTO[]> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return list.map((e) => FulfillmentMapper.toResponse(e));
  }

  async listByVendor(vendorId: string): Promise<readonly FulfillmentResponseDTO[]> {
    const list = await this.repo.findByVendorId(VendorIdVO.create(vendorId));
    return list.map((e) => FulfillmentMapper.toResponse(e));
  }

  private async load(fulfillmentId: string): Promise<OrderFulfillmentEntity> {
    const entity = await this.repo.findById(fulfillmentId);
    if (!entity) throw new FulfillmentNotFoundApplicationError(fulfillmentId);
    return entity;
  }
}
