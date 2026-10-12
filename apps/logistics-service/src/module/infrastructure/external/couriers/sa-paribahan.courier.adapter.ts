/**
 * SaParibahanCourierAdapter — freight courier (limited API)
 * @module logistics-service/infrastructure/external/couriers
 */
import { Injectable } from '@nestjs/common';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure/external/courier';
import { SA_PARIBAHAN_CONFIG } from '@vubon/shared-config/logistics';
import { BaseLogisticsCourierAdapter } from './base-logistics-courier.adapter.js';

@Injectable()
export class SaParibahanCourierAdapter extends BaseLogisticsCourierAdapter {
  readonly name = 'sa-paribahan';
  protected readonly config = {
    enabled: SA_PARIBAHAN_CONFIG.enabled,
    baseUrl: SA_PARIBAHAN_CONFIG.baseUrl,
    timeoutMs: SA_PARIBAHAN_CONFIG.timeoutMs,
  };

  constructor() { super('SaParibahanCourierAdapter'); }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.post<{ tracking_number?: string; consignment_id?: string }>('/api/book', {
          reference: input.orderId,
          receiver_name: input.recipientName,
          receiver_phone: input.recipientPhone,
          receiver_address: input.recipientAddress,
          weight: input.weightKg,
          cod: input.declaredValue ?? 0,
        }),
        'sa-paribahan.create',
      );
      return {
        success: true,
        trackingNumber: res.tracking_number,
        consignmentId: res.consignment_id,
      };
    } catch (err) {
      return this.errResult('sa-paribahan.create', err);
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.get<{ status: string; updated_at: string }>(`/api/track/${trackingNumber}`),
        'sa-paribahan.track',
      );
      return {
        success: true,
        status: res.status,
        events: [{ status: res.status, timestamp: res.updated_at }],
      };
    } catch (err) {
      const r = this.errResult('sa-paribahan.track', err);
      return { ...r };
    }
  }

  async cancel(_trackingNumber: string): Promise<CourierCancelResult> {
    // Freight couriers typically do not support cancel via API — must call.
    return { success: false, error: 'cancel not supported by sa-paribahan API' };
  }
}
