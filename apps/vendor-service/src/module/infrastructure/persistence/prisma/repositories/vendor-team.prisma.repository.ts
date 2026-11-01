/**
 * VendorTeamPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorTeamRepository,
  VendorTeamListOptions,
  VendorTeamPaginationResult,
} from '../../../../domain/repositories/vendor-team.repository.interface.js';
import { VendorTeamEntity } from '../../../../domain/entities/vendor-team.entity.js';
import { TeamMemberIdVO } from '../../../../domain/value-objects/primitives/team-member-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorTeamPrismaMapper,
  type VendorTeamPrismaRow,
} from '../mappers/vendor-team.prisma.mapper.js';

interface TeamDelegate {
  findFirst(args: unknown): Promise<VendorTeamPrismaRow | null>;
  findMany(args: unknown): Promise<VendorTeamPrismaRow[]>;
  create(args: unknown): Promise<VendorTeamPrismaRow>;
  update(args: unknown): Promise<VendorTeamPrismaRow>;
  delete(args: unknown): Promise<VendorTeamPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorTeamPrismaRepository implements VendorTeamRepository {
  private readonly logger = new Logger(VendorTeamPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): TeamDelegate {
    return this.prisma.getModel<TeamDelegate>('vendorTeamMember');
  }

  async findById(id: string): Promise<VendorTeamEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorTeamPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: TeamMemberIdVO): Promise<VendorTeamEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorTeamEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { joinedAt: 'desc' },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorTeamEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, status, deletedAt: null },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findByVendorAndRole(
    vendorId: VendorIdVO | string,
    role: string,
  ): Promise<readonly VendorTeamEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, role, deletedAt: null },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findByUser(userId: UserIdVO | string): Promise<readonly VendorTeamEntity[]> {
    const idStr = typeof userId === 'string' ? userId : userId.value;
    const rows = await this.delegate.findMany({
      where: { userId: idStr, deletedAt: null },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findByUserAndVendor(userId: string, vendorId: string): Promise<VendorTeamEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId, vendorId, deletedAt: null },
    });
    return raw ? VendorTeamPrismaMapper.toDomain(raw) : null;
  }

  async findOwner(vendorId: VendorIdVO | string): Promise<VendorTeamEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, role: 'vendor_owner', deletedAt: null },
    });
    return raw ? VendorTeamPrismaMapper.toDomain(raw) : null;
  }

  async findActiveByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorTeamEntity[]> {
    return this.findByVendorAndStatus(vendorId, 'active');
  }

  async findPendingInvites(vendorId: VendorIdVO | string): Promise<readonly VendorTeamEntity[]> {
    return this.findByVendorAndStatus(vendorId, 'invited');
  }

  async findExpiredInvites(): Promise<readonly VendorTeamEntity[]> {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'invited',
        invitedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findStaleMembers(inactiveDays: number): Promise<readonly VendorTeamEntity[]> {
    const cutoff = new Date(Date.now() - inactiveDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        lastActiveAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorTeamEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorTeamPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { userId, vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorTeamEntity): Promise<VendorTeamEntity> {
    const data = VendorTeamPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorTeamPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorTeamPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorTeamListOptions): Promise<VendorTeamPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.userId) where['userId'] = f.userId;
    if (f.role) where['role'] = Array.isArray(f.role) ? { in: f.role } : f.role;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.isOwner === true) where['role'] = 'vendor_owner';

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
      items: rows.map(VendorTeamPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, deletedAt: null } });
  }

  async countActiveByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, status: 'active', deletedAt: null } });
  }

  async getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly invited: number;
    readonly suspended: number;
    readonly removed: number;
    readonly byRole: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, role: true },
    } as never) as Array<{ status: string; role: string }>;

    const byRole: Record<string, number> = {};
    let active = 0;
    let invited = 0;
    let suspended = 0;
    let removed = 0;
    for (const r of rows) {
      byRole[r.role] = (byRole[r.role] ?? 0) + 1;
      if (r.status === 'active') active += 1;
      else if (r.status === 'invited') invited += 1;
      else if (r.status === 'suspended') suspended += 1;
      else if (r.status === 'removed') removed += 1;
    }

    return { total: rows.length, active, invited, suspended, removed, byRole };
  }
}
