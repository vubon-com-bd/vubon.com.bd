import { Injectable } from '@nestjs/common';
import { Zone as PrismaZone } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ZoneEntity } from '../../../../domain/entities/zone.entity';
import { ZoneIdVO } from '../../../../domain/value-objects/primitives/zone-id.vo';
import { ZoneNameVO } from '../../../../domain/value-objects/primitives/zone-name.vo';
import { ZoneStatusVO } from '../../../../domain/value-objects/primitives/zone-status.vo';
import { ZoneTypeVO } from '../../../../domain/value-objects/primitives/zone-type.vo';
import type { ZoneRepository } from '../../../../domain/repositories/zone.repository.interface';

@Injectable()
export class ZonePrismaRepository
  extends BasePrismaRepository<ZoneEntity, ZoneIdVO>
  implements ZoneRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaZone): ZoneEntity {
    return ZoneEntity.reconstitute(
      ZoneIdVO.create(raw.id),
      {
        code: raw.code,
        name: ZoneNameVO.create(raw.name),
        type: ZoneTypeVO.create(raw.type),
        status: ZoneStatusVO.create(raw.status),
        divisions: raw.divisions,
        districts: raw.districts,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ZoneIdVO): Promise<ZoneEntity | null> {
    const raw = await this.prisma.zone.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.zone.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ZoneEntity): Promise<ZoneEntity> {
    const data = {
      code: entity.code,
      name: entity.name.value,
      type: entity.type.value,
      status: entity.status.value,
      divisions: [...entity.divisions],
      districts: [...entity.districts],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.zone.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ZoneIdVO): Promise<void> {
    await this.prisma.zone.delete({ where: { id: id.value } });
  }

  async findByType(type: string): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.zone.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCode(code: string): Promise<ZoneEntity | null> {
    const raw = await this.prisma.zone.findUnique({ where: { code } });
    return raw ? this.toDomain(raw) : null;
  }
}
