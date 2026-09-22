import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface VendorSnapshot {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['VENDOR_SERVICE_URL'] ?? 'http://localhost:3005';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(vendorId: string): Promise<VendorSnapshot | null> {
    try {
      const { data } = await this.http.get<VendorSnapshot>(`/api/v1/vendors/${vendorId}`);
      return data;
    } catch {
      this.logger.warn(`Vendor fetch failed for ${vendorId}`);
      return null;
    }
  }
}
