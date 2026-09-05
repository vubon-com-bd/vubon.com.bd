/**
 * Share Validator
 * শেয়ার ভ্যালিডেটর
 */

import { z } from 'zod';
import type { FlashSaleShare } from '@vubon/shared-types';

// Share schema definition
export const FlashSaleShareSchema = z.object({
  id: z.string().uuid().optional(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  platform: z.enum([
    'facebook',
    'twitter',
    'linkedin',
    'whatsapp',
    'telegram',
    'email',
    'copy_link',
    'other',
  ]),
  shareUrl: z.string().url('Invalid share URL'),
  shareCode: z.string().min(1, 'Share code is required'),
  clicks: z.number().int().min(0).default(0),
  conversions: z.number().int().min(0).default(0),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  sharedAt: z.date().default(() => new Date()),
  lastClickedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export interface ShareValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleShare;
}

export const validateShare = (data: unknown): ShareValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid share data'] },
    };
  }

  const share = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!share.flashSaleId || typeof share.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // User ID validation
  if (!share.userId || typeof share.userId !== 'string') {
    errors.userId = ['User ID is required'];
    valid = false;
  }

  // Platform validation
  if (share.platform) {
    const validPlatforms = [
      'facebook',
      'twitter',
      'linkedin',
      'whatsapp',
      'telegram',
      'email',
      'copy_link',
      'other',
    ];
    if (!validPlatforms.includes(share.platform as string)) {
      errors.platform = ['Invalid platform'];
      valid = false;
    }
  } else {
    errors.platform = ['Platform is required'];
    valid = false;
  }

  // Share URL validation
  if (!share.shareUrl || typeof share.shareUrl !== 'string') {
    errors.shareUrl = ['Share URL is required'];
    valid = false;
  } else {
    try {
      new URL(share.shareUrl as string);
    } catch {
      errors.shareUrl = ['Invalid share URL'];
      valid = false;
    }
  }

  // Share code validation
  if (!share.shareCode || typeof share.shareCode !== 'string' || share.shareCode.length < 1) {
    errors.shareCode = ['Share code is required'];
    valid = false;
  }

  try {
    const validatedData = FlashSaleShareSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as FlashSaleShare,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      const issues =
        (zodError as { issues?: Array<{ path?: (string | number)[]; message?: string }> }).issues ||
        [];
      for (const issue of issues) {
        const path = issue.path?.join('.') || 'unknown';
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message || 'Validation error');
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

export const validateShareCreate = (data: unknown): ShareValidationResult => {
  return validateShare(data);
};

export const validateShareUpdate = (data: unknown): ShareValidationResult => {
  return validateShare(data);
};
