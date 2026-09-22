import { z } from 'zod';
import { AddressResponseSchema } from '@vubon/shared-schemas/user';

export type AddressResponseDTO = z.infer<typeof AddressResponseSchema>;
