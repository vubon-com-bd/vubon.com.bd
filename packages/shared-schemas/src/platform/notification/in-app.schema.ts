/**
 * In-App Notification Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/in-app.constants থেকে।
 */

import { z } from 'zod';
import { IN_APP_TYPE, IN_APP_POSITION, IN_APP_STATUS } from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const InAppTypeSchema = z.enum(Object.values(IN_APP_TYPE) as [string, ...string[]]);

export const InAppPositionSchema = z.enum(Object.values(IN_APP_POSITION) as [string, ...string[]]);

export const InAppStatusSchema = z.enum(Object.values(IN_APP_STATUS) as [string, ...string[]]);

export const InAppActionSchema = z.object({
  id: z.string().min(1).max(50),
  label: z.string().min(1).max(50),
  url: z.string().url().optional(),
  action: z.string().max(50).optional(),
});

export const InAppNotificationSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  type: InAppTypeSchema,
  position: InAppPositionSchema.optional(),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
  actions: z.array(InAppActionSchema).max(2).optional(),
  status: InAppStatusSchema,
  displayDurationSeconds: z.number().int().positive().max(60).optional(),
  autoDismiss: z.boolean(),
  readAt: z.string().datetime().optional(),
  dismissedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type InAppTypeSchemaType = z.infer<typeof InAppTypeSchema>;
export type InAppPositionSchemaType = z.infer<typeof InAppPositionSchema>;
export type InAppStatusSchemaType = z.infer<typeof InAppStatusSchema>;
export type InAppNotificationSchemaType = z.infer<typeof InAppNotificationSchema>;
