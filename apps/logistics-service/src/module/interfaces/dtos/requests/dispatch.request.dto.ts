import { z } from 'zod';
import { DispatchCreateInputSchema } from '@vubon/shared-schemas/logistics';

export type CreateDispatchRequestDTO = z.infer<typeof DispatchCreateInputSchema>;
