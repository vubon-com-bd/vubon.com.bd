/**
 * E2E — User Management Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ActivateUserHandler } from '@application/commands/user/activate-user.handler.js';
import { SuspendUserHandler } from '@application/commands/user/suspend-user.handler.js';
import { UnsuspendUserHandler } from '@application/commands/user/unsuspend-user.handler.js';
import { DeleteUserHandler } from '@application/commands/user/delete-user.handler.js';
import { ActivateUserCommand } from '@application/commands/user/activate-user.command.js';
import { UnsuspendUserCommand } from '@application/commands/user/unsuspend-user.command.js';
import { DeleteUserCommand } from '@application/commands/user/delete-user.command.js';
import {
  makeSuspendUserCommand, makeUserRepositoryMock, makeEventBridgeMock,
  pendingUser, activeUser, suspendedUser, TEST_IDS,
} from '@fixtures/index.js';

describe('E2E — User Management Flow', () => {
  let repo: ReturnType<typeof makeUserRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;
  let activateHandler: ActivateUserHandler;
  let suspendHandler: SuspendUserHandler;
  let unsuspendHandler: UnsuspendUserHandler;
  let deleteHandler: DeleteUserHandler;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    activateHandler = new ActivateUserHandler(repo as never, eventBridge as never);
    suspendHandler = new SuspendUserHandler(repo as never, eventBridge as never);
    unsuspendHandler = new UnsuspendUserHandler(repo as never, eventBridge as never);
    deleteHandler = new DeleteUserHandler(repo as never, eventBridge as never);
  });

  it('full lifecycle: pending → active → suspended → active → deleted', async () => {
    // Activate
    repo.findById.mockResolvedValue(pendingUser() as never);
    const act = await activateHandler.execute(new ActivateUserCommand({ userId: TEST_IDS.USER_ID } as never));
    expect(act.activated).toBe(true);

    // Suspend
    repo.findById.mockResolvedValue(activeUser() as never);
    const sus = await suspendHandler.execute(makeSuspendUserCommand());
    expect(sus.suspended).toBe(true);

    // Unsuspend
    repo.findById.mockResolvedValue(suspendedUser() as never);
    const uns = await unsuspendHandler.execute(new UnsuspendUserCommand({ userId: TEST_IDS.USER_ID } as never));
    expect(uns.unsuspended).toBe(true);

    // Delete
    repo.findById.mockResolvedValue(activeUser() as never);
    const del = await deleteHandler.execute(new DeleteUserCommand({ userId: TEST_IDS.USER_ID } as never));
    expect(del.success).toBe(true);
  });
});
