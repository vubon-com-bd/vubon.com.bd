import { Injectable } from '@nestjs/common';
import { VendorPermission as PrismaVendorPermission } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorPermissionEntity } from '../../../../domain/entities/vendor-permission.entity';
import { PermissionIdVO } from '../../../../domain/value-objects/primitives/permission-id.vo';
import { TeamPermissionVO } from '../../../../domain/value-objects/primitives/team-permission.vo';
import { TeamRoleVO } from '../../../../domain/value-objects/primitives/team-role.vo';
import type { VendorPermissionRepository } from '../../../../domain/repositories/vendor-permission.repository.interface';

@Injectable()
export class VendorPermissionPrismaRepository
  extends BasePrismaRepository<VendorPermissionEntity, PermissionIdVO>
  implements VendorPermissionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorPermission): VendorPermissionEntity {
    const permsArray = Array.isArray(raw.permissions)
      ? (raw.permissions as string[])
      : [];
    return VendorPermissionEntity.reconstitute(
      PermissionIdVO.create(raw.id),
      {
        role: TeamRoleVO.create(raw.role),
        permissions: permsArray.map((p) => TeamPermissionVO.create(p)),
        description: raw.description,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PermissionIdVO): Promise<VendorPermissionEntity | null> {
    const raw = await this.prisma.vendorPermission.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorPermissionEntity[]> {
    const rows = await this.prisma.vendorPermission.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorPermissionEntity): Promise<VendorPermissionEntity> {
    const data = {
      role: entity.role.value,
      permissions: entity.permissions.map((p) => p.value) as unknown as object,
      description: entity.description,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorPermission.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PermissionIdVO): Promise<void> {
    await this.prisma.vendorPermission.delete({ where: { id: id.value } });
  }

  async findByRole(role: TeamRoleVO): Promise<VendorPermissionEntity | null> {
    const raw = await this.prisma.vendorPermission.findUnique({
      where: { role: role.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
