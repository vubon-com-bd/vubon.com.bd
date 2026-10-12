/**
 * VendorTeamMemberPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorTeamMemberRepository,
  TeamRoleCount,
} from '../../../../domain/repositories/vendor-team-member.repository.interface.js';
import { VendorTeamMemberEntity } from '../../../../domain/entities/vendor-team-member.entity.js';
import { TeamMemberStatusVO } from '../../../../domain/value-objects/primitives/team-member-status.vo.js';
import { MemberRoleVO } from '../../../../domain/value-objects/primitives/member-role.vo.js';
import { MemberEmailVO } from '../../../../domain/value-objects/primitives/member-email.vo.js';
import { VendorTeamMemberPrismaMapper } from '../mappers/vendor-team-member.prisma-mapper.js';

@Injectable()
export class VendorTeamMemberPrismaRepository implements VendorTeamMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorTeamMemberEntity | null> {
    const row = await this.prisma.vendorTeamMember.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorTeamMemberPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { deletedAt: null },
      orderBy: { joinedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { joinedAt: 'asc' },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async findByVendorIdAndUserId(vendorId: string, userId: string): Promise<VendorTeamMemberEntity | null> {
    const row = await this.prisma.vendorTeamMember.findFirst({
      where: { vendorId, userId, deletedAt: null },
    });
    return row ? VendorTeamMemberPrismaMapper.toDomain(row) : null;
  }

  async findByUserId(userId: string): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { userId, deletedAt: null },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async findByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<VendorTeamMemberEntity | null> {
    const row = await this.prisma.vendorTeamMember.findFirst({
      where: { vendorId, email: email.value, deletedAt: null },
    });
    return row ? VendorTeamMemberPrismaMapper.toDomain(row) : null;
  }

  async findByVendorIdAndRole(vendorId: string, role: MemberRoleVO): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { vendorId, role: role.value, deletedAt: null },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async findByVendorIdAndStatus(vendorId: string, status: TeamMemberStatusVO): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { vendorId, status: status.value, deletedAt: null },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async findOwner(vendorId: string): Promise<VendorTeamMemberEntity | null> {
    const row = await this.prisma.vendorTeamMember.findFirst({
      where: { vendorId, role: 'vendor_owner', deletedAt: null },
    });
    return row ? VendorTeamMemberPrismaMapper.toDomain(row) : null;
  }

  async findActive(vendorId: string): Promise<readonly VendorTeamMemberEntity[]> {
    const rows = await this.prisma.vendorTeamMember.findMany({
      where: { vendorId, status: 'active', deletedAt: null },
    });
    return rows.map((r) => VendorTeamMemberPrismaMapper.toDomain(r));
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorTeamMember.count({
      where: { vendorId, deletedAt: null },
    });
  }

  async countActiveByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorTeamMember.count({
      where: { vendorId, status: 'active', deletedAt: null },
    });
  }

  async countOwnersByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorTeamMember.count({
      where: { vendorId, role: 'vendor_owner', deletedAt: null },
    });
  }

  async getRoleCounts(vendorId: string): Promise<readonly TeamRoleCount[]> {
    const groups = await this.prisma.vendorTeamMember.groupBy({
      by: ['role'],
      _count: { _all: true },
      where: { vendorId, deletedAt: null },
    });
    return groups.map((g) => ({ role: g.role, count: g._count._all }));
  }

  async existsByVendorIdAndUserId(vendorId: string, userId: string): Promise<boolean> {
    const c = await this.prisma.vendorTeamMember.count({
      where: { vendorId, userId, deletedAt: null },
    });
    return c > 0;
  }

  async existsByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<boolean> {
    const c = await this.prisma.vendorTeamMember.count({
      where: { vendorId, email: email.value, deletedAt: null },
    });
    return c > 0;
  }

  async save(entity: VendorTeamMemberEntity): Promise<VendorTeamMemberEntity> {
    const data = VendorTeamMemberPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorTeamMember.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorTeamMember.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorTeamMember.create({ data: data as never });
    return VendorTeamMemberPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorTeamMember.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorTeamMember.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorTeamMember.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
