/**
 * Payment Permission Schema
 * পেমেন্ট পারমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PERMISSIONS } from '@vubon/shared-constants';

// PERMISSIONS থেকে সমস্ত পারমিশন নাম বের করা
const permissionNames = Object.keys(PERMISSIONS) as [string, ...string[]];

export const PaymentPermissionSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  permission: z.enum(permissionNames),
  isGranted: z.boolean().default(true),
  grantedAt: z.date().default(() => new Date()),
  grantedBy: z.string().uuid(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const PaymentPermissionCreateSchema = PaymentPermissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentPermissionUpdateSchema = PaymentPermissionCreateSchema.partial();

export type PaymentPermission = z.infer<typeof PaymentPermissionSchema>;
export type PaymentPermissionCreate = z.infer<typeof PaymentPermissionCreateSchema>;
export type PaymentPermissionUpdate = z.infer<typeof PaymentPermissionUpdateSchema>;
