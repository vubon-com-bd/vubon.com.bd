/**
 * AamarpayClient — HTTP client for aamarPay API
 * @module payment-service/infrastructure/gateways/aamarpay
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_AAMARPAY_CONFIG } from './aamarpay.config.js';
import type {
  AamarpayCreateRequest,
  AamarpayCreateResponse,
  AamarpayVerifyResponse,
} from './aamarpay.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class AamarpayClient {
  private readonly logger = new Logger(AamarpayClient.name);

  async createPayment(
    req: AamarpayCreateRequest,
  ): Promise<AamarpayCreateResponse> {
    this.assertConfigured();
    return this.post<AamarpayCreateResponse>('/payment/request.php', req);
  }

  async verifyPayment(merTxnId: string): Promise<AamarpayVerifyResponse> {
    this.assertConfigured();
    const cfg = PAYMENT_AAMARPAY_CONFIG;
    const params = new URLSearchParams({
      request_id: merTxnId,
      store_id: cfg.storeId,
      signature_key: cfg.signatureKey,
      type: 'json',
    });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(
        `${cfg.baseUrl}/api/v1/trxcheck/request.php?${params.toString()}`,
        { method: 'GET', signal: controller.signal },
      );
      const json = (await res.json()) as AamarpayVerifyResponse;
      if (!res.ok) {
        throw new GatewayOperationError('aamarpay', 'verify', `HTTP ${res.status}`, json);
      }
      return json;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('aamarpay', 'verify', cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  private assertConfigured(): void {
    const cfg = PAYMENT_AAMARPAY_CONFIG;
    if (!cfg.storeId || !cfg.signatureKey) {
      throw new GatewayNotConfiguredError('aamarpay');
    }
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const cfg = PAYMENT_AAMARPAY_CONFIG;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const form = new URLSearchParams();
      for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
        if (v !== undefined && v !== null) form.set(k, String(v));
      }
      const res = await fetch(`${cfg.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: form.toString(),
        signal: controller.signal,
      });
      const json = (await res.json()) as T & { message?: string };
      if (!res.ok) {
        throw new GatewayOperationError(
          'aamarpay',
          path,
          json.message ?? `HTTP ${res.status}`,
          json,
        );
      }
      return json;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('aamarpay', path, cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
