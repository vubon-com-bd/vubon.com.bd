import { z } from 'zod';
import { METADATA } from '@vubon/shared-constants/src/common/metadata.constants';

/**
 * Metadata schema — uses METADATA constants for version and limits.
 */
export const MetadataSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().uuid().optional(),
  updatedBy: z.string().uuid().optional(),
  version: z.number().int().min(METADATA.VERSION_MIN).default(METADATA.VERSION_DEFAULT),
  tags: z.array(z.string()).max(METADATA.TAGS_MAX).optional(),
  notes: z.string().max(METADATA.NOTES_MAX_LENGTH).optional(),
  custom: z.record(z.unknown()).optional(),
});

export const MetadataCreateSchema = MetadataSchema.omit({
  createdAt: true,
  updatedAt: true,
  version: true,
});
