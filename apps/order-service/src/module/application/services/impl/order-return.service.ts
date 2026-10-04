/**
 * OrderReturnService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IOrderReturnService } from '../interfaces/order-return.service.interface.js';
import {
  ORDER_RETURN_REPOSITORY,
  type OrderReturnRepository,
} from '../../../domain/repositories/order-return.repository.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderReturnEntity } from '../../../domain/entities/order-return.entity.js';
import { ReturnReasonVO } from '../../../domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../domain/value-objects/primitives/order-item-id.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { OrderReturnPolicyService } from '../../../domain/services/order-return-policy.service.js';
import { ReturnMapper } from '../../mappers/return.mapper.js';
import { ReturnNotFoundApplicationError } from '../../errors/return.errors.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return/request-return.dto.js';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return/approve-return.dto.js';
import type { RejectReturnRequestDTO } from '../../dtos/requests/return/reject-return.dto.js';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return/complete-return.dto.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@Injectable()
export class OrderReturnService implements IOrderReturnService {
  constructor(
    @Inject(ORDER_RETURN_REPOSITORY) private readonly repo: OrderReturnRepository,
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async request(dto: RequestReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);

    const policy = OrderReturnPolicyService.evaluate(order);
    if (!policy.allowed) throw new Error(policy.reason ?? 'Return not allowed');

    const now = new Date().toISOString();
    const entity = OrderReturnEntity.create({
      id: randomUUID(),
      now,
      props: {
        orderId: OrderIdVO.create(dto.orderId),
        customerId: CustomerIdVO.create(actorId ?? order.customerId.value),
        status: ReturnStatusVO.requested(),
        reason: ReturnReasonVO.create(dto.reason),
        itemIds: dto.itemIds.map((id) => OrderItemIdVO.create(id)),
        images: dto.images ?? [],
        notes: dto.notes,
        currency: order.currency,
        requestedAt: now,
      },
    });

    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async approve(dto: ApproveReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO> {
    const entity = await this.load(dto.returnId);
    entity.approve(actorId ?? 'system', new Date().toISOString());
    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async reject(dto: RejectReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO> {
    const entity = await this.load(dto.returnId);
    entity.reject(actorId ?? 'system', dto.reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async complete(dto: CompleteReturnRequestDTO, _actorId?: string): Promise<ReturnResponseDTO> {
    const entity = await this.load(dto.returnId);
    entity.complete(dto.refundAmount, dto.restockFee ?? 0, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async getById(returnId: string): Promise<ReturnResponseDTO> {
    const entity = await this.load(returnId);
    return ReturnMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly ReturnResponseDTO[]> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return list.map((e) => ReturnMapper.toResponse(e));
  }

  async listByCustomer(customerId: string): Promise<readonly ReturnResponseDTO[]> {
    const list = await this.repo.findByCustomerId(CustomerIdVO.create(customerId));
    return list.map((e) => ReturnMapper.toResponse(e));
  }

  private async load(returnId: string): Promise<OrderReturnEntity> {
    const entity = await this.repo.findById(returnId);
    if (!entity) throw new ReturnNotFoundApplicationError(returnId);
    return entity;
  }
}
