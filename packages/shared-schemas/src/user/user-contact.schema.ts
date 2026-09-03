/**
 * User Contact Schema
 * ইউজার কন্টাক্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_CONTACT } from '@vubon/shared-constants';
import { REGEX } from '@vubon/shared-constants';

// Contact type enum
export const ContactTypeSchema = z.enum([
  USER_CONTACT.TYPES.EMAIL,
  USER_CONTACT.TYPES.PHONE,
  USER_CONTACT.TYPES.MOBILE,
  USER_CONTACT.TYPES.WHATSAPP,
  USER_CONTACT.TYPES.VIBER,
  USER_CONTACT.TYPES.TELEGRAM,
  USER_CONTACT.TYPES.MESSENGER,
  USER_CONTACT.TYPES.SOCIAL,
  USER_CONTACT.TYPES.WEBSITE,
  USER_CONTACT.TYPES.OTHER,
]);

// Base contact schema without refine
const UserContactBaseSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: ContactTypeSchema,
  value: z.string().min(1, 'Contact value is required'),
  label: z.string().optional(),
  isPrimary: z.boolean().default(USER_CONTACT.DEFAULTS.IS_PRIMARY),
  isVerified: z.boolean().default(USER_CONTACT.DEFAULTS.IS_VERIFIED),
  visibility: z
    .enum([
      USER_CONTACT.VISIBILITY.PUBLIC,
      USER_CONTACT.VISIBILITY.PRIVATE,
      USER_CONTACT.VISIBILITY.CONTACTS,
      USER_CONTACT.VISIBILITY.FRIENDS,
    ])
    .default(USER_CONTACT.DEFAULTS.VISIBILITY),
  metadata: z.record(z.unknown()).optional(),
});

// UserContactSchema with refine
export const UserContactSchema = UserContactBaseSchema.refine(
  (data) => {
    // REGEX ব্যবহার করে ভ্যালিডেশন
    if (data.type === 'email') {
      return REGEX.EMAIL.test(data.value);
    }
    if (
      data.type === 'phone' ||
      data.type === 'mobile' ||
      data.type === 'whatsapp' ||
      data.type === 'viber' ||
      data.type === 'telegram'
    ) {
      return REGEX.PHONE.test(data.value);
    }
    if (data.type === 'website') {
      return REGEX.URL.test(data.value);
    }
    return true;
  },
  {
    message: 'Invalid contact value format for the selected type',
    path: ['value'],
  }
);

export const UserContactCreateSchema = UserContactBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const UserContactUpdateSchema = UserContactBaseSchema.partial();

export const UserContactSocialSchema = UserContactBaseSchema.extend({
  platform: z.enum([
    USER_CONTACT.SOCIAL_PLATFORMS.FACEBOOK,
    USER_CONTACT.SOCIAL_PLATFORMS.TWITTER,
    USER_CONTACT.SOCIAL_PLATFORMS.INSTAGRAM,
    USER_CONTACT.SOCIAL_PLATFORMS.LINKEDIN,
    USER_CONTACT.SOCIAL_PLATFORMS.GITHUB,
    USER_CONTACT.SOCIAL_PLATFORMS.YOUTUBE,
    USER_CONTACT.SOCIAL_PLATFORMS.TIKTOK,
    USER_CONTACT.SOCIAL_PLATFORMS.SNAPCHAT,
    USER_CONTACT.SOCIAL_PLATFORMS.PINTEREST,
    USER_CONTACT.SOCIAL_PLATFORMS.REDDIT,
    USER_CONTACT.SOCIAL_PLATFORMS.WHATSAPP,
    USER_CONTACT.SOCIAL_PLATFORMS.TELEGRAM,
    USER_CONTACT.SOCIAL_PLATFORMS.VIBER,
    USER_CONTACT.SOCIAL_PLATFORMS.IMO,
    USER_CONTACT.SOCIAL_PLATFORMS.MESSENGER,
  ]),
  profileUrl: z.string().url().optional(),
  username: z.string().optional(),
  followers: z.number().int().nonnegative().optional(),
  following: z.number().int().nonnegative().optional(),
});

export type UserContactSchemaType = z.infer<typeof UserContactSchema>;
export type UserContactCreateSchemaType = z.infer<typeof UserContactCreateSchema>;
export type UserContactUpdateSchemaType = z.infer<typeof UserContactUpdateSchema>;
export type UserContactSocialSchemaType = z.infer<typeof UserContactSocialSchema>;
