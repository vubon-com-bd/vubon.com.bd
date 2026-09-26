/**
 * AuthPermissionPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthPermission as PrismaAuthPermission } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import { AuthPermissionEntity } from '../../../../domain/entities/auth-permission.entity';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../../../../domain/value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../../../../domain/value-objects/primitives/permission-resource.vo';
import type { AuthPermissionRepository } from '../../../../domain/repositories/auth-permission.repository.interface';

@Injectable()
export class AuthPermissionPrismaRepository
  extends BasePrismaRepository<AuthPermissionEntity, PrismaAuthPermission, string>
  implements AuthPermissionRepository {
  protected readonly model: PrismaDelegate<PrismaAuthPermission>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authPermission as unknown as PrismaDelegate<PrismaAuthPermission>;
  }

  protected idOf(domain: AuthPermissionEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthPermission): AuthPermissionEntity {
    return AuthPermissionEntity.create({
      id: raw.id,
      name: PermissionNameVO.of(raw.name),
      resource: PermissionResourceVO.of(raw.resource),
      action: PermissionActionVO.of(raw.action),
      description: raw.description ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthPermissionEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      action: domain.action.value,
      resource: domain.resource.value,
      description: domain.description ?? null,
      updatedAt: new Date(),
    };
  }

  async findByName(
    name: PermissionNameVO,
  ): Promise<AuthPermissionEntity | null> {
    const raw = await this.prisma.authPermission.findUnique({
      where: { name: name.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByResource(
    resource: string,
  ): Promise<readonly AuthPermissionEntity[]> {
    const rows = await this.prisma.authPermission.findMany({
      where: { resource },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findManyByNames(
    names: readonly PermissionNameVO[],
  ): Promise<readonly AuthPermissionEntity[]> {
    if (names.length === 0) return [];
    const rows = await this.prisma.authPermission.findMany({
      where: { name: { in: names.map((n) => n.value) } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
