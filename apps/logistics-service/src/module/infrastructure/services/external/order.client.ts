/**
 * OrderClient — HTTP client for order-service
 * @module logistics-service/infrastructure/services/external
 *
 * ⚠️ Uses native fetch + AbortSignal.timeout (no axios)
 * ⚠️ NEVER throws — returns null on failure (best-effort)
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface OrderDTO {
  readonly id: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly total?: number;
}

const SERVICE_URL_KEY = 'ORDER_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3005';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('ORDER_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<OrderDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/orders/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Order fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: OrderDTO } | OrderDTO;
      return 'data' in body && body.data ? body.data : (body as OrderDTO);
    } catch (err) {
      this.logger.warn(`Order fetch error (${id}): ${this.errMsg(err)}`);
      return null;
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

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
