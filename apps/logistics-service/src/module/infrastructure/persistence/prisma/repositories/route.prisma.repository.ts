import { Injectable } from '@nestjs/common';
import { Route as PrismaRoute } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { RouteEntity } from '../../../../domain/entities/route.entity';
import { RouteIdVO } from '../../../../domain/value-objects/primitives/route-id.vo';
import { RouteNameVO } from '../../../../domain/value-objects/primitives/route-name.vo';
import { RouteStatusVO } from '../../../../domain/value-objects/primitives/route-status.vo';
import { RouteTypeVO } from '../../../../domain/value-objects/primitives/route-type.vo';
import { RouteDistanceVO } from '../../../../domain/value-objects/primitives/route-distance.vo';
import type { RouteRepository } from '../../../../domain/repositories/route.repository.interface';

@Injectable()
export class RoutePrismaRepository
  extends BasePrismaRepository<RouteEntity, RouteIdVO>
  implements RouteRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaRoute): RouteEntity {
    return RouteEntity.reconstitute(
      RouteIdVO.create(raw.id),
      {
        name: RouteNameVO.create(raw.name),
        status: RouteStatusVO.create(raw.status),
        type: RouteTypeVO.create(raw.type),
        distance: raw.distanceKm !== null ? RouteDistanceVO.create(raw.distanceKm) : null,
        optimization: null,
        zones: [],
        optimized: raw.optimized,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: RouteIdVO): Promise<RouteEntity | null> {
    const raw = await this.prisma.route.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.route.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RouteEntity): Promise<RouteEntity> {
    const data = {
      name: entity.name.value,
      status: entity.status.value,
      type: entity.type.value,
      distanceKm: entity.distance?.value ?? null,
      optimized: entity.optimized,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.route.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RouteIdVO): Promise<void> {
    await this.prisma.route.delete({ where: { id: id.value } });
  }

  async findOptimized(): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.route.findMany({ where: { optimized: true } });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.route.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
