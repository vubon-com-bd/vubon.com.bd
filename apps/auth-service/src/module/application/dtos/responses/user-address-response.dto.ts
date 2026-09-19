import { z } from 'zod';
import { AddressResponseSchema } from '@vubon/shared-schemas/user';

export type UserAddressResponseDTO = z.infer<typeof AddressResponseSchema>;
