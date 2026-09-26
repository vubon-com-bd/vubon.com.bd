import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { FEDEX_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class FedexService extends BaseCourierService {
  readonly name = 'fedex';

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ output: { transactionShipments: { masterTrackingNumber: string }[] } }>(
        `${FEDEX_CONFIG.apiUrl}/ship/v1/shipments`,
        { ...input },
        {
          headers: { Authorization: `Bearer ${FEDEX_CONFIG.apiKey}` },
          timeoutMs: FEDEX_CONFIG.timeoutMs,
        },
      );
      return { success: true, trackingNumber: data.output.transactionShipments[0]?.masterTrackingNumber };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      const data = await httpPost<{ output: { completeTrackResults: { trackResults: { latestStatusDetail: { code: string } }[] }[] } }>(
        `${FEDEX_CONFIG.apiUrl}/track/v1/trackingnumbers`,
        { trackingInfo: [{ trackingNumberInfo: { trackingNumber } }] },
        { headers: { Authorization: `Bearer ${FEDEX_CONFIG.apiKey}` }, timeoutMs: FEDEX_CONFIG.timeoutMs },
      );
      return { success: true, status: data.output.completeTrackResults[0]?.trackResults[0]?.latestStatusDetail?.code };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(`${FEDEX_CONFIG.apiUrl}/ship/v1/shipments/cancel`, { trackingNumber }, {
        headers: { Authorization: `Bearer ${FEDEX_CONFIG.apiKey}` },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
