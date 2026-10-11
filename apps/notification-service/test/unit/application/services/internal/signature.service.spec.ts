import { describe, it, expect } from '@jest/globals';
import { SignatureService } from '../../../../../src/module/infrastructure/services/internal/signature.service.js';

describe('SignatureService', () => {
  const s = new SignatureService();
  const secret = 'super-secret-key-1234567890';
  const payload = '{"event":"order.created"}';

  it('sign returns hex string', () => {
    const sig = s.sign(payload, secret);
    expect(sig).toMatch(/^[0-9a-f]+$/);
  });

  it('buildHeader prefixes with algorithm', () => {
    const h = s.buildHeader(payload, secret, 'sha256');
    expect(h).toMatch(/^sha256=/);
  });

  it('verify returns true for matching signature', () => {
    const sig = s.sign(payload, secret);
    expect(s.verify(payload, sig, secret)).toBe(true);
  });

  it('verify with header prefix', () => {
    const h = s.buildHeader(payload, secret, 'sha256');
    expect(s.verify(payload, h, secret)).toBe(true);
  });

  it('verify returns false for wrong secret', () => {
    const sig = s.sign(payload, secret);
    expect(s.verify(payload, sig, 'wrong-secret')).toBe(false);
  });

  it('verify returns false for empty header', () => {
    expect(s.verify(payload, '', secret)).toBe(false);
  });

  it('verify returns false for empty secret', () => {
    expect(s.verify(payload, 'abc', '')).toBe(false);
  });

  it('verify catches invalid hex gracefully', () => {
    expect(s.verify(payload, 'not-hex-xyz', secret)).toBe(false);
  });

  it('generateSecret returns hex string of expected length', () => {
    const g = s.generateSecret(16);
    expect(g).toMatch(/^[0-9a-f]+$/);
    expect(g.length).toBe(32);
  });
});
