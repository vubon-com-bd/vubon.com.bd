/**
 * GuestTokenService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { GuestTokenService } from '@infrastructure/services/internal/guest-token.service.js';

describe('GuestTokenService', () => {
  let service: GuestTokenService;

  beforeEach(() => {
    service = new GuestTokenService();
  });

  // ═══════════════ generate ═══════════════

  describe('generate()', () => {
    it('should produce a token', () => {
      const token = service.generate();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should produce unique tokens', () => {
      const tokens = new Set<string>();
      for (let i = 0; i < 10; i++) tokens.add(service.generate());
      expect(tokens.size).toBe(10);
    });

    it('should contain only URL-safe characters', () => {
      const token = service.generate();
      expect(/^[A-Za-z0-9_-]+$/.test(token)).toBe(true);
    });

    it('should have expected length (32 chars)', () => {
      const token = service.generate();
      expect(token.length).toBe(32);
    });
  });

  // ═══════════════ validate ═══════════════

  describe('validate()', () => {
    it('should accept valid token', () => {
      const token = service.generate();
      expect(service.validate(token)).toBe(true);
    });

    it('should reject short token', () => {
      expect(service.validate('abc')).toBe(false);
    });

    it('should reject too-long token', () => {
      expect(service.validate('a'.repeat(200))).toBe(false);
    });

    it('should reject non-string', () => {
      expect(service.validate(null as unknown as string)).toBe(false);
      expect(service.validate(undefined as unknown as string)).toBe(false);
      expect(service.validate(123 as unknown as string)).toBe(false);
    });

    it('should reject tokens with invalid characters', () => {
      expect(service.validate('token with spaces 12345678')).toBe(false);
      expect(service.validate('token!@#$%^&*()12345678')).toBe(false);
    });

    it('should accept exactly 16 chars', () => {
      expect(service.validate('a'.repeat(16))).toBe(true);
    });

    it('should accept exactly 128 chars', () => {
      expect(service.validate('a'.repeat(128))).toBe(true);
    });

    it('should reject 129 chars', () => {
      expect(service.validate('a'.repeat(129))).toBe(false);
    });
  });

  // ═══════════════ computeExpiry ═══════════════

  describe('computeExpiry()', () => {
    it('should return future ISO date', () => {
      const expiry = service.computeExpiry(168);
      const parsed = new Date(expiry);
      expect(parsed.getTime()).toBeGreaterThan(Date.now());
    });

    it('should match default ttl of 168h', () => {
      const expiry = service.computeExpiry();
      const parsed = new Date(expiry);
      const diffHours = (parsed.getTime() - Date.now()) / (1000 * 60 * 60);
      expect(diffHours).toBeGreaterThan(167);
      expect(diffHours).toBeLessThan(169);
    });

    it('should respect custom ttl', () => {
      const expiry = service.computeExpiry(24);
      const parsed = new Date(expiry);
      const diffHours = (parsed.getTime() - Date.now()) / (1000 * 60 * 60);
      expect(diffHours).toBeGreaterThan(23);
      expect(diffHours).toBeLessThan(25);
    });

    it('should return valid ISO 8601', () => {
      const expiry = service.computeExpiry(1);
      expect(expiry).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });
});
