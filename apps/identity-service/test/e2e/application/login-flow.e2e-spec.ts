/**
 * E2E — Login Flow (Application Layer)
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { LoginHandler } from '@application/commands/auth/login.handler.js';
import {
  makeLoginCommand,
  makeAuthRepositoryMock,
  makeAuthSessionServiceMock,
  makeAuthTokenServiceMock,
  makeAuthMfaServiceMock,
  makeEventBridgeMock,
  activeLocalAuth,
  mfaEnabledAuth,
  TEST_IDS,
} from '@fixtures/index.js';
import { E2EEventCollector } from '../setup/e2e-fixtures.js';
import { UserNotFoundByEmailError } from '@domain/errors/user.errors.js';

describe('E2E — Login Flow (Application)', () => {
  let handler: LoginHandler;
  let authRepo: ReturnType<typeof makeAuthRepositoryMock>;
  let sessionService: ReturnType<typeof makeAuthSessionServiceMock>;
  let tokenService: ReturnType<typeof makeAuthTokenServiceMock>;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;
  let eventCollector: E2EEventCollector;

  beforeEach(() => {
    authRepo = makeAuthRepositoryMock();
    sessionService = makeAuthSessionServiceMock();
    tokenService = makeAuthTokenServiceMock();
    mfaService = makeAuthMfaServiceMock();
    eventBridge = makeEventBridgeMock();
    eventCollector = new E2EEventCollector();

    authRepo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockImplementation(
      async (entity: { domainEvents?: readonly { type: string; aggregateId: string; payload: unknown }[] }) => {
        for (const ev of entity.domainEvents ?? []) {
          eventCollector.record(ev.type, ev.aggregateId, ev.payload);
        }
      },
    );

    handler = new LoginHandler(
      authRepo as never,
      sessionService as never,
      tokenService as never,
      mfaService as never,
      eventBridge as never,
    );
  });

  it('happy path: auth → session → tokens → events', async () => {
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
    expect(result.session.id).toBe(TEST_IDS.SESSION_ID);
    expect(result.tokens.accessToken).toBe('a');
    expect(eventBridge.publishFromEntity).toHaveBeenCalled();
  });

  it('failure path: auth not found → error, no session', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null);

    await expect(handler.execute(makeLoginCommand())).rejects.toThrow(UserNotFoundByEmailError);
    expect(sessionService.create).not.toHaveBeenCalled();
    expect(tokenService.issue).not.toHaveBeenCalled();
  });

  it('MFA required path: challenge returned, no session yet', async () => {
    const auth = mfaEnabledAuth();
    authRepo.findByIdentifier.mockResolvedValue(auth as never);
    mfaService.challenge.mockResolvedValue({
      challengeId: 'chal-1', mfaMethods: ['totp'],
      expiresAt: new Date(Date.now() + 300000).toISOString(),
    } as never);

    const result = await handler.execute(makeLoginCommand());

    expect(result.requiresMfa).toBe(true);
    expect(result.challengeId).toBe('chal-1');
    expect(sessionService.create).not.toHaveBeenCalled();
  });
});
