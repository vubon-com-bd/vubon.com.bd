/**
 * PathaoMapper — provider response ↔ app DTO
 * @module logistics-service/infrastructure/external/couriers/pathao
 */
import type { CourierCreateShipmentResult } from '../base-courier.service.js';

export interface PathaoCreateResponse {
  readonly tracking_id?: string;
  readonly consignment_id?: string;
  readonly label_url?: string;
  readonly delivery_time?: string;
}

export class PathaoMapper {
  static toCreateResult(raw: PathaoCreateResponse | null): CourierCreateShipmentResult {
    if (!raw) return { success: false };
    return {
      success: true,
      providerTrackingNumber: raw.tracking_id ?? raw.consignment_id,
      labelUrl: raw.label_url,
      estimatedDeliveryAt: raw.delivery_time,
    };
  }
}
