/**
 * TaxClient — HTTP client for tax-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface TaxCalculationInput {
  readonly amount: number;
  readonly currency: string;
  readonly country?: string;
  readonly region?: string;
  readonly category?: string;
}

export interface TaxCalculationResult {
  readonly taxAmount: number;
  readonly rate: number;
  readonly currency: string;
}

@Injectable()
export class TaxClient {
  private readonly logger = new Logger(TaxClient.name);
  private readonly baseUrl = getOptionalEnv('TAX_SERVICE_URL', 'http://localhost:3010');
  private readonly timeout = Number(getOptionalEnv('TAX_SERVICE_TIMEOUT', '5000'));

  async calculate(input: TaxCalculationInput): Promise<TaxCalculationResult | null> {
    try {
      const res = await fetch(`${this.baseUrl}/tax/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as TaxCalculationResult;
    } catch (err) {
      this.logger.warn(`Tax calculation failed`);
      return null;
    }
  }
}
