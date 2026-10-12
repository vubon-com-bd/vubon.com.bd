/**
 * VendorSuspensionLogPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorSuspensionLogRepository } from '../../../../domain/repositories/vendor-suspension-log.repository.interface.js';
import { VendorSuspensionLogEntity } from '../../../../domain/entities/vendor-suspension-log.entity.js';
import type { SuspensionLogEvent } from '../../../../domain/entities/vendor-suspension-log.entity.js';
import { VendorSuspensionLogPrismaMapper } from '../mappers/vendor-suspension-log.prisma-mapper.js';

@Injectable()
export class VendorSuspensionLogPrismaRepository implements VendorSuspensionLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorSuspensionLogEntity | null> {
    const row = await this.prisma.vendorSuspensionLog.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorSuspensionLogPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorSuspensionLogEntity[]> {
    const rows = await this.prisma.vendorSuspensionLog.findMany({
      where: { deletedAt: null },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionLogPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorSuspensionLogEntity[]> {
    const rows = await this.prisma.vendorSuspensionLog.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionLogPrismaMapper.toDomain(r));
  }

  async findBySuspensionId(suspensionId: string): Promise<readonly VendorSuspensionLogEntity[]> {
    const rows = await this.prisma.vendorSuspensionLog.findMany({
      where: { suspensionId, deletedAt: null },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => VendorSuspensionLogPrismaMapper.toDomain(r));
  }

  async findByEvent(event: SuspensionLogEvent): Promise<readonly VendorSuspensionLogEntity[]> {
    const rows = await this.prisma.vendorSuspensionLog.findMany({
      where: { event, deletedAt: null },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionLogPrismaMapper.toDomain(r));
  }

  async findByActorId(actorId: string): Promise<readonly VendorSuspensionLogEntity[]> {
    const rows = await this.prisma.vendorSuspensionLog.findMany({
      where: { actorId, deletedAt: null },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionLogPrismaMapper.toDomain(r));
  }

  async findTimeline(suspensionId: string): Promise<readonly VendorSuspensionLogEntity[]> {
    return this.findBySuspensionId(suspensionId);
  }

  async findLatestBySuspensionId(suspensionId: string): Promise<VendorSuspensionLogEntity | null> {
    const row = await this.prisma.vendorSuspensionLog.findFirst({
      where: { suspensionId, deletedAt: null },
      orderBy: { occurredAt: 'desc' },
    });
    return row ? VendorSuspensionLogPrismaMapper.toDomain(row) : null;
  }

  async countByEvent(event: SuspensionLogEvent): Promise<number> {
    return this.prisma.vendorSuspensionLog.count({
      where: { event, deletedAt: null },
    });
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorSuspensionLog.count({
      where: { vendorId, deletedAt: null },
    });
  }

  async save(entity: VendorSuspensionLogEntity): Promise<VendorSuspensionLogEntity> {
    const data = VendorSuspensionLogPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorSuspensionLog.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorSuspensionLog.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorSuspensionLog.create({ data: data as never });
    return VendorSuspensionLogPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorSuspensionLog.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorSuspensionLog.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorSuspensionLog.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
