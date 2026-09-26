import { z } from 'zod';

export const ModelCreateBodySchema = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1),
  providerId: z.string().uuid(),
  version: z.string().optional(),
  endpoint: z.string().url().nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
});

export const ModelUpdateBodySchema = ModelCreateBodySchema.partial();

export type ModelCreateBody = z.infer<typeof ModelCreateBodySchema>;
export type ModelUpdateBody = z.infer<typeof ModelUpdateBodySchema>;

export class ModelValidator {
  static validateCreate(input: unknown): ModelCreateBody {
    return ModelCreateBodySchema.parse(input);
  }

  static validateUpdate(input: unknown): ModelUpdateBody {
    return ModelUpdateBodySchema.parse(input);
  }
}
