/**
 * Select Shipping Request Schema
 * @module shared-schemas/business/checkout/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const SelectShippingRequestSchema = z
  .object({
    checkoutId: UuidSchema,
    shippingMethodId: UuidSchema,
    notes: z.string().max(500).optional(),
  })
  .strict();

export type SelectShippingRequestSchemaType = z.infer<typeof SelectShippingRequestSchema>;
