/**
 * VendorTeamInvitePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorTeamInviteRepository } from '../../../../domain/repositories/vendor-team-invite.repository.interface.js';
import { VendorTeamInviteEntity } from '../../../../domain/entities/vendor-team-invite.entity.js';
import { TeamInviteTokenVO } from '../../../../domain/value-objects/primitives/team-invite-token.vo.js';
import { TeamInviteStatusVO } from '../../../../domain/value-objects/primitives/team-invite-status.vo.js';
import { MemberEmailVO } from '../../../../domain/value-objects/primitives/member-email.vo.js';
import { VendorTeamInvitePrismaMapper } from '../mappers/vendor-team-invite.prisma-mapper.js';

@Injectable()
export class VendorTeamInvitePrismaRepository implements VendorTeamInviteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorTeamInviteEntity | null> {
    const row = await this.prisma.vendorTeamInvite.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorTeamInvitePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findByToken(token: TeamInviteTokenVO): Promise<VendorTeamInviteEntity | null> {
    const row = await this.prisma.vendorTeamInvite.findFirst({
      where: { token: token.value, deletedAt: null },
    });
    return row ? VendorTeamInvitePrismaMapper.toDomain(row) : null;
  }

  async findByVendorIdAndEmail(vendorId: string, email: MemberEmailVO): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { vendorId, email: email.value, deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findByEmail(email: MemberEmailVO): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { email: email.value, deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findByStatus(status: TeamInviteStatusVO): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findPendingByVendorId(vendorId: string): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: { vendorId, status: 'pending', deletedAt: null },
      orderBy: { invitedAt: 'desc' },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async findExpiredPending(): Promise<readonly VendorTeamInviteEntity[]> {
    const rows = await this.prisma.vendorTeamInvite.findMany({
      where: {
        status: 'pending',
        expiresAt: { lt: new Date() },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorTeamInvitePrismaMapper.toDomain(r));
  }

  async existsByToken(token: TeamInviteTokenVO): Promise<boolean> {
    const c = await this.prisma.vendorTeamInvite.count({
      where: { token: token.value, deletedAt: null },
    });
    return c > 0;
  }

  async countPendingByVendorId(vendorId: string): Promise<number> {
    return this.prisma.vendorTeamInvite.count({
      where: { vendorId, status: 'pending', deletedAt: null },
    });
  }

  async countRecentByVendorId(vendorId: string, hours: number): Promise<number> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.prisma.vendorTeamInvite.count({
      where: {
        vendorId,
        invitedAt: { gte: threshold },
        deletedAt: null,
      },
    });
  }

  async save(entity: VendorTeamInviteEntity): Promise<VendorTeamInviteEntity> {
    const data = VendorTeamInvitePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorTeamInvite.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorTeamInvite.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorTeamInvite.create({ data: data as never });
    return VendorTeamInvitePrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorTeamInvite.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorTeamInvite.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorTeamInvite.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
