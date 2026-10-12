/**
 * SteadfastCourierAdapter
 * @module logistics-service/infrastructure/external/couriers
 */
import { Injectable } from '@nestjs/common';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure/external/courier';
import { STEADFAST_CONFIG } from '@vubon/shared-config/logistics';
import { BaseLogisticsCourierAdapter } from './base-logistics-courier.adapter.js';

interface SteadfastCreateResponse { consignment: { tracking_code: string; consignment_id: number } }
interface SteadfastTrackResponse { delivery_status: string; tracking_code: string; updated_at?: string }

@Injectable()
export class SteadfastCourierAdapter extends BaseLogisticsCourierAdapter {
  readonly name = 'steadfast';
  protected readonly config = {
    enabled: STEADFAST_CONFIG.enabled,
    baseUrl: STEADFAST_CONFIG.baseUrl,
    timeoutMs: STEADFAST_CONFIG.timeoutMs,
  };

  constructor() { super('SteadfastCourierAdapter'); }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.post<SteadfastCreateResponse>('/create_order', {
          invoice: input.orderId,
          recipient_name: input.recipientName,
          recipient_phone: input.recipientPhone,
          recipient_address: input.recipientAddress,
          cod_amount: input.declaredValue ?? 0,
          note: 'vubon',
        }),
        'steadfast.create',
      );
      return { success: true, consignmentId: String(res.consignment.consignment_id), trackingNumber: res.consignment.tracking_code };
    } catch (err) {
      return this.errResult('steadfast.create', err);
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.get<SteadfastTrackResponse>(`/status_by_trackingcode/${trackingNumber}`),
        'steadfast.track',
      );
      return {
        success: true,
        status: res.delivery_status,
        events: [{ status: res.delivery_status, timestamp: res.updated_at ?? new Date().toISOString() }],
      };
    } catch (err) {
      const r = this.errResult('steadfast.track', err);
      return { ...r };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      this.ensureEnabled();
      await this.withRetry(() => this.post<unknown>(`/cancel_order/${trackingNumber}`, {}), 'steadfast.cancel');
      return { success: true };
    } catch (err) {
      const r = this.errResult('steadfast.cancel', err);
      return { ...r };
    }
  }
}
