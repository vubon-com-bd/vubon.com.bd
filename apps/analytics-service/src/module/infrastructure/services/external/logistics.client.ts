/**
 * Logistics Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ShipmentDTO {
  readonly id: string;
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly status: string;
  readonly deliveredAt?: string;
}

@Injectable()
export class LogisticsClient {
  private readonly logger = new Logger(LogisticsClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('LOGISTICS_SERVICE_URL', 'http://localhost:3009');
    this.timeout = Number(getOptionalEnv('LOGISTICS_SERVICE_TIMEOUT', '5000'));
  }

  async getShipment(shipmentId: string): Promise<ShipmentDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/shipments/${shipmentId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as ShipmentDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Shipment fetch failed (${shipmentId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByOrder(orderId: string): Promise<readonly ShipmentDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/shipments?orderId=${orderId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly ShipmentDTO[];
    } catch {
      return [];
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
