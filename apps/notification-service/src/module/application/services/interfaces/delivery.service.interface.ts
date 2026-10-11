/**
 * IDeliveryService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  DeliveryResponseDTO,
  DeliveryRetryResponseDTO,
  DeliveryListResponseDTO,
} from '../../dtos/responses/delivery-response.dto.js';

export const DELIVERY_SERVICE = Symbol('DELIVERY_SERVICE');

export interface DeliveryListOptionsDTO {
  readonly notificationId?: string;
  readonly channel?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly page: number;
  readonly limit: number;
}

export interface IDeliveryService {
  getByNotification(notificationId: string): Promise<DeliveryResponseDTO>;
  list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO>;
  retry(notificationId: string, actorId?: string): Promise<DeliveryRetryResponseDTO>;
  /** Called by workers / sagas to record a delivery attempt. */
  recordAttempt(input: {
    notificationId: string;
    channel: string;
    provider: string;
    attempt: number;
    success: boolean;
    providerMessageId?: string;
    failureReason?: string;
    failureCode?: string;
    durationMs?: number;
  }): Promise<DeliveryResponseDTO>;
}
