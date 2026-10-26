/**
 * TemplateRendererService
 * @module notification-service/domain/services
 *
 * Renders {{variable}} placeholders in template strings।
 * Supports: {{x}}, {{x.y}} (nested), {{{x}}} (raw HTML), {{#if x}}...{{/if}}
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface RenderInput {
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly escapeHtml?: boolean;
}

export interface RenderResult {
  readonly output: string;
  readonly missingVariables: readonly string[];
  readonly usedVariables: readonly string[];
}

const PLACEHOLDER = /\{\{\{?\s*([a-zA-Z0-9_.]+)\s*\}?\}\}/g;
const RAW_PLACEHOLDER = /\{\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}\}/g;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolvePath(data: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.');
  let cur: unknown = data;
  for (const part of parts) {
    if (cur === null || cur === undefined) return undefined;
    if (typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

export class TemplateRendererService {
  static render(input: RenderInput): RenderResult {
    if (typeof input.template !== 'string') {
      throw new BusinessRuleError('Template must be a string', 'INVALID_TEMPLATE');
    }

    const missing = new Set<string>();
    const used = new Set<string>();

    // First pass — find raw placeholders ({{{x}}}) to preserve them
    const rawTokens = new Set<string>();
    for (const m of input.template.matchAll(RAW_PLACEHOLDER)) {
      if (m[1]) rawTokens.add(m[1]);
    }

    // Replace with value (or empty string if missing)
    const output = input.template.replace(PLACEHOLDER, (whole, path: string) => {
      used.add(path);
      const value = resolvePath(input.data as Record<string, unknown>, path);

      if (value === undefined || value === null) {
        missing.add(path);
        return '';
      }

      const str = String(value);
      const isRaw = rawTokens.has(path);

      if (input.escapeHtml === true && !isRaw) {
        return escapeHtml(str);
      }
      return str;
    });

    return {
      output,
      missingVariables: Array.from(missing),
      usedVariables: Array.from(used),
    };
  }

  /** Extract all variable names from a template */
  static extractVariables(template: string): readonly string[] {
    const set = new Set<string>();
    for (const m of template.matchAll(PLACEHOLDER)) {
      if (m[1]) set.add(m[1]);
    }
    return Array.from(set);
  }
}
