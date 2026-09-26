import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface VendorPublic {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3004'),
      timeout: getOptionalEnvInt('VENDOR_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async findById(vendorId: string): Promise<VendorPublic | null> {
    try {
      const { data } = await this.http.get<VendorPublic>(`/vendors/${vendorId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Vendor fetch failed for ${vendorId}`, error);
      return null;
    }
  }
}
