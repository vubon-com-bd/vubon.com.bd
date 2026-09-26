import { Injectable } from '@nestjs/common';
import { VendorTeamEntity } from '../../../domain/entities/vendor-team.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';

@Injectable()
export class VendorTeamService {
  constructor(private readonly repo: VendorTeamRepository) {}

  async findById(id: TeamMemberIdVO): Promise<VendorTeamEntity | null> {
    return this.repo.findById(id);
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorTeamEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(member: VendorTeamEntity): Promise<void> {
    await this.repo.save(member);
  }
}
