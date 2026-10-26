/**
 * Supplementary branch coverage — covers `false` paths
 * @module notification-service/test/unit/domain
 */
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';

import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';

import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

// ═══════════════════════════════════════════════════════════
// Preference — branch coverage (invariant + assertions)
// ═══════════════════════════════════════════════════════════
describe('PreferenceEntity — branch coverage', () => {
  const opt = (channel: string, enabled = true) =>
    PreferenceOptionVO.create({ channel: channel as any, enabled });

  const makeVO = (overrides: any = {}) =>
    PreferenceVO.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [opt('email', true)],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
      ...overrides,
    });

  it('rejects > 50 options (invariant)', () => {
    expect(() =>
      PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            options: Array.from({ length: 51 }, () => opt('email', true)),
          }),
        },
      }),
    ).toThrow(ValidationError);
  });

  it('optIn rejects missing channel', () => {
    const entity = PreferenceEntity.reconstitute({
      id: IDS.preferenceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(() => entity.optIn('webhook', undefined, NOW)).toThrow(BusinessRuleError);
  });

  it('lock() on unlocked emits event', () => {
    const entity = PreferenceEntity.reconstitute({
      id: IDS.preferenceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    const before = entity.domainEvents.length;
    entity.lock('reason', NOW);
    expect(entity.domainEvents.length).toBeGreaterThan(before);
  });
});

// ═══════════════════════════════════════════════════════════
// Schedule — branch coverage
// ═══════════════════════════════════════════════════════════
describe('ScheduleEntity — branch coverage', () => {
  const makeVO = (overrides: any = {}) =>
    ScheduleVO.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'Report',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [UserIdVO.create(IDS.userId)],
      runCount: 0,
      ...overrides,
    });

  it('reconstitute paused without pausedAt throws', () => {
    expect(() =>
      ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.paused() }) },
      }),
    ).toThrow(ValidationError);
  });

  it('reconstitute failed without failureReason throws', () => {
    expect(() =>
      ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.failed() }) },
      }),
    ).toThrow(ValidationError);
  });

  it('reconstitute cancelled without cancelledAt throws', () => {
    expect(() =>
      ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.cancelled() }) },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects invalid transition pending → complete', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    expect(() => entity.complete(NOW)).toThrow(BusinessRuleError);
  });

  it('rejects resume from cancelled', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: ScheduleStatusVO.cancelled() }),
        cancelledAt: NOW,
      },
    });
    expect(() => entity.resume(FUTURE, NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Template — branch coverage
// ═══════════════════════════════════════════════════════════
describe('TemplateEntity — branch coverage', () => {
  const variable = (name: string, required = true) =>
    TemplateVariableVO.create({ name, type: 'string', required });

  const makeVO = (overrides: any = {}) =>
    TemplateVO.create({
      id: TemplateIdVO.create(IDS.templateId),
      name: TemplateNameVO.create('Test'),
      slug: 'test',
      type: NotificationTypeVO.create('promotional'),
      status: 'draft' as const,
      format: TemplateFormatVO.html(),
      body: TemplateContentVO.create('<p>{{userName}}</p>'),
      variables: [variable('userName')],
      locale: 'en',
      version: 1,
      ...overrides,
    });

  it('rejects version < 1 (invariant)', () => {
    expect(() =>
      TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ version: 0 }), renderedHistory: [] },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects transactional without subject (invariant)', () => {
    expect(() =>
      TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ type: NotificationTypeVO.create('transactional') }),
          renderedHistory: [],
        },
      }),
    ).toThrow(ValidationError);
  });

  it('activate from active throws', () => {
    const entity = TemplateEntity.reconstitute({
      id: IDS.templateId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: 'active' }), renderedHistory: [] },
    });
    expect(() => entity.activate(NOW)).toThrow(BusinessRuleError);
  });

  it('updateBody on archived throws', () => {
    const entity = TemplateEntity.reconstitute({
      id: IDS.templateId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: 'archived' }), renderedHistory: [] },
    });
    expect(() => entity.updateBody(TemplateContentVO.create('x'), NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Webhook — branch coverage
// ═══════════════════════════════════════════════════════════
describe('WebhookEntity — branch coverage', () => {
  const makeVO = (overrides: any = {}) =>
    WebhookVO.create({
      id: WebhookIdVO.create(IDS.webhookId),
      name: 'Hook',
      type: WebhookTypeVO.create('outgoing'),
      status: WebhookStatusVO.active(),
      url: WebhookUrlVO.create('https://example.com/hook'),
      events: ['order.created'] as const,
      ...overrides,
    });

  it('activate from active throws (invalid transition)', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(() => entity.activate(NOW)).toThrow(BusinessRuleError);
  });

  it('disable from disabled throws', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: WebhookStatusVO.disabled() }), disabledAt: NOW },
    });
    expect(() => entity.disable('again', NOW)).toThrow(BusinessRuleError);
  });
});
