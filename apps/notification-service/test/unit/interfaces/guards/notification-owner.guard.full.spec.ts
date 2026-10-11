import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationOwnerGuard } from '../../../../src/module/interfaces/guards/notification-owner.guard.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function makeRepo() {
  return { findById: jest.fn().mockResolvedValue(null) } as never;
}
function buildEntity(userId = FIXED_USER_ID): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(userId),
        channel: ch,
      }),
    },
  });
}
function makeCtx(params: Record<string, string>, user?: { userId?: string; roles?: readonly string[] }): never {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params, user }) }),
  } as never;
}

describe('NotificationOwnerGuard — branch coverage', () => {
  let repo: ReturnType<typeof makeRepo>;
  let g: NotificationOwnerGuard;
  beforeEach(() => {
    repo = makeRepo();
    g = new NotificationOwnerGuard(repo as never);
  });

  it('TRUE when no notificationId param', async () => {
    expect(await g.canActivate(makeCtx({}))).toBe(true);
  });

  it('TRUE when no id param', async () => {
    expect(await g.canActivate(makeCtx({}))).toBe(true);
  });

  it('THROWS when no user', async () => {
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }))).rejects.toThrow();
  });

  it('THROWS when user.userId missing', async () => {
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }, { roles: ['admin'] }))).rejects.toThrow();
  });

  it('TRUE for admin role', async () => {
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: 'other', roles: ['admin'] }))).toBe(true);
  });

  it('TRUE for super_admin role', async () => {
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: 'other', roles: ['super_admin'] }))).toBe(true);
  });

  it('THROWS when notification not found', async () => {
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: FIXED_USER_ID }))).rejects.toThrow();
  });

  it('THROWS when user mismatch', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity('other-user'));
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: FIXED_USER_ID }))).rejects.toThrow();
  });

  it('TRUE when owner matches', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity(FIXED_USER_ID));
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: FIXED_USER_ID }))).toBe(true);
  });

  it('TRUE using id param name', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity(FIXED_USER_ID));
    expect(await g.canActivate(makeCtx({ id: 'n-1' }, { userId: FIXED_USER_ID }))).toBe(true);
  });

  it('roles undefined + userId matches', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity(FIXED_USER_ID));
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }, { userId: FIXED_USER_ID }))).toBe(true);
  });
});
