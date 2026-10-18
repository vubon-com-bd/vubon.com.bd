import { describe, it, expect, beforeEach } from '@jest/globals';
import { CreateUserHandler } from '@application/commands/user/create-user.handler.js';
import { makeCreateUserCommand, makeUserRepositoryMock, makeEventBridgeMock, TEST_EMAIL } from '@fixtures/index.js';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let userRepo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    userRepo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new CreateUserHandler(userRepo as never, eventBridge as never);
  });

  it('commandType = user.create', () => { expect(handler.commandType).toBe('user.create'); });

  it('should create when not existing', async () => {
    userRepo.findByEmailRaw.mockResolvedValue(null);
    const result = await handler.execute(makeCreateUserCommand());
    expect(result.email).toBe(TEST_EMAIL);
  });

  it('should throw when exists', async () => {
    userRepo.findByEmailRaw.mockResolvedValue({ id: 'x' } as never);
    await expect(handler.execute(makeCreateUserCommand())).rejects.toThrow();
  });
});
