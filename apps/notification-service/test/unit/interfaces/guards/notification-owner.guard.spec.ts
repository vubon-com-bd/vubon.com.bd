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

function makeCtx(params: Record<string, string>, user?: { userId: string; roles?: string[] }): never {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
    }),
  } as never;
}

describe('NotificationOwnerGuard', () => {
  let repo: ReturnType<typeof makeRepo>;
  let g: NotificationOwnerGuard;
  beforeEach(() => {
    repo = makeRepo();
    g = new NotificationOwnerGuard(repo as never);
  });

  it('returns true when no notificationId in params', async () => {
    const r = await g.canActivate(makeCtx({}));
    expect(r).toBe(true);
  });

  it('throws when no user', async () => {
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }))).rejects.toThrow();
  });

  it('returns true for admin role', async () => {
    const r = await g.canActivate(makeCtx(
      { notificationId: 'n-1' },
      { userId: 'other', roles: ['admin'] },
    ));
    expect(r).toBe(true);
  });

  it('returns true for super_admin role', async () => {
    const r = await g.canActivate(makeCtx(
      { notificationId: 'n-1' },
      { userId: 'other', roles: ['super_admin'] },
    ));
    expect(r).toBe(true);
  });

  it('throws when notification not found', async () => {
    await expect(g.canActivate(makeCtx(
      { notificationId: 'n-1' },
      { userId: FIXED_USER_ID },
    ))).rejects.toThrow();
  });

  it('throws when user mismatch', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity('other-user'));
    await expect(g.canActivate(makeCtx(
      { notificationId: 'n-1' },
      { userId: FIXED_USER_ID },
    ))).rejects.toThrow();
  });

  it('returns true when user owns notification', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity(FIXED_USER_ID));
    const r = await g.canActivate(makeCtx(
      { notificationId: 'n-1' },
      { userId: FIXED_USER_ID },
    ));
    expect(r).toBe(true);
  });

  it('accepts id param name', async () => {
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity(FIXED_USER_ID));
    const r = await g.canActivate(makeCtx(
      { id: 'n-1' },
      { userId: FIXED_USER_ID },
    ));
    expect(r).toBe(true);
  });
});
