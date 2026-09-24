import { TemplateEntity } from '../entities/template.entity';

export interface TemplateValidationResult {
  readonly valid: boolean;
  readonly missingVariables: readonly string[];
}

export class TemplateValidatorService {
  validate(
    template: TemplateEntity,
    variables: Readonly<Record<string, unknown>>,
  ): TemplateValidationResult {
    const missing: string[] = [];
    for (const required of template.variables) {
      if (!(required in variables)) {
        missing.push(required);
      }
    }
    return {
      valid: missing.length === 0,
      missingVariables: Object.freeze(missing),
    };
  }
}
