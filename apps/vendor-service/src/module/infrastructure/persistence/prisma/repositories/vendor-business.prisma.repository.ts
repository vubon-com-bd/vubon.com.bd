/**
 * VendorBusinessPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorBusinessRepository,
  VendorBusinessListOptions,
  VendorBusinessPaginationResult,
} from '../../../../domain/repositories/vendor-business.repository.interface.js';
import { VendorBusinessEntity } from '../../../../domain/entities/vendor-business.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorBusinessPrismaMapper,
  type VendorBusinessPrismaRow,
} from '../mappers/vendor-business.prisma.mapper.js';

interface BusinessDelegate {
  findFirst(args: unknown): Promise<VendorBusinessPrismaRow | null>;
  findMany(args: unknown): Promise<VendorBusinessPrismaRow[]>;
  create(args: unknown): Promise<VendorBusinessPrismaRow>;
  update(args: unknown): Promise<VendorBusinessPrismaRow>;
  delete(args: unknown): Promise<VendorBusinessPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorBusinessPrismaRepository implements VendorBusinessRepository {
  private readonly logger = new Logger(VendorBusinessPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): BusinessDelegate {
    return this.prisma.getModel<BusinessDelegate>('vendorBusiness');
  }

  async findById(id: string): Promise<VendorBusinessEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorBusinessPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorBusinessEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({ where: { vendorId: idStr, deletedAt: null } });
    return raw ? VendorBusinessPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: string): Promise<VendorBusinessEntity | null> {
    return this.findById(id);
  }

  async findByRegistrationNumber(regNumber: string): Promise<VendorBusinessEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { registrationNumber: regNumber, deletedAt: null },
    });
    return raw ? VendorBusinessPrismaMapper.toDomain(raw) : null;
  }

  async findByTaxId(taxId: string): Promise<VendorBusinessEntity | null> {
    const raw = await this.delegate.findFirst({ where: { taxId, deletedAt: null } });
    return raw ? VendorBusinessPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorBusinessEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorBusinessPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorBusinessEntity): Promise<VendorBusinessEntity> {
    const data = VendorBusinessPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorBusinessPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorBusinessPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorBusinessListOptions): Promise<VendorBusinessPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.businessType) where['businessType'] = f.businessType;
    if (f.vendorType) where['vendorType'] = f.vendorType;
    if (f.isLegallyRegistered) {
      where['OR'] = [{ registrationNumber: { not: null } }, { taxId: { not: null } }];
    }
    if (f.establishedBefore) where['establishedYear'] = { lt: f.establishedBefore };
    if (f.minEmployeeCount !== undefined) where['employeeCount'] = { gte: f.minEmployeeCount };
    if (f.maxEmployeeCount !== undefined) {
      where['employeeCount'] = { ...(where['employeeCount'] as object ?? {}), lte: f.maxEmployeeCount };
    }
    if (f.search) {
      where['legalName'] = { contains: f.search, mode: 'insensitive' };
    }

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(VendorBusinessPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly legallyRegistered: number;
    readonly established5PlusYears: number;
    readonly smallBusinesses: number;
  }> {
    const currentYear = new Date().getFullYear();
    const [total, legallyRegistered, established5PlusYears, smallBusinesses] = await Promise.all([
      this.delegate.count({ where: { deletedAt: null } }),
      this.delegate.count({
        where: {
          deletedAt: null,
          OR: [{ registrationNumber: { not: null } }, { taxId: { not: null } }],
        },
      }),
      this.delegate.count({
        where: { deletedAt: null, establishedYear: { lte: currentYear - 5 } },
      }),
      this.delegate.count({
        where: { deletedAt: null, employeeCount: { lte: 10 } },
      }),
    ]);
    return { total, legallyRegistered, established5PlusYears, smallBusinesses };
  }
}
