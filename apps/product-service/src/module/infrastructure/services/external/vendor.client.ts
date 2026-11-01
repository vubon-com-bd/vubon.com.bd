/**
 * VendorClient — HTTP client for vendor-service
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorDTO {
  readonly id: string;
  readonly name?: string;
  readonly status?: string;
  readonly isApproved?: boolean;
}

export const VENDOR_CLIENT = Symbol('VENDOR_CLIENT');

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3003');
    this.timeout = Number(getOptionalEnv('VENDOR_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<VendorDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/${id}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as VendorDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Vendor fetch failed (${id}): ${msg.slice(0, 100)}`);
      return null;
    }
  }


  async getByUserId(userId: string): Promise<VendorDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/by-user/${userId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as VendorDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Vendor fetch by userId failed (${userId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async isApproved(id: string): Promise<boolean> {
    const vendor = await this.getById(id);
    return vendor?.isApproved === true && vendor.status === 'active';
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
