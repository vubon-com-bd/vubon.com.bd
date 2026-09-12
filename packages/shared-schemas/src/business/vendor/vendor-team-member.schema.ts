import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';

const vendorTeamRoleKeys = Object.keys(VENDOR_TEAM.ROLES) as [string, ...string[]];
const vendorTeamStatusKeys = Object.keys(VENDOR_TEAM.STATUS) as [string, ...string[]];

export const VendorTeamMemberSchema = BaseSchema.extend({
  memberId: z.string().uuid(),
  teamId: z.string().uuid(),
  vendorId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  role: z.enum(vendorTeamRoleKeys),
  permissions: z.array(z.string()),
  status: z.enum(vendorTeamStatusKeys),
  joinedAt: z.date(),
  leftAt: z.date().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
