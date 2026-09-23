import { Injectable } from '@nestjs/common';
import { Driver as PrismaDriver } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DriverEntity } from '../../../../domain/entities/driver.entity';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo';
import { DriverNameVO } from '../../../../domain/value-objects/primitives/driver-name.vo';
import { DriverStatusVO } from '../../../../domain/value-objects/primitives/driver-status.vo';
import { DriverTypeVO } from '../../../../domain/value-objects/primitives/driver-type.vo';
import { DriverLicenseVO } from '../../../../domain/value-objects/primitives/driver-license.vo';
import type { DriverRepository } from '../../../../domain/repositories/driver.repository.interface';

@Injectable()
export class DriverPrismaRepository
  extends BasePrismaRepository<DriverEntity, DriverIdVO>
  implements DriverRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDriver): DriverEntity {
    return DriverEntity.reconstitute(
      DriverIdVO.create(raw.id),
      {
        name: DriverNameVO.create(raw.name),
        phone: raw.phone,
        license: DriverLicenseVO.create(raw.licenseNo),
        type: DriverTypeVO.create(raw.type),
        status: DriverStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: DriverIdVO): Promise<DriverEntity | null> {
    const raw = await this.prisma.driver.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.driver.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DriverEntity): Promise<DriverEntity> {
    const data = {
      name: entity.name.value,
      phone: entity.phone,
      licenseNo: entity.license.value,
      type: entity.type.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.driver.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DriverIdVO): Promise<void> {
    await this.prisma.driver.delete({ where: { id: id.value } });
  }

  async findByLicense(license: DriverLicenseVO): Promise<DriverEntity | null> {
    const raw = await this.prisma.driver.findUnique({ where: { licenseNo: license.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAvailable(): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.driver.findMany({ where: { status: 'available' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.driver.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}
