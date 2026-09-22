import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorTeamEntity } from '../entities/vendor-team.entity';
import { TeamMemberIdVO } from '../value-objects/primitives/team-member-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface VendorTeamRepository
  extends BaseRepository<VendorTeamEntity, TeamMemberIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorTeamEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly VendorTeamEntity[]>;
  countByVendor(vendorId: VendorIdVO): Promise<number>;
}
