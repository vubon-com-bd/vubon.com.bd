import { describe, it, expect, beforeEach } from '@jest/globals';
import { RegisterHandler } from '@application/commands/auth/register.handler.js';
import {
  makeRegisterCommand,
  makeAuthRepositoryMock,
  makeUserRepositoryMock,
  makeEventBridgeMock,
  TEST_EMAIL,
} from '@fixtures/index.js';

describe('RegisterHandler', () => {
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

    // ✅ (authRepo, userRepo, eventBridge)
    handler = new RegisterHandler(
      authRepo as never,
      userRepo as never,
      eventBridge as never,
    );
  });

  it('commandType = auth.register', () => {
    expect(handler.commandType).toBe('auth.register');
  });

  it('should create when not existing', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null);
    userRepo.findByEmailRaw.mockResolvedValue(null);
    const result = await handler.execute(makeRegisterCommand());
    expect(result.success).toBe(true);
    expect(result.user.email).toBe(TEST_EMAIL);
  });

  it('should throw when auth exists', async () => {
    authRepo.findByIdentifier.mockResolvedValue({ id: 'x' } as never);
    await expect(handler.execute(makeRegisterCommand())).rejects.toThrow();
  });

  it('should require verification', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null);
    userRepo.findByEmailRaw.mockResolvedValue(null);
    const result = await handler.execute(makeRegisterCommand());
    expect(result.requiresVerification).toBe(true);
  });
});
