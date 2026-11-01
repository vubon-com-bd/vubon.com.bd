/**
 * SundarbanMapper — provider response ↔ app DTO
 * @module logistics-service/infrastructure/external/couriers/sundarban
 */
import type { CourierCreateShipmentResult } from '../base-courier.service.js';

export interface SundarbanCreateResponse {
  readonly tracking_id?: string;
  readonly consignment_id?: string;
  readonly label_url?: string;
  readonly delivery_time?: string;
}

export class SundarbanMapper {
  static toCreateResult(raw: SundarbanCreateResponse | null): CourierCreateShipmentResult {
    if (!raw) return { success: false };
    return {
      success: true,
      providerTrackingNumber: raw.tracking_id ?? raw.consignment_id,
      labelUrl: raw.label_url,
      estimatedDeliveryAt: raw.delivery_time,
    };
  }
}
