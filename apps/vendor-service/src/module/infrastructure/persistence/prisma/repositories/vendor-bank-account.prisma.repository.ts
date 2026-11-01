/**
 * VendorBankAccountPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorBankAccountRepository,
  VendorBankAccountListOptions,
  VendorBankAccountPaginationResult,
} from '../../../../domain/repositories/vendor-bank-account.repository.interface.js';
import { VendorBankAccountEntity } from '../../../../domain/entities/vendor-bank-account.entity.js';
import { BankAccountIdVO } from '../../../../domain/value-objects/primitives/bank-account-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorBankAccountPrismaMapper,
  type VendorBankAccountPrismaRow,
} from '../mappers/vendor-bank-account.prisma.mapper.js';

interface BankDelegate {
  findFirst(args: unknown): Promise<VendorBankAccountPrismaRow | null>;
  findMany(args: unknown): Promise<VendorBankAccountPrismaRow[]>;
  create(args: unknown): Promise<VendorBankAccountPrismaRow>;
  update(args: unknown): Promise<VendorBankAccountPrismaRow>;
  delete(args: unknown): Promise<VendorBankAccountPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorBankAccountPrismaRepository implements VendorBankAccountRepository {
  private readonly logger = new Logger(VendorBankAccountPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): BankDelegate {
    return this.prisma.getModel<BankDelegate>('vendorBankAccount');
  }

  async findById(id: string): Promise<VendorBankAccountEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorBankAccountPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: BankAccountIdVO): Promise<VendorBankAccountEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorBankAccountEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
    });
    return rows.map(VendorBankAccountPrismaMapper.toDomain);
  }

  async findDefaultByVendor(vendorId: VendorIdVO | string): Promise<VendorBankAccountEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, isDefault: true, deletedAt: null },
    });
    return raw ? VendorBankAccountPrismaMapper.toDomain(raw) : null;
  }

  async findVerifiedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorBankAccountEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, isVerified: true, deletedAt: null },
    });
    return rows.map(VendorBankAccountPrismaMapper.toDomain);
  }

  async findByAccountNumber(accountNumber: string): Promise<VendorBankAccountEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { accountNumber, deletedAt: null },
    });
    return raw ? VendorBankAccountPrismaMapper.toDomain(raw) : null;
  }

  async findBySwiftCode(swiftCode: string): Promise<readonly VendorBankAccountEntity[]> {
    const rows = await this.delegate.findMany({
      where: { swiftCode, deletedAt: null },
    });
    return rows.map(VendorBankAccountPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorBankAccountEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorBankAccountPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByVendorAndAccountNumber(vendorId: string, accountNumber: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { vendorId, accountNumber, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorBankAccountEntity): Promise<VendorBankAccountEntity> {
    const data = VendorBankAccountPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorBankAccountPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorBankAccountPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorBankAccountListOptions): Promise<VendorBankAccountPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.bankName) where['bankName'] = { contains: f.bankName, mode: 'insensitive' };
    if (f.accountType) {
      where['accountType'] = Array.isArray(f.accountType) ? { in: f.accountType } : f.accountType;
    }
    if (f.currency) where['currency'] = f.currency;
    if (f.isDefault !== undefined) where['isDefault'] = f.isDefault;
    if (f.isVerified !== undefined) where['isVerified'] = f.isVerified;

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
      items: rows.map(VendorBankAccountPrismaMapper.toDomain),
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
    readonly defaultCount: number;
    readonly byCurrency: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { currency: true, isVerified: true, isDefault: true },
    } as never) as Array<{ currency: string; isVerified: boolean; isDefault: boolean }>;

    const byCurrency: Record<string, number> = {};
    let verified = 0;
    let defaultCount = 0;
    for (const r of rows) {
      byCurrency[r.currency] = (byCurrency[r.currency] ?? 0) + 1;
      if (r.isVerified) verified += 1;
      if (r.isDefault) defaultCount += 1;
    }
    return { total: rows.length, verified, defaultCount, byCurrency };
  }
}
