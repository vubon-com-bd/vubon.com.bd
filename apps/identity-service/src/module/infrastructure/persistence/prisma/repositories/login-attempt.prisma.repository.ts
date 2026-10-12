/**
 * Login Attempt Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import {
  LoginAttemptPrismaMapper,
  type PrismaLoginAttemptRow,
} from '../mappers/login-attempt.prisma.mapper.js';
import { LoginAttemptEntity } from '../../../../domain/entities/login-attempt.entity.js';
import type {
  LoginAttemptRepository,
  LoginAttemptListOptions,
  LoginAttemptPaginationResult,
  LoginAttemptStats,
} from '../../../../domain/repositories/login-attempt.repository.interface.js';

interface AttemptDelegate {
  findUnique(args: unknown): Promise<PrismaLoginAttemptRow | null>;
  findFirst(args: unknown): Promise<PrismaLoginAttemptRow | null>;
  findMany(args?: unknown): Promise<PrismaLoginAttemptRow[]>;
  create(args: unknown): Promise<PrismaLoginAttemptRow>;
  update(args: unknown): Promise<PrismaLoginAttemptRow>;
  delete(args: unknown): Promise<PrismaLoginAttemptRow>;
  count(args?: unknown): Promise<number>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class LoginAttemptPrismaRepository implements LoginAttemptRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): AttemptDelegate {
    return this.prisma.getModel<AttemptDelegate>('authLoginAttempt');
  }

  async findById(id: string): Promise<LoginAttemptEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? LoginAttemptPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoginAttemptEntity[]> {
    const rows = await this.delegate.findMany({
      orderBy: { attemptedAt: 'desc' },
      take: 100,
    });
    return rows.map((r) => LoginAttemptPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async save(entity: LoginAttemptEntity): Promise<LoginAttemptEntity> {
    const data = LoginAttemptPrismaMapper.toPersistence(entity);
    const raw = await this.delegate.create({ data: data as never });
    return LoginAttemptPrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByIdentifier(identifier: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const rows = await this.delegate.findMany({
      where: { email: identifier } as never,
      orderBy: { attemptedAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => LoginAttemptPrismaMapper.toDomain(r));
  }

  async findByIp(ipAddress: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const rows = await this.delegate.findMany({
      where: { ip: ipAddress } as never,
      orderBy: { attemptedAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => LoginAttemptPrismaMapper.toDomain(r));
  }

  async findRecent(
    identifier: string,
    windowSeconds: number,
    nowMs: number = Date.now(),
  ): Promise<readonly LoginAttemptEntity[]> {
    const cutoff = new Date(nowMs - windowSeconds * 1000);
    const rows = await this.delegate.findMany({
      where: { email: identifier, attemptedAt: { gte: cutoff } } as never,
      orderBy: { attemptedAt: 'desc' },
    });
    return rows.map((r) => LoginAttemptPrismaMapper.toDomain(r));
  }

  async countRecent(
    identifier: string,
    windowSeconds: number,
    nowMs: number = Date.now(),
  ): Promise<number> {
    const cutoff = new Date(nowMs - windowSeconds * 1000);
    return this.delegate.count({
      where: {
        email: identifier,
        status: 'failed',
        attemptedAt: { gte: cutoff },
      } as never,
    });
  }

  async countRecentByIp(
    ipAddress: string,
    windowSeconds: number,
    nowMs: number = Date.now(),
  ): Promise<number> {
    const cutoff = new Date(nowMs - windowSeconds * 1000);
    return this.delegate.count({
      where: {
        ip: ipAddress,
        status: 'failed',
        attemptedAt: { gte: cutoff },
      } as never,
    });
  }

  async findPaginated(options: LoginAttemptListOptions): Promise<LoginAttemptPaginationResult> {
    const where: Record<string, unknown> = {};
    const f = options.filter ?? {};
    if (f.identifier) where['email'] = f.identifier;
    if (f.status) where['status'] = f.status;
    if (f.ipAddress) where['ip'] = f.ipAddress;

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { attemptedAt: options.sortDir ?? 'desc' },
      }),
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => LoginAttemptPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<LoginAttemptStats> {
    const rows = await this.delegate.findMany();
    const byStatus: Record<string, number> = {};
    let successCount = 0;
    let failureCount = 0;
    let blockedCount = 0;
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'success') successCount++;
      else if (r.status === 'failed') failureCount++;
      else if (r.status === 'blocked') blockedCount++;
    }
    return {
      total: rows.length,
      successCount,
      failureCount,
      blockedCount,
      byStatus,
    };
  }

  async purge(cutoffIso: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { attemptedAt: { lt: new Date(cutoffIso) } } as never,
    });
    return result.count;
  }
}
