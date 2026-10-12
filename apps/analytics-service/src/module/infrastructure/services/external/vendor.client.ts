/**
 * Vendor Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorDTO {
  readonly id: string;
  readonly name: string;
  readonly slug?: string;
  readonly status: string;
  readonly tier?: string;
  readonly country?: string;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3008');
    this.timeout = Number(getOptionalEnv('VENDOR_SERVICE_TIMEOUT', '5000'));
  }

  async getById(vendorId: string): Promise<VendorDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/${vendorId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as VendorDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Vendor fetch failed (${vendorId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByIds(vendorIds: readonly string[]): Promise<readonly VendorDTO[]> {
    if (vendorIds.length === 0) return [];
    try {
      const res = await fetch(`${this.baseUrl}/vendors/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: vendorIds }),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly VendorDTO[];
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
