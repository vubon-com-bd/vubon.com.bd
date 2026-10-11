import { describe, it, expect } from '@jest/globals';
import { NotificationVO } from '../../../../../src/module/domain/value-objects/composites/notification.vo.js';
import { TemplateVO } from '../../../../../src/module/domain/value-objects/composites/template.vo.js';
import { ScheduleVO } from '../../../../../src/module/domain/value-objects/composites/schedule.vo.js';
import { BroadcastVO } from '../../../../../src/module/domain/value-objects/composites/broadcast.vo.js';
import { DigestVO } from '../../../../../src/module/domain/value-objects/composites/digest.vo.js';
import { WebhookVO } from '../../../../../src/module/domain/value-objects/composites/webhook.vo.js';
import { NotificationIdVO } from '../../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { TemplateIdVO } from '../../../../../src/module/domain/value-objects/primitives/template-id.vo.js';
import { TemplateNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../../../../../src/module/domain/value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableVO } from '../../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { TemplateVariableNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';
import { ScheduleIdVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';
import { BroadcastIdVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { DigestIdVO } from '../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';
import { WebhookIdVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookUrlVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookMethodVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookStatusVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { NotificationContentVO } from '../../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildNotif(overrides: Record<string, unknown> = {}) {
  const ch = NotificationChannelVO.email();
  return {
    id: NotificationIdVO.create(FIXED_NOTIFICATION_ID),
    type: NotificationTypeVO.transactional(),
    category: NotificationCategoryVO.order(),
    channel: ch,
    status: NotificationStatusVO.pending(),
    priority: NotificationPriorityVO.normal(),
    content: NotificationContentVO.create({
      title: NotificationTitleVO.create('T'),
      body: NotificationBodyVO.create('B'),
    }),
    recipient: NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(FIXED_USER_ID),
      channel: ch,
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('NotificationVO all branches', () => {
  it('isExpired true when expiresAt past', () => {
    const vo = NotificationVO.reconstitute(buildNotif({
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    }) as never);
    expect(vo.isExpired()).toBe(true);
  });

  it('isExpired false when expiresAt future', () => {
    const vo = NotificationVO.reconstitute(buildNotif({
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    }) as never);
    expect(vo.isExpired()).toBe(false);
  });

  it('isDelivered true when delivery.delivered', () => {
    const vo = NotificationVO.reconstitute(buildNotif({
      delivery: { status: { isDelivered: () => true }, attemptCount: 1 },
    }) as never);
    expect(vo.isDelivered()).toBe(true);
  });

  it('hasActions false when undefined', () => {
    expect(NotificationVO.reconstitute(buildNotif() as never).hasActions()).toBe(false);
  });

  it('hasActions true with entries', () => {
    const vo = NotificationVO.reconstitute(buildNotif({
      actions: { isEmpty: () => false, count: 1, actions: [] },
    }) as never);
    expect(vo.hasActions()).toBe(true);
  });

  it('all getters', () => {
    const vo = NotificationVO.reconstitute(buildNotif({
      imageUrl: 'https://x.com/i.png',
      iconUrl: 'https://x.com/ic.png',
    }) as never);
    expect(vo.imageUrl).toBeDefined();
    expect(vo.iconUrl).toBeDefined();
    expect(vo.type.value).toBe('transactional');
    expect(vo.category.value).toBe('order');
    expect(vo.priority.value).toBe('normal');
  });
});

describe('TemplateVO all branches', () => {
  function build(overrides: Record<string, unknown> = {}) {
    return TemplateVO.reconstitute({
      id: TemplateIdVO.create(FIXED_TEMPLATE_ID),
      name: TemplateNameVO.create('Temp'),
      slug: 't',
      type: TemplateTypeVO.email(),
      status: TemplateStatusVO.draft(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'S',
      body: 'B',
      bodyHtml: '<p>B</p>',
      variables: [
        TemplateVariableVO.reconstitute({
          name: TemplateVariableNameVO.create('required_var'),
          type: 'string',
          required: true,
        }),
        TemplateVariableVO.reconstitute({
          name: TemplateVariableNameVO.create('optional_var'),
          type: 'number',
          required: false,
          defaultValue: '0',
        }),
      ],
      version: 1,
      parentId: 'parent-id',
      createdBy: FIXED_USER_ID,
      updatedBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    } as never);
  }

  it('isUsable false when draft', () => {
    expect(build().isUsable()).toBe(false);
  });

  it('isUsable true when active', () => {
    const vo = build({ status: TemplateStatusVO.active() });
    expect(vo.isUsable()).toBe(true);
  });

  it('requiredVariables filters', () => {
    expect(build().requiredVariables().length).toBe(1);
  });

  it('hasVariable true/false', () => {
    expect(build().hasVariable('required_var')).toBe(true);
    expect(build().hasVariable('missing')).toBe(false);
  });

  it('all getters', () => {
    const vo = build();
    expect(vo.bodyHtml).toBe('<p>B</p>');
    expect(vo.parentId).toBe('parent-id');
    expect(vo.updatedBy).toBe(FIXED_USER_ID);
    expect(vo.version).toBe(1);
  });
});

describe('ScheduleVO branches', () => {
  it('recurring with next', () => {
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(makeUuid()),
      type: ScheduleTypeVO.recurring(),
      status: ScheduleStatusVO.active(),
      recurrence: ScheduleRecurrenceVO.daily(),
      scheduledAt: new Date().toISOString(),
      timezone: 'Asia/Dhaka',
      nextOccurrenceAt: new Date(Date.now() + 3600_000).toISOString(),
      occurrenceCount: 5,
      notificationTemplateId: FIXED_TEMPLATE_ID,
      userId: FIXED_USER_ID,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.isRecurring()).toBe(true);
    expect(vo.isActive()).toBe(true);
    expect(vo.nextOccurrenceAt).toBeDefined();
    expect(vo.notificationTemplateId).toBe(FIXED_TEMPLATE_ID);
    expect(vo.userId).toBe(FIXED_USER_ID);
  });

  it('non-recurring with undefined fields', () => {
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(makeUuid()),
      type: ScheduleTypeVO.scheduled(),
      status: ScheduleStatusVO.pending(),
      recurrence: ScheduleRecurrenceVO.none(),
      scheduledAt: new Date().toISOString(),
      timezone: 'UTC',
      occurrenceCount: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.isRecurring()).toBe(false);
    expect(vo.isActive()).toBe(false);
    expect(vo.nextOccurrenceAt).toBeUndefined();
    expect(vo.notificationTemplateId).toBeUndefined();
    expect(vo.userId).toBeUndefined();
  });
});

describe('BroadcastVO branches', () => {
  it('totalProcessed + canCancel', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.draft(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      succeeded: 10, failed: 5,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.totalProcessed()).toBe(15);
    expect(vo.canCancel()).toBe(true);
  });

  it('cannot cancel in sending', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.sending(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      succeeded: 0, failed: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.canCancel()).toBe(false);
  });

  it('all optional getters', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.draft(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      estimatedRecipients: 100,
      totalRecipients: 100,
      succeeded: 0, failed: 0,
      scheduledAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.estimatedRecipients).toBe(100);
    expect(vo.scheduledAt).toBeDefined();
    expect(vo.startedAt).toBeDefined();
    expect(vo.completedAt).toBeDefined();
    expect(vo.createdBy).toBe(FIXED_USER_ID);
  });

  it('succeeded/failed default to 0', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.draft(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.succeeded).toBe(0);
    expect(vo.failed).toBe(0);
  });
});

