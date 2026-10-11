/**
 * Deeper composite VO coverage — branches not exercised in main spec files
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationDeliveryVO } from '../../../../../src/module/domain/value-objects/composites/notification-delivery.vo.js';
import { NotificationActionsVO } from '../../../../../src/module/domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../../../src/module/domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationActionVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-action-type.vo.js';
import { DeliveryStatusVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryFailureReasonVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { NotificationReadVO } from '../../../../../src/module/domain/value-objects/composites/notification-read.vo.js';
import { ReadStatusVO } from '../../../../../src/module/domain/value-objects/primitives/read-status.vo.js';

describe('NotificationDeliveryVO deeper', () => {
  it('reconstitute with provider fields', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.sent(),
      attemptCount: 2,
      provider: 'sendgrid',
      providerMessageId: 'msg-1',
      sentAt: new Date().toISOString(),
    });
    expect(vo.provider).toBe('sendgrid');
    expect(vo.providerMessageId).toBe('msg-1');
    expect(vo.sentAt).toBeDefined();
  });

  it('canRetry false when non-retryable failure', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.failed(),
      attemptCount: 1,
      failureReason: DeliveryFailureReasonVO.invalidAddress(),
    });
    expect(vo.canRetry()).toBe(false);
  });

  it('canRetry false when no failureReason', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.failed(),
      attemptCount: 1,
    });
    expect(vo.canRetry()).toBe(false);
  });

  it('hasBeenAttempted false when 0', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.queued(),
      attemptCount: 0,
    });
    expect(vo.hasBeenAttempted()).toBe(false);
  });

  it('lastAttemptAt getter', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.sending(),
      attemptCount: 1,
      lastAttemptAt: '2026-10-10T00:00:00.000Z',
    });
    expect(vo.lastAttemptAt).toBeDefined();
  });
});

describe('NotificationActionsVO deeper', () => {
  it('reconstitute empty', () => {
    const vo = NotificationActionsVO.reconstitute([]);
    expect(vo.isEmpty()).toBe(true);
  });

  it('primaryAction returns undefined when none', () => {
    const e = NotificationActionEntryVO.reconstitute({
      action: NotificationActionVO.accept(),
      type: NotificationActionTypeVO.secondary(),
      label: 'A',
    });
    const vo = NotificationActionsVO.create([e]);
    expect(vo.primaryAction()).toBeUndefined();
  });

  it('actions getter returns array', () => {
    const vo = NotificationActionsVO.empty();
    expect(vo.actions).toEqual([]);
  });

  it('hasDangerAction false', () => {
    const vo = NotificationActionsVO.empty();
    expect(vo.hasDangerAction()).toBe(false);
  });
});

describe('NotificationReadVO deeper', () => {
  it('archived with timestamp', () => {
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.archived(),
      archivedAt: new Date().toISOString(),
    });
    expect(vo.archivedAt).toBeDefined();
  });

  it('snoozedUntil getter', () => {
    const iso = new Date(Date.now() + 86_400_000).toISOString();
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.snoozed(),
      snoozedUntil: iso,
    });
    expect(vo.snoozedUntil).toBe(iso);
  });

  it('isSnoozeActive when snoozedUntil undefined', () => {
    const vo = NotificationReadVO.reconstitute({ status: ReadStatusVO.unread() });
    expect(vo.isSnoozeActive()).toBe(false);
  });

  it('readAt getter', () => {
    const iso = new Date().toISOString();
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.read(),
      readAt: iso,
    });
    expect(vo.readAt).toBe(iso);
  });
});
