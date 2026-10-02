/**
 * Start Checkout Request Schema
 * @module shared-schemas/business/checkout/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { CheckoutTypeSchema } from './checkout.schema.js';

export const StartCheckoutRequestSchema = z
  .object({
    cartId: UuidSchema,
    type: CheckoutTypeSchema.optional().default('registered'),
    email: EmailSchema,
    phone: PhoneSchema.optional(),
  })
  .strict();

export type StartCheckoutRequestSchemaType = z.infer<typeof StartCheckoutRequestSchema>;
