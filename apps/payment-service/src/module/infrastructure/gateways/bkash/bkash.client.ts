/**
 * BkashClient — low-level HTTP client for bKash API
 * @module payment-service/infrastructure/gateways/bkash
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_BKASH_CONFIG } from './bkash.config.js';
import type {
  BkashAuthResponse,
  BkashCreatePaymentRequest,
  BkashCreatePaymentResponse,
  BkashExecutePaymentResponse,
  BkashQueryPaymentResponse,
  BkashRefundRequest,
  BkashRefundResponse,
} from './bkash.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class BkashClient {
  private readonly logger = new Logger(BkashClient.name);
  private tokenCache: { token: string; expiresAt: number } | null = null;

  async authenticate(): Promise<string> {
    if (this.tokenCache && Date.now() < this.tokenCache.expiresAt) {
      return this.tokenCache.token;
    }

    const cfg = PAYMENT_BKASH_CONFIG;
    if (!cfg.appKey || !cfg.appSecret || !cfg.username || !cfg.password) {
      throw new GatewayNotConfiguredError('bkash');
    }

    const res = await this.post<BkashAuthResponse>(
      '/tokenized/checkout/token/grant',
      {
        app_key: cfg.appKey,
        app_secret: cfg.appSecret,
      },
      {
        username: cfg.username,
        password: cfg.password,
      },
    );

    const ttlMs = Math.max(60_000, (res.expires_in - 60) * 1000);
    this.tokenCache = {
      token: res.id_token,
      expiresAt: Date.now() + ttlMs,
    };
    return res.id_token;
  }

  async createPayment(
    req: BkashCreatePaymentRequest,
  ): Promise<BkashCreatePaymentResponse> {
    return this.post<BkashCreatePaymentResponse>(
      '/tokenized/checkout/create',
      req,
      await this.authHeaders(),
    );
  }

  async executePayment(paymentId: string): Promise<BkashExecutePaymentResponse> {
    return this.post<BkashExecutePaymentResponse>(
      '/tokenized/checkout/execute',
      { paymentID: paymentId },
      await this.authHeaders(),
    );
  }

  async queryPayment(paymentId: string): Promise<BkashQueryPaymentResponse> {
    return this.post<BkashQueryPaymentResponse>(
      '/tokenized/checkout/payment/status',
      { paymentID: paymentId },
      await this.authHeaders(),
    );
  }

  async refund(req: BkashRefundRequest): Promise<BkashRefundResponse> {
    return this.post<BkashRefundResponse>(
      '/tokenized/checkout/payment/refund',
      req,
      await this.authHeaders(),
    );
  }

  private async authHeaders(): Promise<Record<string, string>> {
    const token = await this.authenticate();
    return {
      Authorization: token,
      'X-App-Key': PAYMENT_BKASH_CONFIG.appKey,
    };
  }

  private async post<TResponse>(
    path: string,
    body: unknown,
    extraHeaders: Record<string, string>,
  ): Promise<TResponse> {
    const cfg = PAYMENT_BKASH_CONFIG;
    const url = `${cfg.baseUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...extraHeaders,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const data = (await res.json()) as TResponse & {
        statusCode?: string;
        statusMessage?: string;
      };

      if (!res.ok) {
        throw new GatewayOperationError(
          'bkash',
          path,
          data.statusMessage ?? `HTTP ${res.status}`,
          data,
        );
      }
      return data;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('bkash', path, cfg.timeoutMs);
      }
      if (err instanceof GatewayOperationError) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[POST ${path}] ${msg}`);
      throw new GatewayOperationError('bkash', path, msg);
    } finally {
      clearTimeout(timer);
    }
  }
}
