/**
 * OrderCancelService — order cancellation lifecycle
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type {
  IOrderCancelService,
  CancelListOptionsDTO,
} from '../interfaces/order-cancel.service.interface.js';
import {
  ORDER_CANCEL_REPOSITORY,
  type OrderCancelRepository,
} from '../../../domain/repositories/order-cancel.repository.interface.js';
import type { OrderCancelEntity } from '../../../domain/entities/order-cancel.entity.js';
import { OrderCancelVO } from '../../../domain/value-objects/composites/order-cancel.vo.js';
import { CancelIdVO } from '../../../domain/value-objects/primitives/cancel-id.vo.js';
import { CancelReasonVO } from '../../../domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { CancelMapper } from '../../mappers/cancel.mapper.js';
import { CancelNotFoundApplicationError } from '../../errors/cancel.errors.js';
import type {
  RequestCancelCommandDTO,
  ApproveCancelCommandDTO,
  RejectCancelCommandDTO,
} from '../../dtos/requests/cancel/index.js';
import type {
  CancelResponseDTO,
  CancelListResponseDTO,
} from '../../dtos/responses/cancel-response.dto.js';

@Injectable()
export class OrderCancelService implements IOrderCancelService {
  private readonly logger = new Logger(OrderCancelService.name);

  constructor(
    @Inject(ORDER_CANCEL_REPOSITORY)
    private readonly repo: OrderCancelRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async request(
    dto: RequestCancelCommandDTO,
    actorId?: string,
  ): Promise<CancelResponseDTO> {
    this.logger.log(`Cancel requested for order ${dto.orderId}`);

    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = OrderCancelVO.create({
      id: CancelIdVO.create(id),
      orderId: OrderIdVO.create(dto.orderId),
      reason: CancelReasonVO.create(dto.reason ?? 'Customer request'),
      status: CancelStatusVO.requested(),
      requestedBy: actorId ?? dto.actorId ?? 'system',
      requestedAt: now,
      notes: dto.reason,
    });

    const entity = (await import('../../../domain/entities/order-cancel.entity.js')).OrderCancelEntity.create({
      id,
      vo,
      now,
    });

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Cancel ${saved.id} requested for order ${dto.orderId}`);
    return CancelMapper.toResponse(saved);
  }

  async approve(
    dto: ApproveCancelCommandDTO,
    actorId?: string,
  ): Promise<CancelResponseDTO> {
    const entity = await this.loadById(dto.cancelId);
    entity.approve(actorId ?? 'system');
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`✅ Cancel ${saved.id} approved by ${actorId ?? 'system'}`);
    return CancelMapper.toResponse(saved);
  }

  async reject(
    dto: RejectCancelCommandDTO,
    actorId?: string,
  ): Promise<CancelResponseDTO> {
    const entity = await this.loadById(dto.cancelId);
    entity.reject(actorId ?? 'system', dto.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`✅ Cancel ${saved.id} rejected by ${actorId ?? 'system'}`);
    return CancelMapper.toResponse(saved);
  }

  async getById(id: string): Promise<CancelResponseDTO> {
    const entity = await this.loadById(id);
    return CancelMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly CancelResponseDTO[]> {
    const entities = await this.repo.findByOrder(orderId);
    return entities.map((e) => CancelMapper.toResponse(e));
  }

  async list(options: CancelListOptionsDTO): Promise<CancelListResponseDTO> {
    const entities = await this.repo.findAll();
    const filtered = entities.filter((e) => {
      const f = options.filter;
      if (!f) return true;
      if (f.orderId && e.orderId.value !== f.orderId) return false;
      if (f.status && e.status.value !== f.status) return false;
      return true;
    });
    return CancelMapper.toListResponse(filtered, filtered.length, options.page, options.limit);
  }

  private async loadById(id: string): Promise<OrderCancelEntity> {
    const vo = CancelIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new CancelNotFoundApplicationError(id);
    return entity;
  }
}
