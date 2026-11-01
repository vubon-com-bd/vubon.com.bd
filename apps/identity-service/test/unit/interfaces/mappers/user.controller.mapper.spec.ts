import { describe, it, expect } from '@jest/globals';
import { UserControllerMapper } from '@interfaces/mappers/user.controller.mapper.js';

function makeUserAppDto() {
  return { success: true, user: { id: 'u1', email: 'user@vubon.com.bd', firstName: 'John', lastName: 'Doe', username: 'john', status: 'active', type: 'individual', roles: ['customer'], emailVerified: true, phoneVerified: false, isMfaEnabled: false, createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-02T00:00:00Z' } } as never;
}

describe('UserControllerMapper', () => {
  describe('toHttpResponse()', () => {
    it('should extract inner user (wrapper-aware)', () => {
      const r = UserControllerMapper.toHttpResponse(makeUserAppDto());
      expect(r.id).toBe('u1');
      expect(r.email).toBe('user@vubon.com.bd');
      expect(r.firstName).toBe('John');
    });
    it('should default missing fields', () => {
      const wrapper = makeUserAppDto() as unknown as { user: Partial<Record<string, unknown>> };
      delete wrapper.user['phoneVerified'];
      delete wrapper.user['isMfaEnabled'];
      delete wrapper.user['roles'];
      const r = UserControllerMapper.toHttpResponse(wrapper as never);
      expect(r.phoneVerified).toBe(false);
      expect(r.isMfaEnabled).toBe(false);
      expect(r.roles).toEqual([]);
    });
    it('should default updatedAt to createdAt', () => {
      const wrapper = makeUserAppDto() as unknown as { user: Partial<Record<string, unknown>> };
      delete wrapper.user['updatedAt'];
      const r = UserControllerMapper.toHttpResponse(wrapper as never);
      expect(r.updatedAt).toBe(r.createdAt);
    });
  });
  describe('toPublicHttpResponse()', () => {
    it('should produce public safe fields', () => {
      const r = UserControllerMapper.toPublicHttpResponse(makeUserAppDto());
      expect(r.id).toBeDefined();
      expect(r.firstName).toBe('John');
    });
  });
  describe('toCreateAppDto()', () => {
    it('should map create DTO to app shape', () => {
      const r = UserControllerMapper.toCreateAppDto({ email: 'new@vubon.com.bd', password: 'StrongP@ss123', type: 'individual', acceptTerms: true });
      expect(r).toMatchObject({ email: 'new@vubon.com.bd', type: 'individual' });
    });
  });
  describe('toDeleteAppDto()', () => {
    it('should default hardDelete=false', () => {
      const r = UserControllerMapper.toDeleteAppDto({ userId: 'u1' });
      expect(r).toMatchObject({ userId: 'u1', hardDelete: false });
    });
  });
  describe('toSuspendAppDto()', () => {
    it('should map suspend fields', () => {
      const r = UserControllerMapper.toSuspendAppDto({ userId: 'u1', reason: 'Abuse', durationSeconds: 3600 });
      expect(r).toMatchObject({ userId: 'u1', reason: 'Abuse', durationSeconds: 3600 });
    });
  });
});
