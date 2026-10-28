/**
 * OrderReturnService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { OrderReturnVO } from '../../../domain/value-objects/composites/order-return.vo.js';
import { ReturnStatusVO } from '../../../domain/value-objects/primitives/return-status.vo.js';
import { ReturnReasonVO } from '../../../domain/value-objects/primitives/return-reason.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { OrderReturnEntity } from '../../../domain/entities/order-return.entity.js';
import type {
  IOrderReturnService,
  ReturnListOptionsDTO,
} from '../interfaces/order-return.service.interface.js';
import {
  ORDER_RETURN_REPOSITORY,
  type OrderReturnRepository,
} from '../../../domain/repositories/order-return.repository.interface.js';
import { ReturnIdVO } from '../../../domain/value-objects/primitives/return-id.vo.js';
import { ReturnMapper } from '../../mappers/return.mapper.js';
import { ReturnNotFoundApplicationError } from '../../errors/return.errors.js';
import type {
  RequestReturnCommandDTO,
  ApproveReturnCommandDTO,
  RejectReturnCommandDTO,
  CompleteReturnCommandDTO,
} from '../../dtos/requests/return/index.js';
import type {
  ReturnResponseDTO,
  ReturnListResponseDTO,
} from '../../dtos/responses/return-response.dto.js';

@Injectable()
export class OrderReturnService implements IOrderReturnService {
  private readonly logger = new Logger(OrderReturnService.name);

  constructor(
    @Inject(ORDER_RETURN_REPOSITORY)
    private readonly repo: OrderReturnRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async request(
    dto: RequestReturnCommandDTO,
    actorId?: string,
  ): Promise<ReturnResponseDTO> {
    this.logger.log(`Return requested for order ${dto.orderId}`);

    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = OrderReturnVO.create({
      id: ReturnIdVO.create(id),
      orderId: OrderIdVO.create(dto.orderId),
      customerId: CustomerIdVO.create('system'),
      itemIds: (dto.itemIds ?? []) as readonly string[],
      reason: ReturnReasonVO.create(dto.reason ?? 'Customer request'),
      status: ReturnStatusVO.requested(),
      notes: dto.reason,
      requestedAt: now,
    });

    const entity = OrderReturnEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Return ${saved.id} requested by ${actorId ?? 'system'}`);
    return ReturnMapper.toResponse(saved);
  }

  async approve(
    dto: ApproveReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.approve();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ReturnMapper.toResponse(saved);
  }

  async reject(
    dto: RejectReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.reject(dto.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ReturnMapper.toResponse(saved);
  }

  async complete(
    dto: CompleteReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.close();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ReturnMapper.toResponse(saved);
  }

  async getById(id: string): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(id);
    return ReturnMapper.toResponse(entity);
  }

  async listByOrder(orderId: string): Promise<readonly ReturnResponseDTO[]> {
    const entities = await this.repo.findByOrder(orderId);
    return entities.map((e) => ReturnMapper.toResponse(e));
  }

  async list(options: ReturnListOptionsDTO): Promise<ReturnListResponseDTO> {
    const entities = await this.repo.findAll();
    const filtered = entities.filter((e) => {
      const f = options.filter;
      if (!f) return true;
      if (f.orderId && e.orderId.value !== f.orderId) return false;
      if (f.customerId && e.customerId.value !== f.customerId) return false;
      if (f.status && e.status.value !== f.status) return false;
      return true;
    });
    return ReturnMapper.toListResponse(filtered, filtered.length, options.page, options.limit);
  }

  private async loadById(id: string): Promise<OrderReturnEntity> {
    const vo = ReturnIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new ReturnNotFoundApplicationError(id);
    return entity;
  }
}
