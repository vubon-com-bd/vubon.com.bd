/**
 * Update Vendor Request Schema
 * @module shared-schemas/business/vendor/requests
 */

import { z } from 'zod';

export const UpdateVendorRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    displayName: z.string().trim().min(1).max(200).optional(),
    description: z.string().max(5000).optional(),
    logoUrl: z.string().url().optional(),
    bannerUrl: z.string().url().optional(),
    website: z.string().url().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateVendorRequestSchemaType = z.infer<typeof UpdateVendorRequestSchema>;
