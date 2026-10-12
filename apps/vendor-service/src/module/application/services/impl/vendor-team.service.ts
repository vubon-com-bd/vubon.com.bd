/**
 * VendorTeamService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_TEAM_MEMBER_REPOSITORY,
  type VendorTeamMemberRepository,
} from '../../../domain/repositories/vendor-team-member.repository.interface.js';
import {
  VENDOR_TEAM_INVITE_REPOSITORY,
  type VendorTeamInviteRepository,
} from '../../../domain/repositories/vendor-team-invite.repository.interface.js';
import { VendorTeamMemberEntity } from '../../../domain/entities/vendor-team-member.entity.js';
import { VendorTeamInviteEntity } from '../../../domain/entities/vendor-team-invite.entity.js';
import { MemberEmailVO } from '../../../domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../domain/value-objects/primitives/team-invite-token.vo.js';
import { InviteExpiryVO } from '../../../domain/value-objects/primitives/invite-expiry.vo.js';
import { VendorTeamMemberMapper } from '../../mappers/vendor-team-member.mapper.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../interfaces/vendor-team.service.interface.js';
import type { InviteTeamMemberRequestDto } from '../../dtos/requests/invite-team-member.dto.js';
import type { AcceptTeamInviteRequestDto } from '../../dtos/requests/accept-team-invite.dto.js';
import type {
  VendorTeamMemberResponseDto,
  VendorTeamMemberPublicDto,
} from '../../dtos/responses/vendor-team-member-response.dto.js';
import {
  TeamMemberNotFoundError,
  TeamMemberAlreadyExistsError,
  CannotRemoveOwnerError,
} from '../../errors/team.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorTeamService implements IVendorTeamService {
  constructor(
    @Inject(VENDOR_TEAM_MEMBER_REPOSITORY)
    private readonly memberRepo: VendorTeamMemberRepository,
    @Inject(VENDOR_TEAM_INVITE_REPOSITORY)
    private readonly inviteRepo: VendorTeamInviteRepository,
  ) {}

  async invite(dto: InviteTeamMemberRequestDto, _actorId?: string) {
    const email = MemberEmailVO.create(dto.email);
    const exists = await this.memberRepo.existsByVendorIdAndEmail(dto.vendorId, email);
    if (exists) throw new TeamMemberAlreadyExistsError(dto.email, dto.vendorId);

    const now = new Date().toISOString();
    const token = TeamInviteTokenVO.create(VendorIdGeneratorService.generateInviteToken());
    const expiry = InviteExpiryVO.defaultExpiry();

    const invite = VendorTeamInviteEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: dto.vendorId,
      email,
      role: MemberRoleVO.create(dto.role),
      token,
      invitedBy: dto.invitedBy,
      expiresAt: expiry,
      message: dto.message,
      now,
    });

    const saved = await this.inviteRepo.save(invite);
    return {
      inviteId: saved.id,
      email: saved.email.value,
      expiresAt: saved.expiresAt.value,
    };
  }

  async acceptInvite(dto: AcceptTeamInviteRequestDto, _actorId?: string): Promise<VendorTeamMemberResponseDto> {
    const token = TeamInviteTokenVO.create(dto.token);
    const invite = await this.inviteRepo.findByToken(token);
    if (!invite) {
      throw new Error(`Invite with provided token not found`);
    }

    const now = new Date().toISOString();
    invite.accept(dto.userId, now);

    const member = VendorTeamMemberEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      now,
      props: {
        vendorId: invite.vendorId,
        userId: dto.userId,
        email: invite.email,
        name: MemberNameVO.create(dto.name),
        role: invite.role,
        invitedBy: invite.invitedBy,
      },
    });

    await this.inviteRepo.save(invite);
    const saved = await this.memberRepo.save(member);
    return VendorTeamMemberMapper.toResponse(saved);
  }

  async removeMember(vendorId: string, memberId: string, _actorId?: string): Promise<void> {
    const member = await this.requireMember(vendorId, memberId);
    if (member.isOwner()) throw new CannotRemoveOwnerError(vendorId);
    member.remove(new Date().toISOString());
    await this.memberRepo.save(member);
  }

  async changeRole(vendorId: string, memberId: string, newRole: string, _actorId?: string): Promise<VendorTeamMemberResponseDto> {
    const member = await this.requireMember(vendorId, memberId);
    member.changeRole(MemberRoleVO.create(newRole), new Date().toISOString());
    const saved = await this.memberRepo.save(member);
    return VendorTeamMemberMapper.toResponse(saved);
  }

  async suspendMember(vendorId: string, memberId: string, _actorId?: string): Promise<VendorTeamMemberResponseDto> {
    const member = await this.requireMember(vendorId, memberId);
    member.suspend(new Date().toISOString());
    const saved = await this.memberRepo.save(member);
    return VendorTeamMemberMapper.toResponse(saved);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorTeamMemberPublicDto[]> {
    const members = await this.memberRepo.findByVendorId(vendorId);
    return VendorTeamMemberMapper.toPublicList(members);
  }

  async getMember(vendorId: string, memberId: string): Promise<VendorTeamMemberResponseDto> {
    const member = await this.requireMember(vendorId, memberId);
    return VendorTeamMemberMapper.toResponse(member);
  }

  private async requireMember(vendorId: string, memberId: string): Promise<VendorTeamMemberEntity> {
    const member = await this.memberRepo.findById(memberId);
    if (!member || member.vendorId !== vendorId) {
      throw new TeamMemberNotFoundError(memberId);
    }
    return member;
  }
}
