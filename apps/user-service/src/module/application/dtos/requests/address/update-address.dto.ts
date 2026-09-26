import { z } from 'zod';
import { UpdateAddressRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateAddressRequestDTO = z.infer<typeof UpdateAddressRequestSchema>;
