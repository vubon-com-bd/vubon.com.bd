import { CanBroadcastSpecification } from '@domain/specifications/can-broadcast.specification.js';
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const make = (o: any = {}) => {
  const content = NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });
  const vo = BroadcastVO.create({
    id: BroadcastIdVO.create(IDS.broadcastId),
    name: 'Sale',
    type: BroadcastTypeVO.create('all_users'),
    status: BroadcastStatusVO.draft(),
    audience: BroadcastAudienceVO.create({ target: 'all' }),
    channels: [NotificationChannelVO.email()],
    content,
    createdBy: UserIdVO.create(IDS.userId),
    recipientCount: 100,
    sentCount: 0,
    failedCount: 0,
    ...o.vo,
  });
  return BroadcastEntity.reconstitute({
    id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
    props: { vo, ...o.props },
  });
};

describe('CanBroadcastSpecification', () => {
  const spec = CanBroadcastSpecification.strict();

  it('satisfied for approved draft', () => {
    const b = make({ vo: { approvedBy: UserIdVO.create(IDS.userId2) } });
    expect(spec.isSatisfiedBy({ broadcast: b })).toBe(true);
  });

  it('not satisfied for non-draft', () => {
    const b = make({ vo: { status: BroadcastStatusVO.sent(), completedAt: NOW, approvedBy: UserIdVO.create(IDS.userId2) } });
    expect(spec.isSatisfiedBy({ broadcast: b })).toBe(false);
  });

  it('not satisfied without approval', () => {
    const b = make();
    expect(spec.isSatisfiedBy({ broadcast: b, ctx: { requireApproval: true } })).toBe(false);
    expect(spec.explain({ broadcast: b, ctx: { requireApproval: true } })).toContain('approval');
  });

  it('explain null for valid', () => {
    const b = make({ vo: { approvedBy: UserIdVO.create(IDS.userId2) } });
    expect(spec.explain({ broadcast: b, ctx: { requireApproval: true } })).toBeNull();
  });
});
