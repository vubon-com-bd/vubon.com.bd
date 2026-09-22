import { z } from 'zod';
import { ProductAttributeSchema } from '@vubon/shared-schemas/business/product';

export type AttributeResponseDTO = z.infer<typeof ProductAttributeSchema>;
