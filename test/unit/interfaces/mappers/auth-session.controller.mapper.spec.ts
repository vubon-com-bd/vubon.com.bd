/**
 * AuthSessionControllerMapper tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthSessionControllerMapper } from '@interfaces/mappers/auth-session.controller.mapper.js';

function makeSessionAppDto() {
  return {
    id: '22222222-2222-4222-8222-222222222222',
    userId: '77777777-7777-4777-8777-777777777777',
    status: 'active',
    ipAddress: '1.2.3.4',
    userAgent: 'Mozilla/5.0',
    deviceId: 'device-1',
    createdAt: '2026-01-01T00:00:00Z',
    lastAccessedAt: '2026-01-02T00:00:00Z',
    expiresAt: '2026-12-31T00:00:00Z',
    isCurrent: true,
  };
}

describe('AuthSessionControllerMapper', () => {
  describe('toHttpResponse()', () => {
    it('should pass through all fields', () => {
      const r = AuthSessionControllerMapper.toHttpResponse(makeSessionAppDto());
      expect(r.id).toBe('22222222-2222-4222-8222-222222222222');
      expect(r.status).toBe('active');
      expect(r.isCurrent).toBe(true);
    });
  });

  describe('toHttpList()', () => {
    it('should wrap in list response', () => {
      const r = AuthSessionControllerMapper.toHttpList([makeSessionAppDto()]);
      expect(r.success).toBe(true);
      expect(r.sessions.length).toBe(1);
      expect(r.total).toBe(1);
    });

    it('should handle empty list', () => {
      const r = AuthSessionControllerMapper.toHttpList([]);
      expect(r.sessions.length).toBe(0);
      expect(r.total).toBe(0);
    });
  });

  describe('toRevokeHttp()', () => {
    it('should produce revoke response', () => {
      const r = AuthSessionControllerMapper.toRevokeHttp(3);
      expect(r.success).toBe(true);
      expect(r.revokedCount).toBe(3);
      expect(r.revokedAt).toBeDefined();
    });
  });
});
