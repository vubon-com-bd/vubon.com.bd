import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { Auth2FaPrismaMapper, type Prisma2FaRow } from '../mappers/auth-2fa.prisma.mapper.js';
import { AuthTwoFactorEntity } from '../../../../domain/entities/auth-2fa.entity.js';
import type { Auth2FaRepository } from '../../../../domain/repositories/auth-2fa.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<Prisma2FaRow | null>;
  findFirst(args: unknown): Promise<Prisma2FaRow | null>;
  findMany(args?: unknown): Promise<Prisma2FaRow[]>;
  create(args: unknown): Promise<Prisma2FaRow>;
  update(args: unknown): Promise<Prisma2FaRow>;
  delete(args: unknown): Promise<Prisma2FaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class Auth2FaPrismaRepository implements Auth2FaRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('auth2Fa'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? Auth2FaPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => Auth2FaPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: AuthTwoFactorEntity): Promise<AuthTwoFactorEntity> {
    const data = Auth2FaPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return Auth2FaPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByAuthId(authId: AuthIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: authId.value, deletedAt: null } });
    return raw ? Auth2FaPrismaMapper.toDomain(raw) : null;
  }
  async findByAuthIdRaw(authId: string) {
    const raw = await this.delegate.findFirst({ where: { userId: authId, deletedAt: null } });
    return raw ? Auth2FaPrismaMapper.toDomain(raw) : null;
  }
  async findEnabledByAuthId(authId: AuthIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: authId.value, enabledAt: { not: null }, deletedAt: null } as never });
    return raw ? Auth2FaPrismaMapper.toDomain(raw) : null;
  }
  async findLocked() {
    const rows = await this.delegate.findMany({ where: { status: 'locked', deletedAt: null } as never });
    return rows.map((r) => Auth2FaPrismaMapper.toDomain(r));
  }
  async findUnverified(olderThanHours: number) {
    const cutoff = new Date(Date.now() - olderThanHours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { verified: false, createdAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => Auth2FaPrismaMapper.toDomain(r));
  }
}
