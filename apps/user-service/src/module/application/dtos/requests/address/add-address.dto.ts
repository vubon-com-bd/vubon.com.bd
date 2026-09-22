import { z } from 'zod';
import { AddAddressRequestSchema } from '@vubon/shared-schemas/user';

export type AddAddressRequestDTO = z.infer<typeof AddAddressRequestSchema>;
