/**
 * TemplateVariable Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidTemplateVariableError } from '@domain/errors/template.errors.js';

export type TemplateVariableType = 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';

const ALLOWED_TYPES: readonly TemplateVariableType[] = [
  'string', 'number', 'boolean', 'date', 'url', 'email',
];
const NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const MAX_NAME_LENGTH = 50;

export interface TemplateVariableProps {
  readonly name: string;
  readonly type: TemplateVariableType;
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export class TemplateVariableVO extends BaseVO<TemplateVariableProps> {
  private constructor(value: TemplateVariableProps) {
    super(value);
  }

  static create(props: TemplateVariableProps): TemplateVariableVO {
    if (typeof props.name !== 'string' || !NAME_PATTERN.test(props.name)) {
      throw new InvalidTemplateVariableError(props.name, 'invalid name (must match [a-zA-Z_][a-zA-Z0-9_]*)');
    }
    if (props.name.length > MAX_NAME_LENGTH) {
      throw new InvalidTemplateVariableError(props.name, `name exceeds ${MAX_NAME_LENGTH} chars`);
    }
    if (!ALLOWED_TYPES.includes(props.type)) {
      throw new InvalidTemplateVariableError(props.name, `invalid type "${props.type}"`);
    }
    if (props.required && props.defaultValue !== undefined) {
      throw new InvalidTemplateVariableError(
        props.name,
        'required variable cannot have defaultValue',
      );
    }
    return new TemplateVariableVO(props);
  }

  static reconstitute(props: TemplateVariableProps): TemplateVariableVO {
    return new TemplateVariableVO(props);
  }

  get name(): string { return this.value.name; }
  get type(): TemplateVariableType { return this.value.type; }
  get required(): boolean { return this.value.required; }
  get defaultValue(): string | undefined { return this.value.defaultValue; }
  get description(): string | undefined { return this.value.description; }
}
