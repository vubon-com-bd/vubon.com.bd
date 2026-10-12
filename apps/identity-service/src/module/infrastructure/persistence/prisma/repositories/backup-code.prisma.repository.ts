import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { BackupCodePrismaMapper, type PrismaBackupCodeRow } from '../mappers/backup-code.prisma.mapper.js';
import { BackupCodeEntity } from '../../../../domain/entities/backup-code.entity.js';
import type {
  BackupCodeRepository,
  BackupCodeListOptions,
  BackupCodePaginationResult,
} from '../../../../domain/repositories/backup-code.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaBackupCodeRow | null>;
  findFirst(args: unknown): Promise<PrismaBackupCodeRow | null>;
  findMany(args?: unknown): Promise<PrismaBackupCodeRow[]>;
  create(args: unknown): Promise<PrismaBackupCodeRow>;
  update(args: unknown): Promise<PrismaBackupCodeRow>;
  delete(args: unknown): Promise<PrismaBackupCodeRow>;
  count(args?: unknown): Promise<number>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class BackupCodePrismaRepository implements BackupCodeRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authRecoveryCode'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? BackupCodePrismaMapper.toDomain({
      ...raw, used: !!raw.usedAt, code: raw.code,
    }) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => BackupCodePrismaMapper.toDomain({ ...r, used: !!r.usedAt }));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: BackupCodeEntity): Promise<BackupCodeEntity> {
    const data = BackupCodePrismaMapper.toPersistence(entity);
    const raw = await this.delegate.create({ data: data as never });
    return BackupCodePrismaMapper.toDomain({ ...raw, used: !!raw.usedAt });
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: authId.value, deletedAt: null } });
    return rows.map((r) => BackupCodePrismaMapper.toDomain({ ...r, used: !!r.usedAt }));
  }
  async findUnusedByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: authId.value, usedAt: null, deletedAt: null } as never });
    return rows.map((r) => BackupCodePrismaMapper.toDomain({ ...r, used: false }));
  }
  async countUnusedByAuthId(authId: AuthIdVO): Promise<number> {
    return this.delegate.count({ where: { userId: authId.value, usedAt: null, deletedAt: null } as never });
  }
  async findByCode(authId: AuthIdVO, code: string) {
    const raw = await this.delegate.findFirst({ where: { userId: authId.value, code, deletedAt: null } as never });
    return raw ? BackupCodePrismaMapper.toDomain({ ...raw, used: !!raw.usedAt }) : null;
  }
  async findPaginated(options: BackupCodeListOptions): Promise<BackupCodePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.authId) where['userId'] = options.filter.authId;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => BackupCodePrismaMapper.toDomain({ ...r, used: !!r.usedAt })),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async deleteAllByAuthId(authId: AuthIdVO): Promise<number> {
    const r = await this.delegate.deleteMany({ where: { userId: authId.value } });
    return r.count;
  }
}
