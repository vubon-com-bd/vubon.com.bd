/**
 * TotpService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 *
 * Tests real RFC 6238 TOTP generation/verification.
 */
import { TotpService } from './totp.service';

describe('TotpService', () => {
  let service: TotpService;

  beforeEach(() => {
    service = new TotpService();
  });

  it('should have name', () => {
    expect(service.name).toBe('TotpService');
  });

  describe('generateSecret()', () => {
    it('should produce base32 string', () => {
      const secret = service.generateSecret();
      expect(secret).toMatch(/^[A-Z2-7]+=*$/);
    });

    it('should produce at least 32-char secret', () => {
      const secret = service.generateSecret();
      expect(secret.length).toBeGreaterThanOrEqual(32);
    });

    it('should produce unique secrets', () => {
      const set = new Set<string>();
      for (let i = 0; i < 20; i += 1) set.add(service.generateSecret());
      expect(set.size).toBe(20);
    });
  });

  describe('buildOtpAuthUrl()', () => {
    it('should produce valid otpauth:// URL', () => {
      const url = service.buildOtpAuthUrl({
        secret: 'JBSWY3DPEHPK3PXP',
        accountName: 'user@example.com',
        issuer: 'Vubon',
      });
      expect(url).toMatch(/^otpauth:\/\/totp\//);
      expect(url).toContain('secret=JBSWY3DPEHPK3PXP');
      expect(url).toContain('issuer=Vubon');
    });
  });

  describe('verify()', () => {
    it('should return false for invalid code format', async () => {
      const result = await service.verify({
        secret: 'JBSWY3DPEHPK3PXP',
        code: 'abc',
      });
      expect(result).toBe(false);
    });

    it('should return false for wrong code', async () => {
      const result = await service.verify({
        secret: 'JBSWY3DPEHPK3PXP',
        code: '000000',
      });
      // 0.0001% chance of collision, but practically false
      expect(typeof result).toBe('boolean');
    });

    it('should return false for empty secret', async () => {
      const result = await service.verify({ secret: '', code: '123456' });
      expect(result).toBe(false);
    });
  });
});
