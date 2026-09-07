import { z } from 'zod';

export const ValidationRuleSchema = z.object({
  field: z.string(),
  rule: z.string(),
  params: z.array(z.unknown()).optional(),
  message: z.string().optional(),
});

export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
      rule: z.string(),
      value: z.unknown().optional(),
    })
  ),
});
