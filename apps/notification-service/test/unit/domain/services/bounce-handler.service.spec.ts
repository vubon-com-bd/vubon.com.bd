import { BounceHandlerService } from '@domain/services/bounce-handler.service.js';

describe('BounceHandlerService', () => {
  describe('classify()', () => {
    it('classifies INVALID_ADDRESS as hard bounce', () => {
      const r = BounceHandlerService.classify({ errorCode: 'INVALID_ADDRESS', reason: 'x' });
      expect(r.type).toBe('hard');
      expect(r.action).toBe('block');
    });

    it('classifies INVALID_PHONE as hard', () => {
      const r = BounceHandlerService.classify({ errorCode: 'INVALID_PHONE', reason: 'x' });
      expect(r.type).toBe('hard');
    });

    it('classifies INVALID_TOKEN as hard', () => {
      const r = BounceHandlerService.classify({ errorCode: 'INVALID_TOKEN', reason: 'x' });
      expect(r.type).toBe('hard');
    });

    it('classifies BLOCKED as hard', () => {
      const r = BounceHandlerService.classify({ errorCode: 'BLOCKED', reason: 'x' });
      expect(r.type).toBe('hard');
    });

    it('classifies MAILBOX_DOES_NOT_EXIST as hard', () => {
      const r = BounceHandlerService.classify({ errorCode: 'MAILBOX_DOES_NOT_EXIST', reason: 'x' });
      expect(r.type).toBe('hard');
    });

    it('classifies SPAM_COMPLAINT as complaint', () => {
      const r = BounceHandlerService.classify({ errorCode: 'SPAM_COMPLAINT', reason: 'x' });
      expect(r.type).toBe('complaint');
      expect(r.action).toBe('unsubscribe');
    });

    it('classifies ABUSE_REPORT as complaint', () => {
      const r = BounceHandlerService.classify({ errorCode: 'ABUSE_REPORT', reason: 'x' });
      expect(r.type).toBe('complaint');
    });

    it('classifies TIMEOUT as soft (retry)', () => {
      const r = BounceHandlerService.classify({ errorCode: 'TIMEOUT', reason: 'x' });
      expect(r.type).toBe('soft');
      expect(r.action).toBe('retry');
    });

    it('classifies RATE_LIMITED as soft', () => {
      const r = BounceHandlerService.classify({ errorCode: 'RATE_LIMITED', reason: 'x' });
      expect(r.type).toBe('soft');
    });

    it('soft becomes suppress after 5 attempts', () => {
      const r = BounceHandlerService.classify({
        errorCode: 'TIMEOUT',
        reason: 'x',
        attemptNumber: 5,
      });
      expect(r.action).toBe('suppress');
    });

    it('fallback: invalid_address reason → hard', () => {
      const r = BounceHandlerService.classify({
        errorCode: '',
        reason: 'invalid_address',
      });
      expect(r.type).toBe('hard');
    });

    it('fallback: unsubscribed reason → complaint', () => {
      const r = BounceHandlerService.classify({
        errorCode: '',
        reason: 'unsubscribed',
      });
      expect(r.type).toBe('complaint');
    });

    it('unknown error → default retry', () => {
      const r = BounceHandlerService.classify({ errorCode: 'WEIRD', reason: 'unknown' });
      expect(r.type).toBe('unknown');
      expect(r.action).toBe('retry');
    });
  });

  describe('severity()', () => {
    it('returns high for block', () => {
      expect(BounceHandlerService.severity({ type: 'hard', action: 'block', reason: 'x' })).toBe('high');
    });

    it('returns high for unsubscribe', () => {
      expect(BounceHandlerService.severity({ type: 'complaint', action: 'unsubscribe', reason: 'x' })).toBe('high');
    });

    it('returns medium for suppress', () => {
      expect(BounceHandlerService.severity({ type: 'soft', action: 'suppress', reason: 'x' })).toBe('medium');
    });

    it('returns low for retry', () => {
      expect(BounceHandlerService.severity({ type: 'soft', action: 'retry', reason: 'x' })).toBe('low');
    });
  });
});
