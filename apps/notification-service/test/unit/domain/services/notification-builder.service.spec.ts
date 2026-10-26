import { NotificationBuilderService } from '@domain/services/notification-builder.service.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const recipient = () =>
  NotificationRecipientVO.create({
    userId: UserIdVO.create(IDS.userId),
    channel: NotificationChannelVO.email(),
    email: EmailAddressVO.create('u@example.com'),
  });

describe('NotificationBuilderService', () => {
  describe('build()', () => {
    it('builds valid notification', () => {
      const entity = NotificationBuilderService.build({
        id: IDS.notificationId,
        userId: IDS.userId,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        subject: 'Order confirmed',
        body: 'Your order is confirmed',
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.isPending()).toBe(true);
      expect(entity.vo.type.value).toBe('transactional');
    });

    it('accepts optional priority override', () => {
      const entity = NotificationBuilderService.build({
        id: IDS.notificationId,
        userId: IDS.userId,
        type: 'security',
        category: 'security',
        channel: 'email',
        priority: 'high',
        subject: 'Alert',
        body: 'Security alert',
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.priority.value).toBe('high');
    });

    it('uses normal priority by default', () => {
      const entity = NotificationBuilderService.build({
        id: IDS.notificationId,
        userId: IDS.userId,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        subject: 'Hi',
        body: 'Body',
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.priority.value).toBe('normal');
    });

    it('accepts data + actions + expiresAt', () => {
      const entity = NotificationBuilderService.build({
        id: IDS.notificationId,
        userId: IDS.userId,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        subject: 'Hi',
        body: 'Body',
        data: { orderId: 'ORD-1' },
        actions: [],
        expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.expiresAt).toBeDefined();
    });

    it('rejects empty recipients (BusinessRule)', () => {
      expect(() =>
        NotificationBuilderService.build({
          id: IDS.notificationId,
          userId: IDS.userId,
          type: 'transactional',
          category: 'order',
          channel: 'email',
          subject: 'Hi',
          body: 'Body',
          recipients: [],
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('rejects security + silent priority', () => {
      expect(() =>
        NotificationBuilderService.build({
          id: IDS.notificationId,
          userId: IDS.userId,
          type: 'security',
          category: 'security',
          channel: 'email',
          priority: 'silent',
          subject: 'Alert',
          body: 'Body',
          recipients: [recipient()],
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });
});
