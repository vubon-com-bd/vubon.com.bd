import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface VendorPublic {
  readonly id: string;
  readonly name: string;
  readonly email: string | null;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.VENDOR_SERVICE_URL ?? 'http://localhost:3005';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(vendorId: string): Promise<VendorPublic | null> {
    try {
      const { data } = await this.http.get<VendorPublic>(`/vendors/${vendorId}`);
      return data;
    } catch {
      this.logger.warn(`Vendor ${vendorId} not found`);
      return null;
    }
  }
}
