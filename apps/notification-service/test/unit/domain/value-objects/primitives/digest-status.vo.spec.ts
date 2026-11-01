import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { InvalidDigestStatusError } from '@domain/errors/digest.errors.js';

describe('DigestStatusVO', () => {
  it.each(['pending', 'generating', 'ready', 'sent', 'failed', 'cancelled'])('accepts "%s"', (s) => {
    expect(DigestStatusVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => DigestStatusVO.create('weird')).toThrow(InvalidDigestStatusError);
  });

  describe('factory + predicates', () => {
    it.each([
      ['pending', 'isPending'],
      ['generating', 'isGenerating'],
      ['ready', 'isReady'],
      ['sent', 'isSent'],
      ['failed', 'isFailed'],
      ['cancelled', 'isCancelled'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = (DigestStatusVO as any)[status]();
      expect((vo[pred] as () => boolean)()).toBe(true);
    });
  });

  describe('isTerminal / canBeSent', () => {
    it('sent/cancelled terminal', () => {
      expect(DigestStatusVO.sent().isTerminal()).toBe(true);
      expect(DigestStatusVO.cancelled().isTerminal()).toBe(true);
    });
    it('only ready canBeSent', () => {
      expect(DigestStatusVO.ready().canBeSent()).toBe(true);
      expect(DigestStatusVO.pending().canBeSent()).toBe(false);
      expect(DigestStatusVO.generating().canBeSent()).toBe(false);
    });
  });

  describe('canTransitionTo', () => {
    it('pending → generating/cancelled', () => {
      expect(DigestStatusVO.pending().canTransitionTo('generating')).toBe(true);
      expect(DigestStatusVO.pending().canTransitionTo('cancelled')).toBe(true);
    });
    it('generating → ready/failed', () => {
      const s = DigestStatusVO.generating();
      expect(s.canTransitionTo('ready')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
    });
    it('ready → sent/cancelled', () => {
      const s = DigestStatusVO.ready();
      expect(s.canTransitionTo('sent')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
    });
    it('failed → pending/cancelled', () => {
      expect(DigestStatusVO.failed().canTransitionTo('pending')).toBe(true);
      expect(DigestStatusVO.failed().canTransitionTo('cancelled')).toBe(true);
    });
  });
});
