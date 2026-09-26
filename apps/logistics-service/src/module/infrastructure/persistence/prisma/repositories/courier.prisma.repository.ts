import { Injectable } from '@nestjs/common';
import { Courier as PrismaCourier } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CourierEntity } from '../../../../domain/entities/courier.entity';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo';
import { CourierNameVO } from '../../../../domain/value-objects/primitives/courier-name.vo';
import { CourierStatusVO } from '../../../../domain/value-objects/primitives/courier-status.vo';
import { CourierTypeVO } from '../../../../domain/value-objects/primitives/courier-type.vo';
import type { CourierRepository } from '../../../../domain/repositories/courier.repository.interface';

@Injectable()
export class CourierPrismaRepository
  extends BasePrismaRepository<CourierEntity, CourierIdVO>
  implements CourierRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCourier): CourierEntity {
    return CourierEntity.reconstitute(
      CourierIdVO.create(raw.id),
      {
        name: CourierNameVO.create(raw.name),
        type: CourierTypeVO.create(raw.type),
        status: CourierStatusVO.create(raw.status),
        apiUrl: raw.apiUrl,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: CourierIdVO): Promise<CourierEntity | null> {
    const raw = await this.prisma.courier.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.courier.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CourierEntity): Promise<CourierEntity> {
    const data = {
      name: entity.name.value,
      type: entity.type.value,
      status: entity.status.value,
      apiUrl: entity.apiUrl,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.courier.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CourierIdVO): Promise<void> {
    await this.prisma.courier.delete({ where: { id: id.value } });
  }

  async findByName(name: CourierNameVO): Promise<CourierEntity | null> {
    const raw = await this.prisma.courier.findUnique({ where: { name: name.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.courier.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: string): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.courier.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }
}
