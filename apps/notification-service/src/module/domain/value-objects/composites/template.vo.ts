/**
 * TemplateVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Notification template-এর core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_TEMPLATE_STATUS } from '@vubon/shared-constants/platform';

import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateTypeVO } from '@domain/primitives/template-type.vo.js';

export type TemplateStatusValue =
  (typeof NOTIFICATION_TEMPLATE_STATUS)[keyof typeof NOTIFICATION_TEMPLATE_STATUS];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  draft: ['active', 'archived'],
  active: ['inactive', 'archived', 'deprecated'],
  inactive: ['active', 'archived', 'deprecated'],
  archived: [],
  deprecated: ['archived'],
};

export interface TemplateVOProps {
  readonly id: TemplateIdVO;
  readonly name: TemplateNameVO;
  readonly slug: string;
  readonly type: TemplateTypeVO;
  readonly status: TemplateStatusValue;
  readonly format: TemplateFormatVO;
  readonly subject?: TemplateContentVO;
  readonly body: TemplateContentVO;
  readonly variables: readonly TemplateVariableVO[];
  readonly locale: string;
  readonly version: number;
}

export class TemplateVO extends BaseVO<TemplateVOProps> {
  private constructor(props: TemplateVOProps) {
    super(Object.freeze(props));
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
    if (!v.slug || v.slug.length === 0) {
      throw new ValidationError('Template slug cannot be empty', 'slug');
    }
    if (v.version < 1) {
      throw new ValidationError('Template version must be >= 1', 'version');
    }
    if (!VALID_TRANSITIONS[v.status]) {
      throw new ValidationError(`Invalid template status "${v.status}"`, 'status');
    }
    // Cross-check: every {{var}} in body must have matching variable definition
    const referenced = v.body.extractVariables();
    const defined = new Set(v.variables.map((x) => x.name));
    for (const ref of referenced) {
      if (!defined.has(ref)) {
        throw new ValidationError(
          `Template body references undeclared variable "{{${ref}}}"`,
          'variables',
        );
      }
    }
    // Required variables must have no default
    for (const variable of v.variables) {
      if (variable.required && variable.defaultValue !== undefined) {
        throw new ValidationError(
          `Required variable "${variable.name}" cannot have default`,
          'variables',
        );
      }
    }
  }

  get id(): TemplateIdVO { return this.value.id; }
  get name(): TemplateNameVO { return this.value.name; }
  get slug(): string { return this.value.slug; }
  get type(): TemplateTypeVO { return this.value.type; }
  get status(): TemplateStatusValue { return this.value.status; }
  get format(): TemplateFormatVO { return this.value.format; }
  get subject(): TemplateContentVO | undefined { return this.value.subject; }
  get body(): TemplateContentVO { return this.value.body; }
  get variables(): readonly TemplateVariableVO[] { return this.value.variables; }
  get locale(): string { return this.value.locale; }
  get version(): number { return this.value.version; }

  isDraft(): boolean { return this.value.status === 'draft'; }
  isActive(): boolean { return this.value.status === 'active'; }
  isInactive(): boolean { return this.value.status === 'inactive'; }
  isArchived(): boolean { return this.value.status === 'archived'; }
  isDeprecated(): boolean { return this.value.status === 'deprecated'; }

  isUsable(): boolean { return this.isActive(); }
  canBeDeleted(): boolean { return this.isDraft() || this.isArchived(); }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value.status] ?? []).includes(target);
  }

  requiresSubject(): boolean {
    // Only email templates require a subject
    return this.value.type.isEmail();
  }

  hasSubject(): boolean { return this.value.subject !== undefined; }

  get requiredVariables(): readonly TemplateVariableVO[] {
    return this.value.variables.filter((v) => v.required);
  }

  withStatus(status: TemplateStatusValue): TemplateVO {
    return TemplateVO.create({ ...this.value, status });
  }

  withVersion(version: number): TemplateVO {
    return TemplateVO.create({ ...this.value, version });
  }
}
