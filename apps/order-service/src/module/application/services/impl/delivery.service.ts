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
import type { DeliveryEntity } from '../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo.js';
import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import { DeliveryNotFoundApplicationError } from '../../errors/delivery.errors.js';
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
  ) {}

  async schedule(
    dto: ScheduleDeliveryCommandDTO,
    _actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    this.logger.log(`Scheduling delivery for order ${dto.orderId}`);
    throw new DeliveryNotFoundApplicationError('new-delivery');
  }

  async reschedule(
    dto: RescheduleDeliveryCommandDTO,
    _actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    const entity = await this.loadById(dto.deliveryId);
    entity.reschedule(dto.reason, dto.newEstimatedAt);
    const saved = await this.repo.save(entity);
    return DeliveryMapper.toResponse(saved);
  }

  async confirm(
    dto: ConfirmDeliveryCommandDTO,
    _actorId?: string,
  ): Promise<DeliveryResponseDTO> {
    const entity = await this.loadById(dto.deliveryId);
    entity.markDelivered(dto.receivedBy, dto.signature);
    const saved = await this.repo.save(entity);
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
