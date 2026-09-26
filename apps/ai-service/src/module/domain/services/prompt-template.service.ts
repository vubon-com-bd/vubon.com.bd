import { PromptTemplateVO_ } from '../value-objects/composites/prompt-template.vo';
import { PromptTemplateVO } from '../value-objects/primitives/prompt-template.vo';

export interface TemplateInput {
  readonly name: string;
  readonly templateText: string;
  readonly role: string;
}

export class PromptTemplateService {
  build(input: TemplateInput): PromptTemplateVO_ {
    const template = PromptTemplateVO.create(input.templateText);
    return PromptTemplateVO_.create({
      name: input.name,
      template,
      role: input.role,
      variables: template.variables,
    });
  }

  /**
   * Extract all required variables from a template.
   */
  extractVariables(templateText: string): readonly string[] {
    return PromptTemplateVO.create(templateText).variables;
  }

  /**
   * Validate a template has all expected variables.
   */
  validate(template: PromptTemplateVO_, expectedVars: readonly string[]): boolean {
    return expectedVars.every((v) => template.hasVariable(v));
  }
}
