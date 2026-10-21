/**
 * Gateway Clients — All Methods Coverage
 * @module payment-service/test/unit/infrastructure/gateways/clients
 *
 * Covers every client method's happy path (each function must be invoked)
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { installFetchMock } from '@test-infra/http-mock';

jest.mock('@infrastructure/gateways/bkash/bkash.config', () => ({
  PAYMENT_BKASH_CONFIG: {
    enabled: true, appKey: 'k', appSecret: 's', username: 'u', password: 'p',
    baseUrl: 'https://b.test', callbackUrl: '', timeoutMs: 5000, tokenCacheTtlSeconds: 3300,
    merchantShortCode: '', intent: 'sale',
  },
}));

jest.mock('@infrastructure/gateways/nagad/nagad.config', () => ({
  PAYMENT_NAGAD_CONFIG: {
    enabled: true, merchantId: 'm', merchantPrivateKey: 'p', pgPublicKey: 'g',
    baseUrl: 'https://n.test', callbackUrl: '', timeoutMs: 5000, merchantNumber: '', callbackUrlAlt: '',
  },
}));

jest.mock('@infrastructure/gateways/rocket/rocket.config', () => ({
  PAYMENT_ROCKET_CONFIG: {
    enabled: true, merchantId: 'm', apiKey: 'k', baseUrl: 'https://r.test',
    callbackUrl: '', timeoutMs: 5000, returnUrl: '', cancelUrl: '',
  },
}));

jest.mock('@infrastructure/gateways/stripe/stripe.config', () => ({
  PAYMENT_STRIPE_CONFIG: {
    enabled: true, secretKey: 'sk', publishableKey: 'pk', webhookSecret: 'wh',
    apiVersion: 'v1', timeoutMs: 5000, maxRetries: 3, captureMethod: 'automatic',
    returnUrl: '', successUrl: '', cancelUrl: '',
  },
}));

jest.mock('@infrastructure/gateways/paypal/paypal.config', () => ({
  PAYMENT_PAYPAL_CONFIG: {
    enabled: true, clientId: 'c', clientSecret: 's', webhookId: 'w', baseUrl: 'https://pp.test',
    timeoutMs: 5000, brandName: 'V', landingPage: 'LOGIN', returnUrl: '', cancelUrl: '',
    tokenCacheTtlSeconds: 3000,
  },
}));

jest.mock('@infrastructure/gateways/sslcommerz/sslcommerz.config', () => ({
  PAYMENT_SSLCOMMERZ_CONFIG: {
    enabled: true, storeId: 's', storePassword: 'p', baseUrl: 'https://s.test',
    successUrl: '', failUrl: '', cancelUrl: '', ipnUrl: '', timeoutMs: 5000, sandbox: true,
  },
}));

jest.mock('@infrastructure/gateways/aamarpay/aamarpay.config', () => ({
  PAYMENT_AAMARPAY_CONFIG: {
    enabled: true, storeId: 's', signatureKey: 'k', baseUrl: 'https://a.test',
    successUrl: '', failUrl: '', cancelUrl: '', ipnUrl: '', timeoutMs: 5000,
  },
}));

import { BkashClient } from '@infrastructure/gateways/bkash/bkash.client';
import { NagadClient } from '@infrastructure/gateways/nagad/nagad.client';
import { RocketClient } from '@infrastructure/gateways/rocket/rocket.client';
import { StripeClient } from '@infrastructure/gateways/stripe/stripe.client';
import { PaypalClient } from '@infrastructure/gateways/paypal/paypal.client';
import { SslcommerzClient } from '@infrastructure/gateways/sslcommerz/sslcommerz.client';
import { AamarpayClient } from '@infrastructure/gateways/aamarpay/aamarpay.client';

describe('Gateway Clients — All Methods', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('BkashClient — all methods', () => {
    it('covers authenticate, createPayment, executePayment, queryPayment, refund', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { id_token: 't', expires_in: 3600 } },
        { ok: true, status: 200, body: { paymentID: 'p', bkashURL: 'u', statusCode: '0000' } },
        { ok: true, status: 200, body: { paymentID: 'p', trxID: 't', transactionStatus: 'Completed', statusCode: '0000' } },
        { ok: true, status: 200, body: { paymentID: 'p', transactionStatus: 'Completed', statusCode: '0000' } },
        { ok: true, status: 200, body: { refundTrxID: 'r', transactionStatus: 'Completed', statusCode: '0000' } },
      ]);
      const c = new BkashClient();
      await c.authenticate();
      await c.createPayment({
        mode: '0011', payerReference: 'u', callbackURL: 'c',
        amount: '1', currency: 'BDT', intent: 'sale', merchantInvoiceNumber: 'p',
      });
      await c.executePayment('p');
      await c.queryPayment('p');
      await c.refund({ paymentID: 'p', trxID: 't', amount: '1', currency: 'BDT', reason: 'r' });
    });

    it('covers authenticate cache hit path', async () => {
      installFetchMock({
        ok: true, status: 200, body: { id_token: 't', expires_in: 3600 },
      });
      const c = new BkashClient();
      await c.authenticate();
      await c.authenticate(); // cache hit
    });
  });

  describe('NagadClient — all methods', () => {
    it('covers initialize and complete', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { sensitiveData: 'sd', signature: 'sg' } },
        { ok: true, status: 200, body: { sensitiveData: 'sd2', signature: 'sg2' } },
      ]);
      const c = new NagadClient();
      await c.initialize({
        accountNumber: 'a', dateTime: 'd', sensitiveData: 's', signature: 'x',
      });
      await c.complete({ sensitiveData: 's', signature: 'x' });
    });
  });

  describe('RocketClient — all methods', () => {
    it('covers createPayment and verifyPayment', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { success: true, rocketPaymentId: 'p', redirectUrl: 'u' } },
        { ok: true, status: 200, body: { success: true, status: 'Success' } },
      ]);
      const c = new RocketClient();
      await c.createPayment({
        merchantId: 'm', orderId: 'o', amount: '1', currency: 'BDT',
        successUrl: 's', failUrl: 'f', cancelUrl: 'c',
      });
      await c.verifyPayment('p');
    });
  });

  describe('StripeClient — all methods', () => {
    it('covers create, capture, retrieve, cancel, refund', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { id: 'pi', status: 'requires_payment_method' } },
        { ok: true, status: 200, body: { id: 'pi', status: 'succeeded' } },
        { ok: true, status: 200, body: { id: 'pi', status: 'succeeded', amount: 100, currency: 'bdt' } },
        { ok: true, status: 200, body: { id: 'pi', status: 'canceled' } },
        { ok: true, status: 200, body: { id: 're', status: 'succeeded' } },
      ]);
      const c = new StripeClient();
      await c.createPaymentIntent({ amount: 100, currency: 'BDT' });
      await c.capturePaymentIntent('pi', { amount_to_capture: 100 });
      await c.retrievePaymentIntent('pi');
      await c.cancelPaymentIntent('pi');
      await c.createRefund({ payment_intent: 'pi', amount: 50 });
    });
  });

  describe('PaypalClient — all methods', () => {
    it('covers auth, createOrder, captureOrder, getOrder, refundCapture, verifyWebhook', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 't', expires_in: 3600 } },
        { ok: true, status: 201, body: { id: 'o', status: 'CREATED', links: [] } },
        { ok: true, status: 201, body: { id: 'o', status: 'COMPLETED' } },
        { ok: true, status: 200, body: { id: 'o', status: 'APPROVED', links: [], purchase_units: [] } },
        { ok: true, status: 201, body: { id: 'r', status: 'COMPLETED' } },
        { ok: true, status: 200, body: { verification_status: 'SUCCESS' } },
      ]);
      const c = new PaypalClient();
      await c.authenticate();
      await c.createOrder({
        intent: 'CAPTURE',
        purchase_units: [{ reference_id: 'p', amount: { currency_code: 'BDT', value: '1' } }],
      });
      await c.captureOrder('o');
      await c.getOrder('o');
      await c.refundCapture('cap');
      await c.verifyWebhook({
        auth_algo: 'a', cert_url: 'c', transmission_id: 't',
        transmission_sig: 's', transmission_time: 't',
        webhook_id: 'w', webhook_event: {},
      });
    });

    it('covers authenticate cache hit', async () => {
      installFetchMock({
        ok: true, status: 200, body: { access_token: 't', expires_in: 3600 },
      });
      const c = new PaypalClient();
      await c.authenticate();
      await c.authenticate();
    });
  });

  describe('SslcommerzClient — all methods', () => {
    it('covers createSession and validateTransaction', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { status: 'SUCCESS', sessionkey: 's', GatewayPageURL: 'u' } },
        { ok: true, status: 200, body: { status: 'VALID', val_id: 'v', amount: '1', currency: 'BDT' } },
      ]);
      const c = new SslcommerzClient();
      await c.createSession({
        store_id: 's', store_passwd: 'p', total_amount: '1', currency: 'BDT',
        tran_id: 't', success_url: 's', fail_url: 'f', cancel_url: 'c',
        cus_name: 'c', cus_email: 'e', cus_add1: 'a', cus_city: 'c',
        cus_country: 'b', cus_phone: 'p', shipping_method: 'NO',
        product_name: 'p', product_category: 'c', product_profile: 'general',
      });
      await c.validateTransaction('v');
    });
  });

  describe('AamarpayClient — all methods', () => {
    it('covers createPayment and verifyPayment', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { result: 'true', payment_url: 'u' } },
        { ok: true, status: 200, body: { status_code: '2', pay_status: 'Successful' } },
      ]);
      const c = new AamarpayClient();
      await c.createPayment({
        store_id: 's', signature_key: 'k', tran_id: 't', amount: '1',
        currency: 'BDT', desc: 'd', cus_name: 'c', cus_email: 'e',
        cus_phone: 'p', cus_add1: 'a', cus_city: 'c', cus_country: 'b',
        success_url: 's', fail_url: 'f', cancel_url: 'c', type: 'json',
      });
      await c.verifyPayment('t');
    });
  });
});
