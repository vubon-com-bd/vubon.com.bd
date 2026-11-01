import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { InvalidNotificationStatusError } from '@domain/errors/notification.errors.js';

describe('NotificationStatusVO', () => {
  describe('create()', () => {
    it.each(['draft', 'pending', 'queued', 'scheduled', 'sending', 'sent', 'delivered', 'failed', 'cancelled', 'expired', 'archived'])(
      'accepts valid status "%s"',
      (s) => {
        expect(NotificationStatusVO.create(s).value).toBe(s);
      },
    );

    it('normalizes to lowercase', () => {
      expect(NotificationStatusVO.create('DRAFT').value).toBe('draft');
      expect(NotificationStatusVO.create('Pending').value).toBe('pending');
    });

    it('trims whitespace', () => {
      expect(NotificationStatusVO.create('  sent  ').value).toBe('sent');
    });

    it('rejects invalid status', () => {
      expect(() => NotificationStatusVO.create('unknown')).toThrow(InvalidNotificationStatusError);
    });

    it('rejects non-string', () => {
      expect(() => NotificationStatusVO.create(123 as any)).toThrow(InvalidNotificationStatusError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = NotificationStatusVO.reconstitute('delivered');
      expect(vo.value).toBe('delivered');
    });
  });

  describe('factory methods', () => {
    it('creates all statuses', () => {
      expect(NotificationStatusVO.draft().isDraft()).toBe(true);
      expect(NotificationStatusVO.pending().isPending()).toBe(true);
      expect(NotificationStatusVO.queued().isQueued()).toBe(true);
      expect(NotificationStatusVO.scheduled().isScheduled()).toBe(true);
      expect(NotificationStatusVO.sending().isSending()).toBe(true);
      expect(NotificationStatusVO.sent().isSent()).toBe(true);
      expect(NotificationStatusVO.delivered().isDelivered()).toBe(true);
      expect(NotificationStatusVO.failed().isFailed()).toBe(true);
      expect(NotificationStatusVO.cancelled().isCancelled()).toBe(true);
      expect(NotificationStatusVO.expired().isExpired()).toBe(true);
      expect(NotificationStatusVO.archived().isArchived()).toBe(true);
    });
  });

  describe('state predicates', () => {
    it('isTerminal() for delivered/cancelled/expired/archived', () => {
      expect(NotificationStatusVO.delivered().isTerminal()).toBe(true);
      expect(NotificationStatusVO.cancelled().isTerminal()).toBe(true);
      expect(NotificationStatusVO.expired().isTerminal()).toBe(true);
      expect(NotificationStatusVO.archived().isTerminal()).toBe(true);
      expect(NotificationStatusVO.draft().isTerminal()).toBe(false);
      expect(NotificationStatusVO.sending().isTerminal()).toBe(false);
    });

    it('isInFlight() for queued/scheduled/sending/sent', () => {
      expect(NotificationStatusVO.queued().isInFlight()).toBe(true);
      expect(NotificationStatusVO.scheduled().isInFlight()).toBe(true);
      expect(NotificationStatusVO.sending().isInFlight()).toBe(true);
      expect(NotificationStatusVO.sent().isInFlight()).toBe(true);
      expect(NotificationStatusVO.draft().isInFlight()).toBe(false);
    });
  });

  describe('canTransitionTo() — state machine', () => {
    it('draft → pending/archived/cancelled', () => {
      expect(NotificationStatusVO.draft().canTransitionTo('pending')).toBe(true);
      expect(NotificationStatusVO.draft().canTransitionTo('archived')).toBe(true);
      expect(NotificationStatusVO.draft().canTransitionTo('cancelled')).toBe(true);
      expect(NotificationStatusVO.draft().canTransitionTo('sent')).toBe(false);
    });

    it('pending → queued/scheduled/sending/cancelled/failed', () => {
      const s = NotificationStatusVO.pending();
      expect(s.canTransitionTo('queued')).toBe(true);
      expect(s.canTransitionTo('scheduled')).toBe(true);
      expect(s.canTransitionTo('sending')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('delivered')).toBe(false);
    });

    it('sending → sent/failed', () => {
      expect(NotificationStatusVO.sending().canTransitionTo('sent')).toBe(true);
      expect(NotificationStatusVO.sending().canTransitionTo('failed')).toBe(true);
      expect(NotificationStatusVO.sending().canTransitionTo('delivered')).toBe(false);
    });

    it('sent → delivered/failed', () => {
      expect(NotificationStatusVO.sent().canTransitionTo('delivered')).toBe(true);
      expect(NotificationStatusVO.sent().canTransitionTo('failed')).toBe(true);
    });

    it('delivered → archived', () => {
      expect(NotificationStatusVO.delivered().canTransitionTo('archived')).toBe(true);
      expect(NotificationStatusVO.delivered().canTransitionTo('sending')).toBe(false);
    });

    it('failed → pending/cancelled/archived (retry path)', () => {
      expect(NotificationStatusVO.failed().canTransitionTo('pending')).toBe(true);
      expect(NotificationStatusVO.failed().canTransitionTo('cancelled')).toBe(true);
      expect(NotificationStatusVO.failed().canTransitionTo('archived')).toBe(true);
      expect(NotificationStatusVO.failed().canTransitionTo('sent')).toBe(false);
    });

    it('archived is terminal — no transitions', () => {
      expect(NotificationStatusVO.archived().canTransitionTo('sending')).toBe(false);
      expect(NotificationStatusVO.archived().canTransitionTo('cancelled')).toBe(false);
    });

    it('cancelled → archived only', () => {
      expect(NotificationStatusVO.cancelled().canTransitionTo('archived')).toBe(true);
      expect(NotificationStatusVO.cancelled().canTransitionTo('sending')).toBe(false);
    });
  });
});
