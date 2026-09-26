import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface ShippingCalculation {
  readonly method: string;
  readonly cost: number;
  readonly currency: string;
  readonly estimatedDays: number;
}

@Injectable()
export class ShippingClient {
  private readonly logger = new Logger(ShippingClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['LOGISTICS_SERVICE_URL'] ?? 'http://localhost:3007';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async calculate(input: {
    readonly addressId?: string;
    readonly country: string;
    readonly subtotal: number;
    readonly currency: string;
  }): Promise<readonly ShippingCalculation[]> {
    try {
      const { data } = await this.http.post<readonly ShippingCalculation[]>(
        '/api/v1/shipping/calculate',
        input,
      );
      return data;
    } catch {
      this.logger.warn('Shipping calculation failed');
      return [];
    }
  }
}
