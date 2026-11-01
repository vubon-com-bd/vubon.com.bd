import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  id: NotificationIdVO.create(IDS.notificationId),
  userId: UserIdVO.create(IDS.userId),
  type: NotificationTypeVO.create('transactional'),
  category: NotificationCategoryVO.create('order'),
  channel: NotificationChannelVO.create('email'),
  priority: NotificationPriorityVO.create('normal'),
  status: NotificationStatusVO.draft(),
  subject: NotificationSubjectVO.create('Hello'),
  body: NotificationBodyVO.create('World'),
  data: NotificationDataVO.create({}),
  ...overrides,
});

describe('NotificationVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = NotificationVO.create(makeProps());
      expect(vo.id.value).toBe(IDS.notificationId);
      expect(vo.userId.value).toBe(IDS.userId);
    });

    it('rejects promotional + transactional category mismatch', () => {
      expect(() =>
        NotificationVO.create(
          makeProps({
            type: NotificationTypeVO.create('promotional'),
            category: NotificationCategoryVO.create('order'),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects security + silent priority', () => {
      expect(() =>
        NotificationVO.create(
          makeProps({
            type: NotificationTypeVO.create('security'),
            category: NotificationCategoryVO.create('security'),
            priority: NotificationPriorityVO.silent(),
          }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('getters', () => {
    const vo = NotificationVO.create(makeProps());

    it('exposes all properties', () => {
      expect(vo.id).toBeDefined();
      expect(vo.userId).toBeDefined();
      expect(vo.type).toBeDefined();
      expect(vo.category).toBeDefined();
      expect(vo.channel).toBeDefined();
      expect(vo.priority).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.subject).toBeDefined();
      expect(vo.body).toBeDefined();
      expect(vo.data).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isTransactional for transactional type', () => {
      const vo = NotificationVO.create(makeProps({ type: NotificationTypeVO.transactional() }));
      expect(vo.isTransactional()).toBe(true);
      expect(vo.isPromotional()).toBe(false);
    });

    it('isPromotional for promotional type', () => {
      const vo = NotificationVO.create(
        makeProps({
          type: NotificationTypeVO.promotional(),
          category: NotificationCategoryVO.create('promotion'),
        }),
      );
      expect(vo.isPromotional()).toBe(true);
    });

    it('isUrgent for critical priority', () => {
      const vo = NotificationVO.create(makeProps({ priority: NotificationPriorityVO.critical() }));
      expect(vo.isUrgent()).toBe(true);
    });

    it('isSilent for silent priority', () => {
      const vo = NotificationVO.create(makeProps({ priority: NotificationPriorityVO.silent() }));
      expect(vo.isSilent()).toBe(true);
    });

    it('isTerminal for delivered status', () => {
      const vo = NotificationVO.create(makeProps({ status: NotificationStatusVO.delivered() }));
      expect(vo.isTerminal()).toBe(true);
    });

    it('canOptOut for promotional', () => {
      const vo = NotificationVO.create(
        makeProps({
          type: NotificationTypeVO.promotional(),
          category: NotificationCategoryVO.create('promotion'),
        }),
      );
      expect(vo.canOptOut()).toBe(true);
    });
  });

  describe('withXxx transitions', () => {
    const base = NotificationVO.create(makeProps());

    it('withStatus creates new VO', () => {
      const updated = base.withStatus(NotificationStatusVO.pending());
      expect(updated.status.isPending()).toBe(true);
      expect(base.status.isDraft()).toBe(true); // immutable
    });

    it('withPriority creates new VO', () => {
      const updated = base.withPriority(NotificationPriorityVO.high());
      expect(updated.priority.isUrgent()).toBe(true);
    });

    it('withSubject creates new VO', () => {
      const updated = base.withSubject(NotificationSubjectVO.create('New'));
      expect(updated.subject.value).toBe('New');
    });

    it('withBody creates new VO', () => {
      const updated = base.withBody(NotificationBodyVO.create('New body'));
      expect(updated.body.value).toBe('New body');
    });
  });
});
