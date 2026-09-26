import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { PATHAO_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class PathaoService extends BaseCourierService {
  readonly name = 'pathao';

  private authHeaders(): Readonly<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PATHAO_CONFIG.clientSecret}`,
    };
  }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ data: { consignment_id: string } }>(
        `${PATHAO_CONFIG.baseUrl}/orders`,
        { ...input },
        {
          headers: this.authHeaders(),
          timeoutMs: PATHAO_CONFIG.timeoutMs,
        },
      );
      return { success: true, consignmentId: data.data.consignment_id };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpGet<{ data: { order_status: string } }>(
        `${PATHAO_CONFIG.baseUrl}/orders/${trackingNumber}`,
        {
          headers: this.authHeaders(),
          timeoutMs: PATHAO_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.data.order_status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${PATHAO_CONFIG.baseUrl}/orders/${trackingNumber}/cancel`, {}, {
        headers: this.authHeaders(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
