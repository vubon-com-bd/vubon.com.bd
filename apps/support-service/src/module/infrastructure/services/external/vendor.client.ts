import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface VendorDTO {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

@Injectable()
export class VendorClient {
  private readonly logger = new Logger(VendorClient.name);

  constructor(private readonly http: ExternalClient) {}

  async getById(vendorId: string): Promise<VendorDTO | null> {
    try {
      const res: ClientResponse<VendorDTO> = await this.http.get<VendorDTO>(
        `/vendors/${vendorId}`,
      );
      return res.data;
    } catch (error) {
      this.logger.warn(
        `Failed to fetch vendor ${vendorId}: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    }
  }
}
