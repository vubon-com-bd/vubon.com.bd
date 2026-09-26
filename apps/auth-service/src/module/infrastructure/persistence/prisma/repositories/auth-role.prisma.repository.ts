/**
 * AuthRolePrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthRole as PrismaAuthRole } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import { AuthRoleEntity } from '../../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../../../../domain/value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';
import type { AuthRoleRepository } from '../../../../domain/repositories/auth-role.repository.interface';

@Injectable()
export class AuthRolePrismaRepository
  extends BasePrismaRepository<AuthRoleEntity, PrismaAuthRole, string>
  implements AuthRoleRepository {
  protected readonly model: PrismaDelegate<PrismaAuthRole>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authRole as unknown as PrismaDelegate<PrismaAuthRole>;
  }

  protected idOf(domain: AuthRoleEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthRole): AuthRoleEntity {
    return AuthRoleEntity.create({
      id: raw.id,
      name: RoleNameVO.of(raw.name),
      description: RoleDescriptionVO.of(raw.description),
      permissions: [],
      isSystem: raw.isSystem,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthRoleEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      description: domain.description.value,
      isSystem: domain.isSystem,
      updatedAt: new Date(),
    };
  }

  async findByName(name: RoleNameVO): Promise<AuthRoleEntity | null> {
    const raw = await this.prisma.authRole.findUnique({
      where: { name: name.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findManyByNames(
    names: readonly RoleNameVO[],
  ): Promise<readonly AuthRoleEntity[]> {
    if (names.length === 0) return [];
    const rows = await this.prisma.authRole.findMany({
      where: { name: { in: names.map((n) => n.value) } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findWithPermission(
    permission: PermissionNameVO,
  ): Promise<readonly AuthRoleEntity[]> {
    const links = await this.prisma.authRolePermission.findMany({
      where: { permission: { name: permission.value } },
      include: { role: true },
    });
    return links.map((l) => this.toDomain(l.role));
  }

  async addPermissionToRole(
    roleId: string,
    permission: PermissionNameVO,
  ): Promise<void> {
    const perm = await this.prisma.authPermission.findUnique({
      where: { name: permission.value },
    });
    if (!perm) throw new Error(`Permission not found: ${permission.value}`);
    await this.prisma.authRolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId: perm.id } },
      create: { roleId, permissionId: perm.id },
      update: {},
    });
  }

  async removePermissionFromRole(
    roleId: string,
    permission: PermissionNameVO,
  ): Promise<void> {
    const perm = await this.prisma.authPermission.findUnique({
      where: { name: permission.value },
    });
    if (!perm) return;
    await this.prisma.authRolePermission.deleteMany({
      where: { roleId, permissionId: perm.id },
    });
  }
}
