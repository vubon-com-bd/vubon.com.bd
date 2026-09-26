import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { VendorClient } from '../../../application/ports';

interface VendorResponse {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

@Injectable()
export class VendorHttpClient implements VendorClient {
  private readonly logger = new Logger(VendorHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.VENDOR_SERVICE_URL ?? 'http://vendor-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getById(vendorId: string): Promise<VendorResponse | null> {
    try {
      const { data } = await this.http.get<VendorResponse>(`/vendors/${vendorId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch vendor ${vendorId}: ${String(error)}`);
      return null;
    }
  }
}
