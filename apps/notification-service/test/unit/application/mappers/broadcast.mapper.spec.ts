import { BroadcastMapper } from '@application/mappers/broadcast.mapper.js';
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { BroadcastResultVO } from '@domain/composites/broadcast-result.vo.js';
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
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildContent() {
  return NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });
}

function build(opts: { withApproval?: boolean } = {}) {
  const vo = BroadcastVO.create({
    id: BroadcastIdVO.create(IDS.broadcastId),
    name: 'Campaign',
    type: BroadcastTypeVO.create('all_users'),
    status: BroadcastStatusVO.draft(),
    audience: BroadcastAudienceVO.create({ target: 'all' }),
    channels: [NotificationChannelVO.email()],
    content: buildContent(),
    templateId: undefined,
    createdBy: UserIdVO.create(IDS.userId),
    approvedBy: opts.withApproval ? UserIdVO.create(IDS.userId) : undefined,
    recipientCount: 100,
    sentCount: 0,
    failedCount: 0,
  } as never);
  return BroadcastEntity.create({
    id: BroadcastIdVO.create(IDS.broadcastId),
    vo,
    now: DATES.now,
  });
}

describe('BroadcastMapper', () => {
  it('toResponse', () => {
    const r = BroadcastMapper.toResponse(build());
    expect(r.id).toBe(IDS.broadcastId);
    expect(r.recipientCount).toBe(100);
  });

  it('toResponse with approval', () => {
    const r = BroadcastMapper.toResponse(build({ withApproval: true }));
    expect(r.approvedBy).toBe(IDS.userId);
  });

  it('toSummary', () => {
    const r = BroadcastMapper.toSummary(build());
    expect(r.id).toBe(IDS.broadcastId);
  });

  it('toListResponse', () => {
    const r = BroadcastMapper.toListResponse([build()], 3, 1, 10);
    expect(r.totalPages).toBe(1);
  });

  it('toResultResponse', () => {
    const r = BroadcastMapper.toResultResponse(build());
    expect(r.broadcastId).toBe(IDS.broadcastId);
  });

  it('resultVOToResponse', () => {
    const vo = BroadcastResultVO.create({
      broadcastId: BroadcastIdVO.create(IDS.broadcastId),
      recipientCount: 100,
      sentCount: 90,
      deliveredCount: 85,
      failedCount: 10,
      openCount: 40,
      clickCount: 20,
      unsubscribedCount: 5,
      startedAt: DATES.now,
      completedAt: DATES.future24h,
    });
    const r = BroadcastMapper.resultVOToResponse(vo);
    expect(r.sentCount).toBe(90);
    expect(r.openRate).toBeGreaterThan(0);
  });
});