describe('DigestVO branches', () => {
  it('all branches', () => {
    const vo = DigestVO.reconstitute({
      id: DigestIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      status: DigestStatusVO.sent(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 5,
      sentAt: new Date().toISOString(),
      channel: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.status.isSent()).toBe(true);
    expect(vo.hasItems()).toBe(true);
    expect(vo.isEmpty()).toBe(false);
    expect(vo.sentAt).toBeDefined();
    expect(vo.channel).toBe('email');
  });

  it('empty digest', () => {
    const vo = DigestVO.reconstitute({
      id: DigestIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      status: DigestStatusVO.pending(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    expect(vo.isEmpty()).toBe(true);
    expect(vo.hasItems()).toBe(false);
    expect(vo.sentAt).toBeUndefined();
  });
});

describe('WebhookVO branches', () => {
  function build(overrides: Record<string, unknown> = {}) {
    return WebhookVO.reconstitute({
      id: WebhookIdVO.create(makeUuid()),
      url: WebhookUrlVO.create('https://example.com/hook'),
      method: WebhookMethodVO.post(),
      status: WebhookStatusVO.active(),
      events: [WebhookEventVO.orderCreated()],
      failureCount: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    } as never);
  }

  it('isActive + hasSecret', () => {
    const vo = build();
    expect(vo.isActive()).toBe(true);
    expect(vo.hasSecret()).toBe(false);
  });

  it('hasSecret when provided', () => {
    const vo = build({
      secret: {
        value: '0123456789abcdef0123456789abcdef',
        masked: () => '***',
      },
    });
    expect(vo.hasSecret()).toBe(true);
  });

  it('subscribesTo matches event', () => {
    const vo = build();
    expect(vo.subscribesTo('order.created')).toBe(true);
    expect(vo.subscribesTo('other')).toBe(false);
  });

  it('disabled status', () => {
    const vo = build({ status: WebhookStatusVO.disabled() });
    expect(vo.isActive()).toBe(false);
  });

  it('all optional getters', () => {
    const vo = build({
      description: 'desc',
      lastSuccessAt: new Date().toISOString(),
      lastFailureAt: new Date().toISOString(),
    });
    expect(vo.description).toBe('desc');
    expect(vo.lastSuccessAt).toBeDefined();
    expect(vo.lastFailureAt).toBeDefined();
  });
});
