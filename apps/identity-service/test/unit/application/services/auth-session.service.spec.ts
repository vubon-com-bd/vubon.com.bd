/**
 * AuthSessionService unit tests
 * @module identity-service/test/unit/application/services
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthSessionService } from '@application/services/impl/auth-session.service.js';
import {
  makeSessionRepositoryMock,
  makeEventBridgeMock,
  activeSession,
  TEST_IDS,
  TEST_IP,
  TEST_USER_AGENT,
} from '@fixtures/index';
import { SessionNotFoundError } from '@domain/errors/session.errors.js';

describe('AuthSessionService', () => {
  let service: AuthSessionService;
  let sessionRepo: ReturnType<typeof makeSessionRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    sessionRepo = makeSessionRepositoryMock();
    eventBridge = makeEventBridgeMock();

    sessionRepo.save.mockImplementation(async (entity: unknown) => entity as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);

    // ✅ CORRECT ORDER: sessionRepo, eventBridge
    service = new AuthSessionService(
      sessionRepo as never,
      eventBridge as never,
    );
  });

  describe('name', () => {
    it('should have correct name', () => {
      expect(service.name).toBe('AuthSessionService');
    });
  });

  describe('create()', () => {
    it('should return session DTO with active status', async () => {
      const dto = await service.create(TEST_IDS.USER_ID, {
        ipAddress: TEST_IP,
        userAgent: TEST_USER_AGENT,
        rememberMe: false,
      });

      expect(dto.userId).toBe(TEST_IDS.USER_ID);
      expect(dto.status).toBe('active');
      expect(dto.ipAddress).toBe(TEST_IP);
      expect(dto.userAgent).toBe(TEST_USER_AGENT);
      expect(dto.isCurrent).toBe(true);
    });

    it('should set longer expiry for rememberMe', async () => {
      const dto = await service.create(TEST_IDS.USER_ID, { rememberMe: true });
      const expiresAt = new Date(dto.expiresAt).getTime();
      const now = Date.now();
      expect(expiresAt - now).toBeGreaterThan(86400_000);
    });

    it('should set default expiry for non-rememberMe', async () => {
      const dto = await service.create(TEST_IDS.USER_ID, { rememberMe: false });
      const expiresAt = new Date(dto.expiresAt).getTime();
      const now = Date.now();
      expect(expiresAt - now).toBeLessThanOrEqual(86400_000 + 5000);
    });

    it('should handle undefined input (all optional)', async () => {
      const dto = await service.create(TEST_IDS.USER_ID);
      expect(dto.status).toBe('active');
      expect(dto.userId).toBe(TEST_IDS.USER_ID);
    });
  });

  describe('findById()', () => {
    it('should return null when not found', async () => {
      sessionRepo.findById.mockResolvedValue(null);
      const result = await service.findById(TEST_IDS.SESSION_ID);
      expect(result).toBeNull();
    });

    it('should return DTO when found', async () => {
      const session = activeSession();
      sessionRepo.findById.mockResolvedValue(session as never);

      const result = await service.findById(TEST_IDS.SESSION_ID);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(session.id);
      expect(result?.userId).toBe(TEST_IDS.USER_ID);
      expect(result?.status).toBe('active');
      expect(result?.isCurrent).toBe(false);
    });

    it('should return expiresAt as ISO string', async () => {
      const session = activeSession();
      sessionRepo.findById.mockResolvedValue(session as never);

      const result = await service.findById(TEST_IDS.SESSION_ID);

      expect(result?.expiresAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('findActiveByUser()', () => {
    it('should return empty array when no sessions', async () => {
      sessionRepo.findActiveByUserId.mockResolvedValue([]);
      const result = await service.findActiveByUser(TEST_IDS.USER_ID);
      expect(result).toEqual([]);
    });

    it('should map sessions to DTOs', async () => {
      const session = activeSession();
      sessionRepo.findActiveByUserId.mockResolvedValue([session] as never);

      const result = await service.findActiveByUser(TEST_IDS.USER_ID);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(session.id);
      expect(result[0].isCurrent).toBe(false);
    });
  });

  describe('revoke()', () => {
    it('should throw SessionNotFoundError when not found', async () => {
      sessionRepo.findById.mockResolvedValue(null);

      await expect(service.revoke(TEST_IDS.SESSION_ID, 'test_reason')).rejects.toThrow(
        SessionNotFoundError,
      );
    });

    it('should call session.revoke with reason', async () => {
      const session = activeSession();
      const revokeSpy = jest.spyOn(session, 'revoke');
      sessionRepo.findById.mockResolvedValue(session as never);

      await service.revoke(TEST_IDS.SESSION_ID, 'test_reason');

      expect(revokeSpy).toHaveBeenCalledWith('test_reason');
    });

    it('should save the revoked session', async () => {
      const session = activeSession();
      sessionRepo.findById.mockResolvedValue(session as never);

      await service.revoke(TEST_IDS.SESSION_ID, 'test_reason');

      expect(sessionRepo.save).toHaveBeenCalledWith(session);
    });

    it('should publish events after save', async () => {
      const session = activeSession();
      sessionRepo.findById.mockResolvedValue(session as never);

      await service.revoke(TEST_IDS.SESSION_ID, 'test_reason');

      expect(eventBridge.publishFromEntity).toHaveBeenCalled();
    });
  });

  describe('revokeAllForUser()', () => {
    it('should delegate to repository', async () => {
      sessionRepo.revokeAllByUserId.mockResolvedValue(3);

      const result = await service.revokeAllForUser(TEST_IDS.USER_ID, 'bulk_logout');

      expect(result).toBe(3);
    });

    it('should pass userId as VO + reason', async () => {
      sessionRepo.revokeAllByUserId.mockResolvedValue(0);

      await service.revokeAllForUser(TEST_IDS.USER_ID, 'bulk_logout');

      expect(sessionRepo.revokeAllByUserId).toHaveBeenCalledWith(
        expect.objectContaining({ value: TEST_IDS.USER_ID }),
        'bulk_logout',
      );
    });
  });
});
