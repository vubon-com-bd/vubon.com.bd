/**
 * NotificationTemplateRendererService — render {{variable}} placeholders
 * @module notification-service/domain/services
 *
 * Rules:
 *  - {{var}} → replaced by value
 *  - {{var:fallback}} → fallback when missing
 *  - Required variables (from template def) must resolve or throw
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TemplateVariablesMismatchError } from '../errors/template.errors.js';
import type { TemplateEntity } from '../entities/template.entity.js';

const VAR_PATTERN = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*([^}]*?))?\s*\}\}/g;

export interface RenderInput {
  readonly template: TemplateEntity;
  readonly data: Readonly<Record<string, unknown>>;
}

export interface RenderResult {
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly missingVariables: readonly string[];
  readonly resolvedVariables: readonly string[];
}

export class NotificationTemplateRendererService {
  static render(input: RenderInput): RenderResult {
    const missingRequired: string[] = [];
    for (const v of input.template.requiredVariables()) {
      if (!(v.name.value in input.data) && !v.hasDefault()) {
        missingRequired.push(v.name.value);
      }
    }
    if (missingRequired.length > 0) {
      throw new TemplateVariablesMismatchError(input.template.id, missingRequired);
    }

    const resolved = new Set<string>();
    const missing = new Set<string>();

    const substitute = (raw: string): string =>
      raw.replace(VAR_PATTERN, (_full, name: string, fallback: string | undefined) => {
        if (name in input.data) {
          resolved.add(name);
          return this.stringify(input.data[name]);
        }
        // Variable has declared default?
        const declared = input.template.variables.find((v) => v.name.value === name);
        if (declared?.hasDefault()) {
          resolved.add(name);
          return declared.defaultValue ?? '';
        }
        if (fallback !== undefined) {
          resolved.add(name);
          return fallback;
        }
        missing.add(name);
        return '';
      });

    const body = substitute(input.template.body);
    const subject = input.template.subject ? substitute(input.template.subject) : undefined;
    const bodyHtml = input.template.bodyHtml ? substitute(input.template.bodyHtml) : undefined;

    return {
      subject,
      body,
      bodyHtml,
      missingVariables: [...missing],
      resolvedVariables: [...resolved],
    };
  }

  static assertRendered(input: RenderInput): RenderResult {
    const result = this.render(input);
    if (result.missingVariables.length > 0) {
      throw new BusinessRuleError(
        `Missing template variables: ${result.missingVariables.join(', ')}`,
        'TEMPLATE_VARIABLES_MISSING',
        { missing: result.missingVariables },
      );
    }
    return result;
  }

  private static stringify(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (value instanceof Date) return value.toISOString();
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
}
