import { Injectable } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure';
import { SA_PARIBAHAN_CONFIG } from '@vubon/shared-config/logistics';
import { httpGet, httpPost } from '@vubon/shared-utils/common';

@Injectable()
export class SaParibahanService extends BaseCourierService {
  readonly name = 'sa-paribahan';

  async createShipment(
    input: CourierCreateShipmentInput,
  ): Promise<CourierCreateShipmentResult> {
    try {
      const data = await httpPost<{ tracking_number: string }>(
        `${SA_PARIBAHAN_CONFIG.baseUrl}/shipments`,
        {
          order_id: input.orderId,
          recipient_name: input.recipientName,
          recipient_phone: input.recipientPhone,
          recipient_address: input.recipientAddress,
          weight_kg: input.weightKg,
          declared_value: input.declaredValue,
        },
        {
          headers: { Authorization: `Bearer ${SA_PARIBAHAN_CONFIG.apiKey}` },
          timeoutMs: SA_PARIBAHAN_CONFIG.timeoutMs,
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
        `${SA_PARIBAHAN_CONFIG.baseUrl}/track/${trackingNumber}`,
        {
          headers: { Authorization: `Bearer ${SA_PARIBAHAN_CONFIG.apiKey}` },
          timeoutMs: SA_PARIBAHAN_CONFIG.timeoutMs,
        },
      );
      return { success: true, status: data.status };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      await httpPost(
        `${SA_PARIBAHAN_CONFIG.baseUrl}/cancel/${trackingNumber}`,
        {},
        { headers: { Authorization: `Bearer ${SA_PARIBAHAN_CONFIG.apiKey}` } },
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
