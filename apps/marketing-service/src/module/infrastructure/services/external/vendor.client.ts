import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorPublic {
  readonly id: string;
  readonly name: string;
}

@Injectable()
export class VendorClient {
  private readonly baseUrl = getOptionalEnv('VENDOR_SERVICE_URL', 'http://localhost:3005/api/v1');

  constructor(private readonly http: HttpService) {}

  async findById(vendorId: string): Promise<VendorPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<VendorPublic>(`${this.baseUrl}/vendors/${vendorId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
