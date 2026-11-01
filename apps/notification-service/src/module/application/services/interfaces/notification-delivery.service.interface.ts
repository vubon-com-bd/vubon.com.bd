/**
 * INotificationDeliveryService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  DeliveryResponseDTO,
} from '@application/dtos/responses/delivery-response.dto.js';

export const NOTIFICATION_DELIVERY_SERVICE = Symbol('NOTIFICATION_DELIVERY_SERVICE');

export interface INotificationDeliveryService {
  getByNotification(notificationId: string): Promise<DeliveryResponseDTO | null>;
  listByStatus(status: string): Promise<readonly DeliveryResponseDTO[]>;
  listRetryable(): Promise<readonly DeliveryResponseDTO[]>;
  listStuck(olderThanMinutes: number): Promise<readonly DeliveryResponseDTO[]>;
}
