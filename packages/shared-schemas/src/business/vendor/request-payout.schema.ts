/**
 * Request Payout Request Schema
 * @module shared-schemas/business/vendor/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { VendorPayoutMethodSchema } from './vendor-payout.schema';

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
