import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateUserHandler } from '@application/commands/user/update-user.handler.js';
import { UpdateUserCommand } from '@application/commands/user/update-user.command.js';
import {
  makeUserRepositoryMock,
  makeEventBridgeMock,
  activeUser,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new UpdateUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.update', () => {
    expect(handler.commandType).toBe('user.update');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const cmd = new UpdateUserCommand(TEST_IDS.USER_ID, {} as never);
    await expect(handler.execute(cmd)).rejects.toThrow(UserNotFoundError);
  });

  it('should save when found', async () => {
    const user = activeUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new UpdateUserCommand(TEST_IDS.USER_ID, {} as never);
    await handler.execute(cmd);
    expect(repo.save).toHaveBeenCalled();
  });
});
