/**
 * UpsService — Ups courier API client
 * @module logistics-service/infrastructure/external/couriers/ups
 */
import { Injectable } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';
import {
  BaseCourierService,
  type CourierCreateShipmentInput,
  type CourierCreateShipmentResult,
  type CourierTrackResult,
  type CourierCancelResult,
} from '../base-courier.service.js';

interface UpsResponse {
  readonly success?: boolean;
  readonly tracking_id?: string;
  readonly consignment_id?: string;
  readonly label_url?: string;
  readonly delivery_time?: string;
  readonly message?: string;
  readonly delivery_status?: string;
  readonly updated_at?: string;
  readonly location?: string;
  readonly [key: string]: unknown;
}

@Injectable()
export class UpsService extends BaseCourierService {
  protected readonly providerCode = 'ups';
  protected readonly baseUrl: string;
  protected readonly timeoutMs: number;
  private readonly apiKey: string;

  constructor() {
    super(UpsService.name);
    this.baseUrl = getOptionalEnv('UPS_API_URL', 'https://onlinetools.ups.com');
    this.timeoutMs = Number(getOptionalEnv('UPS_API_TIMEOUT_MS', '5000'));
    this.apiKey = getOptionalEnv('UPS_API_KEY', '');
  }

  async createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult> {
    const body = {
      merchant_order_id: input.orderId,
      recipient_name: input.recipientName,
      recipient_phone: input.recipientPhone,
      recipient_address: input.deliveryAddress,
      item_quantity: input.itemCount,
      item_weight: input.weightKg,
      collect_amount: input.codAmount ?? 0,
      declared_value: input.declaredValue ?? 0,
      note: input.notes ?? '',
    };

    const res = await this.fetchJson<UpsResponse>('/api/v1/create_order', {
      method: 'POST',
      headers: { 'Authorization': this.apiKey },
      body: JSON.stringify(body),
    });

    if (!res || res.success === false) {
      return { success: false, raw: res as unknown as Readonly<Record<string, unknown>> };
    }

    return {
      success: true,
      providerTrackingNumber: res.tracking_id ?? res.consignment_id,
      labelUrl: res.label_url,
      estimatedDeliveryAt: res.delivery_time,
      raw: res as unknown as Readonly<Record<string, unknown>>,
    };
  }

  async track(trackingNumber: string): Promise<CourierTrackResult | null> {
    const res = await this.fetchJson<UpsResponse>(
      `/api/v1/track/${trackingNumber}`,
      { headers: { 'Authorization': this.apiKey } },
    );

    if (!res || !res.delivery_status) return null;

    return {
      success: true,
      status: res.delivery_status,
      occurredAt: res.updated_at ?? new Date().toISOString(),
      location: res.location,
      message: res.message,
      raw: res as unknown as Readonly<Record<string, unknown>>,
    };
  }

  async cancel(trackingNumber: string): Promise<CourierCancelResult> {
    const res = await this.fetchJson<UpsResponse>(
      `/api/v1/cancel/${trackingNumber}`,
      { method: 'POST', headers: { 'Authorization': this.apiKey } },
    );

    return {
      success: Boolean(res?.success),
      message: res?.message,
    };
  }
}
