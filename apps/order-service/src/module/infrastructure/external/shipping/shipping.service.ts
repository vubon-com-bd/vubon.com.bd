/**
 * ShippingService — bridge to logistics-service
 * @module order-service/infrastructure/external/shipping
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CreateShipmentInput {
  readonly orderId: string;
  readonly courierId: string;
  readonly warehouseId: string;
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly recipientAddress: string;
  readonly weightKg: number;
}

export interface CreateShipmentResult {
  readonly success: boolean;
  readonly trackingNumber?: string;
  readonly shipmentId?: string;
  readonly error?: string;
}

export interface CancelShipmentResult {
  readonly success: boolean;
  readonly error?: string;
}

@Injectable()
export class ShippingService {
  private readonly logger = new Logger(ShippingService.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('LOGISTICS_SERVICE_URL', 'http://localhost:3006');
    this.timeout = Number(getOptionalEnv('LOGISTICS_SERVICE_TIMEOUT', '10000'));
  }

  async createShipment(
    input: CreateShipmentInput,
  ): Promise<CreateShipmentResult> {
    try {
      const res = await fetch(`${this.baseUrl}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        return { success: false, error: `HTTP ${res.status}` };
      }
      return (await res.json()) as CreateShipmentResult;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Shipment failed (${input.orderId}): ${msg.slice(0, 100)}`);
      return { success: false, error: msg };
    }
  }

  async cancelShipment(trackingNumber: string): Promise<CancelShipmentResult> {
    try {
      const res = await fetch(`${this.baseUrl}/shipments/${trackingNumber}/cancel`, {
        method: 'POST',
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, error: msg };
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
