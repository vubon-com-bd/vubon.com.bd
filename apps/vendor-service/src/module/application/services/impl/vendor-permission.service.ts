/**
 * VendorPermissionService — permission resolution
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_PERMISSION_REPOSITORY,
  type VendorPermissionRepository,
} from '../../../domain/repositories/vendor-permission.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo.js';
import { TeamPermissionService } from '../../../domain/services/team-permission.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PermissionMapper } from '../../mappers/permission.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  IVendorPermissionService,
  PermissionDTO,
  PermissionCheckResultDTO,
} from '../interfaces/vendor-permission.service.interface.js';

@Injectable()
export class VendorPermissionService implements IVendorPermissionService {
  private readonly logger = new Logger(VendorPermissionService.name);

  constructor(
    @Inject(VENDOR_PERMISSION_REPOSITORY)
    private readonly repo: VendorPermissionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async grant(memberId: string, permission: string, _actorId: string): Promise<PermissionDTO> {
    const entity = await this.load(memberId);
    entity.grantPermission(permission);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Permission "${permission}" granted to member ${memberId}`);
    return PermissionMapper.toResponse(saved as never);
  }

  async revoke(memberId: string, permission: string, _actorId: string): Promise<PermissionDTO> {
    const entity = await this.load(memberId);
    entity.revokePermission(permission);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return PermissionMapper.toResponse(saved as never);
  }

  async removeDenial(memberId: string, permission: string, _actorId: string): Promise<PermissionDTO> {
    const entity = await this.load(memberId);
    entity.removeDenial(permission);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return PermissionMapper.toResponse(saved as never);
  }

  async check(memberId: string, permission: string): Promise<PermissionCheckResultDTO> {
    const entity = await this.load(memberId);
    const result = TeamPermissionService.check(
      {
        role: entity.role,
        overrides: entity.overrides,
        denials: entity.denials,
      },
      permission,
    );
    return {
      granted: result.granted,
      reason: result.reason,
      source: result.source,
    };
  }

  async hasPermission(memberId: string, permission: string): Promise<boolean> {
    const entity = await this.load(memberId);
    return entity.hasPermission(permission);
  }

  async getByMember(memberId: string): Promise<PermissionDTO | null> {
    const entity = await this.repo.findByMember(TeamMemberIdVO.create(memberId));
    return entity ? PermissionMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string): Promise<readonly PermissionDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => PermissionMapper.toResponse(e as never));
  }

  async getEffectivePermissions(memberId: string): Promise<readonly string[]> {
    const entity = await this.load(memberId);
    return entity.effectivePermissions;
  }

  async groupByNamespace(memberId: string): Promise<Readonly<Record<string, readonly string[]>>> {
    const entity = await this.load(memberId);
    return TeamPermissionService.groupByNamespace(entity.effectivePermissions);
  }

  private async load(memberId: string) {
    const vo = TeamMemberIdVO.create(memberId);
    const entity = await this.repo.findByMember(vo);
    if (!entity) throw new VendorNotFoundApplicationError(memberId);
    return entity;
  }
}
