import { describe, it, expect, beforeEach } from '@jest/globals';
import { SuspendUserHandler } from '@application/commands/user/suspend-user.handler.js';
import {
  makeSuspendUserCommand,
  makeUserRepositoryMock,
  makeEventBridgeMock,
  activeUser,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('SuspendUserHandler', () => {
  let handler: SuspendUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new SuspendUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.suspend', () => {
    expect(handler.commandType).toBe('user.suspend');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(handler.execute(makeSuspendUserCommand())).rejects.toThrow(UserNotFoundError);
  });

  it('should suspend and save', async () => {
    const user = activeUser();
    repo.findById.mockResolvedValue(user as never);
    const result = await handler.execute(makeSuspendUserCommand());
    expect(result.suspended).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
