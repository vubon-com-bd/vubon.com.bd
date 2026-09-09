import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { NameSchema } from '../common/name.schema';
import { AddressSchema } from '../common/address.schema';
import { USER_PROFILE } from '@vubon/shared-constants/src/user/user-profile.constants';

const userProfileKeys = Object.keys(USER_PROFILE) as [string, ...string[]];

export const UserProfileSchema = BaseSchema.extend({
  profileId: z.string().uuid(),
  userId: z.string().uuid(),
  name: NameSchema,
  address: AddressSchema.optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
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
  visibility: z.enum(userProfileKeys),
  metadata: z.record(z.unknown()).optional(),
});
