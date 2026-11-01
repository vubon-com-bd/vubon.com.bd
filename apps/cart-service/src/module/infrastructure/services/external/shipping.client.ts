/**
 * ShippingClient — HTTP client for shipping service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ShippingQuoteInput {
  readonly method: string;
  readonly weightKg: number;
  readonly destinationCountry?: string;
  readonly destinationCity?: string;
  readonly orderValue: number;
  readonly currency: string;
}

export interface ShippingQuote {
  readonly cost: number;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly method: string;
}

@Injectable()
export class ShippingClient {
  private readonly logger = new Logger(ShippingClient.name);
  private readonly baseUrl = getOptionalEnv('LOGISTICS_SERVICE_URL', 'http://localhost:3007');
  private readonly timeout = Number(getOptionalEnv('SHIPPING_TIMEOUT', '5000'));

  async quote(input: ShippingQuoteInput): Promise<ShippingQuote | null> {
    try {
      const res = await fetch(`${this.baseUrl}/shipping/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as ShippingQuote;
    } catch {
      return null;
    }
  }
}
