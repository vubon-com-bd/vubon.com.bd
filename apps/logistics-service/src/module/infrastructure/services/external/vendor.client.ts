/**
 * VendorClient — HTTP client for vendor-service
 * @module logistics-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorDTO {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly status?: string;
  readonly pickupAddress?: string;
}

const SERVICE_URL_KEY = 'VENDOR_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3003';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('VENDOR_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<VendorDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Vendor fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: VendorDTO } | VendorDTO;
      return 'data' in body && body.data ? body.data : (body as VendorDTO);
    } catch (err) {
      this.logger.warn(`Vendor fetch error (${id}): ${this.errMsg(err)}`);
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
