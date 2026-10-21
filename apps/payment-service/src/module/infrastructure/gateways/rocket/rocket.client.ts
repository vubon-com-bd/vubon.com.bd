/**
 * RocketClient — HTTP client for Rocket (DBBL) API
 * @module payment-service/infrastructure/gateways/rocket
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_ROCKET_CONFIG } from './rocket.config.js';
import type {
  RocketCreateRequest,
  RocketCreateResponse,
  RocketVerifyResponse,
} from './rocket.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class RocketClient {
  private readonly logger = new Logger(RocketClient.name);

  async createPayment(
    req: RocketCreateRequest,
  ): Promise<RocketCreateResponse> {
    const cfg = PAYMENT_ROCKET_CONFIG;
    if (!cfg.merchantId || !cfg.apiKey || !cfg.baseUrl) {
      throw new GatewayNotConfiguredError('rocket');
    }
    return this.post<RocketCreateResponse>('/payment/create', req);
  }

  async verifyPayment(paymentId: string): Promise<RocketVerifyResponse> {
    return this.post<RocketVerifyResponse>('/payment/verify', {
      merchantId: PAYMENT_ROCKET_CONFIG.merchantId,
      rocketPaymentId: paymentId,
    });
  }

  private async post<TResponse>(
    path: string,
    body: unknown,
  ): Promise<TResponse> {
    const cfg = PAYMENT_ROCKET_CONFIG;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);

    try {
      const res = await fetch(`${cfg.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cfg.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const data = (await res.json()) as TResponse & {
        statusMessage?: string;
      };
      if (!res.ok) {
        throw new GatewayOperationError(
          'rocket',
          path,
          data.statusMessage ?? `HTTP ${res.status}`,
          data,
        );
      }
      return data;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('rocket', path, cfg.timeoutMs);
      }
      if (err instanceof GatewayOperationError) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[POST ${path}] ${msg}`);
      throw new GatewayOperationError('rocket', path, msg);
    } finally {
      clearTimeout(timer);
    }
  }
}
