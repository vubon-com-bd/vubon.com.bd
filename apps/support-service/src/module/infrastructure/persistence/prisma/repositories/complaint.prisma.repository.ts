/**
 * ComplaintPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { ComplaintRepository } from '../../../../domain/repositories/complaint.repository.interface';
import { ComplaintEntity } from '../../../../domain/entities/complaint.entity';
import { ComplaintIdVO } from '../../../../domain/value-objects/primitives/complaint-id.vo';
import { ComplaintStatusVO } from '../../../../domain/value-objects/primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../../../../domain/value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { ComplaintMapper } from '../mappers/complaint.mapper';

@Injectable()
export class ComplaintPrismaRepository implements ComplaintRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: ComplaintMapper,
  ) {}

  async findById(id: ComplaintIdVO): Promise<ComplaintEntity | null> {
    const raw = await this.prisma.complaint.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: ComplaintEntity): Promise<ComplaintEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.complaint.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        severity: data.severity,
        status: data.status,
        resolverId: data.resolverId,
        resolvedAt: data.resolvedAt,
        resolution: data.resolution,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: ComplaintIdVO): Promise<void> {
    await this.prisma.complaint.delete({ where: { id: id.value } });
  }

  async exists(id: ComplaintIdVO): Promise<boolean> {
    const count = await this.prisma.complaint.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByUser(userId: UserIdVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findBySeverity(severity: ComplaintSeverityVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { severity: severity.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: ComplaintStatusVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findCriticalUnresolved(): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: {
        severity: 'critical',
        status: { notIn: ['resolved', 'closed', 'rejected'] },
      },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countUnresolvedByVendor(vendorId: VendorIdVO): Promise<number> {
    return this.prisma.complaint.count({
      where: {
        vendorId: vendorId.value,
        status: { notIn: ['resolved', 'closed', 'rejected'] },
      },
    });
  }
}
