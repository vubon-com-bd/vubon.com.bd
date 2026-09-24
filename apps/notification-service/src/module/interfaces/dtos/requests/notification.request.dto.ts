import { z } from 'zod';
import {
  SendNotificationSchema,
  SendBulkSchema,
  ResendNotificationSchema,
  CancelNotificationSchema,
} from '../../../application/dtos/requests/notification';

export const NotificationRequestSchema = SendNotificationSchema;
export const NotificationBulkRequestSchema = SendBulkSchema;
export const NotificationResendRequestSchema = ResendNotificationSchema;
export const NotificationCancelRequestSchema = CancelNotificationSchema;

export type NotificationRequestDTO = z.infer<typeof NotificationRequestSchema>;
export type NotificationBulkRequestDTO = z.infer<typeof NotificationBulkRequestSchema>;
export type NotificationResendRequestDTO = z.infer<typeof NotificationResendRequestSchema>;
export type NotificationCancelRequestDTO = z.infer<typeof NotificationCancelRequestSchema>;
