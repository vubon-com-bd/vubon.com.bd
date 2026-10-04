import { jest } from '@jest/globals';
import { SignatureService } from '../../../../src/module/infrastructure/services/internal/signature.service.js';

describe('SignatureService — every gateway branch', () => {
  let s: SignatureService;

  beforeEach(() => {
    s = new SignatureService();
  });

  it('sslcommerz uses HMAC verification', async () => {
    const { hmacSha256 } = await import('@vubon/shared-utils/infrastructure');
    const body = '{"id":"1"}';
    const secret = 'sec';
    const sig = await hmacSha256(body, secret);
    const r = await s.verify({ gateway: 'sslcommerz', rawBody: body, signature: sig, secret });
    expect(r.verified).toBe(true);
  });

  it('nagad token compare', async () => {
    const r = await s.verify({
      gateway: 'nagad',
      rawBody: '{}',
      signature: 'tok',
      secret: 'tok',
    });
    expect(r.verified).toBe(true);
  });

  it('rocket token compare', async () => {
    const r = await s.verify({
      gateway: 'rocket',
      rawBody: '{}',
      signature: 'tok',
      secret: 'tok',
    });
    expect(r.verified).toBe(true);
  });

  it('upay token compare', async () => {
    const r = await s.verify({
      gateway: 'upay',
      rawBody: '{}',
      signature: 'tok',
      secret: 'tok',
    });
    expect(r.verified).toBe(true);
  });

  it('paypal token compare', async () => {
    const r = await s.verify({
      gateway: 'paypal',
      rawBody: '{}',
      signature: 'tok',
      secret: 'tok',
    });
    expect(r.verified).toBe(true);
  });

  it('unknown gateway → fallback token compare (match)', async () => {
    const r = await s.verify({
      gateway: 'unknown',
      rawBody: '{}',
      signature: 'tok',
      secret: 'tok',
    });
    expect(r.verified).toBe(true);
  });

  it('unknown gateway → fallback token compare (mismatch)', async () => {
    const r = await s.verify({
      gateway: 'unknown',
      rawBody: '{}',
      signature: 'tok1',
      secret: 'tok2',
    });
    expect(r.verified).toBe(false);
  });
});
