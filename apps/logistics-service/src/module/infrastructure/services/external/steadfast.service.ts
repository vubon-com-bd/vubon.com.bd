import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { STEADFAST_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class SteadfastService extends BaseCourierService {
  readonly name = 'steadfast';

  private authHeaders(): Readonly<Record<string, string>> {
    return {
      'Api-Key': STEADFAST_CONFIG.apiKey,
      'Secret-Key': STEADFAST_CONFIG.apiSecret,
    };
  }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ consignment: { tracking_code: string } }>(
        `${STEADFAST_CONFIG.baseUrl}/create_order`,
        { ...input },
        {
          headers: this.authHeaders(),
          timeoutMs: STEADFAST_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.consignment.tracking_code };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ delivery_status: string }>(
        `${STEADFAST_CONFIG.baseUrl}/status_by_trackingcode/${trackingNumber}`,
        {
          headers: this.authHeaders(),
          timeoutMs: STEADFAST_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.delivery_status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(
        `${STEADFAST_CONFIG.baseUrl}/cancel_order`,
        { tracking_code: trackingNumber },
        { headers: this.authHeaders() },
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
