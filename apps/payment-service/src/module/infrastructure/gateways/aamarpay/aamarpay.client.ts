import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { AamarpayConfig } from './aamarpay.config';
import type {
  AamarpayCreatePaymentRequest,
  AamarpayCreatePaymentResponse,
  AamarpayValidateResponse,
  AamarpayRefundResponse,
} from './aamarpay.types';

@Injectable()
export class AamarpayClient {
  private readonly logger = new Logger(AamarpayClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: AamarpayConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  async createPayment(
    input: AamarpayCreatePaymentRequest,
  ): Promise<AamarpayCreatePaymentResponse> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined && value !== null) params.append(key, String(value));
    }
    const { data } = await this.http.post<AamarpayCreatePaymentResponse>(
      '/request.php',
      params,
    );
    return data;
  }

  async validateTransaction(merTxnId: string): Promise<AamarpayValidateResponse> {
    const params = new URLSearchParams({
      request_id: merTxnId,
      store_id: this.config.storeId,
      signature_key: this.config.signatureKey,
      type: 'json',
    });
    const { data } = await this.http.get<AamarpayValidateResponse>(
      `/api/v1/trxcheck/request.php?${params.toString()}`,
    );
    return data;
  }

  async refund(merTxnId: string, amount: string): Promise<AamarpayRefundResponse> {
    const params = new URLSearchParams({
      refund_amount: amount,
      refund_reason: 'Customer refund',
      mer_txnid: merTxnId,
      store_id: this.config.storeId,
      signature_key: this.config.signatureKey,
    });
    const { data } = await this.http.post<AamarpayRefundResponse>(
      '/api/v1/trxcheck/refund.php',
      params,
    );
    return data;
  }
}
