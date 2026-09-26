import { z } from 'zod';

export const ExecutePromptBodySchema = z
  .object({
    promptId: z.string().uuid().optional(),
    text: z.string().min(1).max(100000).optional(),
    templateId: z.string().uuid().optional(),
    role: z.string().optional(),
    variables: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
      .optional(),
    model: z.string().min(1),
    maxTokens: z.number().int().min(1).max(128000).optional(),
    temperature: z.number().min(0).max(2).optional(),
  })
  .refine(
    (d) =>
      d.promptId !== undefined ||
      d.text !== undefined ||
      d.templateId !== undefined,
    { message: 'Either promptId, text, or templateId is required' },
  );

export type ExecutePromptBody = z.infer<typeof ExecutePromptBodySchema>;

export class PromptValidator {
  static validateExecute(input: unknown): ExecutePromptBody {
    return ExecutePromptBodySchema.parse(input);
  }
}
