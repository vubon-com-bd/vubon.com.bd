/**
 * Base Email Template
 * @module shared-kernel/infrastructure/external/email/templates
 */
export interface EmailTemplateVariables {
  readonly [key: string]: string | number | boolean | undefined;
}

export interface EmailTemplate {
  readonly name: string;
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
  readonly variables: readonly string[];
}

export abstract class BaseEmailTemplate {
  abstract readonly name: string;

  abstract render(variables: EmailTemplateVariables): {
    readonly subject: string;
    readonly html: string;
    readonly text?: string;
  };

  protected replace(template: string, variables: EmailTemplateVariables): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const value = variables[key];
      return value === undefined ? '' : String(value);
    });
  }
}
