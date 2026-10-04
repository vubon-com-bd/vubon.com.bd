/**
 * DeliveryService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IDeliveryService } from '../interfaces/delivery.service.interface.js';
import {
  DELIVERY_REPOSITORY,
  type DeliveryRepository,
} from '../../../domain/repositories/delivery.repository.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { DeliveryEntity } from '../../../domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { DeliverySchedulingService } from '../../../domain/services/delivery-scheduling.service.js';
import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import { DeliveryNotFoundApplicationError } from '../../errors/delivery.errors.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto.js';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/reschedule-delivery.dto.js';
import type { ConfirmDeliveryRequestDTO } from '../../dtos/requests/delivery/confirm-delivery.dto.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@Injectable()
export class DeliveryService implements IDeliveryService {
  constructor(
    @Inject(DELIVERY_REPOSITORY) private readonly repo: DeliveryRepository,
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async schedule(dto: ScheduleDeliveryRequestDTO, _actorId?: string): Promise<DeliveryResponseDTO> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);

    const now = new Date().toISOString();
    const estimate = DeliverySchedulingService.estimateForType(dto.type ?? 'standard');
    const entity = DeliveryEntity.create({
      id: randomUUID(),
      now,
      props: {
        orderId: OrderIdVO.create(dto.orderId),
        methodId: dto.deliveryMethodId ? DeliveryMethodIdVO.create(dto.deliveryMethodId) : undefined,
        status: DeliveryStatusVO.scheduled(),
        type: DeliveryTypeVO.create(dto.type ?? 'standard'),
        estimatedAt: dto.estimatedAt ?? estimate.estimatedAt,
        attempts: 0,
        notes: dto.notes,
      },
    });
    const saved = await this.repo.save(entity);
    return DeliveryMapper.toResponse(saved);
  }

  async reschedule(dto: RescheduleDeliveryRequestDTO, _actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.reschedule(dto.reason, dto.newEstimatedAt);
    const saved = await this.repo.save(entity);
    return DeliveryMapper.toResponse(saved);
  }

  async confirm(dto: ConfirmDeliveryRequestDTO, _actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.deliver(dto.receivedBy);
    const saved = await this.repo.save(entity);
    return DeliveryMapper.toResponse(saved);
  }

  async getById(deliveryId: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(deliveryId);
    return DeliveryMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly DeliveryResponseDTO[]> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return DeliveryMapper.toList(list);
  }

  async listByStatus(status: string): Promise<readonly DeliveryResponseDTO[]> {
    const list = await this.repo.findByStatus(DeliveryStatusVO.create(status));
    return DeliveryMapper.toList(list);
  }

  private async load(deliveryId: string): Promise<DeliveryEntity> {
    const entity = await this.repo.findById(deliveryId);
    if (!entity) throw new DeliveryNotFoundApplicationError(deliveryId);
    return entity;
  }

  // silence unused
  static readonly _Tracking = TrackingNumberVO;
}
