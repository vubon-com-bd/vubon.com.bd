import { z } from 'zod';

export const MetadataSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
  version: z.number().int().min(1).default(1),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  custom: z.record(z.unknown()).optional(),
});

export const MetadataCreateSchema = MetadataSchema.omit({
  createdAt: true,
  updatedAt: true,
  version: true,
});
