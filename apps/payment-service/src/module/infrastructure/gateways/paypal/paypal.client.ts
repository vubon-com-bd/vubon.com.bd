/**
 * PaypalClient — HTTP client for PayPal Orders v2 API
 * @module payment-service/infrastructure/gateways/paypal
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_PAYPAL_CONFIG } from './paypal.config.js';
import type {
  PaypalAuthResponse,
  PaypalCreateOrderRequest,
  PaypalOrder,
  PaypalCaptureResponse,
  PaypalRefundResponse,
  PaypalWebhookVerifyRequest,
  PaypalWebhookVerifyResponse,
} from './paypal.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class PaypalClient {
  private readonly logger = new Logger(PaypalClient.name);
  private tokenCache: { token: string; expiresAt: number } | null = null;

  async authenticate(): Promise<string> {
    if (this.tokenCache && Date.now() < this.tokenCache.expiresAt) {
      return this.tokenCache.token;
    }
    const cfg = PAYMENT_PAYPAL_CONFIG;
    if (!cfg.clientId || !cfg.clientSecret) {
      throw new GatewayNotConfiguredError('paypal');
    }
    const basic = Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString('base64');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(`${cfg.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
        signal: controller.signal,
      });
      const json = (await res.json()) as PaypalAuthResponse;
      if (!res.ok) {
        throw new GatewayOperationError(
          'paypal',
          'auth',
          `HTTP ${res.status}`,
          json,
        );
      }
      const ttlMs = Math.max(60_000, (json.expires_in - 60) * 1000);
      this.tokenCache = { token: json.access_token, expiresAt: Date.now() + ttlMs };
      return json.access_token;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('paypal', 'auth', cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  async createOrder(req: PaypalCreateOrderRequest): Promise<PaypalOrder> {
    return this.post<PaypalOrder>('/v2/checkout/orders', req);
  }

  async captureOrder(orderId: string): Promise<PaypalCaptureResponse> {
    return this.post<PaypalCaptureResponse>(
      `/v2/checkout/orders/${orderId}/capture`,
      {},
    );
  }

  async getOrder(orderId: string): Promise<PaypalOrder> {
    return this.get<PaypalOrder>(`/v2/checkout/orders/${orderId}`);
  }

  async refundCapture(
    captureId: string,
    amount?: { value: string; currency_code: string },
  ): Promise<PaypalRefundResponse> {
    return this.post<PaypalRefundResponse>(
      `/v2/payments/captures/${captureId}/refund`,
      amount ? { amount } : {},
    );
  }

  async verifyWebhook(
    req: PaypalWebhookVerifyRequest,
  ): Promise<PaypalWebhookVerifyResponse> {
    return this.post<PaypalWebhookVerifyResponse>(
      '/v1/notifications/verify-webhook-signature',
      req,
    );
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const cfg = PAYMENT_PAYPAL_CONFIG;
    const token = await this.authenticate();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(`${cfg.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const json = (await res.json()) as T & { message?: string };
      if (!res.ok) {
        throw new GatewayOperationError(
          'paypal',
          path,
          json.message ?? `HTTP ${res.status}`,
          json,
        );
      }
      return json;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('paypal', path, cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  private async get<T>(path: string): Promise<T> {
    const cfg = PAYMENT_PAYPAL_CONFIG;
    const token = await this.authenticate();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(`${cfg.baseUrl}${path}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      const json = (await res.json()) as T;
      if (!res.ok) {
        throw new GatewayOperationError('paypal', path, `HTTP ${res.status}`, json);
      }
      return json;
    } finally {
      clearTimeout(timer);
    }
  }
}
