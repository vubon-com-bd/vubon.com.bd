import { EmailMessageVO } from '@domain/composites/email-message.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const addr = (email: string) => EmailAddressVO.create(email);

const makeProps = (overrides: any = {}) => ({
  to: [addr('user@example.com')],
  subject: 'Hello',
  text: 'Hello world',
  priority: NotificationPriorityVO.normal(),
  ...overrides,
});

describe('EmailMessageVO', () => {
  describe('create()', () => {
    it('creates valid message', () => {
      const vo = EmailMessageVO.create(makeProps());
      expect(vo.subject).toBe('Hello');
      expect(vo.recipientCount).toBe(1);
    });

    it('rejects no recipients', () => {
      expect(() => EmailMessageVO.create(makeProps({ to: [] }))).toThrow(ValidationError);
    });

    it('rejects empty subject', () => {
      expect(() => EmailMessageVO.create(makeProps({ subject: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long subject (>200)', () => {
      expect(() => EmailMessageVO.create(makeProps({ subject: 'a'.repeat(201) }))).toThrow(ValidationError);
    });

    it('rejects subject with newlines', () => {
      expect(() => EmailMessageVO.create(makeProps({ subject: 'a\nb' }))).toThrow(ValidationError);
    });

    it('rejects no text AND no html', () => {
      expect(() => EmailMessageVO.create(makeProps({ text: undefined, html: undefined }))).toThrow(ValidationError);
    });

    it('accepts html only', () => {
      const vo = EmailMessageVO.create(makeProps({ text: undefined, html: '<p>Hi</p>' }));
      expect(vo.isHtml).toBe(true);
    });

    it('rejects too many attachments', () => {
      const att = { filename: 'a.pdf', contentType: 'application/pdf', sizeBytes: 100, url: 'https://x.com/a.pdf' };
      expect(() =>
        EmailMessageVO.create(makeProps({ attachments: Array(11).fill(att) })),
      ).toThrow(ValidationError);
    });

    it('rejects attachment >25MB', () => {
      const att = {
        filename: 'big.pdf',
        contentType: 'application/pdf',
        sizeBytes: 26 * 1024 * 1024,
        url: 'https://x.com/a.pdf',
      };
      expect(() => EmailMessageVO.create(makeProps({ attachments: [att] }))).toThrow(ValidationError);
    });

    it('rejects attachment without url/content', () => {
      const att = { filename: 'a.pdf', contentType: 'application/pdf', sizeBytes: 100 };
      expect(() => EmailMessageVO.create(makeProps({ attachments: [att] }))).toThrow(ValidationError);
    });

    it('rejects attachment with empty filename', () => {
      const att = { filename: '', contentType: 'application/pdf', sizeBytes: 100, url: 'https://x.com/a.pdf' };
      expect(() => EmailMessageVO.create(makeProps({ attachments: [att] }))).toThrow(ValidationError);
    });

    it('accepts valid attachment', () => {
      const att = { filename: 'a.pdf', contentType: 'application/pdf', sizeBytes: 100, url: 'https://x.com/a.pdf' };
      const vo = EmailMessageVO.create(makeProps({ attachments: [att] }));
      expect(vo.hasAttachments()).toBe(true);
      expect(vo.attachmentCount).toBe(1);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = EmailMessageVO.reconstitute(makeProps());
      expect(vo.subject).toBe('Hello');
    });
  });

  describe('predicates + counts', () => {
    it('isPlainText true when text set', () => {
      expect(EmailMessageVO.reconstitute(makeProps()).isPlainText).toBe(true);
    });

    it('recipientCount includes cc+bcc', () => {
      const vo = EmailMessageVO.reconstitute(
        makeProps({
          to: [addr('a@b.com')],
          cc: [addr('c@d.com')],
          bcc: [addr('e@f.com')],
        }),
      );
      expect(vo.recipientCount).toBe(3);
    });

    it('hasAttachments false when none', () => {
      expect(EmailMessageVO.reconstitute(makeProps()).hasAttachments()).toBe(false);
    });
  });

  describe('withSubject / withAttachment', () => {
    const base = EmailMessageVO.reconstitute(makeProps());

    it('withSubject returns new VO', () => {
      const updated = base.withSubject('New');
      expect(updated.subject).toBe('New');
    });

    it('withAttachment adds attachment', () => {
      const updated = base.withAttachment({
        filename: 'x.pdf',
        contentType: 'application/pdf',
        sizeBytes: 100,
        url: 'https://x.com/x.pdf',
      });
      expect(updated.attachmentCount).toBe(1);
    });
  });
});
