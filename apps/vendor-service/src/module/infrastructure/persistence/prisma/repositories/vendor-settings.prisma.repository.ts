/**
 * VendorSettingsPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorSettingsRepository } from '../../../../domain/repositories/vendor-settings.repository.interface.js';
import { VendorSettingsEntity } from '../../../../domain/entities/vendor-settings.entity.js';
import { VendorSettingsPrismaMapper } from '../mappers/vendor-settings.prisma-mapper.js';

@Injectable()
export class VendorSettingsPrismaRepository implements VendorSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorSettingsEntity | null> {
    const row = await this.prisma.vendorSettings.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorSettingsPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorSettingsEntity[]> {
    const rows = await this.prisma.vendorSettings.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => VendorSettingsPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorSettingsEntity | null> {
    const row = await this.prisma.vendorSettings.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorSettingsPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const count = await this.prisma.vendorSettings.count({
      where: { vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async upsert(entity: VendorSettingsEntity): Promise<VendorSettingsEntity> {
    const data = VendorSettingsPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorSettings.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorSettings.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorSettings.create({ data: data as never });
    return VendorSettingsPrismaMapper.toDomain(row);
  }

  async save(entity: VendorSettingsEntity): Promise<VendorSettingsEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorSettings.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vendorSettings.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async findOnVacation(): Promise<readonly VendorSettingsEntity[]> {
    const rows = await this.prisma.vendorSettings.findMany({
      where: { vacationMode: true, deletedAt: null },
    });
    return rows.map((r) => VendorSettingsPrismaMapper.toDomain(r));
  }

  async findAutoAccept(): Promise<readonly VendorSettingsEntity[]> {
    const rows = await this.prisma.vendorSettings.findMany({
      where: { autoAcceptOrders: true, deletedAt: null },
    });
    return rows.map((r) => VendorSettingsPrismaMapper.toDomain(r));
  }
}
