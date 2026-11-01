import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeactivateUserHandler } from '@application/commands/user/deactivate-user.handler.js';
import { DeactivateUserCommand } from '@application/commands/user/deactivate-user.command.js';
import {
  makeUserRepositoryMock,
  makeEventBridgeMock,
  activeUser,
  TEST_IDS,
} from '@fixtures/index.js';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('DeactivateUserHandler', () => {
  let handler: DeactivateUserHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    handler = new DeactivateUserHandler(repo as never, eventBridge as never);
  });

  it('commandType = user.deactivate', () => {
    expect(handler.commandType).toBe('user.deactivate');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const cmd = new DeactivateUserCommand({ userId: TEST_IDS.USER_ID } as never);
    await expect(handler.execute(cmd)).rejects.toThrow(UserNotFoundError);
  });

  it('should deactivate and save', async () => {
    const user = activeUser();
    repo.findById.mockResolvedValue(user as never);
    const cmd = new DeactivateUserCommand({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.deactivated).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
