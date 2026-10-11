/**
 * TemplateVariableName Value Object — {{variableName}} style
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';

const PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const MAX = NOTIFICATION_TEMPLATE.VARIABLE_NAME_MAX_LENGTH;

export class TemplateVariableNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateVariableNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Variable name must be a string', 'variableName');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > MAX) {
      throw new ValidationError(`Variable name must be 1-${MAX} chars`, 'variableName');
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        `Variable name must match ${PATTERN} (letters, digits, underscores; no leading digit)`,
        'variableName',
      );
    }
    return new TemplateVariableNameVO(trimmed);
  }

  static reconstitute(raw: string): TemplateVariableNameVO {
    return new TemplateVariableNameVO(raw);
  }

  toPlaceholder(): string {
    return `{{${this.value}}}`;
  }
}
