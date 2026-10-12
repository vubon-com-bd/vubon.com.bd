/**
 * VendorTeamMemberRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorTeamMemberEntity } from '../entities/vendor-team-member.entity.js';
import { TeamMemberStatusVO } from '../value-objects/primitives/team-member-status.vo.js';
import { MemberRoleVO } from '../value-objects/primitives/member-role.vo.js';
import { MemberEmailVO } from '../value-objects/primitives/member-email.vo.js';

export const VENDOR_TEAM_MEMBER_REPOSITORY = Symbol('VENDOR_TEAM_MEMBER_REPOSITORY');

export interface TeamRoleCount {
  readonly role: string;
  readonly count: number;
}

export interface VendorTeamMemberRepository extends BaseRepository<VendorTeamMemberEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorTeamMemberEntity[]>;
  findByVendorIdAndUserId(vendorId: string, userId: string): Promise<VendorTeamMemberEntity | null>;
  findByUserId(userId: string): Promise<readonly VendorTeamMemberEntity[]>;
  findByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<VendorTeamMemberEntity | null>;
  findByVendorIdAndRole(vendorId: string, role: MemberRoleVO): Promise<readonly VendorTeamMemberEntity[]>;
  findByVendorIdAndStatus(vendorId: string, status: TeamMemberStatusVO): Promise<readonly VendorTeamMemberEntity[]>;

  /** Find vendor's owner. */
  findOwner(vendorId: string): Promise<VendorTeamMemberEntity | null>;
  /** Find active members only. */
  findActive(vendorId: string): Promise<readonly VendorTeamMemberEntity[]>;

  countByVendor(vendorId: string): Promise<number>;
  countActiveByVendor(vendorId: string): Promise<number>;
  countOwnersByVendor(vendorId: string): Promise<number>;
  getRoleCounts(vendorId: string): Promise<readonly TeamRoleCount[]>;

  existsByVendorIdAndUserId(vendorId: string, userId: string): Promise<boolean>;
  existsByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<boolean>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
