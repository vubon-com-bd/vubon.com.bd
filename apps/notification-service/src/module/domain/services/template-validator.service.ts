/**
 * TemplateValidatorService
 * @module notification-service/domain/services
 *
 * Validates template content for:
 *  - balanced braces
 *  - declared variables match usage
 *  - no dangerous patterns (script tags, on* handlers)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateRendererService } from '@domain/services/template-renderer.service.js';

export interface ValidateTemplateInput {
  readonly body: string;
  readonly subject?: string;
  readonly declaredVariables: readonly TemplateVariableVO[];
  readonly allowHtml?: boolean;
}

export interface ValidationIssue {
  readonly level: 'error' | 'warning';
  readonly code: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
}

const DANGEROUS_PATTERNS: readonly { pattern: RegExp; code: string; message: string }[] = [
  { pattern: /<script[\s>]/i, code: 'SCRIPT_TAG', message: 'Script tag not allowed' },
  { pattern: /on\w+\s*=/i, code: 'EVENT_HANDLER', message: 'Inline event handler not allowed' },
  { pattern: /javascript:/i, code: 'JAVASCRIPT_URL', message: 'javascript: URL not allowed' },
  { pattern: /<iframe[\s>]/i, code: 'IFRAME_TAG', message: 'iframe tag not allowed' },
];

export class TemplateValidatorService {
  static validate(input: ValidateTemplateInput): ValidationResult {
    const issues: ValidationIssue[] = [];

    // 1. Balanced braces
    const opens = (input.body.match(/\{\{/g) ?? []).length;
    const closes = (input.body.match(/\}\}/g) ?? []).length;
    if (opens !== closes) {
      issues.push({
        level: 'error',
        code: 'UNBALANCED_BRACES',
        message: `Template braces unbalanced: ${opens} '{{' vs ${closes} '}}'`,
      });
    }

    // 2. Variables declared vs used
    const declaredNames = new Set(input.declaredVariables.map((v) => v.name));
    const usedNames = new Set([
      ...TemplateRendererService.extractVariables(input.body),
      ...(input.subject ? TemplateRendererService.extractVariables(input.subject) : []),
    ]);

    for (const used of usedNames) {
      if (!declaredNames.has(used)) {
        issues.push({
          level: 'error',
          code: 'UNDECLARED_VARIABLE',
          message: `Variable "{{${used}}}" used but not declared`,
        });
      }
    }
    for (const declared of declaredNames) {
      if (!usedNames.has(declared)) {
        issues.push({
          level: 'warning',
          code: 'UNUSED_VARIABLE',
          message: `Declared variable "${declared}" is unused`,
        });
      }
    }

    // 3. Dangerous HTML patterns
    if (input.allowHtml !== true) {
      for (const { pattern, code, message } of DANGEROUS_PATTERNS) {
        if (pattern.test(input.body)) {
          issues.push({ level: 'error', code, message });
        }
      }
    }

    // 4. Empty content check
    if (input.body.trim().length === 0) {
      issues.push({
        level: 'error',
        code: 'EMPTY_BODY',
        message: 'Template body cannot be empty',
      });
    }

    const valid = issues.every((i) => i.level !== 'error');
    return { valid, issues };
  }

  /** Throws if template invalid */
  static assertValid(input: ValidateTemplateInput): void {
    const result = this.validate(input);
    if (!result.valid) {
      const errorMessages = result.issues
        .filter((i) => i.level === 'error')
        .map((i) => `${i.code}: ${i.message}`)
        .join('; ');
      throw new BusinessRuleError(
        `Template validation failed: ${errorMessages}`,
        'TEMPLATE_VALIDATION_FAILED',
        { issues: result.issues },
      );
    }
  }
}
