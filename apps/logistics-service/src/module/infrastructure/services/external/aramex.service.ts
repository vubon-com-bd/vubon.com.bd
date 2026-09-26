import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { ARAMEX_CONFIG } from '@vubon/shared-config/logistics';
import { httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class AramexService extends BaseCourierService {
  readonly name = 'aramex';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ Shipments: { ShipmentNumber: string }[] }>(
        `${ARAMEX_CONFIG.apiUrl}/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments`,
        { ...input },
        {
          headers: { Authorization: `Bearer ${ARAMEX_CONFIG.apiKey}` },
          timeoutMs: ARAMEX_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.Shipments[0]?.ShipmentNumber };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpPost<{ TrackingResults: { Value: { Updates: { UpdateDescription: string }[] }[] }[] }>(
        `${ARAMEX_CONFIG.apiUrl}/TrackingAPI.V2/Tracking/Service_1_0.svc/json/TrackShipments`,
        { Shipments: [trackingNumber] },
        {
          headers: { Authorization: `Bearer ${ARAMEX_CONFIG.apiKey}` },
          timeoutMs: ARAMEX_CONFIG.timeoutMs,
        },
      );
      return {
        success: true,
        status: data.TrackingResults[0]?.Value[0]?.Updates[0]?.UpdateDescription,
      };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(
        `${ARAMEX_CONFIG.apiUrl}/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CancelShipments`,
        { Shipments: [trackingNumber] },
        { headers: { Authorization: `Bearer ${ARAMEX_CONFIG.apiKey}` } },
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
