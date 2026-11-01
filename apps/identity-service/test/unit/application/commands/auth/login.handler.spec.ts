/**
 * LoginHandler unit tests
 * @module identity-service/test/unit/application/commands/auth
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LoginHandler } from '@application/commands/auth/login.handler.js';
import {
  makeLoginCommand,
  makeLoginWithMfaCommand,
  makeAuthRepositoryMock,
  makeAuthSessionServiceMock,
  makeAuthTokenServiceMock,
  makeAuthMfaServiceMock,
  makeEventBridgeMock,
  activeLocalAuth,
  mfaEnabledAuth,
  createNewAuth,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundByEmailError } from '@domain/errors/user.errors.js';

describe('LoginHandler', () => {
  let handler: LoginHandler;
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

    authRepo.save.mockImplementation(async (entity: unknown) => entity as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);

    handler = new LoginHandler(
      authRepo as never,
      sessionService as never,
      tokenService as never,
      mfaService as never,
      eventBridge as never,
    );
  });

  describe('commandType', () => {
    it('should have correct commandType', () => {
      expect(handler.commandType).toBe('auth.login');
    });
  });

  describe('execute() — success', () => {
    it('should return session + tokens on valid credentials', async () => {
      const auth = activeLocalAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: TEST_IDS.SESSION_ID, userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      const result = await handler.execute(makeLoginCommand());

      expect(result.success).toBe(true);
      expect(result.user.id).toBe(TEST_IDS.USER_ID);
      expect(result.session.id).toBe(TEST_IDS.SESSION_ID);
      expect(result.requiresMfa).toBeUndefined();
    });

    it('should call sessionService.create with correct args', async () => {
      const auth = activeLocalAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: 's1', userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      await handler.execute(makeLoginCommand());

      expect(sessionService.create).toHaveBeenCalledWith(
        TEST_IDS.USER_ID,
        expect.objectContaining({
          ipAddress: expect.any(String),
          userAgent: expect.any(String),
          rememberMe: false,
        }),
      );
    });

    it('should call tokenService.issue with userId + sessionId', async () => {
      const auth = activeLocalAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: TEST_IDS.SESSION_ID, userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      await handler.execute(makeLoginCommand());

      expect(tokenService.issue).toHaveBeenCalledWith({
        userId: TEST_IDS.USER_ID,
        sessionId: TEST_IDS.SESSION_ID,
      });
    });

    it('should record login on auth entity', async () => {
      const auth = activeLocalAuth();
      const recordSpy = jest.spyOn(auth, 'recordLogin');
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: 's1', userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      await handler.execute(makeLoginCommand());

      expect(recordSpy).toHaveBeenCalled();
      expect(authRepo.save).toHaveBeenCalledWith(auth);
    });

    it('should publish events via eventBridge', async () => {
      const auth = activeLocalAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: 's1', userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      await handler.execute(makeLoginCommand());

      expect(eventBridge.publishFromEntity).toHaveBeenCalledTimes(1);
    });
  });

  describe('execute() — not found', () => {
    it('should throw UserNotFoundByEmailError', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      await expect(handler.execute(makeLoginCommand())).rejects.toThrow(UserNotFoundByEmailError);
    });

    it('should NOT create session when auth not found', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      await expect(handler.execute(makeLoginCommand())).rejects.toThrow();
      expect(sessionService.create).not.toHaveBeenCalled();
    });

    it('should NOT publish events when auth not found', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      await expect(handler.execute(makeLoginCommand())).rejects.toThrow();
      expect(eventBridge.publishFromEntity).not.toHaveBeenCalled();
    });
  });

  describe('execute() — MFA required', () => {
    it('should return requiresMfa when no mfaCode', async () => {
      const auth = mfaEnabledAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      mfaService.challenge.mockResolvedValue({
        success: true,
        challengeId: 'challenge-xyz',
        mfaMethods: ['totp'],
        expiresAt: new Date(Date.now() + 300000).toISOString(),
      } as never);

      const result = await handler.execute(makeLoginCommand());

      expect(result.requiresMfa).toBe(true);
      expect(result.challengeId).toBe('challenge-xyz');
      expect(result.mfaMethods).toEqual(['totp']);
      expect(sessionService.create).not.toHaveBeenCalled();
      expect(tokenService.issue).not.toHaveBeenCalled();
    });

    it('should call mfaService.challenge with authId', async () => {
      const auth = mfaEnabledAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      mfaService.challenge.mockResolvedValue({
        challengeId: 'c1', mfaMethods: ['totp'],
        expiresAt: new Date(Date.now() + 300000).toISOString(),
      } as never);

      await handler.execute(makeLoginCommand());

      expect(mfaService.challenge).toHaveBeenCalledWith(TEST_IDS.AUTH_ID);
    });

    it('should proceed with login when mfaCode provided', async () => {
      const auth = mfaEnabledAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: TEST_IDS.SESSION_ID, userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      const result = await handler.execute(makeLoginWithMfaCommand());

      expect(result.requiresMfa).toBeUndefined();
      expect(sessionService.create).toHaveBeenCalled();
    });
  });

  describe('execute() — email trim', () => {
    it('should trim identifier before lookup', async () => {
      authRepo.findByIdentifier.mockResolvedValue(null);
      const command = makeLoginCommand({ input: { identifier: '  test@x.com  ' } });
      await expect(handler.execute(command)).rejects.toThrow();
      expect(authRepo.findByIdentifier).toHaveBeenCalledWith('test@x.com');
    });
  });

  describe('execute() — pending user', () => {
    it('should still process login', async () => {
      const auth = createNewAuth();
      authRepo.findByIdentifier.mockResolvedValue(auth as never);
      sessionService.create.mockResolvedValue({
        id: 's1', userId: TEST_IDS.USER_ID, status: 'active',
        createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: true,
      } as never);
      tokenService.issue.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
      } as never);

      const result = await handler.execute(makeLoginCommand());

      expect(result.success).toBe(true);
    });
  });
});
