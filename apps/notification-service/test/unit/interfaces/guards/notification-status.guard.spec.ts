import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationStatusGuard } from '../../../../src/module/interfaces/guards/notification-status.guard.js';
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

function makeReflector(value: readonly string[] | undefined) {
  return {
    getAllAndOverride: jest.fn().mockReturnValue(value),
  } as never;
}

function buildEntity(): NotificationEntity {
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
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel: ch,
      }),
    },
  });
}

function makeCtx(params: Record<string, string>): never {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params }) }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as never;
}

describe('NotificationStatusGuard', () => {
  it('true when no allowed statuses metadata', async () => {
    const repo = makeRepo();
    const g = new NotificationStatusGuard(repo as never, makeReflector(undefined));
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }))).toBe(true);
  });

  it('true when allowed list empty', async () => {
    const repo = makeRepo();
    const g = new NotificationStatusGuard(repo as never, makeReflector([]));
    expect(await g.canActivate(makeCtx({ notificationId: 'n-1' }))).toBe(true);
  });

  it('true when no notificationId param', async () => {
    const repo = makeRepo();
    const g = new NotificationStatusGuard(repo as never, makeReflector(['pending']));
    expect(await g.canActivate(makeCtx({}))).toBe(true);
  });

  it('throws when notification not found', async () => {
    const repo = makeRepo();
    const g = new NotificationStatusGuard(repo as never, makeReflector(['pending']));
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }))).rejects.toThrow();
  });

  it('throws when status not in allowed', async () => {
    const repo = makeRepo();
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity());
    const g = new NotificationStatusGuard(repo as never, makeReflector(['sent']));
    await expect(g.canActivate(makeCtx({ notificationId: 'n-1' }))).rejects.toThrow();
  });

  it('true when status matches allowed', async () => {
    const repo = makeRepo();
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity());
    const g = new NotificationStatusGuard(repo as never, makeReflector(['pending']));
    const r = await g.canActivate(makeCtx({ notificationId: 'n-1' }));
    expect(r).toBe(true);
  });

  it('accepts id param name', async () => {
    const repo = makeRepo();
    (repo as { findById: jest.Mock }).findById.mockResolvedValueOnce(buildEntity());
    const g = new NotificationStatusGuard(repo as never, makeReflector(['pending']));
    const r = await g.canActivate(makeCtx({ id: 'n-1' }));
    expect(r).toBe(true);
  });
});
