/**
 * E2E — Register Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { RegisterHandler } from '@application/commands/auth/register.handler.js';
import {
  makeRegisterCommand, makeAuthRepositoryMock, makeUserRepositoryMock,
  makeEventBridgeMock, TEST_EMAIL,
} from '@fixtures/index.js';

describe('E2E — Register Flow (Application)', () => {
  let handler: RegisterHandler;
  let authRepo: ReturnType<typeof makeAuthRepositoryMock>;
  let userRepo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    authRepo = makeAuthRepositoryMock();
    userRepo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    authRepo.save.mockImplementation(async (e: unknown) => e as never);
    userRepo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new RegisterHandler(authRepo as never, userRepo as never, eventBridge as never);
  });

  it('happy path: creates user + requires verification', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null);
    userRepo.findByEmailRaw.mockResolvedValue(null);

    const result = await handler.execute(makeRegisterCommand());

    expect(result.success).toBe(true);
    expect(result.requiresVerification).toBe(true);
    expect(result.user.email).toBe(TEST_EMAIL);
  });

  it('duplicate email → throws conflict', async () => {
    authRepo.findByIdentifier.mockResolvedValue({ id: 'x' } as never);
    await expect(handler.execute(makeRegisterCommand())).rejects.toThrow();
  });

  it('verification channel = email', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null);
    userRepo.findByEmailRaw.mockResolvedValue(null);
    const result = await handler.execute(makeRegisterCommand());
    expect(result.verificationChannel).toBe('email');
  });
});
