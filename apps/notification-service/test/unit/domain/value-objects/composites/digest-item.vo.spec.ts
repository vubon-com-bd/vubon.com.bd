import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  notificationId: NotificationIdVO.create(IDS.notificationId),
  category: NotificationCategoryVO.create('order'),
  priority: NotificationPriorityVO.normal(),
  title: 'Order confirmed',
  summary: 'Your order #1234 confirmed',
  occurredAt: DATES.now,
  ...overrides,
});

describe('DigestItemVO', () => {
  describe('create()', () => {
    it('creates valid item', () => {
      const vo = DigestItemVO.create(makeProps());
      expect(vo.title).toBe('Order confirmed');
    });

    it('rejects empty title', () => {
      expect(() => DigestItemVO.create(makeProps({ title: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long title (>150)', () => {
      expect(() => DigestItemVO.create(makeProps({ title: 'a'.repeat(151) }))).toThrow(ValidationError);
    });

    it('rejects empty summary', () => {
      expect(() => DigestItemVO.create(makeProps({ summary: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long summary (>500)', () => {
      expect(() => DigestItemVO.create(makeProps({ summary: 'a'.repeat(501) }))).toThrow(ValidationError);
    });

    it('rejects invalid occurredAt', () => {
      expect(() => DigestItemVO.create(makeProps({ occurredAt: 'garbage' }))).toThrow(ValidationError);
    });

    it('rejects invalid actionUrl', () => {
      expect(() =>
        DigestItemVO.create(makeProps({ actionUrl: 'not-a-url' })),
      ).toThrow(ValidationError);
    });

    it('accepts valid actionUrl', () => {
      const vo = DigestItemVO.create(makeProps({ actionUrl: 'https://example.com' }));
      expect(vo.hasAction()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = DigestItemVO.reconstitute(makeProps());
      expect(vo.notificationId).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isUrgent for critical priority', () => {
      const vo = DigestItemVO.reconstitute(
        makeProps({ priority: NotificationPriorityVO.critical() }),
      );
      expect(vo.isUrgent()).toBe(true);
    });

    it('hasAction false when no actionUrl', () => {
      expect(DigestItemVO.reconstitute(makeProps()).hasAction()).toBe(false);
    });
  });

  describe('getters', () => {
    const vo = DigestItemVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.notificationId).toBeDefined();
      expect(vo.category).toBeDefined();
      expect(vo.priority).toBeDefined();
      expect(vo.title).toBe('Order confirmed');
      expect(vo.summary).toBe('Your order #1234 confirmed');
      expect(vo.actionUrl).toBeUndefined();
      expect(vo.occurredAt).toBe(DATES.now);
    });
  });
});
