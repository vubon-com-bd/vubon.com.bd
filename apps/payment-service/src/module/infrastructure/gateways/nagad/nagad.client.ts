/**
 * NagadClient — HTTP client for Nagad API
 * @module payment-service/infrastructure/gateways/nagad
 *
 * ⚠️ Nagad requires RSA-signed + AES-encrypted payloads.
 * Real impl would use shared-utils crypto helpers; this client
 * focuses on request/response orchestration.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_NAGAD_CONFIG } from './nagad.config.js';
import type {
  NagadInitializeResponse,
  NagadCompleteRequest,
  NagadInitializeRequest,
} from './nagad.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

@Injectable()
export class NagadClient {
  private readonly logger = new Logger(NagadClient.name);

  async initialize(
    req: NagadInitializeRequest,
  ): Promise<NagadInitializeResponse> {
    const cfg = PAYMENT_NAGAD_CONFIG;
    if (!cfg.merchantId || !cfg.baseUrl) {
      throw new GatewayNotConfiguredError('nagad');
    }
    return this.post<NagadInitializeResponse>('/api/dfs/check-out/initialize', req);
  }

  async complete(req: NagadCompleteRequest): Promise<NagadInitializeResponse> {
    return this.post<NagadInitializeResponse>('/api/dfs/check-out/complete', req);
  }

  private async post<TResponse>(
    path: string,
    body: unknown,
  ): Promise<TResponse> {
    const cfg = PAYMENT_NAGAD_CONFIG;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);

    try {
      const res = await fetch(`${cfg.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-KM-Api-Version': 'v-0.2.0',
          'X-KM-IP-V4': '127.0.0.1',
          'X-KM-Client-Type': 'PC_WEB',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const data = (await res.json()) as TResponse & { message?: string };
      if (!res.ok) {
        throw new GatewayOperationError(
          'nagad',
          path,
          data.message ?? `HTTP ${res.status}`,
          data,
        );
      }
      return data;
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('nagad', path, cfg.timeoutMs);
      }
      if (err instanceof GatewayOperationError) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[POST ${path}] ${msg}`);
      throw new GatewayOperationError('nagad', path, msg);
    } finally {
      clearTimeout(timer);
    }
  }
}
