/**
 * KPI Validator (interface layer)
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

export const CreateKpiSchema = z.object({
  name: z.string().min(3).max(150),
  metric: z.string().min(2).max(100),
  target: z.number().positive().max(1e15),
  thresholdPercent: z.number().min(0).max(100).optional(),
  higherIsBetter: z.boolean().optional(),
  description: z.string().max(500).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
});

export const UpdateKpiSchema = z
  .object({
    name: z.string().min(3).max(150).optional(),
    target: z.number().positive().max(1e15).optional(),
    thresholdPercent: z.number().min(0).max(100).optional(),
    higherIsBetter: z.boolean().optional(),
    description: z.string().max(500).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: 'At least one field must be provided',
  });

export const EvaluateKpiSchema = z.object({
  actual: z.number().finite(),
  evaluatedAt: z.string().datetime().optional(),
});

@Injectable()
export class KpiValidator {
  validateCreate(input: unknown): z.infer<typeof CreateKpiSchema> {
    const result = CreateKpiSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid KPI payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }

  validateUpdate(input: unknown): z.infer<typeof UpdateKpiSchema> {
    const result = UpdateKpiSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid update payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }

  validateEvaluate(input: unknown): z.infer<typeof EvaluateKpiSchema> {
    const result = EvaluateKpiSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid evaluate payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }
}
