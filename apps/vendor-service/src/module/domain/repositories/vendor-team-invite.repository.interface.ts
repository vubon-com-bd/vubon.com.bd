/**
 * VendorTeamInviteRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorTeamInviteEntity } from '../entities/vendor-team-invite.entity.js';
import { TeamInviteTokenVO } from '../value-objects/primitives/team-invite-token.vo.js';
import { TeamInviteStatusVO } from '../value-objects/primitives/team-invite-status.vo.js';
import { MemberEmailVO } from '../value-objects/primitives/member-email.vo.js';

export const VENDOR_TEAM_INVITE_REPOSITORY = Symbol('VENDOR_TEAM_INVITE_REPOSITORY');

export interface VendorTeamInviteRepository extends BaseRepository<VendorTeamInviteEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorTeamInviteEntity[]>;
  findByToken(token: TeamInviteTokenVO): Promise<VendorTeamInviteEntity | null>;
  findByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<readonly VendorTeamInviteEntity[]>;
  findByEmail(email: MemberEmailVO): Promise<readonly VendorTeamInviteEntity[]>;
  findByStatus(status: TeamInviteStatusVO): Promise<readonly VendorTeamInviteEntity[]>;

  /** Pending invites for a vendor. */
  findPendingByVendorId(vendorId: string): Promise<readonly VendorTeamInviteEntity[]>;
  /** All pending invites past expiry. */
  findExpiredPending(): Promise<readonly VendorTeamInviteEntity[]>;

  existsByToken(token: TeamInviteTokenVO): Promise<boolean>;
  countPendingByVendorId(vendorId: string): Promise<number>;
  /** Invites sent to a vendor in the last 24h (rate limiting). */
  countRecentByVendorId(vendorId: string, hours: number): Promise<number>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
