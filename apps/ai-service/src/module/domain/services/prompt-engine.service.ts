import { PromptTemplateVO_ } from '../value-objects/composites/prompt-template.vo';

export interface RenderInput {
  readonly template: PromptTemplateVO_;
  readonly variables: Readonly<Record<string, string | number | boolean>>;
}

export interface RenderedPrompt {
  readonly text: string;
  readonly role: string;
  readonly missingVariables: readonly string[];
}

export class PromptEngineService {
  /**
   * Render a template by replacing {{var}} placeholders.
   */
  render(input: RenderInput): RenderedPrompt {
    const requiredVars = input.template.variables;
    const missing = requiredVars.filter(
      (v) => !(v in input.variables),
    );

    const text = input.template.template.value.replace(
      /\{\{\s*(\w+)\s*\}\}/g,
      (_, key: string) => {
        const value = input.variables[key];
        return value === undefined ? `{{${key}}}` : String(value);
      },
    );

    return {
      text,
      role: input.template.role,
      missingVariables: missing,
    };
  }

  /**
   * Truncate prompt to fit token limit (rough: 4 chars ≈ 1 token).
   */
  truncateForTokens(text: string, maxTokens: number): string {
    const maxChars = maxTokens * 4;
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars - 3) + '...';
  }
}
