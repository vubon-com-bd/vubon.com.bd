import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';
import { VendorTeamMemberSchema } from './vendor-team-member.schema';

const vendorTeamStatusKeys = Object.keys(VENDOR_TEAM.STATUS) as [string, ...string[]];

export const VendorTeamSchema = BaseSchema.extend({
  teamId: z.string().uuid(),
  vendorId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(vendorTeamStatusKeys),
  members: z.array(VendorTeamMemberSchema),
  memberCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
