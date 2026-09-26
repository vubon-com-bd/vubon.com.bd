import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { SUNDARBAN_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class SundarbanService extends BaseCourierService {
  readonly name = 'sundarban';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ tracking_number: string }>(
        `${SUNDARBAN_CONFIG.baseUrl}/shipments`,
        { ...input },
        {
          headers: { Authorization: `Bearer ${SUNDARBAN_CONFIG.apiKey}` },
          timeoutMs: SUNDARBAN_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.tracking_number };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ status: string }>(
        `${SUNDARBAN_CONFIG.baseUrl}/track/${trackingNumber}`,
        {
          headers: { Authorization: `Bearer ${SUNDARBAN_CONFIG.apiKey}` },
          timeoutMs: SUNDARBAN_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${SUNDARBAN_CONFIG.baseUrl}/cancel/${trackingNumber}`, {}, {
        headers: { Authorization: `Bearer ${SUNDARBAN_CONFIG.apiKey}` },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
