/**
 * TemplateFormat Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidTemplateFormatError } from '@domain/errors/template.errors.js';

export type TemplateFormatValue = 'text' | 'html' | 'mjml' | 'markdown';

const ALLOWED: readonly TemplateFormatValue[] = ['text', 'html', 'mjml', 'markdown'];

export class TemplateFormatVO extends BaseTypeVO<TemplateFormatValue> {
  private constructor(value: TemplateFormatValue) {
    super(value);
  }

  static create(raw: string): TemplateFormatVO {
    if (typeof raw !== 'string') {
      throw new InvalidTemplateFormatError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase() as TemplateFormatValue;
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidTemplateFormatError(normalized, ALLOWED);
    }
    return new TemplateFormatVO(normalized);
  }

  static reconstitute(raw: string): TemplateFormatVO {
    return new TemplateFormatVO(raw as TemplateFormatValue);
  }

  static text(): TemplateFormatVO { return new TemplateFormatVO('text'); }
  static html(): TemplateFormatVO { return new TemplateFormatVO('html'); }
  static mjml(): TemplateFormatVO { return new TemplateFormatVO('mjml'); }
  static markdown(): TemplateFormatVO { return new TemplateFormatVO('markdown'); }

  isText(): boolean { return this.value === 'text'; }
  isHtml(): boolean { return this.value === 'html'; }
  isRich(): boolean { return this.value !== 'text'; }
}
