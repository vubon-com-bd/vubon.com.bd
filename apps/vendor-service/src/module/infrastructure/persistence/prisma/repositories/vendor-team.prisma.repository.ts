import { Injectable } from '@nestjs/common';
import { VendorTeam as PrismaVendorTeam } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorTeamEntity } from '../../../../domain/entities/vendor-team.entity';
import { TeamMemberIdVO } from '../../../../domain/value-objects/primitives/team-member-id.vo';
import { TeamRoleVO } from '../../../../domain/value-objects/primitives/team-role.vo';
import { TeamPermissionVO } from '../../../../domain/value-objects/primitives/team-permission.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { VendorTeamRepository } from '../../../../domain/repositories/vendor-team.repository.interface';

@Injectable()
export class VendorTeamPrismaRepository
  extends BasePrismaRepository<VendorTeamEntity, TeamMemberIdVO>
  implements VendorTeamRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorTeam): VendorTeamEntity {
    const permsArray = Array.isArray(raw.permissions)
      ? (raw.permissions as string[])
      : [];
    return VendorTeamEntity.reconstitute(
      TeamMemberIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        userId: UserIdVO.create(raw.userId),
        role: TeamRoleVO.create(raw.role),
        permissions: permsArray.map((p) => TeamPermissionVO.create(p)),
        invitedAt: raw.invitedAt,
        joinedAt: raw.joinedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: TeamMemberIdVO): Promise<VendorTeamEntity | null> {
    const raw = await this.prisma.vendorTeam.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorTeamEntity[]> {
    const rows = await this.prisma.vendorTeam.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorTeamEntity): Promise<VendorTeamEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      role: entity.role.value,
      permissions: entity.permissions.map((p) => p.value) as unknown as object,
      invitedAt: entity.invitedAt,
      joinedAt: entity.joinedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorTeam.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TeamMemberIdVO): Promise<void> {
    await this.prisma.vendorTeam.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorTeamEntity[]> {
    const rows = await this.prisma.vendorTeam.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly VendorTeamEntity[]> {
    const rows = await this.prisma.vendorTeam.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByVendor(vendorId: VendorIdVO): Promise<number> {
    return this.prisma.vendorTeam.count({
      where: { vendorId: vendorId.value },
    });
  }
}
