/**
 * StripeClient — HTTP client for Stripe API
 * @module payment-service/infrastructure/gateways/stripe
 */
import { Injectable, Logger } from '@nestjs/common';
import { PAYMENT_STRIPE_CONFIG } from './stripe.config.js';
import type {
  StripeCreatePaymentIntentRequest,
  StripePaymentIntent,
  StripeCaptureRequest,
  StripeRefundRequest,
  StripeRefund,
} from './stripe.types.js';
import {
  GatewayNotConfiguredError,
  GatewayOperationError,
  GatewayTimeoutError,
} from '../base/gateway.errors.js';

const API_BASE = 'https://api.stripe.com/v1';

@Injectable()
export class StripeClient {
  private readonly logger = new Logger(StripeClient.name);

  async createPaymentIntent(
    req: StripeCreatePaymentIntentRequest,
  ): Promise<StripePaymentIntent> {
    this.assertConfigured();
    const form = new URLSearchParams();
    form.set('amount', String(Math.round(req.amount * 100)));
    form.set('currency', req.currency.toLowerCase());
    form.set('capture_method', req.capture_method ?? PAYMENT_STRIPE_CONFIG.captureMethod);
    form.set('automatic_payment_methods[enabled]', 'true');
    if (req.description) form.set('description', req.description);
    if (req.return_url) form.set('return_url', req.return_url);
    if (req.metadata) {
      for (const [k, v] of Object.entries(req.metadata)) {
        form.set(`metadata[${k}]`, v);
      }
    }
    return this.post<StripePaymentIntent>('/payment_intents', form);
  }

  async capturePaymentIntent(
    paymentIntentId: string,
    req: StripeCaptureRequest = {},
  ): Promise<StripePaymentIntent> {
    const form = new URLSearchParams();
    if (req.amount_to_capture !== undefined) {
      form.set('amount_to_capture', String(Math.round(req.amount_to_capture * 100)));
    }
    return this.post<StripePaymentIntent>(
      `/payment_intents/${paymentIntentId}/capture`,
      form,
    );
  }

  async retrievePaymentIntent(
    paymentIntentId: string,
  ): Promise<StripePaymentIntent> {
    return this.get<StripePaymentIntent>(`/payment_intents/${paymentIntentId}`);
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<StripePaymentIntent> {
    return this.post<StripePaymentIntent>(
      `/payment_intents/${paymentIntentId}/cancel`,
      new URLSearchParams(),
    );
  }

  async createRefund(req: StripeRefundRequest): Promise<StripeRefund> {
    const form = new URLSearchParams();
    form.set('payment_intent', req.payment_intent);
    if (req.amount !== undefined) {
      form.set('amount', String(Math.round(req.amount * 100)));
    }
    if (req.reason) form.set('reason', req.reason);
    return this.post<StripeRefund>('/refunds', form);
  }

  private assertConfigured(): void {
    if (!PAYMENT_STRIPE_CONFIG.secretKey) {
      throw new GatewayNotConfiguredError('stripe');
    }
  }

  private async post<T>(path: string, form: URLSearchParams): Promise<T> {
    const cfg = PAYMENT_STRIPE_CONFIG;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Version': cfg.apiVersion,
        },
        body: form.toString(),
        signal: controller.signal,
      });
      return this.parseResponse<T>(res, path);
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') {
        throw new GatewayTimeoutError('stripe', path, cfg.timeoutMs);
      }
      if (err instanceof GatewayOperationError) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[POST ${path}] ${msg}`);
      throw new GatewayOperationError('stripe', path, msg);
    } finally {
      clearTimeout(timer);
    }
  }

  private async get<T>(path: string): Promise<T> {
    const cfg = PAYMENT_STRIPE_CONFIG;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cfg.secretKey}`,
          'Stripe-Version': cfg.apiVersion,
        },
        signal: controller.signal,
      });
      return this.parseResponse<T>(res, path);
    } finally {
      clearTimeout(timer);
    }
  }

  private async parseResponse<T>(res: Response, path: string): Promise<T> {
    const json = (await res.json()) as T & { error?: { message?: string } };
    if (!res.ok) {
      throw new GatewayOperationError(
        'stripe',
        path,
        json.error?.message ?? `HTTP ${res.status}`,
        json,
      );
    }
    return json;
  }
}
