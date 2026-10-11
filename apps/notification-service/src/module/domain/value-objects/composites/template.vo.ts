/**
 * TemplateVO — template snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';
import { TemplateIdVO } from '../primitives/template-id.vo.js';
import { TemplateTypeVO } from '../primitives/template-type.vo.js';
import { TemplateStatusVO } from '../primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../primitives/template-category.vo.js';
import { TemplateNameVO } from '../primitives/template-name.vo.js';
import { TemplateLocaleVO } from '../primitives/template-locale.vo.js';
import { TemplateVariableVO } from './template-variable.vo.js';

export interface TemplateVOProps {
  readonly id: TemplateIdVO;
  readonly name: TemplateNameVO;
  readonly slug: string;
  readonly type: TemplateTypeVO;
  readonly status: TemplateStatusVO;
  readonly category: TemplateCategoryVO;
  readonly locale: TemplateLocaleVO;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly variables: readonly TemplateVariableVO[];
  readonly version: number;
  readonly parentId?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TemplateVO extends BaseVO<TemplateVOProps> {
  private constructor(props: TemplateVOProps) {
    super(props);
  }

  static create(props: TemplateVOProps): TemplateVO {
    const vo = new TemplateVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TemplateVOProps): TemplateVO {
    return new TemplateVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.body || v.body.length === 0) {
      throw new ValidationError('Template body is required', 'body');
    }
    if (v.body.length > NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH) {
      throw new ValidationError(
        `Template body exceeds ${NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH} chars`,
        'body',
      );
    }
    if (v.type.isEmail()) {
      if (!v.subject || v.subject.length === 0) {
        throw new ValidationError('Email template requires a subject', 'subject');
      }
      if (v.subject.length > NOTIFICATION_TEMPLATE.SUBJECT_MAX_LENGTH) {
        throw new ValidationError(
          `Subject exceeds ${NOTIFICATION_TEMPLATE.SUBJECT_MAX_LENGTH} chars`,
          'subject',
        );
      }
    }
    if (v.variables.length > NOTIFICATION_TEMPLATE.MAX_VARIABLES) {
      throw new ValidationError(
        `Too many variables (max ${NOTIFICATION_TEMPLATE.MAX_VARIABLES})`,
        'variables',
      );
    }
    if (v.version < 1) {
      throw new ValidationError('Version must be >= 1', 'version');
    }
  }

  get id(): TemplateIdVO { return this.value.id; }
  get name(): TemplateNameVO { return this.value.name; }
  get slug(): string { return this.value.slug; }
  get type(): TemplateTypeVO { return this.value.type; }
  get status(): TemplateStatusVO { return this.value.status; }
  get category(): TemplateCategoryVO { return this.value.category; }
  get locale(): TemplateLocaleVO { return this.value.locale; }
  get subject(): string | undefined { return this.value.subject; }
  get body(): string { return this.value.body; }
  get bodyHtml(): string | undefined { return this.value.bodyHtml; }
  get variables(): readonly TemplateVariableVO[] { return this.value.variables; }
  get version(): number { return this.value.version; }
  get parentId(): string | undefined { return this.value.parentId; }
  get createdBy(): string { return this.value.createdBy; }
  get updatedBy(): string | undefined { return this.value.updatedBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isUsable(): boolean { return this.value.status.isUsable(); }

  requiredVariables(): readonly TemplateVariableVO[] {
    return this.value.variables.filter((v) => v.required);
  }

  hasVariable(name: string): boolean {
    return this.value.variables.some((v) => v.name.value === name);
  }
}
