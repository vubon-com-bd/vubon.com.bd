import { Injectable } from '@nestjs/common';
import { AuthPermission as PrismaAuthPermission } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthPermissionEntity } from '../../../../domain/entities/auth-permission.entity';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../../../../domain/value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../../../../domain/value-objects/primitives/permission-resource.vo';
import type { AuthPermissionRepository } from '../../../../domain/repositories/auth-permission.repository.interface';

@Injectable()
export class AuthPermissionPrismaRepository
  extends BasePrismaRepository<AuthPermissionEntity, string>
  implements AuthPermissionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthPermission): AuthPermissionEntity {
    return AuthPermissionEntity.reconstitute(
      raw.id,
      {
        name: PermissionNameVO.create(raw.name),
        action: PermissionActionVO.create(raw.action),
        resource: PermissionResourceVO.create(raw.resource),
        description: raw.description,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthPermissionEntity | null> {
    const raw = await this.prisma.authPermission.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthPermissionEntity[]> {
    const rows = await this.prisma.authPermission.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthPermissionEntity): Promise<AuthPermissionEntity> {
    const data = {
      name: entity.name.value,
      action: entity.action.value,
      resource: entity.resource.value,
      description: entity.description,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authPermission.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authPermission.delete({ where: { id } });
  }

  async findByName(name: PermissionNameVO): Promise<AuthPermissionEntity | null> {
    const raw = await this.prisma.authPermission.findUnique({
      where: { name: name.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByResource(
    resource: PermissionResourceVO,
  ): Promise<readonly AuthPermissionEntity[]> {
    const rows = await this.prisma.authPermission.findMany({
      where: { resource: resource.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
