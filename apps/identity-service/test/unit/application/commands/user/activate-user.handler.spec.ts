import { describe, it, expect, beforeEach } from '@jest/globals';
import { ActivateUserHandler } from '@application/commands/user/activate-user.handler.js';
import { ActivateUserCommand } from '@application/commands/user/activate-user.command.js';
import {
  makeUserRepositoryMock,
  makeEventBridgeMock,
  pendingUser,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('ActivateUserHandler', () => {
  let handler: ActivateUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);

    handler = new ActivateUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.activate', () => {
    expect(handler.commandType).toBe('user.activate');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const cmd = new ActivateUserCommand({ userId: TEST_IDS.USER_ID } as never);
    await expect(handler.execute(cmd)).rejects.toThrow(UserNotFoundError);
  });

  it('should activate and save', async () => {
    const user = pendingUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new ActivateUserCommand({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.activated).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });

  it('should publish events', async () => {
    const user = pendingUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new ActivateUserCommand({ userId: TEST_IDS.USER_ID } as never);
    await handler.execute(cmd);
    expect(eventBridge.publishFromEntity).toHaveBeenCalled();
  });
});
