import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthService } from '@application/services/impl/auth.service.js';
import {
  makeAuthRepositoryMock, makeAuthSessionServiceMock,
  makeAuthTokenServiceMock, makeAuthMfaServiceMock,
  makeEventBridgeMock, activeLocalAuth, TEST_IDS, TEST_EMAIL,
} from '@fixtures/index.js';
import { UserNotFoundByEmailError } from '@domain/errors/user.errors.js';

describe('AuthService', () => {
  let service: AuthService;
  let authRepo: ReturnType<typeof makeAuthRepositoryMock>;
  let sessionService: ReturnType<typeof makeAuthSessionServiceMock>;
  let tokenService: ReturnType<typeof makeAuthTokenServiceMock>;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    authRepo = makeAuthRepositoryMock();
    sessionService = makeAuthSessionServiceMock();
    tokenService = makeAuthTokenServiceMock();
    mfaService = makeAuthMfaServiceMock();
    eventBridge = makeEventBridgeMock();
    authRepo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);

    service = new AuthService(
      authRepo as never,
      sessionService as never,
      tokenService as never,
      mfaService as never,
      eventBridge as never,
    );
  });

  it('name', () => expect(service.name).toBe('AuthService'));

  describe('login()', () => {
    it('should throw when auth not found', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      await expect(service.login({ identifier: TEST_EMAIL, password: 'x' } as never))
        .rejects.toThrow(UserNotFoundByEmailError);
    });

    it('should return session + tokens on success', async () => {
      const auth = activeLocalAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({ id: 's1', userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true } as never);
      tokenService.issue.mockResolvedValue({ accessToken: 'a', refreshToken: 'r',
        tokenType: 'Bearer', expiresIn: 900, expiresAt: 0 } as never);

      const result = await service.login({ identifier: TEST_EMAIL, password: 'x' } as never);
      expect(result.success).toBe(true);
    });
  });

  describe('register()', () => {
    it('should return DTO', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      const result = await service.register({
        email: TEST_EMAIL, password: 'x', confirmPassword: 'x',
      } as never);
      expect(result.success).toBe(true);
      expect(result.requiresVerification).toBe(true);
    });
  });
});
