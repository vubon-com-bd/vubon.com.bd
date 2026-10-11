/**
 * TemplateVariableVO — one variable definition in a template
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TemplateVariableNameVO } from '../primitives/template-variable-name.vo.js';

export type TemplateVariableType = 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';

const ALLOWED_TYPES: readonly TemplateVariableType[] = [
  'string', 'number', 'boolean', 'date', 'url', 'email',
];

export interface TemplateVariableVOProps {
  readonly name: TemplateVariableNameVO;
  readonly type: TemplateVariableType;
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export class TemplateVariableVO extends BaseVO<TemplateVariableVOProps> {
  private constructor(props: TemplateVariableVOProps) {
    super(props);
  }

  static create(props: TemplateVariableVOProps): TemplateVariableVO {
    const vo = new TemplateVariableVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TemplateVariableVOProps): TemplateVariableVO {
    return new TemplateVariableVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!ALLOWED_TYPES.includes(v.type)) {
      throw new ValidationError(
        `Invalid variable type "${v.type}". Allowed: ${ALLOWED_TYPES.join(', ')}`,
        'type',
      );
    }
    if (v.description && v.description.length > 500) {
      throw new ValidationError('Variable description exceeds 500 chars', 'description');
    }
  }

  get name(): TemplateVariableNameVO { return this.value.name; }
  get type(): TemplateVariableType { return this.value.type; }
  get required(): boolean { return this.value.required; }
  get defaultValue(): string | undefined { return this.value.defaultValue; }
  get description(): string | undefined { return this.value.description; }

  hasDefault(): boolean { return this.value.defaultValue !== undefined; }
}
