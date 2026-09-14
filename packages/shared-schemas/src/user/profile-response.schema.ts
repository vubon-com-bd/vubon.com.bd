/**
 * Profile Response Schema
 * @module shared-schemas/user/responses
 */

import { z } from 'zod';
import { UserProfileSchema, UserProfilePublicSchema } from './user-profile.schema';

export const ProfileResponseSchema = z.object({
  success: z.literal(true),
  profile: UserProfileSchema,
});

export const ProfilePublicResponseSchema = z.object({
  success: z.literal(true),
  profile: UserProfilePublicSchema,
});

export const ProfileUpdateResponseSchema = z.object({
  success: z.literal(true),
  profile: UserProfileSchema,
  updatedAt: z.string().datetime(),
});

export type ProfileResponseSchemaType = z.infer<typeof ProfileResponseSchema>;
export type ProfilePublicResponseSchemaType = z.infer<typeof ProfilePublicResponseSchema>;
export type ProfileUpdateResponseSchemaType = z.infer<typeof ProfileUpdateResponseSchema>;
