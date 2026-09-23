import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { REDX_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class RedxService extends BaseCourierService {
  readonly name = 'redx';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ tracking_id: string }>(
        `${REDX_CONFIG.baseUrl}/parcel`,
        { ...input },
        {
          headers: { 'API-ACCESS-TOKEN': `Bearer ${REDX_CONFIG.apiKey}` },
          timeoutMs: REDX_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.tracking_id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ tracking: { status: string } }>(
        `${REDX_CONFIG.baseUrl}/parcel/track/${trackingNumber}`,
        {
          headers: { 'API-ACCESS-TOKEN': `Bearer ${REDX_CONFIG.apiKey}` },
          timeoutMs: REDX_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.tracking.status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${REDX_CONFIG.baseUrl}/parcel/cancel`, { tracking_id: trackingNumber }, {
        headers: { 'API-ACCESS-TOKEN': `Bearer ${REDX_CONFIG.apiKey}` },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
