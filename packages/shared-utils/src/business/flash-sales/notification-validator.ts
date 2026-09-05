/**
 * Notification Validator
 * নোটিফিকেশন ভ্যালিডেটর
 */

import { z } from 'zod';
import type { FlashSaleNotification } from '@vubon/shared-types';

// Notification schema definition using Zod directly with Zod 4.x syntax
export const FlashSaleNotificationSchema = z.object({
  flashSaleId: z.string().uuid(),
  type: z.enum(['email', 'sms', 'push', 'in_app']),
  title: z.string().min(1, 'Title is required'),
  titleBangla: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  messageBangla: z.string().optional(),
  recipients: z.array(z.string()).min(1, 'At least one recipient is required'),
  status: z.enum(['pending', 'sent', 'failed', 'cancelled']).default('pending'),
  scheduledAt: z.date().optional(),
  sentAt: z.date().optional(),
  failedAt: z.date().optional(),
  retryCount: z.number().int().min(0).default(0),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export interface NotificationValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleNotification;
}

export const validateNotification = (data: unknown): NotificationValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid notification data'] },
    };
  }

  const notification = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!notification.flashSaleId || typeof notification.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Type validation
  if (notification.type) {
    const validTypes = ['email', 'sms', 'push', 'in_app'];
    if (!validTypes.includes(notification.type as string)) {
      errors.type = ['Invalid notification type'];
      valid = false;
    }
  } else {
    errors.type = ['Notification type is required'];
    valid = false;
  }

  // Title validation
  if (
    !notification.title ||
    typeof notification.title !== 'string' ||
    notification.title.length < 1
  ) {
    errors.title = ['Notification title is required'];
    valid = false;
  }

  // Message validation
  if (
    !notification.message ||
    typeof notification.message !== 'string' ||
    notification.message.length < 1
  ) {
    errors.message = ['Notification message is required'];
    valid = false;
  }

  // Recipients validation
  if (
    !notification.recipients ||
    !Array.isArray(notification.recipients) ||
    notification.recipients.length === 0
  ) {
    errors.recipients = ['At least one recipient is required'];
    valid = false;
  }

  try {
    const validatedData = FlashSaleNotificationSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSaleNotification,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      const issues = (zodError as { issues?: unknown[] }).issues || [];
      for (const issue of issues) {
        const issueObj = issue as { path?: (string | number)[]; message?: string };
        const path = issueObj.path?.join('.') || 'unknown';
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issueObj.message || 'Validation error');
      }
    } else {
      const errorObj = error as { message?: string };
      errors._global = [errorObj.message || 'Unknown validation error'];
    }
    return {
      valid,
      errors,
    };
  }
};

export const validateNotificationCreate = (data: unknown): NotificationValidationResult => {
  return validateNotification(data);
};

export const validateNotificationUpdate = (data: unknown): NotificationValidationResult => {
  return validateNotification(data);
};
