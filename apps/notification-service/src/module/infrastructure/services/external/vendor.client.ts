/**
 * Vendor Service Client
 * @module notification-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorSummaryDTO {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly status: string;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3004');
  }

  async getById(id: string): Promise<VendorSummaryDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/${id}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) return null;
      return (await res.json()) as VendorSummaryDTO;
    } catch (err) {
      this.logger.warn(`Fetch vendor ${id} failed: ${String(err).slice(0, 100)}`);
      return null;
    }
  }
}
