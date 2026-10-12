import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { AuthBiometricPrismaMapper, type PrismaBiometricRow } from '../mappers/auth-biometric.prisma.mapper.js';
import { AuthBiometricEntity } from '../../../../domain/entities/auth-biometric.entity.js';
import type { AuthBiometricRepository } from '../../../../domain/repositories/auth-biometric.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaBiometricRow | null>;
  findFirst(args: unknown): Promise<PrismaBiometricRow | null>;
  findMany(args?: unknown): Promise<PrismaBiometricRow[]>;
  create(args: unknown): Promise<PrismaBiometricRow>;
  update(args: unknown): Promise<PrismaBiometricRow>;
  delete(args: unknown): Promise<PrismaBiometricRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class AuthBiometricPrismaRepository implements AuthBiometricRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authBiometric'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? AuthBiometricPrismaMapper.toDomain(raw) : null;
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => AuthBiometricPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: AuthBiometricEntity): Promise<AuthBiometricEntity> {
    const data = AuthBiometricPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return AuthBiometricPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByAuthId(authId: AuthIdVO) {
    const rows = await this.delegate.findMany({ where: { userId: authId.value, deletedAt: null } });
    return rows.map((r) => AuthBiometricPrismaMapper.toDomain(r));
  }
  async findByAuthIdRaw(authId: string) {
    const rows = await this.delegate.findMany({ where: { userId: authId, deletedAt: null } });
    return rows.map((r) => AuthBiometricPrismaMapper.toDomain(r));
  }
  async findByAuthIdAndDevice(authId: AuthIdVO, deviceId: string) {
    const raw = await this.delegate.findFirst({
      where: { userId: authId.value, deviceId, deletedAt: null } as never,
    });
    return raw ? AuthBiometricPrismaMapper.toDomain(raw) : null;
  }
  async findStale(inactiveDays: number) {
    const cutoff = new Date(Date.now() - inactiveDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { lastUsedAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => AuthBiometricPrismaMapper.toDomain(r));
  }
}
