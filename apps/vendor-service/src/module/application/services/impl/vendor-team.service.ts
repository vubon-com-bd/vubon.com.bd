/**
 * VendorTeamService — team member management
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_TEAM_REPOSITORY,
  type VendorTeamRepository,
  type VendorTeamListFilter,
} from '../../../domain/repositories/vendor-team.repository.interface.js';
import { VendorTeamEntity } from '../../../domain/entities/vendor-team.entity.js';
import { VendorTeamVO } from '../../../domain/value-objects/composites/vendor-team.vo.js';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { TeamRoleVO } from '../../../domain/value-objects/primitives/team-role.vo.js';
import { TeamPermissionService } from '../../../domain/services/team-permission.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { TeamMapper } from '../../mappers/team.mapper.js';
import {
  VendorNotFoundApplicationError,
  VendorValidationError,
} from '../../errors/vendor.errors.js';
import {
  TeamMemberAlreadyExistsApplicationError,
  TeamMemberLimitExceededApplicationError,
  CannotRemoveLastOwnerApplicationError,
} from '../../errors/team.errors.js';
import type {
  AddTeamMemberCommandDTO,
  UpdateTeamMemberRequestDTO,
  RemoveTeamMemberRequestDTO,
  AssignRoleRequestDTO,
} from '../../dtos/requests/team/index.js';
import type {
  TeamMemberResponseDTO,
  TeamMemberSummaryResponseDTO,
  TeamListResponseDTO,
  TeamInviteResponseDTO,
  TeamMemberStatsResponseDTO,
} from '../../dtos/responses/team-response.dto.js';
import type {
  IVendorTeamService,
  TeamListOptionsDTO,
} from '../interfaces/vendor-team.service.interface.js';

@Injectable()
export class VendorTeamService implements IVendorTeamService {
  private readonly logger = new Logger(VendorTeamService.name);

  constructor(
    @Inject(VENDOR_TEAM_REPOSITORY)
    private readonly repo: VendorTeamRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async invite(dto: AddTeamMemberCommandDTO, actorId: string): Promise<TeamInviteResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Duplicate check ───
    const existing = await this.repo.findByUserAndVendor(dto.email, dto.vendorId);
    if (existing) {
      throw new TeamMemberAlreadyExistsApplicationError(dto.vendorId, dto.email);
    }

    // ─── Limit check ───
    const count = await this.repo.countByVendor(VendorIdVO.create(dto.vendorId));
    if (count >= 50) {
      throw new TeamMemberLimitExceededApplicationError(dto.vendorId, 50);
    }

    const vo = VendorTeamVO.create({
      id: TeamMemberIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      userId: UserIdVO.create(randomUUID()),
      role: TeamRoleVO.create(dto.role),
      status: 'invited',
      inviteStatus: 'pending',
      email: dto.email,
      fullName: dto.email.split('@')[0] ?? 'Invited Member',
      permissions: [],
      invitedAt: now,
      invitedBy: actorId,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorTeamEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    this.logger.log(`Team invite ${saved.id} sent to ${dto.email} for vendor ${dto.vendorId}`);

    return {
      success: true,
      inviteId: saved.id,
      email: dto.email,
      role: dto.role,
      expiresAt,
    };
  }

  async acceptInvite(_token: string, userId: string): Promise<TeamMemberResponseDTO> {
    // Real impl would look up by token — simplified here
    void _token;
    const all = await this.repo.findByUser(UserIdVO.create(userId));
    if (all.length === 0) throw new VendorNotFoundApplicationError(userId);
    const entity = all[0]!;
    entity.acceptInvite();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return TeamMapper.toResponse(saved as never);
  }

  async rejectInvite(_token: string, userId: string, reason?: string): Promise<{ readonly success: true }> {
    void _token;
    const all = await this.repo.findByUser(UserIdVO.create(userId));
    if (all.length === 0) throw new VendorNotFoundApplicationError(userId);
    const entity = all[0]!;
    entity.rejectInvite(reason);
    await this.repo.save(entity);
    return { success: true };
  }

  async update(dto: UpdateTeamMemberRequestDTO, _actorId: string): Promise<TeamMemberResponseDTO> {
    const entity = await this.load(dto.memberId);
    if (dto.permissions) {
      entity.updatePermissions(dto.permissions, []);
    }
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return TeamMapper.toResponse(saved as never);
  }

  async remove(dto: RemoveTeamMemberRequestDTO, actorId: string): Promise<{ readonly success: true }> {
    const entity = await this.load(dto.memberId);
    const remainingOwners = await this.countOwners(entity.vendorId.value);
    TeamPermissionService.assertNotLastOwner(entity.isOwner(), remainingOwners);
    entity.remove(actorId, dto.reason);
    await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(entity as never);
    this.logger.log(`Team member ${dto.memberId} removed from vendor ${entity.vendorId.value}`);
    return { success: true };
  }

  async assignRole(dto: AssignRoleRequestDTO, _actorId: string): Promise<TeamMemberResponseDTO> {
    const entity = await this.load(dto.memberId);
    const newRole = TeamRoleVO.create(dto.role);
    const remainingOwners = await this.countOwners(entity.vendorId.value);
    const check = TeamPermissionService.canChangeRole(entity.role, newRole, remainingOwners);
    if (!check.allowed) {
      throw new CannotRemoveLastOwnerApplicationError(entity.vendorId.value);
    }
    entity.changeRole(newRole);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return TeamMapper.toResponse(saved as never);
  }

  async suspend(memberId: string, reason: string, actorId: string): Promise<TeamMemberResponseDTO> {
    const entity = await this.load(memberId);
    entity.suspend(actorId, reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return TeamMapper.toResponse(saved as never);
  }

  async reactivate(memberId: string, actorId: string): Promise<TeamMemberResponseDTO> {
    const entity = await this.load(memberId);
    entity.reactivate(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return TeamMapper.toResponse(saved as never);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<TeamMemberResponseDTO> {
    const entity = await this.load(id);
    return TeamMapper.toResponse(entity);
  }

  async listByVendor(vendorId: string, options?: TeamListOptionsDTO): Promise<TeamListResponseDTO> {
    const all = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    void options;
    const active = all.filter((m) => m.isActive()).length;
    return TeamMapper.toListResponse(all as never, active);
  }

  async getOwner(vendorId: string): Promise<TeamMemberResponseDTO | null> {
    const entity = await this.repo.findOwner(VendorIdVO.create(vendorId));
    return entity ? TeamMapper.toResponse(entity as never) : null;
  }

  async listPendingInvites(vendorId: string): Promise<readonly TeamMemberSummaryResponseDTO[]> {
    const entities = await this.repo.findPendingInvites(VendorIdVO.create(vendorId));
    return entities.map((e) => TeamMapper.toSummary(e as never));
  }

  async getStats(vendorId: string): Promise<TeamMemberStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      active: stats.active,
      invited: stats.invited,
      suspended: stats.suspended,
      removed: stats.removed,
      byRole: stats.byRole,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<VendorTeamEntity> {
    const vo = TeamMemberIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }

  private async countOwners(vendorId: string): Promise<number> {
    const owners = await this.repo.findByVendorAndRole(VendorIdVO.create(vendorId), 'vendor_owner');
    return owners.filter((o) => o.isActive()).length;
  }
}
