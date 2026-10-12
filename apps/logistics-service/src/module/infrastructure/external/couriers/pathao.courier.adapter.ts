/**
 * PathaoCourierAdapter
 * @module logistics-service/infrastructure/external/couriers
 */
import { Injectable } from '@nestjs/common';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure/external/courier';
import { PATHAO_CONFIG } from '@vubon/shared-config/logistics';
import { BaseLogisticsCourierAdapter } from './base-logistics-courier.adapter.js';

interface PathaoAuthResponse { access_token: string; expires_in: number; }
interface PathaoCreateOrderResponse { consignment_id: string; tracking_code: string; }
interface PathaoTrackResponse { order_status: string; updated_at: string; }

@Injectable()
export class PathaoCourierAdapter extends BaseLogisticsCourierAdapter {
  readonly name = 'pathao';
  protected readonly config = {
    enabled: PATHAO_CONFIG.enabled,
    baseUrl: PATHAO_CONFIG.baseUrl,
    timeoutMs: PATHAO_CONFIG.timeoutMs,
  };

  constructor() { super('PathaoCourierAdapter'); }

  private async getToken(): Promise<string> {
    const res = await this.withRetry(
      () => this.post<PathaoAuthResponse>('/aladdin/api/v1/issue-token', {
        client_id: PATHAO_CONFIG.clientId,
        client_secret: PATHAO_CONFIG.clientSecret,
        username: PATHAO_CONFIG.username,
        password: PATHAO_CONFIG.password,
      }),
      'pathao.auth',
    );
    return res.access_token;
  }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    try {
      this.ensureEnabled();
      const token = await this.getToken();
      const res = await this.withRetry(
        () => this.post<PathaoCreateOrderResponse>('/aladdin/api/v1/orders', {
          store_id: PATHAO_CONFIG.storeId,
          merchant_order_id: input.orderId,
          recipient_name: input.recipientName,
          recipient_phone: input.recipientPhone,
          recipient_address: input.recipientAddress,
          delivery_type: 48, // normal
          item_type: 2, // parcel
          item_quantity: 1,
          item_weight: input.weightKg,
          amount_to_collect: input.declaredValue ?? 0,
        }),
        'pathao.create',
      );
      return { success: true, consignmentId: res.consignment_id, trackingNumber: res.tracking_code };
    } catch (err) {
      return this.errResult('pathao.create', err);
    }
  }

  async track(trackingNumber: string): Promise<CourierTrackResult> {
    try {
      this.ensureEnabled();
      const res = await this.withRetry(
        () => this.get<PathaoTrackResponse>(`/aladdin/api/v1/orders/${trackingNumber}/info`),
        'pathao.track',
      );
      return {
        success: true,
        status: res.order_status,
        events: [{ status: res.order_status, timestamp: res.updated_at }],
      };
    } catch (err) {
      const r = this.errResult('pathao.track', err);
      return { ...r };
    }
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    try {
      this.ensureEnabled();
      await this.withRetry(
        () => this.post<unknown>(`/aladdin/api/v1/orders/${trackingNumber}/cancel`, {}),
        'pathao.cancel',
      );
      return { success: true };
    } catch (err) {
      const r = this.errResult('pathao.cancel', err);
      return { ...r };
    }
  }
}
