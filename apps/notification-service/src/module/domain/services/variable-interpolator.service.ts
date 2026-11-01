/**
 * VariableInterpolatorService
 * @module notification-service/domain/services
 *
 * Advanced interpolation with:
 *  - default values
 *  - type coercion
 *  - missing-variable handling strategies
 *  - required-variable enforcement
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';

export type MissingStrategy = 'strict' | 'lenient' | 'default';

export interface InterpolateInput {
  readonly data: Readonly<Record<string, unknown>>;
  readonly variables: readonly TemplateVariableVO[];
  readonly strategy?: MissingStrategy;
}

export interface InterpolateResult {
  readonly data: Readonly<Record<string, unknown>>;
  readonly missingRequired: readonly string[];
  readonly appliedDefaults: readonly string[];
}

export class VariableInterpolatorService {
  static interpolate(input: InterpolateInput): InterpolateResult {
    const strategy = input.strategy ?? 'strict';
    const out: Record<string, unknown> = { ...input.data };
    const missingRequired: string[] = [];
    const appliedDefaults: string[] = [];

    for (const variable of input.variables) {
      const present = variable.name in out && out[variable.name] !== undefined;

      if (!present) {
        if (variable.defaultValue !== undefined && strategy !== 'strict') {
          out[variable.name] = this.coerce(
            variable.defaultValue,
            variable.type,
          );
          appliedDefaults.push(variable.name);
        } else if (variable.required) {
          missingRequired.push(variable.name);
        }
      } else {
        // Coerce provided value to declared type
        out[variable.name] = this.coerce(out[variable.name], variable.type);
      }
    }

    if (missingRequired.length > 0 && strategy === 'strict') {
      throw new BusinessRuleError(
        `Missing required variables: ${missingRequired.join(', ')}`,
        'MISSING_REQUIRED_VARIABLES',
        { missing: missingRequired },
      );
    }

    return { data: out, missingRequired, appliedDefaults };
  }

  private static coerce(
    value: unknown,
    type: TemplateVariableVO['type'],
  ): unknown {
    if (value === undefined || value === null) return value;
    switch (type) {
      case 'string':
        return String(value);
      case 'number': {
        const n = Number(value);
        if (Number.isNaN(n)) {
          throw new BusinessRuleError(
            `Cannot coerce "${value}" to number`,
            'COERCION_FAILED',
            { value, type },
          );
        }
        return n;
      }
      case 'boolean':
        if (typeof value === 'boolean') return value;
        if (value === 'true') return true;
        if (value === 'false') return false;
        throw new BusinessRuleError(
          `Cannot coerce "${value}" to boolean`,
          'COERCION_FAILED',
          { value, type },
        );
      case 'date': {
        const d = new Date(String(value));
        if (Number.isNaN(d.getTime())) {
          throw new BusinessRuleError(
            `Cannot coerce "${value}" to date`,
            'COERCION_FAILED',
            { value, type },
          );
        }
        return d.toISOString();
      }
      case 'url': {
        try {
          new URL(String(value));
        } catch {
          throw new BusinessRuleError(
            `Cannot coerce "${value}" to url`,
            'COERCION_FAILED',
            { value, type },
          );
        }
        return String(value);
      }
      case 'email': {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
          throw new BusinessRuleError(
            `Cannot coerce "${value}" to email`,
            'COERCION_FAILED',
            { value, type },
          );
        }
        return String(value);
      }
      default:
        return value;
    }
  }
}
