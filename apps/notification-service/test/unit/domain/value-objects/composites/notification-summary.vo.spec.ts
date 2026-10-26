import { NotificationSummaryVO } from '@domain/composites/notification-summary.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  id: NotificationIdVO.create(IDS.notificationId),
  title: 'Test notification',
  preview: 'Hello world...',
  type: NotificationTypeVO.create('transactional'),
  channel: NotificationChannelVO.email(),
  status: NotificationStatusVO.delivered(),
  priority: NotificationPriorityVO.normal(),
  isRead: false,
  createdAt: DATES.now,
  ...overrides,
});

describe('NotificationSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const vo = NotificationSummaryVO.create(makeProps());
      expect(vo.title).toBe('Test notification');
    });

    it('rejects empty title', () => {
      expect(() => NotificationSummaryVO.create(makeProps({ title: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long title (>200)', () => {
      expect(() => NotificationSummaryVO.create(makeProps({ title: 'a'.repeat(201) }))).toThrow(ValidationError);
    });

    it('rejects too-long preview (>200)', () => {
      expect(() => NotificationSummaryVO.create(makeProps({ preview: 'a'.repeat(201) }))).toThrow(ValidationError);
    });

    it('rejects invalid createdAt', () => {
      expect(() => NotificationSummaryVO.create(makeProps({ createdAt: 'garbage' }))).toThrow(ValidationError);
    });

    it('rejects non-boolean isRead', () => {
      expect(() => NotificationSummaryVO.create(makeProps({ isRead: 'yes' }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationSummaryVO.reconstitute(makeProps());
      expect(vo).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isUnread true when not read', () => {
      expect(NotificationSummaryVO.create(makeProps({ isRead: false })).isUnread()).toBe(true);
    });

    it('isUnread false when read', () => {
      expect(NotificationSummaryVO.create(makeProps({ isRead: true })).isUnread()).toBe(false);
    });

    it('isUrgent for critical priority', () => {
      const vo = NotificationSummaryVO.create(
        makeProps({ priority: NotificationPriorityVO.critical() }),
      );
      expect(vo.isUrgent()).toBe(true);
    });

    it('isTerminal for delivered status', () => {
      expect(NotificationSummaryVO.create(makeProps()).isTerminal()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const vo = NotificationSummaryVO.create(makeProps());
      expect(vo.id).toBeDefined();
      expect(vo.title).toBe('Test notification');
      expect(vo.preview).toBe('Hello world...');
      expect(vo.type).toBeDefined();
      expect(vo.channel).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.priority).toBeDefined();
      expect(vo.isRead).toBe(false);
      expect(vo.createdAt).toBe(DATES.now);
    });

    it('ageMs is non-negative', () => {
      const vo = NotificationSummaryVO.create(makeProps());
      expect(vo.ageMs).toBeGreaterThanOrEqual(0);
    });
  });
});
