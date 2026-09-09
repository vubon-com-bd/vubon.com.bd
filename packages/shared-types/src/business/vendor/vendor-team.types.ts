import { BaseEntity } from '../../common/base.types';
import { VENDOR_TEAM } from '@vubon/shared-constants/src/business/vendor/vendor-team.constants';
import { Vendor } from './vendor.types';
import { VendorTeamMember } from './vendor-team-member.types';

export interface VendorTeam extends BaseEntity {
  teamId: string;
  vendorId: string;
  vendor: Vendor;
  name: string;
  description?: string;
  status: keyof typeof VENDOR_TEAM.STATUS | string;
  members: VendorTeamMember[];
  memberCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
