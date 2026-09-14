/**
 * Start Checkout Request Schema
 * @module shared-schemas/business/checkout/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { EmailSchema } from '../../common/primitives/email.schema';
import { PhoneSchema } from '../../common/primitives/phone.schema';
import { CheckoutTypeSchema } from './checkout.schema';

export const StartCheckoutRequestSchema = z
  .object({
    cartId: UuidSchema,
    type: CheckoutTypeSchema.optional().default('registered'),
    email: EmailSchema,
    phone: PhoneSchema.optional(),
  })
  .strict();

export type StartCheckoutRequestSchemaType = z.infer<typeof StartCheckoutRequestSchema>;
