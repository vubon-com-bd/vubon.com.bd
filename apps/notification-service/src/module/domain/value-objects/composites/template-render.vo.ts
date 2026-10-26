/**
 * TemplateRenderVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Rendered template output + metadata।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

export interface TemplateRenderVOProps {
  readonly templateId: TemplateIdVO;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly missingVariables: readonly string[];
  readonly renderedAt: string;
  readonly locale: string;
}

export class TemplateRenderVO extends BaseVO<TemplateRenderVOProps> {
  private constructor(props: TemplateRenderVOProps) {
    super(Object.freeze(props));
  }

  static create(props: TemplateRenderVOProps): TemplateRenderVO {
    const vo = new TemplateRenderVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TemplateRenderVOProps): TemplateRenderVO {
    return new TemplateRenderVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.body !== 'string' || v.body.length === 0) {
      throw new ValidationError('Rendered body cannot be empty', 'body');
    }
    const t = new Date(v.renderedAt);
    if (Number.isNaN(t.getTime())) {
      throw new ValidationError('renderedAt is not a valid timestamp', 'renderedAt');
    }
  }

  get templateId(): TemplateIdVO { return this.value.templateId; }
  get subject(): string | undefined { return this.value.subject; }
  get body(): string { return this.value.body; }
  get bodyHtml(): string | undefined { return this.value.bodyHtml; }
  get missingVariables(): readonly string[] { return this.value.missingVariables; }
  get renderedAt(): string { return this.value.renderedAt; }
  get locale(): string { return this.value.locale; }

  get isComplete(): boolean { return this.value.missingVariables.length === 0; }
  get hasMissing(): boolean { return this.value.missingVariables.length > 0; }
  get hasHtml(): boolean { return this.value.bodyHtml !== undefined; }

  get preview(): string {
    return this.value.body.slice(0, 200);
  }
}
