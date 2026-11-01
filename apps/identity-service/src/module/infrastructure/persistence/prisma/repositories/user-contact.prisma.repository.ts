import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { UserContactPrismaMapper, type PrismaUserContactRow } from '../mappers/user-contact.prisma.mapper.js';
import { UserContactEntity } from '../../../../domain/entities/user-contact.entity.js';
import type { UserContactRepository } from '../../../../domain/repositories/user-contact.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaUserContactRow | null>;
  findFirst(args: unknown): Promise<PrismaUserContactRow | null>;
  findMany(args?: unknown): Promise<PrismaUserContactRow[]>;
  create(args: unknown): Promise<PrismaUserContactRow>;
  update(args: unknown): Promise<PrismaUserContactRow>;
  delete(args: unknown): Promise<PrismaUserContactRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class UserContactPrismaRepository implements UserContactRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('userContact'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? UserContactPrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: UserIdVO) { return this.findByUserIdRaw(userId.value); }
  async findByUserIdRaw(userId: string) {
    const rows = await this.delegate.findMany({ where: { userId, deletedAt: null } });
    return rows.map((r) => UserContactPrismaMapper.toDomain(r));
  }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => UserContactPrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: UserContactEntity): Promise<UserContactEntity> {
    const data = UserContactPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return UserContactPrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findPrimaryByUserId(userId: UserIdVO) {
    const raw = await this.delegate.findFirst({ where: { userId: userId.value, isPrimary: true, deletedAt: null } as never });
    return raw ? UserContactPrismaMapper.toDomain(raw) : null;
  }
  async findByValue(value: string) {
    const raw = await this.delegate.findFirst({ where: { contactValue: value, deletedAt: null } as never });
    return raw ? UserContactPrismaMapper.toDomain(raw) : null;
  }
  async unsetAllPrimary(userId: UserIdVO): Promise<number> {
    const r = await this.delegate.updateMany({
      where: { userId: userId.value, isPrimary: true },
      data: { isPrimary: false } as never,
    });
    return r.count;
  }
}
