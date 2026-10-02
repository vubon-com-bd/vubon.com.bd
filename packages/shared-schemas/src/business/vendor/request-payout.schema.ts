/**
 * Request Payout Request Schema
 * @module shared-schemas/business/vendor/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { PositiveMoneySchema } from '../../common/primitives/money.schema.js';
import { VendorPayoutMethodSchema } from './vendor-payout.schema.js';

export const RequestPayoutRequestSchema = z
  .object({
    vendorId: UuidSchema,
    amount: PositiveMoneySchema,
    method: VendorPayoutMethodSchema,
    bankAccountId: UuidSchema.optional(),
    notes: z.string().max(1000).optional(),
  })
  .strict();

export type RequestPayoutRequestSchemaType = z.infer<typeof RequestPayoutRequestSchema>;
