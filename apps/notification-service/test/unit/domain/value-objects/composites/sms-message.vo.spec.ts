import { SmsMessageVO } from '@domain/composites/sms-message.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const makeProps = (overrides: any = {}) => ({
  to: PhoneNumberVO.create('+8801712345678'),
  message: 'Hello, this is a test SMS',
  type: 'transactional' as const,
  ...overrides,
});

describe('SmsMessageVO', () => {
  describe('create()', () => {
    it('creates valid SMS', () => {
      const vo = SmsMessageVO.create(makeProps());
      expect(vo.type).toBe('transactional');
    });

    it('rejects empty message', () => {
      expect(() => SmsMessageVO.create(makeProps({ message: '' }))).toThrow(ValidationError);
    });

    it('rejects too long (>5 segments)', () => {
      expect(() => SmsMessageVO.create(makeProps({ message: 'a'.repeat(900) }))).toThrow(ValidationError);
    });

    it('rejects too-long senderId (>11 chars)', () => {
      expect(() =>
        SmsMessageVO.create(makeProps({ from: 'senderidtoolong' })),
      ).toThrow(ValidationError);
    });

    it('accepts valid senderId', () => {
      const vo = SmsMessageVO.create(makeProps({ from: 'MYSHOP' }));
      expect(vo.from).toBe('MYSHOP');
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = SmsMessageVO.reconstitute(makeProps());
      expect(vo.message).toBe('Hello, this is a test SMS');
    });
  });

  describe('encoding', () => {
    it('gsm for ASCII', () => {
      expect(SmsMessageVO.reconstitute(makeProps()).encoding).toBe('gsm');
    });

    it('unicode for Bengali', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'হ্যালো' })).encoding).toBe('unicode');
    });
  });

  describe('segments', () => {
    it('1 segment for short GSM', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'short' })).segments).toBe(1);
    });

    it('multiple segments for long text', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'a'.repeat(200) })).segments).toBe(2);
    });

    it('unicode uses 70-char segments', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'হ'.repeat(100) })).segments).toBe(2);
    });
  });

  describe('isMultipart / isEmpty / length', () => {
    it('isMultipart true for long', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'a'.repeat(200) })).isMultipart).toBe(true);
    });

    it('isMultipart false for short', () => {
      expect(SmsMessageVO.reconstitute(makeProps()).isMultipart).toBe(false);
    });

    it('isEmpty for whitespace reconstitute', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: '   ' })).isEmpty).toBe(true);
    });

    it('length', () => {
      expect(SmsMessageVO.reconstitute(makeProps({ message: 'abc' })).length).toBe(3);
    });
  });

  describe('withMessage', () => {
    const base = SmsMessageVO.reconstitute(makeProps());
    it('returns new VO', () => {
      const updated = base.withMessage('new message');
      expect(updated.message).toBe('new message');
    });
  });

  describe('getters', () => {
    const vo = SmsMessageVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.to).toBeDefined();
      expect(vo.from).toBeUndefined();
      expect(vo.message).toBe('Hello, this is a test SMS');
      expect(vo.type).toBe('transactional');
    });
  });
});
