/**
 * NotificationDeliveryService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  NOTIFICATION_DELIVERY_REPOSITORY,
  type NotificationDeliveryRepository,
} from '@domain/repositories/notification-delivery.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';

import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';
import type {
  INotificationDeliveryService,
} from '@application/services/interfaces/notification-delivery.service.interface.js';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

@Injectable()
export class NotificationDeliveryService implements INotificationDeliveryService {
  private readonly logger = new Logger(NotificationDeliveryService.name);

  constructor(
    @Inject(NOTIFICATION_DELIVERY_REPOSITORY)
    private readonly repo: NotificationDeliveryRepository,
  ) {}

  async getByNotification(notificationId: string): Promise<DeliveryResponseDTO | null> {
    const vo = NotificationIdVO.create(notificationId);
    const entity = await this.repo.findByNotification(vo);
    if (!entity) return null;
    return DeliveryMapper.toResponse(entity);
  }

  async listByStatus(status: string): Promise<readonly DeliveryResponseDTO[]> {
    const items = await this.repo.findByStatus(status);
    return items.map((e) => DeliveryMapper.toResponse(e));
  }

  async listRetryable(): Promise<readonly DeliveryResponseDTO[]> {
    const items = await this.repo.findRetryable();
    return items.map((e) => DeliveryMapper.toResponse(e));
  }

  async listStuck(olderThanMinutes: number): Promise<readonly DeliveryResponseDTO[]> {
    const items = await this.repo.findStuck(olderThanMinutes);
    this.logger.debug(`Found ${items.length} stuck deliveries (older than ${olderThanMinutes}m)`);
    return items.map((e) => DeliveryMapper.toResponse(e));
  }
}
