/**
 * BaseCourierService — abstract base for all courier API clients
 * @module logistics-service/infrastructure/external/couriers
 *
 * ⚠️ Uses native fetch + AbortSignal.timeout (no axios)
 * ⚠️ NEVER throws — returns null on failure (best-effort)
 * ⚠️ Subclasses implement provider-specific auth + endpoints
 */
import { Logger } from '@nestjs/common';

export interface CourierCreateShipmentInput {
  readonly trackingNumber: string;
  readonly orderId: string;
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly deliveryAddress: string;
  readonly itemCount: number;
  readonly weightKg: number;
  readonly codAmount?: number;
  readonly declaredValue?: number;
  readonly notes?: string;
}

export interface CourierCreateShipmentResult {
  readonly success: boolean;
  readonly providerTrackingNumber?: string;
  readonly labelUrl?: string;
  readonly estimatedDeliveryAt?: string;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface CourierTrackResult {
  readonly success: boolean;
  readonly status: string;
  readonly occurredAt: string;
  readonly location?: string;
  readonly message?: string;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface CourierCancelResult {
  readonly success: boolean;
  readonly message?: string;
}

export abstract class BaseCourierService {
  protected readonly logger: Logger;
  protected abstract readonly providerCode: string;
  protected abstract readonly baseUrl: string;
  protected abstract readonly timeoutMs: number;

  protected constructor(serviceName: string) {
    this.logger = new Logger(serviceName);
  }

  abstract createShipment(input: CourierCreateShipmentInput): Promise<CourierCreateShipmentResult>;
  abstract track(trackingNumber: string): Promise<CourierTrackResult | null>;
  abstract cancel(trackingNumber: string): Promise<CourierCancelResult>;

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

  protected async fetchJson<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T | null> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        signal: AbortSignal.timeout(this.timeoutMs),
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      });

      if (!res.ok) {
        this.logger.warn(
          `${this.providerCode} HTTP ${res.status} on ${path}`,
        );
        return null;
      }

      return (await res.json()) as T;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`${this.providerCode} fetch error on ${path}: ${msg}`);
      return null;
    }
  }
}
