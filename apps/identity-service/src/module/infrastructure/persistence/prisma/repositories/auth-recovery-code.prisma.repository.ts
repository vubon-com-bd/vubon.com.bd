import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { AuthRecoveryCodePrismaMapper, type PrismaRecoveryCodeRow } from '../mappers/auth-recovery-code.prisma.mapper.js';
import { AuthRecoveryCodeEntity } from '../../../../domain/entities/auth-recovery-code.entity.js';
import type { AuthRecoveryCodeRepository } from '../../../../domain/repositories/auth-recovery-code.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaRecoveryCodeRow | null>;
  findFirst(args: unknown): Promise<PrismaRecoveryCodeRow | null>;
  findMany(args?: unknown): Promise<PrismaRecoveryCodeRow[]>;
  create(args: unknown): Promise<PrismaRecoveryCodeRow>;
  update(args: unknown): Promise<PrismaRecoveryCodeRow>;
  delete(args: unknown): Promise<PrismaRecoveryCodeRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
  deleteMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class AuthRecoveryCodePrismaRepository implements AuthRecoveryCodeRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authRecoveryCode'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? AuthRecoveryCodePrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => AuthRecoveryCodePrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: AuthRecoveryCodeEntity): Promise<AuthRecoveryCodeEntity> {
    const data = AuthRecoveryCodePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return AuthRecoveryCodePrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: authId.value, deletedAt: null } });
    return rows.map((r) => AuthRecoveryCodePrismaMapper.toDomain(r));
  }
  async findActiveByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({
      where: { userId: authId.value, status: 'active', deletedAt: null } as never,
    });
    return rows.map((r) => AuthRecoveryCodePrismaMapper.toDomain(r));
  }
  async countActiveByAuthId(authId: AuthIdVO): Promise<number> {
    return this.delegate.count({
      where: { userId: authId.value, status: 'active', deletedAt: null } as never,
    });
  }
  async findByCode(authId: AuthIdVO, code: string) {
    const raw = await this.delegate.findFirst({
      where: { userId: authId.value, code, deletedAt: null } as never,
    });
    return raw ? AuthRecoveryCodePrismaMapper.toDomain(raw) : null;
  }
  async revokeAllByAuthId(authId: AuthIdVO): Promise<number> {
    const r = await this.delegate.updateMany({
      where: { userId: authId.value, status: 'active' },
      data: { status: 'revoked' } as never,
    });
    return r.count;
  }
  async deleteAllByAuthId(authId: AuthIdVO): Promise<number> {
    const r = await this.delegate.deleteMany({ where: { userId: authId.value } });
    return r.count;
  }
}
