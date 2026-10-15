/**
 * VendorClient — HTTP client for vendor-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly isActive: boolean;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly baseUrl = getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3005');
  private readonly timeout = Number(getOptionalEnv('VENDOR_SERVICE_TIMEOUT', '5000'));

  async getById(id: string): Promise<VendorDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vendors/${id}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as VendorDTO;
    } catch (err) {
      this.logger.warn(`Vendor ${id} fetch failed`);
      return null;
    }
  }

  async isActive(id: string): Promise<boolean> {
    const v = await this.getById(id);
    return v?.isActive ?? false;
  }
}
