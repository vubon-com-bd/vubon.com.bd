/**
 * TokenGeneratorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { TokenGeneratorService } from './token-generator.service';

describe('TokenGeneratorService', () => {
  let service: TokenGeneratorService;

  beforeEach(() => {
    service = new TokenGeneratorService();
  });

  it('should have name', () => {
    expect(service.name).toBe('TokenGeneratorService');
  });

  describe('generateOpaque()', () => {
    it('should produce URL-safe string', () => {
      const token = service.generateOpaque();
      expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('should produce unique tokens', () => {
      const set = new Set<string>();
      for (let i = 0; i < 50; i += 1) set.add(service.generateOpaque());
      expect(set.size).toBe(50);
    });

    it('should support custom byte length', () => {
      const short = service.generateOpaque(8);
      const long = service.generateOpaque(64);
      expect(long.length).toBeGreaterThan(short.length);
    });
  });

  describe('generateOtp()', () => {
    it('should produce 6-digit OTP by default', () => {
      const otp = service.generateOtp();
      expect(otp).toMatch(/^\d{6}$/);
    });

    it('should support custom digit length', () => {
      const otp = service.generateOtp(8);
      expect(otp).toMatch(/^\d{8}$/);
    });

    it('should produce 4-digit OTP', () => {
      const otp = service.generateOtp(4);
      expect(otp).toMatch(/^\d{4}$/);
    });
  });

  describe('generateRecoveryCode()', () => {
    it('should match XXXX-XXXX format', () => {
      const code = service.generateRecoveryCode();
      expect(code).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}$/);
    });

    it('should exclude 0, 1, O, I (ambiguous chars)', () => {
      for (let i = 0; i < 20; i += 1) {
        const code = service.generateRecoveryCode();
        expect(code).not.toContain('0');
        expect(code).not.toContain('1');
        expect(code).not.toContain('O');
        expect(code).not.toContain('I');
      }
    });

    it('should produce unique codes', () => {
      const set = new Set<string>();
      for (let i = 0; i < 50; i += 1) set.add(service.generateRecoveryCode());
      expect(set.size).toBeGreaterThan(40);
    });
  });
});
