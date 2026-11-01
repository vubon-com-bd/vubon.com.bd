import { ContentSplitterService } from '@domain/services/content-splitter.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('ContentSplitterService', () => {
  describe('split()', () => {
    it('returns 1 chunk for short SMS', () => {
      const r = ContentSplitterService.split({ content: 'hello', channel: 'sms' });
      expect(r.chunks.length).toBe(1);
      expect(r.encoding).toBe('gsm');
    });

    it('splits long GSM SMS into segments', () => {
      const r = ContentSplitterService.split({ content: 'a'.repeat(200), channel: 'sms' });
      expect(r.chunks.length).toBe(2);
    });

    it('splits unicode SMS into 70-char segments', () => {
      const r = ContentSplitterService.split({ content: 'হ'.repeat(100), channel: 'sms' });
      expect(r.encoding).toBe('unicode');
      expect(r.chunks.length).toBe(2);
    });

    it('truncates at maxSegments', () => {
      const r = ContentSplitterService.split({
        content: 'a'.repeat(1000),
        channel: 'sms',
        maxSegments: 2,
      });
      expect(r.chunks.length).toBe(2);
      expect(r.truncated).toBe(true);
    });

    it('truncates push to 240', () => {
      const r = ContentSplitterService.split({ content: 'a'.repeat(300), channel: 'push' });
      expect(r.chunks[0]!.length).toBeLessThanOrEqual(240);
      expect(r.truncated).toBe(true);
    });

    it('does not split push under 240', () => {
      const r = ContentSplitterService.split({ content: 'short', channel: 'push' });
      expect(r.truncated).toBe(false);
    });

    it('does not split email', () => {
      const r = ContentSplitterService.split({ content: 'a'.repeat(5000), channel: 'email' });
      expect(r.chunks.length).toBe(1);
    });

    it('does not split in_app', () => {
      const r = ContentSplitterService.split({ content: 'long content', channel: 'in_app' });
      expect(r.chunks.length).toBe(1);
    });

    it('handles unknown channel as single chunk', () => {
      const r = ContentSplitterService.split({ content: 'test', channel: 'whatsapp' });
      expect(r.chunks.length).toBe(1);
    });

    it('throws on non-string content', () => {
      expect(() =>
        ContentSplitterService.split({ content: 123 as any, channel: 'sms' }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('countSmsSegments()', () => {
    it('returns 1 for short', () => {
      expect(ContentSplitterService.countSmsSegments('hi')).toBe(1);
    });

    it('returns 2 for 200 GSM chars', () => {
      expect(ContentSplitterService.countSmsSegments('a'.repeat(200))).toBe(2);
    });

    it('returns 2 for 100 unicode chars', () => {
      expect(ContentSplitterService.countSmsSegments('হ'.repeat(100))).toBe(2);
    });

    it('returns 1 for empty', () => {
      expect(ContentSplitterService.countSmsSegments('')).toBe(1);
    });
  });
});
