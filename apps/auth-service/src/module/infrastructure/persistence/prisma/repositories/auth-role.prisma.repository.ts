import { Injectable } from '@nestjs/common';
import { AuthRole as PrismaAuthRole } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthRoleEntity } from '../../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../../../../domain/value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';
import type { AuthRoleRepository } from '../../../../domain/repositories/auth-role.repository.interface';

type PrismaAuthRoleWithPerms = PrismaAuthRole & {
  permissions: { permission: { name: string } }[];
};

@Injectable()
export class AuthRolePrismaRepository
  extends BasePrismaRepository<AuthRoleEntity, string>
  implements AuthRoleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthRoleWithPerms): AuthRoleEntity {
    return AuthRoleEntity.reconstitute(
      raw.id,
      {
        name: RoleNameVO.create(raw.name),
        description: RoleDescriptionVO.create(raw.description),
        permissions: raw.permissions.map((p) =>
          PermissionNameVO.create(p.permission.name),
        ),
        isSystem: raw.isSystem,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  private readonly includePerms = {
    permissions: { include: { permission: { select: { name: true } } } },
  } as const;

  async findById(id: string): Promise<AuthRoleEntity | null> {
    const raw = await this.prisma.authRole.findUnique({
      where: { id },
      include: this.includePerms,
    });
    return raw ? this.toDomain(raw as PrismaAuthRoleWithPerms) : null;
  }

  async findAll(): Promise<readonly AuthRoleEntity[]> {
    const rows = await this.prisma.authRole.findMany({
      include: this.includePerms,
    });
    return rows.map((r) => this.toDomain(r as PrismaAuthRoleWithPerms));
  }

  async save(entity: AuthRoleEntity): Promise<AuthRoleEntity> {
    const data = {
      name: entity.name.value,
      description: entity.description.value,
      isSystem: entity.isSystem,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authRole.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });

    await this.prisma.authRolePermission.deleteMany({
      where: { roleId: raw.id },
    });
    for (const perm of entity.permissions) {
      const p = await this.prisma.authPermission.findUnique({
        where: { name: perm.value },
      });
      if (p) {
        await this.prisma.authRolePermission.create({
          data: { roleId: raw.id, permissionId: p.id },
        });
      }
    }

    const withPerms = await this.prisma.authRole.findUnique({
      where: { id: raw.id },
      include: this.includePerms,
    });
    return this.toDomain(withPerms as PrismaAuthRoleWithPerms);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authRole.delete({ where: { id } });
  }

  async findByName(name: RoleNameVO): Promise<AuthRoleEntity | null> {
    const raw = await this.prisma.authRole.findUnique({
      where: { name: name.value },
      include: this.includePerms,
    });
    return raw ? this.toDomain(raw as PrismaAuthRoleWithPerms) : null;
  }

  async findWithPermissions(name: RoleNameVO): Promise<AuthRoleEntity | null> {
    const raw = await this.prisma.authRole.findUnique({
      where: { name: name.value },
      include: this.includePerms,
    });
    return raw ? this.toDomain(raw as PrismaAuthRoleWithPerms) : null;
  }
}
