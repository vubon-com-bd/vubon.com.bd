/**
 * VendorServiceClient — cross-service calls to vendor-service
 * @module notification-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { BaseHttpClient } from './http-client.client.js';

export const VENDOR_SERVICE_CLIENT = Symbol('VENDOR_SERVICE_CLIENT');

export interface VendorContact {
  readonly id: string;
  readonly displayName: string;
  readonly email: string;
  readonly phone?: string;
  readonly locale?: string;
}

@Injectable()
export class VendorServiceClient extends BaseHttpClient {
  constructor() {
    super({
      name: 'VendorServiceClient',
      envKey: 'VENDOR_SERVICE_URL',
      defaultTimeoutMs: 8_000,
    });
  }

  async getContact(vendorId: string): Promise<VendorContact | null> {
    return this.get<VendorContact>(`/api/v1/vendors/${vendorId}/contact`);
  }
}
