import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { DHL_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class DhlService extends BaseCourierService {
  readonly name = 'dhl';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ shipmentTrackingNumber: string }>(
        `${DHL_CONFIG.apiUrl}/shipments`,
        { ...input },
        {
          headers: { 'DHL-API-Key': DHL_CONFIG.apiKey },
          timeoutMs: DHL_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.shipmentTrackingNumber };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ status: string }>(
        `${DHL_CONFIG.apiUrl}/shipments/${trackingNumber}/tracking`,
        {
          headers: { 'DHL-API-Key': DHL_CONFIG.apiKey },
          timeoutMs: DHL_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${DHL_CONFIG.apiUrl}/shipments/${trackingNumber}/cancel`, {}, {
        headers: { 'DHL-API-Key': DHL_CONFIG.apiKey },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
