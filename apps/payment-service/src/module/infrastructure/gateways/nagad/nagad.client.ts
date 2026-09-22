import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { NagadConfig } from './nagad.config';
import type {
  NagadCreatePaymentRequest,
  NagadCreatePaymentResponse,
  NagadVerifyPaymentResponse,
  NagadRefundResponse,
} from './nagad.types';

@Injectable()
export class NagadClient {
  private readonly logger = new Logger(NagadClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: NagadConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async createPayment(
    input: NagadCreatePaymentRequest,
  ): Promise<NagadCreatePaymentResponse> {
    const { data } = await this.http.post<NagadCreatePaymentResponse>(
      '/check-out/initialize',
      input,
      {
        headers: {
          'X-KM-Api-Version': 'v-0.2.0',
          'X-KM-IP-V4': input.ip ?? '0.0.0.0',
          'X-KM-Client-Type': 'PC_WEB',
        },
      },
    );
    return data;
  }

  async verifyPayment(paymentRefId: string): Promise<NagadVerifyPaymentResponse> {
    const { data } = await this.http.get<NagadVerifyPaymentResponse>(
      `/check-out/verify/${paymentRefId}`,
    );
    return data;
  }

  async refund(
    paymentRefId: string,
    amount: string,
  ): Promise<NagadRefundResponse> {
    const { data } = await this.http.post<NagadRefundResponse>(
      '/check-out/refund',
      { paymentRefId, amount },
    );
    return data;
  }
}
