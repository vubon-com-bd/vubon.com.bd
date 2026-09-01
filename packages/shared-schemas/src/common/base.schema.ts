import { z } from 'zod';

/**
 * Base Schema
 * সকল স্কিমার বেস
 */
export const BaseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

/**
 * Base Schema with Status
 * স্ট্যাটাস সহ বেস স্কিমা
 */
export const BaseSchemaWithStatus = BaseSchema.extend({
  status: z.enum(['active', 'inactive', 'pending', 'deleted', 'suspended']),
});

/**
 * Base Schema with Soft Delete
 * সফট ডিলিট সহ বেস স্কিমা
 */
export const BaseSchemaWithSoftDelete = BaseSchema.extend({
  deletedAt: z.date().nullable(),
  isDeleted: z.boolean().default(false),
});

export type BaseSchemaType = z.infer<typeof BaseSchema>;
export type BaseSchemaWithStatusType = z.infer<typeof BaseSchemaWithStatus>;
export type BaseSchemaWithSoftDeleteType = z.infer<typeof BaseSchemaWithSoftDelete>;
