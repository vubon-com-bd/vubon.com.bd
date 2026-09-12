import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { NameSchema } from '../common/name.schema';
import { AddressSchema } from '../common/address.schema';
import { USER_PROFILE } from '@vubon/shared-constants/src/user/user-profile.constants';

const userProfileValues = Object.values(USER_PROFILE) as [string, ...string[]];

/** Profile bio max length — matches the client-side textarea limit. */
const BIO_MAX_LENGTH = 500;

export const UserProfileSchema = BaseSchema.extend({
  profileId: z.string().uuid(),
  userId: z.string().uuid(),
  name: NameSchema,
  address: AddressSchema.optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(BIO_MAX_LENGTH).optional(),
  website: z.string().url().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
  visibility: z.enum(userProfileValues),
  metadata: z.record(z.unknown()).optional(),
});
