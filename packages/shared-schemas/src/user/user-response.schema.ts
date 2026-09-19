/**
 * User Response Schema
 * @module shared-schemas/user/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { UserPublicSchema, UserSummarySchema } from './user.schema';

export const UserResponseSchema = z.object({
  success: z.literal(true),
  user: UserPublicSchema,
});

export const UserListResponseSchema = z.object({
  success: z.literal(true),
  users: z.array(UserSummarySchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const UserDeleteResponseSchema = z.object({
  success: z.literal(true),
  userId: UuidSchema,
  deletedAt: z.string().datetime(),
  message: z.string(),
});

export type UserResponseSchemaType = z.infer<typeof UserResponseSchema>;
export type UserListResponseSchemaType = z.infer<typeof UserListResponseSchema>;
export type UserDeleteResponseSchemaType = z.infer<typeof UserDeleteResponseSchema>;
