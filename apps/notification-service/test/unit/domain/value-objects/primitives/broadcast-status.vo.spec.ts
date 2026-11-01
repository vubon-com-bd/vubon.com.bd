import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { InvalidBroadcastStatusError } from '@domain/errors/broadcast.errors.js';

describe('BroadcastStatusVO', () => {
  it.each(['draft', 'scheduled', 'sending', 'sent', 'partially_sent', 'failed', 'cancelled'])(
    'accepts "%s"',
    (s) => {
      expect(BroadcastStatusVO.create(s).value).toBe(s);
    },
  );

  it('rejects invalid', () => {
    expect(() => BroadcastStatusVO.create('unknown')).toThrow(InvalidBroadcastStatusError);
  });

  describe('factory', () => {
    it.each([
      ['draft', 'isDraft'],
      ['scheduled', 'isScheduled'],
      ['sending', 'isSending'],
      ['sent', 'isSent'],
      ['cancelled', 'isCancelled'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = (BroadcastStatusVO as any)[status]();
      expect((vo[pred] as () => boolean)()).toBe(true);
    });
  });

  describe('isTerminal', () => {
    it('sent/partially_sent/cancelled', () => {
      expect(BroadcastStatusVO.sent().isTerminal()).toBe(true);
      expect(BroadcastStatusVO.create('partially_sent').isTerminal()).toBe(true);
      expect(BroadcastStatusVO.cancelled().isTerminal()).toBe(true);
      expect(BroadcastStatusVO.sending().isTerminal()).toBe(false);
    });
  });

  describe('canBeCancelled', () => {
    it('true for draft/scheduled/sending', () => {
      expect(BroadcastStatusVO.draft().canBeCancelled()).toBe(true);
      expect(BroadcastStatusVO.scheduled().canBeCancelled()).toBe(true);
      expect(BroadcastStatusVO.sending().canBeCancelled()).toBe(true);
    });
    it('false for sent/cancelled', () => {
      expect(BroadcastStatusVO.sent().canBeCancelled()).toBe(false);
      expect(BroadcastStatusVO.cancelled().canBeCancelled()).toBe(false);
    });
  });

  describe('canTransitionTo', () => {
    it('draft → scheduled/sending/cancelled', () => {
      const s = BroadcastStatusVO.draft();
      expect(s.canTransitionTo('scheduled')).toBe(true);
      expect(s.canTransitionTo('sending')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
    });
    it('sending → sent/partially_sent/failed', () => {
      const s = BroadcastStatusVO.sending();
      expect(s.canTransitionTo('sent')).toBe(true);
      expect(s.canTransitionTo('partially_sent')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
    });
    it('sent has no outgoing', () => {
      expect(BroadcastStatusVO.sent().canTransitionTo('cancelled')).toBe(false);
    });
  });
});
