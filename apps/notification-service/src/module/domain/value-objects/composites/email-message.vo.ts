/**
 * EmailMessageVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Email channel message — full MIME-ready envelope।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { EMAIL } from '@vubon/shared-constants/platform';

import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

export interface EmailAttachmentVOProps {
  readonly filename: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly url?: string;
  readonly content?: string;
}

export interface EmailMessageVOProps {
  readonly to: readonly EmailAddressVO[];
  readonly cc?: readonly EmailAddressVO[];
  readonly bcc?: readonly EmailAddressVO[];
  readonly from?: EmailAddressVO;
  readonly replyTo?: EmailAddressVO;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly attachments?: readonly EmailAttachmentVOProps[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly priority: NotificationPriorityVO;
}

export class EmailMessageVO extends BaseVO<EmailMessageVOProps> {
  private constructor(props: EmailMessageVOProps) {
    super(Object.freeze(props));
  }

  static create(props: EmailMessageVOProps): EmailMessageVO {
    const vo = new EmailMessageVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: EmailMessageVOProps): EmailMessageVO {
    return new EmailMessageVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.to.length === 0) {
      throw new ValidationError('Email must have at least one recipient', 'to');
    }
    if (v.to.length > EMAIL.MAX_RECIPIENTS_PER_EMAIL) {
      throw new ValidationError(
        `Email recipients exceed ${EMAIL.MAX_RECIPIENTS_PER_EMAIL}`,
        'to',
      );
    }
    if (!v.subject || v.subject.trim().length === 0) {
      throw new ValidationError('Email subject cannot be empty', 'subject');
    }
    if (v.subject.length > EMAIL.SUBJECT_MAX_LENGTH) {
      throw new ValidationError(
        `Email subject exceeds ${EMAIL.SUBJECT_MAX_LENGTH} chars`,
        'subject',
      );
    }
    if (v.subject.includes('\n') || v.subject.includes('\r')) {
      throw new ValidationError('Email subject cannot contain newlines', 'subject');
    }
    if (!v.text && !v.html) {
      throw new ValidationError('Email must have text or html body', 'body');
    }
    if (v.text && v.text.length > EMAIL.BODY_MAX_LENGTH) {
      throw new ValidationError(`Email text body exceeds ${EMAIL.BODY_MAX_LENGTH}`, 'text');
    }
    if (v.html && v.html.length > EMAIL.BODY_MAX_LENGTH) {
      throw new ValidationError(`Email html body exceeds ${EMAIL.BODY_MAX_LENGTH}`, 'html');
    }
    if (v.attachments) {
      if (v.attachments.length > EMAIL.MAX_ATTACHMENTS) {
        throw new ValidationError(
          `Email attachments exceed ${EMAIL.MAX_ATTACHMENTS}`,
          'attachments',
        );
      }
      let totalSizeMb = 0;
      for (const att of v.attachments) {
        if (!att.filename || att.filename.trim().length === 0) {
          throw new ValidationError('Attachment filename required', 'attachments');
        }
        if (!att.contentType || att.contentType.trim().length === 0) {
          throw new ValidationError('Attachment contentType required', 'attachments');
        }
        if (att.sizeBytes < 0) {
          throw new ValidationError('Attachment sizeBytes cannot be negative', 'attachments');
        }
        const sizeMb = att.sizeBytes / (1024 * 1024);
        if (sizeMb > EMAIL.MAX_ATTACHMENT_SIZE_MB) {
          throw new ValidationError(
            `Attachment "${att.filename}" exceeds ${EMAIL.MAX_ATTACHMENT_SIZE_MB}MB`,
            'attachments',
          );
        }
        totalSizeMb += sizeMb;
        if (!att.url && !att.content) {
          throw new ValidationError(
            `Attachment "${att.filename}" needs url or content`,
            'attachments',
          );
        }
      }
      if (totalSizeMb > EMAIL.MAX_TOTAL_SIZE_MB) {
        throw new ValidationError(
          `Total attachments exceed ${EMAIL.MAX_TOTAL_SIZE_MB}MB`,
          'attachments',
        );
      }
    }
  }

  get to(): readonly EmailAddressVO[] { return this.value.to; }
  get cc(): readonly EmailAddressVO[] | undefined { return this.value.cc; }
  get bcc(): readonly EmailAddressVO[] | undefined { return this.value.bcc; }
  get from(): EmailAddressVO | undefined { return this.value.from; }
  get replyTo(): EmailAddressVO | undefined { return this.value.replyTo; }
  get subject(): string { return this.value.subject; }
  get text(): string | undefined { return this.value.text; }
  get html(): string | undefined { return this.value.html; }
  get attachments(): readonly EmailAttachmentVOProps[] | undefined { return this.value.attachments; }
  get headers(): Readonly<Record<string, string>> | undefined { return this.value.headers; }
  get priority(): NotificationPriorityVO { return this.value.priority; }

  hasAttachments(): boolean { return (this.value.attachments?.length ?? 0) > 0; }
  get attachmentCount(): number { return this.value.attachments?.length ?? 0; }
  get isHtml(): boolean { return this.value.html !== undefined; }
  get isPlainText(): boolean { return this.value.text !== undefined; }
  get recipientCount(): number {
    return this.value.to.length + (this.value.cc?.length ?? 0) + (this.value.bcc?.length ?? 0);
  }

  withSubject(subject: string): EmailMessageVO {
    return EmailMessageVO.create({ ...this.value, subject });
  }

  withAttachment(att: EmailAttachmentVOProps): EmailMessageVO {
    return EmailMessageVO.create({
      ...this.value,
      attachments: [...(this.value.attachments ?? []), att],
    });
  }
}
