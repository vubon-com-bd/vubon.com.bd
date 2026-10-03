/**
 * OrderCancelService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IOrderCancelService } from '../interfaces/order-cancel.service.interface.js';
import {
  ORDER_CANCEL_REPOSITORY,
  type OrderCancelRepository,
} from '../../../domain/repositories/order-cancel.repository.interface.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../../domain/repositories/order.repository.interface.js';
import { OrderCancelEntity } from '../../../domain/entities/order-cancel.entity.js';
import { CancelReasonVO } from '../../../domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business/order';
import { OrderCancelPolicyService } from '../../../domain/services/order-cancel-policy.service.js';
import { CancelMapper } from '../../mappers/cancel.mapper.js';
import { CancelNotFoundApplicationError } from '../../errors/cancel.errors.js';
import { OrderNotFoundApplicationError } from '../../errors/order.errors.js';
import type { RequestCancelRequestDTO } from '../../dtos/requests/cancel/request-cancel.dto.js';
import type { ApproveCancelRequestDTO } from '../../dtos/requests/cancel/approve-cancel.dto.js';
import type { RejectCancelRequestDTO } from '../../dtos/requests/cancel/reject-cancel.dto.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@Injectable()
export class OrderCancelService implements IOrderCancelService {
  constructor(
    @Inject(ORDER_CANCEL_REPOSITORY) private readonly repo: OrderCancelRepository,
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}

  async request(dto: RequestCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO> {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new OrderNotFoundApplicationError(dto.orderId);

    const policy = OrderCancelPolicyService.evaluate(order);
    if (!policy.allowed) {
      throw new Error(policy.reason ?? 'Cancel not allowed');
    }

    const now = new Date().toISOString();
    const entity = OrderCancelEntity.create({
      id: randomUUID(),
      now,
      props: {
        orderId: OrderIdVO.create(dto.orderId),
        reason: CancelReasonVO.create(dto.reason),
        status: CancelStatusVO.requested(),
        requestedBy: CustomerIdVO.create(actorId ?? order.customerId.value),
        notes: dto.notes,
        currency: order.currency,
        restockInventory: policy.restockInventory,
        requestedAt: now,
      },
    });

    // Auto-approve if policy says so
    if (policy.autoApprove) {
      const refundAmount = policy.requiresRefund
        ? OrderCancelPolicyService.calculateRefund(order)
        : undefined;
      entity.approve(entity.requestedBy, refundAmount, now);
      order.cancel(dto.reason, actorId, refundAmount, now);
      await this.orderRepo.save(order);
    }

    const saved = await this.repo.save(entity);
    return CancelMapper.toResponse(saved);
  }

  async approve(dto: ApproveCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO> {
    const entity = await this.load(dto.cancelId);
    entity.approve(
      CustomerIdVO.create(actorId ?? entity.requestedBy.value),
      dto.refundAmount,
      new Date().toISOString(),
    );
    const saved = await this.repo.save(entity);
    return CancelMapper.toResponse(saved);
  }

  async reject(dto: RejectCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO> {
    const entity = await this.load(dto.cancelId);
    entity.reject(
      CustomerIdVO.create(actorId ?? entity.requestedBy.value),
      dto.reason,
      new Date().toISOString(),
    );
    const saved = await this.repo.save(entity);
    return CancelMapper.toResponse(saved);
  }

  async getById(cancelId: string): Promise<CancelResponseDTO> {
    const entity = await this.load(cancelId);
    return CancelMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly CancelResponseDTO[]> {
    const list = await this.repo.findByOrderId(OrderIdVO.create(orderId));
    return list.map((e) => CancelMapper.toResponse(e));
  }

  async getActiveByOrder(orderId: string): Promise<CancelResponseDTO | null> {
    const entity = await this.repo.findActiveByOrder(OrderIdVO.create(orderId));
    return entity ? CancelMapper.toResponse(entity) : null;
  }

  private async load(cancelId: string): Promise<OrderCancelEntity> {
    const entity = await this.repo.findById(cancelId);
    if (!entity) throw new CancelNotFoundApplicationError(cancelId);
    return entity;
  }

  static readonly _Statuses = ORDER_CANCEL_STATUS;
}
