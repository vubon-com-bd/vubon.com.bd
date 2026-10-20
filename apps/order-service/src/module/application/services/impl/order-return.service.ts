/**
 * OrderReturnService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type {
  IOrderReturnService,
  ReturnListOptionsDTO,
} from '../interfaces/order-return.service.interface.js';
import {
  ORDER_RETURN_REPOSITORY,
  type OrderReturnRepository,
} from '../../../domain/repositories/order-return.repository.interface.js';
import type { OrderReturnEntity } from '../../../domain/entities/order-return.entity.js';
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
  ) {}

  async request(
    dto: RequestReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    this.logger.log(`Return requested for order ${dto.orderId}`);
    throw new ReturnNotFoundApplicationError('new-return');
  }

  async approve(
    dto: ApproveReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.approve();
    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async reject(
    dto: RejectReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.reject(dto.reason);
    const saved = await this.repo.save(entity);
    return ReturnMapper.toResponse(saved);
  }

  async complete(
    dto: CompleteReturnCommandDTO,
    _actorId?: string,
  ): Promise<ReturnResponseDTO> {
    const entity = await this.loadById(dto.returnId);
    entity.close();
    const saved = await this.repo.save(entity);
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
