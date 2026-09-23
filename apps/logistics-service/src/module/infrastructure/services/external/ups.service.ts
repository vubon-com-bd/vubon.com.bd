import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { UPS_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class UpsService extends BaseCourierService {
  readonly name = 'ups';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ ShipmentResponse: { ShipmentResults: { ShipmentIdentificationNumber: string } } }>(
        `${UPS_CONFIG.apiUrl}/api/shipments/v1/ship`,
        { ...input },
        {
          headers: { Authorization: `Bearer ${UPS_CONFIG.apiKey}` },
          timeoutMs: UPS_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.ShipmentResponse.ShipmentResults.ShipmentIdentificationNumber };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ trackResponse: { shipment: { package: { activity: { status: { description: string } }[] }[] }[] } }>(
        `${UPS_CONFIG.apiUrl}/api/track/v1/details/${trackingNumber}`,
        {
          headers: { Authorization: `Bearer ${UPS_CONFIG.apiKey}` },
          timeoutMs: UPS_CONFIG.timeoutMs,
        },
      );
      return {
        success: true,
        status: data.trackResponse.shipment[0]?.package[0]?.activity[0]?.status?.description,
      };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${UPS_CONFIG.apiUrl}/api/shipments/v1/void/cancel/${trackingNumber}`, {}, {
        headers: { Authorization: `Bearer ${UPS_CONFIG.apiKey}` },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
