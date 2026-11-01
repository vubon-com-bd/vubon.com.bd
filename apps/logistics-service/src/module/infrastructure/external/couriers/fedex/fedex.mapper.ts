/**
 * FedexMapper — provider response ↔ app DTO
 * @module logistics-service/infrastructure/external/couriers/fedex
 */
import type { CourierCreateShipmentResult } from '../base-courier.service.js';

export interface FedexCreateResponse {
  readonly tracking_id?: string;
  readonly consignment_id?: string;
  readonly label_url?: string;
  readonly delivery_time?: string;
}

export class FedexMapper {
  static toCreateResult(raw: FedexCreateResponse | null): CourierCreateShipmentResult {
    if (!raw) return { success: false };
    return {
      success: true,
      providerTrackingNumber: raw.tracking_id ?? raw.consignment_id,
      labelUrl: raw.label_url,
      estimatedDeliveryAt: raw.delivery_time,
    };
  }
}
