/**
 * NotificationStatusVO — state machine tests
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform/notification';

describe('NotificationStatusVO', () => {
  describe('create + reconstitute', () => {
    it('should create from valid status value', () => {
      const vo = NotificationStatusVO.create(NOTIFICATION_STATUS.PENDING);
      expect(vo.value).toBe(NOTIFICATION_STATUS.PENDING);
    });

    it('should throw on invalid status', () => {
      expect(() => NotificationStatusVO.create('invalid_status')).toThrow();
    });

    it('should reconstitute without validation', () => {
      const vo = NotificationStatusVO.reconstitute('custom_value');
      expect(vo.value).toBe('custom_value');
    });
  });

  describe('named constructors', () => {
    it('should build pending', () => {
      expect(NotificationStatusVO.pending().value).toBe(NOTIFICATION_STATUS.PENDING);
    });

    it('should build queued', () => {
      expect(NotificationStatusVO.queued().value).toBe(NOTIFICATION_STATUS.QUEUED);
    });

    it('should build sent', () => {
      expect(NotificationStatusVO.sent().value).toBe(NOTIFICATION_STATUS.SENT);
    });

    it('should build delivered', () => {
      expect(NotificationStatusVO.delivered().value).toBe(NOTIFICATION_STATUS.DELIVERED);
    });

    it('should build failed', () => {
      expect(NotificationStatusVO.failed().value).toBe(NOTIFICATION_STATUS.FAILED);
    });

    it('should build cancelled', () => {
      expect(NotificationStatusVO.cancelled().value).toBe(NOTIFICATION_STATUS.CANCELLED);
    });
  });

  describe('predicates', () => {
    it('should detect pending', () => {
      expect(NotificationStatusVO.pending().isPending()).toBe(true);
      expect(NotificationStatusVO.sent().isPending()).toBe(false);
    });

    it('should detect success (sent OR delivered)', () => {
      expect(NotificationStatusVO.sent().isSuccess()).toBe(true);
      expect(NotificationStatusVO.delivered().isSuccess()).toBe(true);
      expect(NotificationStatusVO.failed().isSuccess()).toBe(false);
    });

    it('should detect final statuses', () => {
      expect(NotificationStatusVO.delivered().isFinal()).toBe(true);
      expect(NotificationStatusVO.cancelled().isFinal()).toBe(true);
      expect(NotificationStatusVO.expired().isFinal()).toBe(true);
      expect(NotificationStatusVO.pending().isFinal()).toBe(false);
    });

    it('should detect in-flight (queued or sending)', () => {
      expect(NotificationStatusVO.queued().isInFlight()).toBe(true);
      expect(NotificationStatusVO.sending().isInFlight()).toBe(true);
      expect(NotificationStatusVO.pending().isInFlight()).toBe(false);
    });

    it('should detect recoverable (failed)', () => {
      expect(NotificationStatusVO.failed().isRecoverable()).toBe(true);
      expect(NotificationStatusVO.sent().isRecoverable()).toBe(false);
    });
  });

  describe('canTransitionTo — happy paths', () => {
    it('pending → queued', () => {
      expect(NotificationStatusVO.pending().canTransitionTo(NOTIFICATION_STATUS.QUEUED)).toBe(true);
    });

    it('pending → cancelled', () => {
      expect(NotificationStatusVO.pending().canTransitionTo(NOTIFICATION_STATUS.CANCELLED)).toBe(true);
    });

    it('queued → sending', () => {
      expect(NotificationStatusVO.queued().canTransitionTo(NOTIFICATION_STATUS.SENDING)).toBe(true);
    });

    it('sending → sent', () => {
      expect(NotificationStatusVO.sending().canTransitionTo(NOTIFICATION_STATUS.SENT)).toBe(true);
    });

    it('sending → failed', () => {
      expect(NotificationStatusVO.sending().canTransitionTo(NOTIFICATION_STATUS.FAILED)).toBe(true);
    });

    it('sent → delivered', () => {
      expect(NotificationStatusVO.sent().canTransitionTo(NOTIFICATION_STATUS.DELIVERED)).toBe(true);
    });

    it('delivered → archived', () => {
      expect(NotificationStatusVO.delivered().canTransitionTo(NOTIFICATION_STATUS.ARCHIVED)).toBe(true);
    });

    it('failed → pending (retry)', () => {
      expect(NotificationStatusVO.failed().canTransitionTo(NOTIFICATION_STATUS.PENDING)).toBe(true);
    });

    it('failed → queued (retry)', () => {
      expect(NotificationStatusVO.failed().canTransitionTo(NOTIFICATION_STATUS.QUEUED)).toBe(true);
    });
  });

  describe('canTransitionTo — expiration paths (TTL-based)', () => {
    it('draft → expired', () => {
      expect(NotificationStatusVO.draft().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(true);
    });

    it('pending → expired', () => {
      expect(NotificationStatusVO.pending().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(true);
    });

    it('queued → expired', () => {
      expect(NotificationStatusVO.queued().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(true);
    });

    it('scheduled → expired', () => {
      expect(NotificationStatusVO.scheduled().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(true);
    });

    it('sending → expired (should NOT be allowed — mid-flight)', () => {
      expect(NotificationStatusVO.sending().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(false);
    });

    it('sent → expired (should NOT be allowed)', () => {
      expect(NotificationStatusVO.sent().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(false);
    });

    it('delivered → expired (should NOT be allowed)', () => {
      expect(NotificationStatusVO.delivered().canTransitionTo(NOTIFICATION_STATUS.EXPIRED)).toBe(false);
    });
  });

  describe('canTransitionTo — invalid paths', () => {
    it('pending → delivered (must go through sending)', () => {
      expect(NotificationStatusVO.pending().canTransitionTo(NOTIFICATION_STATUS.DELIVERED)).toBe(false);
    });

    it('delivered → pending (terminal-ish)', () => {
      expect(NotificationStatusVO.delivered().canTransitionTo(NOTIFICATION_STATUS.PENDING)).toBe(false);
    });

    it('delivered → sent (backward)', () => {
      expect(NotificationStatusVO.delivered().canTransitionTo(NOTIFICATION_STATUS.SENT)).toBe(false);
    });

    it('cancelled → anywhere (terminal)', () => {
      expect(NotificationStatusVO.cancelled().canTransitionTo(NOTIFICATION_STATUS.PENDING)).toBe(false);
      expect(NotificationStatusVO.cancelled().canTransitionTo(NOTIFICATION_STATUS.QUEUED)).toBe(false);
    });

    it('expired → anywhere (terminal)', () => {
      expect(NotificationStatusVO.expired().canTransitionTo(NOTIFICATION_STATUS.PENDING)).toBe(false);
      expect(NotificationStatusVO.expired().canTransitionTo(NOTIFICATION_STATUS.QUEUED)).toBe(false);
    });

    it('archived → anywhere (terminal)', () => {
      expect(NotificationStatusVO.archived().canTransitionTo(NOTIFICATION_STATUS.PENDING)).toBe(false);
    });
  });
});
