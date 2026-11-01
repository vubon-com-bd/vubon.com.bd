import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { InvalidDeliveryStatusError } from '@domain/errors/delivery.errors.js';

describe('DeliveryStatusVO', () => {
  it.each(['queued', 'sending', 'sent', 'delivered', 'read', 'failed', 'bounced', 'rejected', 'unsubscribed', 'blocked'])(
    'accepts "%s"',
    (s) => {
      expect(DeliveryStatusVO.create(s).value).toBe(s);
    },
  );

  it('rejects invalid', () => {
    expect(() => DeliveryStatusVO.create('nonsense')).toThrow(InvalidDeliveryStatusError);
  });

  it('rejects non-string', () => {
    expect(() => DeliveryStatusVO.create(null as any)).toThrow(InvalidDeliveryStatusError);
  });

  describe('predicates', () => {
    it('isSuccess for delivered/read', () => {
      expect(DeliveryStatusVO.delivered().isSuccess()).toBe(true);
      expect(DeliveryStatusVO.create('read').isSuccess()).toBe(true);
      expect(DeliveryStatusVO.failed().isSuccess()).toBe(false);
    });

    it('isTerminal includes delivered/read/bounced/failed/rejected/blocked/unsubscribed', () => {
      expect(DeliveryStatusVO.delivered().isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('read').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('bounced').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.failed().isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('rejected').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('blocked').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('unsubscribed').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.queued().isTerminal()).toBe(false);
      expect(DeliveryStatusVO.sending().isTerminal()).toBe(false);
    });

    it('canRetry for failed/queued', () => {
      expect(DeliveryStatusVO.failed().canRetry()).toBe(true);
      expect(DeliveryStatusVO.queued().canRetry()).toBe(true);
      expect(DeliveryStatusVO.delivered().canRetry()).toBe(false);
    });
  });

  describe('canTransitionTo — state machine', () => {
    it('queued → sending/failed/blocked', () => {
      const s = DeliveryStatusVO.queued();
      expect(s.canTransitionTo('sending')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('blocked')).toBe(true);
      expect(s.canTransitionTo('delivered')).toBe(false);
    });

    it('sending → sent/failed/bounced', () => {
      const s = DeliveryStatusVO.sending();
      expect(s.canTransitionTo('sent')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('bounced')).toBe(true);
    });

    it('sent → delivered/failed/bounced/rejected', () => {
      const s = DeliveryStatusVO.sent();
      expect(s.canTransitionTo('delivered')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('bounced')).toBe(true);
      expect(s.canTransitionTo('rejected')).toBe(true);
    });

    it('delivered → read', () => {
      expect(DeliveryStatusVO.delivered().canTransitionTo('read')).toBe(true);
      expect(DeliveryStatusVO.delivered().canTransitionTo('failed')).toBe(false);
    });

    it('failed → queued (retry)', () => {
      expect(DeliveryStatusVO.failed().canTransitionTo('queued')).toBe(true);
    });

    it('read/bounced/rejected are terminal', () => {
      expect(DeliveryStatusVO.create('read').canTransitionTo('queued')).toBe(false);
      expect(DeliveryStatusVO.create('bounced').canTransitionTo('queued')).toBe(false);
      expect(DeliveryStatusVO.create('rejected').canTransitionTo('queued')).toBe(false);
    });
  });
});
