/**
 * VendorPermissionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 *
 * ⚠️ Backed by `vendor_team_members` (no dedicated permissions table yet).
 * Derived fields: role, permissions[] (from team member record).
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorPermissionRepository,
  VendorPermissionListOptions,
  VendorPermissionPaginationResult,
} from '../../../../domain/repositories/vendor-permission.repository.interface.js';
import { VendorPermissionEntity } from '../../../../domain/entities/vendor-permission.entity.js';
import { VendorPermissionVO } from '../../../../domain/value-objects/composites/vendor-permission.vo.js';
import { PermissionIdVO } from '../../../../domain/value-objects/primitives/permission-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { TeamMemberIdVO } from '../../../../domain/value-objects/primitives/team-member-id.vo.js';
import { TeamRoleVO } from '../../../../domain/value-objects/primitives/team-role.vo.js';
import { VendorPrismaService } from '../prisma.service.js';

interface TeamRow {
  id: string;
  vendorId: string;
  role: string;
  permissions: unknown;
  invitedAt: Date;
  invitedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamDelegate {
  findFirst(args: unknown): Promise<TeamRow | null>;
  findMany(args: unknown): Promise<TeamRow[]>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorPermissionPrismaRepository implements VendorPermissionRepository {
  private readonly logger = new Logger(VendorPermissionPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): TeamDelegate {
    return this.prisma.getModel<TeamDelegate>('vendorTeamMember');
  }

  private rowToEntity(raw: TeamRow): VendorPermissionEntity {
    const vo = VendorPermissionVO.reconstitute({
      id: PermissionIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      memberId: TeamMemberIdVO.reconstitute(raw.id),
      role: TeamRoleVO.reconstitute(raw.role),
      permissions: Array.isArray(raw.permissions) ? (raw.permissions as string[]) : [],
      overrides: [],
      denials: [],
      grantedAt: new Date(raw.invitedAt).toISOString(),
      grantedBy: raw.invitedBy ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorPermissionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      props: { vo },
    });
  }

  async findById(id: string): Promise<VendorPermissionEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id } });
    return raw ? this.rowToEntity(raw) : null;
  }

  async findByIdVO(id: PermissionIdVO): Promise<VendorPermissionEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorPermissionEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({ where: { vendorId: idStr } });
    return rows.map((r) => this.rowToEntity(r));
  }

  async findByMember(memberId: TeamMemberIdVO | string): Promise<VendorPermissionEntity | null> {
    const idStr = typeof memberId === 'string' ? memberId : memberId.value;
    const raw = await this.delegate.findFirst({ where: { id: idStr } });
    return raw ? this.rowToEntity(raw) : null;
  }

  async findWithPermission(permission: string): Promise<readonly VendorPermissionEntity[]> {
    const rows = await this.delegate.findMany({});
    return rows
      .map((r) => this.rowToEntity(r))
      .filter((e) => e.hasPermission(permission));
  }

  async findWithOverrides(): Promise<readonly VendorPermissionEntity[]> {
    return [];
  }

  async findWithDenials(): Promise<readonly VendorPermissionEntity[]> {
    return [];
  }

  async findByRole(role: string): Promise<readonly VendorPermissionEntity[]> {
    const rows = await this.delegate.findMany({ where: { role } });
    return rows.map((r) => this.rowToEntity(r));
  }

  async findAll(): Promise<readonly VendorPermissionEntity[]> {
    const rows = await this.delegate.findMany({});
    return rows.map((r) => this.rowToEntity(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async existsByMember(memberId: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id: memberId } });
    return count > 0;
  }

  async save(entity: VendorPermissionEntity): Promise<VendorPermissionEntity> {
    // Permissions live on team_members — save updates the team member's permissions JSON
    const vo = entity.vo;
    const self = this.prisma as unknown as Record<string, unknown>;
    const teamDelegate = self['vendorTeamMember'] as {
      update?: (args: unknown) => Promise<TeamRow>;
    } | undefined;

    if (teamDelegate?.update) {
      const updated = await teamDelegate.update({
        where: { id: vo.memberId.value },
        data: {
          permissions: [...vo.permissions],
          updatedAt: new Date(entity.updatedAt),
        },
      });
      return this.rowToEntity(updated);
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    // No-op: permissions are managed through team member lifecycle
    void id;
  }

  async findPaginated(options: VendorPermissionListOptions): Promise<VendorPermissionPaginationResult> {
    const where: Record<string, unknown> = {};
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.role) where['role'] = Array.isArray(f.role) ? { in: f.role } : f.role;

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map((r) => this.rowToEntity(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr } });
  }

  async getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly withOverrides: number;
    readonly withDenials: number;
    readonly averageEffectiveCount: number;
    readonly byRole: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = {};
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({ where });
    const entities = rows.map((r) => this.rowToEntity(r));

    const byRole: Record<string, number> = {};
    let totalEffective = 0;
    for (const e of entities) {
      byRole[e.role.value] = (byRole[e.role.value] ?? 0) + 1;
      totalEffective += e.effectiveCount;
    }

    return {
      total: entities.length,
      withOverrides: 0,
      withDenials: 0,
      averageEffectiveCount: entities.length
        ? Math.round((totalEffective / entities.length) * 10) / 10
        : 0,
      byRole,
    };
  }
}
