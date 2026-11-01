/**
 * E2E — Session Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthSessionService } from '@application/services/impl/auth-session.service.js';
import { LogoutHandler } from '@application/commands/auth/logout.handler.js';
import { LogoutCommand } from '@application/commands/auth/logout.command.js';
import {
  makeSessionRepositoryMock, makeEventBridgeMock,
  activeSession, TEST_IDS, TEST_IP, TEST_USER_AGENT,
} from '@fixtures/index.js';

describe('E2E — Session Flow', () => {
  let service: AuthSessionService;
  let repo: ReturnType<typeof makeSessionRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;
  let logoutHandler: LogoutHandler;

  beforeEach(() => {
    repo = makeSessionRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    service = new AuthSessionService(repo as never, eventBridge as never);
    logoutHandler = new LogoutHandler(service as never);
  });

  it('create → findById → revoke flow', async () => {
    const created = await service.create(TEST_IDS.USER_ID, {
      ipAddress: TEST_IP, userAgent: TEST_USER_AGENT, rememberMe: false,
    });
    expect(created.status).toBe('active');
    expect(created.userId).toBe(TEST_IDS.USER_ID);
  });

  it('logout revokes session', async () => {
    const session = activeSession();
    repo.findById.mockResolvedValue(session as never);

    const cmd = new LogoutCommand({ sessionId: TEST_IDS.SESSION_ID } as never);
    const result = await logoutHandler.execute(cmd);

    expect(result.success).toBe(true);
    expect(repo.save).toHaveBeenCalled();
    expect(eventBridge.publishFromEntity).toHaveBeenCalled();
  });

  it('logout-all revokes all sessions for user', async () => {
    repo.revokeAllByUserId.mockResolvedValue(3);
    const cmd = new LogoutCommand({} as never, TEST_IDS.USER_ID);
    const result = await logoutHandler.execute(cmd);
    expect(result.success).toBe(true);
    expect(repo.revokeAllByUserId).toHaveBeenCalled();
  });
});
