import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface TaxCalculation {
  readonly amount: number;
  readonly rate: number;
  readonly currency: string;
}

@Injectable()
export class TaxClient {
  private readonly logger = new Logger(TaxClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['TAX_SERVICE_URL'] ?? 'http://localhost:3008';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async calculate(input: {
    readonly country: string;
    readonly region?: string;
    readonly subtotal: number;
    readonly currency: string;
  }): Promise<TaxCalculation | null> {
    try {
      const { data } = await this.http.post<TaxCalculation>(
        '/api/v1/tax/calculate',
        input,
      );
      return data;
    } catch {
      this.logger.warn('Tax calculation failed');
      return null;
    }
  }
}
