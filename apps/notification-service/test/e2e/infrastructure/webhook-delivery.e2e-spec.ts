/**
 * Webhook Delivery E2E
 * @module notification-service/test/e2e/infrastructure
 */
import { WebhookSignerInfraService } from '@infrastructure/services/internal/webhook-signer.service.js';
import { WebhookVerifierInfraService } from '@infrastructure/services/internal/webhook-verifier.service.js';
import { HttpWebhookProvider } from '@infrastructure/providers/webhook/http.provider.js';

describe('Webhook Delivery E2E', () => {
  let signer: WebhookSignerInfraService;
  let verifier: WebhookVerifierInfraService;
  let provider: HttpWebhookProvider;

  beforeEach(() => {
    signer = new WebhookSignerInfraService();
    verifier = new WebhookVerifierInfraService();
    provider = new HttpWebhookProvider();
  });

  it('sign → verify roundtrip', () => {
    const secret = 'webhook-secret-123';
    const payload = JSON.stringify({ event: 'order.created', data: { id: 'o-1' } });

    const signed = signer.sign({ payload, secret });
    const valid = signer.verify({
      payload,
      secret,
      header: signed.header,
    });
    expect(valid).toBe(true);
  });

  it('provider.sign produces HMAC-SHA256', () => {
    const sig = provider.sign('test-payload', 'secret');
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });

  it('verifier handles sendgrid', () => {
    const crypto = require('node:crypto');
    const secret = 'sg-secret';
    const payload = 'event-payload';
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const valid = verifier.verify({
      provider: 'sendgrid',
      payload,
      secret,
      signature: expected,
    });
    expect(valid).toBe(true);
  });

  it('rejects tampered payload', () => {
    const secret = 'secret';
    const originalPayload = '{"id":"a"}';
    const signed = signer.sign({ payload: originalPayload, secret });
    const valid = signer.verify({
      payload: '{"id":"b"}',
      secret,
      header: signed.header,
    });
    expect(valid).toBe(false);
  });
});
