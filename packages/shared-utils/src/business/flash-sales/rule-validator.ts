/**
 * Rule Validator
 * রুল ভ্যালিডেটর
 */

import { z } from 'zod';
import type { FlashSaleRule } from '@vubon/shared-types';

// Rule schema definition (Zod 4.x সিনট্যাক্স)
const ConditionSchema = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.unknown(),
});

const ActionSchema = z.object({
  type: z.string(),
  value: z.unknown(),
});

export const FlashSaleRuleSchema = z.object({
  id: z.string().uuid().optional(),
  flashSaleId: z.string().uuid(),
  name: z.string().min(1, 'Rule name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['discount', 'quantity', 'eligibility', 'timing', 'stacking']),
  priority: z.number().int().min(0).default(0),
  conditions: z.array(ConditionSchema).min(1, 'At least one condition is required'),
  actions: z.array(ActionSchema).min(1, 'At least one action is required'),
  isActive: z.boolean().default(true),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export interface RuleValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleRule;
}

export const validateRule = (data: unknown): RuleValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid rule data'] },
    };
  }

  const rule = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!rule.flashSaleId || typeof rule.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Name validation
  if (!rule.name || typeof rule.name !== 'string' || rule.name.length < 1) {
    errors.name = ['Rule name is required'];
    valid = false;
  }

  // Type validation
  if (rule.type) {
    const validTypes = ['discount', 'quantity', 'eligibility', 'timing', 'stacking'];
    if (!validTypes.includes(rule.type as string)) {
      errors.type = ['Invalid rule type'];
      valid = false;
    }
  } else {
    errors.type = ['Rule type is required'];
    valid = false;
  }

  // Conditions validation
  if (!rule.conditions || !Array.isArray(rule.conditions) || rule.conditions.length === 0) {
    errors.conditions = ['At least one condition is required'];
    valid = false;
  }

  // Actions validation
  if (!rule.actions || !Array.isArray(rule.actions) || rule.actions.length === 0) {
    errors.actions = ['At least one action is required'];
    valid = false;
  }

  try {
    const validatedData = FlashSaleRuleSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as FlashSaleRule,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      const issues =
        (zodError as { issues?: Array<{ path?: (string | number)[]; message?: string }> }).issues ||
        [];
      for (const issue of issues) {
        const path = issue.path?.join('.') || 'unknown';
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message || 'Validation error');
      }
    } else {
      const errorObj = error as { message?: string };
      errors._global = [errorObj.message || 'Unknown validation error'];
    }
    return {
      valid,
      errors,
    };
  }
};

export const validateRuleCreate = (data: unknown): RuleValidationResult => {
  return validateRule(data);
};

export const validateRuleUpdate = (data: unknown): RuleValidationResult => {
  return validateRule(data);
};
