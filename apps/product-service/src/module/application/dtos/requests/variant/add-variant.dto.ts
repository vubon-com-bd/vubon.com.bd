import { z } from 'zod';
import { AddVariantRequestSchema } from '@vubon/shared-schemas/business';

export type AddVariantRequestDTO = z.infer<typeof AddVariantRequestSchema>;
