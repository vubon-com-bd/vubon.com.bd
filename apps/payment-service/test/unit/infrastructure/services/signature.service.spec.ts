import { jest } from '@jest/globals';
import { SignatureService } from '../../../../src/module/infrastructure/services/internal/signature.service.js';

describe('SignatureService', () => {
  let service: SignatureService;

  beforeEach(() => {
    service = new SignatureService();
  });

  it('verify rejects missing signature', async () => {
    const r = await service.verify({
      gateway: 'bkash',
      rawBody: '{}',
      signature: undefined,
      secret: 'secret',
    });
    expect(r.verified).toBe(false);
    expect(r.reason).toContain('missing signature');
  });

  it('verify rejects missing secret', async () => {
    const r = await service.verify({
      gateway: 'stripe',
      rawBody: '{}',
      signature: 'abc',
      secret: '',
    });
    expect(r.verified).toBe(false);
    expect(r.reason).toContain('missing');
  });

  it('token gateways accept exact match', async () => {
    const r = await service.verify({
      gateway: 'bkash',
      rawBody: '{}',
      signature: 'my-secret-token',
      secret: 'my-secret-token',
    });
    expect(r.verified).toBe(true);
  });

  it('token gateways reject mismatch', async () => {
    const r = await service.verify({
      gateway: 'bkash',
      rawBody: '{}',
      signature: 'wrong-token',
      secret: 'my-secret-token',
    });
    expect(r.verified).toBe(false);
  });

  it('manual gateway always verified', async () => {
    const r = await service.verify({
      gateway: 'manual',
      rawBody: '{}',
      signature: 'anything',
      secret: 'whatever',
    });
    expect(r.verified).toBe(true);
    expect(r.reason).toContain('manual');
  });

  it('stripe uses HMAC verification — accepts valid hmac', async () => {
    const { hmacSha256 } = await import('@vubon/shared-utils/infrastructure');
    const body = '{"id":"evt_1"}';
    const secret = 'whsec_test';
    const sig = await hmacSha256(body, secret);
    const r = await service.verify({
      gateway: 'stripe',
      rawBody: body,
      signature: sig,
      secret,
    });
    expect(r.verified).toBe(true);
  });

  it('stripe rejects invalid hmac', async () => {
    const r = await service.verify({
      gateway: 'stripe',
      rawBody: '{"id":"evt_1"}',
      signature: 'deadbeef',
      secret: 'whsec_test',
    });
    expect(r.verified).toBe(false);
    expect(r.reason).toContain('hmac');
  });
});
