/**
 * RedxCourierAdapter
 * @module logistics-service/infrastructure/external/couriers
 */
import { Injectable } from '@nestjs/common';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure/external/courier';
import { REDX_CONFIG } from '@vubon/shared-config/logistics';
import { BaseLogisticsCourierAdapter } from './base-logistics-courier.adapter.js';

interface RedxCreateResponse { tracking_id: string; }
interface RedxTrackResponse { tracking_id: string; status: string; updated_at: string; }

@Injectable()
export class RedxCourierAdapter extends BaseLogisticsCourierAdapter {
  readonly name = 'redx';
  protected readonly config = {
    enabled: REDX_CONFIG.enabled,
    baseUrl: REDX_CONFIG.baseUrl,
    timeoutMs: REDX_CONFIG.timeoutMs,
  };

  constructor() { super('RedxCourierAdapter'); }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.post<RedxCreateResponse>('/parcel', {
          customer_name: input.recipientName,
          customer_phone: input.recipientPhone,
          delivery_area: input.recipientAddress,
          merchant_invoice_id: input.orderId,
          cash_collection_amount: String(input.declaredValue ?? 0),
          parcel_weight: input.weightKg,
        }),
        'redx.create',
      );
      return { success: true, trackingNumber: res.tracking_id };
    } catch (err) {
      return this.errResult('redx.create', err);
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.get<RedxTrackResponse>(`/parcel/track/${trackingNumber}`),
        'redx.track',
      );
      return {
        success: true,
        status: res.status,
        events: [{ status: res.status, timestamp: res.updated_at }],
      };
    } catch (err) {
      const r = this.errResult('redx.track', err);
      return { ...r };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      this.ensureEnabled();
      await this.withRetry(() => this.post<unknown>(`/parcel/cancel/${trackingNumber}`, {}), 'redx.cancel');
      return { success: true };
    } catch (err) {
      const r = this.errResult('redx.cancel', err);
      return { ...r };
    }
  }
}
