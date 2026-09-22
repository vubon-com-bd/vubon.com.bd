import { z } from 'zod';
import { UpdateProductRequestSchema } from '@vubon/shared-schemas/business';

export type UpdateProductRequestDTO = z.infer<typeof UpdateProductRequestSchema>;
