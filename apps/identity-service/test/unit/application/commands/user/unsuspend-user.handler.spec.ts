import { describe, it, expect, beforeEach } from '@jest/globals';
import { UnsuspendUserHandler } from '@application/commands/user/unsuspend-user.handler.js';
import { UnsuspendUserCommand } from '@application/commands/user/unsuspend-user.command.js';
import {
  makeUserRepositoryMock,
  makeEventBridgeMock,
  suspendedUser,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('UnsuspendUserHandler', () => {
  let handler: UnsuspendUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new UnsuspendUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.unsuspend', () => {
    expect(handler.commandType).toBe('user.unsuspend');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const cmd = new UnsuspendUserCommand({ userId: TEST_IDS.USER_ID } as never);
    await expect(handler.execute(cmd)).rejects.toThrow(UserNotFoundError);
  });

  it('should unsuspend and save', async () => {
    const user = suspendedUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new UnsuspendUserCommand({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.unsuspended).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
