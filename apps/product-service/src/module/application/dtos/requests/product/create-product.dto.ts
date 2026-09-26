import { z } from 'zod';
import { CreateProductRequestSchema } from '@vubon/shared-schemas/business';

export type CreateProductRequestDTO = z.infer<typeof CreateProductRequestSchema>;
