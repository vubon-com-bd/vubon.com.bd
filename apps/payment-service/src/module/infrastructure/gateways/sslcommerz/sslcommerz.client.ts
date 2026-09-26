import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { SslcommerzConfig } from './sslcommerz.config';
import type {
  SslcommerzCreatePaymentRequest,
  SslcommerzCreatePaymentResponse,
  SslcommerzValidateResponse,
  SslcommerzRefundResponse,
} from './sslcommerz.types';

@Injectable()
export class SslcommerzClient {
  private readonly logger = new Logger(SslcommerzClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: SslcommerzConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  async createPayment(
    input: SslcommerzCreatePaymentRequest,
  ): Promise<SslcommerzCreatePaymentResponse> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined && value !== null) params.append(key, String(value));
    }
    const { data } = await this.http.post<SslcommerzCreatePaymentResponse>(
      '/gwprocess/v4/api.php',
      params,
    );
    return data;
  }

  async validateTransaction(valId: string): Promise<SslcommerzValidateResponse> {
    const params = new URLSearchParams({
      val_id: valId,
      store_id: this.config.storeId,
      store_passwd: this.config.storePassword,
      format: 'json',
    });
    const { data } = await this.http.get<SslcommerzValidateResponse>(
      `/validator/api/validationserverAPI.php?${params.toString()}`,
    );
    return data;
  }

  async refund(
    bankTranId: string,
    amount: string,
  ): Promise<SslcommerzRefundResponse> {
    const params = new URLSearchParams({
      refund_amount: amount,
      bank_tran_id: bankTranId,
      store_id: this.config.storeId,
      store_passwd: this.config.storePassword,
      format: 'json',
    });
    const { data } = await this.http.get<SslcommerzRefundResponse>(
      `/validator/api/merchantTransIDvalidationAPI.php?${params.toString()}`,
    );
    return data;
  }
}
