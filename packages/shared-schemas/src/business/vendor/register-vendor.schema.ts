/**
 * Register Vendor Request Schema
 * @module shared-schemas/business/vendor/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { AddressSchema } from '../../common/geo/address.schema.js';
import { VendorTypeSchema, VendorBusinessTypeSchema } from './vendor-type.schema.js';

export const RegisterVendorRequestSchema = z
  .object({
    userId: UuidSchema,
    name: z.string().trim().min(1).max(200),
    displayName: z.string().trim().min(1).max(200),
    slug: z.string().trim().min(1).max(150),
    description: z.string().max(5000).optional(),
    type: VendorTypeSchema,
    businessType: VendorBusinessTypeSchema,
    email: EmailSchema,
    phone: PhoneSchema.optional(),
    address: AddressSchema,
    acceptTerms: z.literal(true),
  })
  .strict();

export type RegisterVendorRequestSchemaType = z.infer<typeof RegisterVendorRequestSchema>;
