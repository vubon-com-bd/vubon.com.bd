import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';
import { Vendor } from './vendor.types';
import { VendorTeam } from './vendor-team.types';

export interface VendorTeamMember extends BaseEntity {
  memberId: string;
  teamId: string;
  team: VendorTeam;
  vendorId: string;
  vendor: Vendor;
  userId: string;
  user: User;
  role: keyof typeof VENDOR_TEAM.ROLES | string;
  permissions: string[];
  status: keyof typeof VENDOR_TEAM.STATUS | string;
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
