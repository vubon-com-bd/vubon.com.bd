import type { VendorTeamEntity } from '../../../domain/entities/vendor-team.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';

export interface VendorTeamServiceInterface {
  findById(id: TeamMemberIdVO): Promise<VendorTeamEntity | null>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorTeamEntity[]>;
  save(member: VendorTeamEntity): Promise<void>;
}
