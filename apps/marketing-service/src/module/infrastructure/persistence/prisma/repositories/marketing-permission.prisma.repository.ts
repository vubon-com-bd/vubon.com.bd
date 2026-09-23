import { Injectable } from '@nestjs/common';
import { MarketingPermission as PrismaMarketingPermission } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MarketingPermissionEntity } from '../../../../domain/entities/marketing-permission.entity';
import { MarketingPermissionVO } from '../../../../domain/value-objects/composites/marketing-permission.vo';
import { PermissionIdVO } from '../../../../domain/value-objects/primitives/permission-id.vo';
import { PermissionActionVO } from '../../../../domain/value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../../../../domain/value-objects/primitives/permission-resource.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { MarketingPermissionRepository } from '../../../../domain/repositories/marketing-permission.repository.interface';

@Injectable()
export class MarketingPermissionPrismaRepository
  extends BasePrismaRepository<MarketingPermissionEntity, string>
  implements MarketingPermissionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMarketingPermission): MarketingPermissionEntity {
    const userId = UserIdVO.create(raw.userId);
    return MarketingPermissionEntity.reconstitute(
      raw.id,
      {
        userId,
        permission: MarketingPermissionVO.create({
          id: PermissionIdVO.create(raw.id),
          userId,
          action: PermissionActionVO.create(raw.action),
          resource: PermissionResourceVO.create(raw.resource),
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<MarketingPermissionEntity | null> {
    const raw = await this.prisma.marketingPermission.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MarketingPermissionEntity[]> {
    const rows = await this.prisma.marketingPermission.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MarketingPermissionEntity): Promise<MarketingPermissionEntity> {
    const data = {
      userId: entity.userId.value,
      action: entity.permission.action.value,
      resource: entity.permission.resource.value,
    };
    const raw = await this.prisma.marketingPermission.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.marketingPermission.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly MarketingPermissionEntity[]> {
    const rows = await this.prisma.marketingPermission.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
