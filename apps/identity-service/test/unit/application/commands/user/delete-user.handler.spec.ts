import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteUserHandler } from '@application/commands/user/delete-user.handler.js';
import { DeleteUserCommand } from '@application/commands/user/delete-user.command.js';
import {
  makeUserRepositoryMock,
  makeEventBridgeMock,
  activeUser,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new DeleteUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.delete', () => {
    expect(handler.commandType).toBe('user.delete');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const cmd = new DeleteUserCommand({ userId: TEST_IDS.USER_ID } as never);
    await expect(handler.execute(cmd)).rejects.toThrow(UserNotFoundError);
  });

  it('should mark deleted and save', async () => {
    const user = activeUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new DeleteUserCommand({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
