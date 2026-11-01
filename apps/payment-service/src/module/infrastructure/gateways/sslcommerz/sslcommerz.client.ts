/**
 * SslcommerzClient — HTTP client for SSLCommerz API
 * @module payment-service/infrastructure/gateways/sslcommerz
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_SSLCOMMERZ_CONFIG } from './sslcommerz.config.js';
import type {
  SslcommerzCreateSessionRequest,
  SslcommerzCreateSessionResponse,
  SslcommerzValidationResponse,
} from './sslcommerz.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class SslcommerzClient {
  private readonly logger = new Logger(SslcommerzClient.name);

  async createSession(
    req: SslcommerzCreateSessionRequest,
  ): Promise<SslcommerzCreateSessionResponse> {
    this.assertConfigured();
    return this.post<SslcommerzCreateSessionResponse>(
      '/gwprocess/v4/api.php',
      req,
    );
  }

  async validateTransaction(
    valId: string,
  ): Promise<SslcommerzValidationResponse> {
    this.assertConfigured();
    const cfg = PAYMENT_SSLCOMMERZ_CONFIG;
    const params = new URLSearchParams({
      val_id: valId,
      store_id: cfg.storeId,
      store_passwd: cfg.storePassword,
      format: 'json',
    });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(
        `${cfg.baseUrl}/validator/api/validationserverAPI.php?${params.toString()}`,
        { method: 'GET', signal: controller.signal },
      );
      const json = (await res.json()) as SslcommerzValidationResponse;
      if (!res.ok) {
        throw new GatewayOperationError('sslcommerz', 'validate', `HTTP ${res.status}`, json);
      }
      return json;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('sslcommerz', 'validate', cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  private assertConfigured(): void {
    const cfg = PAYMENT_SSLCOMMERZ_CONFIG;
    if (!cfg.storeId || !cfg.storePassword) {
      throw new GatewayNotConfiguredError('sslcommerz');
    }
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const cfg = PAYMENT_SSLCOMMERZ_CONFIG;
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
      const json = (await res.json()) as T & { failedreason?: string };
      if (!res.ok) {
        throw new GatewayOperationError(
          'sslcommerz',
          path,
          json.failedreason ?? `HTTP ${res.status}`,
          json,
        );
      }
      return json;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('sslcommerz', path, cfg.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
