/**
 * VendorAddressPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorAddressRepository,
  VendorAddressListOptions,
  VendorAddressPaginationResult,
} from '../../../../domain/repositories/vendor-address.repository.interface.js';
import { VendorAddressEntity } from '../../../../domain/entities/vendor-address.entity.js';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorAddressPrismaMapper,
  type VendorAddressPrismaRow,
} from '../mappers/vendor-address.prisma.mapper.js';

interface AddressDelegate {
  findFirst(args: unknown): Promise<VendorAddressPrismaRow | null>;
  findMany(args: unknown): Promise<VendorAddressPrismaRow[]>;
  create(args: unknown): Promise<VendorAddressPrismaRow>;
  update(args: unknown): Promise<VendorAddressPrismaRow>;
  delete(args: unknown): Promise<VendorAddressPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorAddressPrismaRepository implements VendorAddressRepository {
  private readonly logger = new Logger(VendorAddressPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): AddressDelegate {
    return this.prisma.getModel<AddressDelegate>('vendorAddress');
  }

  async findById(id: string): Promise<VendorAddressEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorAddressPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: AddressIdVO): Promise<VendorAddressEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorAddressEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async findByVendorAndType(
    vendorId: VendorIdVO | string,
    addressType: string,
  ): Promise<readonly VendorAddressEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, addressType, deletedAt: null },
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorAddressEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, isPrimary: true, deletedAt: null },
    });
    return raw ? VendorAddressPrismaMapper.toDomain(raw) : null;
  }

  async findByCity(city: string): Promise<readonly VendorAddressEntity[]> {
    const rows = await this.delegate.findMany({
      where: { city, deletedAt: null },
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async findByDistrict(district: string): Promise<readonly VendorAddressEntity[]> {
    const rows = await this.delegate.findMany({
      where: { district, deletedAt: null },
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async findWithCoordinates(vendorId: VendorIdVO | string): Promise<readonly VendorAddressEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: {
        vendorId: idStr,
        deletedAt: null,
        latitude: { not: null },
        longitude: { not: null },
      },
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorAddressEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorAddressPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorAddressEntity): Promise<VendorAddressEntity> {
    const data = VendorAddressPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorAddressPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorAddressPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorAddressListOptions): Promise<VendorAddressPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.addressType) {
      where['addressType'] = Array.isArray(f.addressType) ? { in: f.addressType } : f.addressType;
    }
    if (f.city) where['city'] = f.city;
    if (f.district) where['district'] = f.district;
    if (f.division) where['division'] = f.division;
    if (f.country) where['country'] = f.country;
    if (f.isPrimary !== undefined) where['isPrimary'] = f.isPrimary;
    if (f.isVerified !== undefined) where['isVerified'] = f.isVerified;
    if (f.hasCoordinates) {
      where['latitude'] = { not: null };
      where['longitude'] = { not: null };
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
      items: rows.map(VendorAddressPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, deletedAt: null } });
  }

  async getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly verified: number;
    readonly withCoordinates: number;
    readonly byType: Readonly<Record<string, number>>;
    readonly byDivision: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { addressType: true, division: true, isVerified: true, latitude: true },
    } as never) as Array<{ addressType: string; division: string; isVerified: boolean; latitude: unknown }>;

    const byType: Record<string, number> = {};
    const byDivision: Record<string, number> = {};
    let verified = 0;
    let withCoordinates = 0;
    for (const r of rows) {
      byType[r.addressType] = (byType[r.addressType] ?? 0) + 1;
      byDivision[r.division] = (byDivision[r.division] ?? 0) + 1;
      if (r.isVerified) verified += 1;
      if (r.latitude !== null) withCoordinates += 1;
    }
    return { total: rows.length, verified, withCoordinates, byType, byDivision };
  }
}
