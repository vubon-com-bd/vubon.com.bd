import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { RolePrismaMapper, type PrismaRoleRow } from '../mappers/role.prisma.mapper.js';
import { RoleEntity } from '../../../../domain/entities/role.entity.js';
import type {
  RoleRepository,
  RoleListOptions,
  RolePaginationResult,
  RoleStats,
} from '../../../../domain/repositories/role.repository.interface.js';
import type { RoleIdVO } from '../../../../domain/value-objects/primitives/role-id.vo.js';

interface Delegate {
  findUnique(args: unknown): Promise<PrismaRoleRow | null>;
  findFirst(args: unknown): Promise<PrismaRoleRow | null>;
  findMany(args?: unknown): Promise<PrismaRoleRow[]>;
  create(args: unknown): Promise<PrismaRoleRow>;
  update(args: unknown): Promise<PrismaRoleRow>;
  delete(args: unknown): Promise<PrismaRoleRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class RolePrismaRepository implements RoleRepository {
  constructor(private readonly prisma: AuthPrismaService) {}
  private get delegate(): Delegate { return this.prisma.getModel<Delegate>('authRole'); }

  async findById(id: string) {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? RolePrismaMapper.toDomain(raw) : null;
  }
  async findByIdVO(id: RoleIdVO) { return this.findById(id.value); }
  async findAll() {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => RolePrismaMapper.toDomain(r));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }
  async save(entity: RoleEntity): Promise<RoleEntity> {
    const data = RolePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } as never });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return RolePrismaMapper.toDomain(raw);
  }
  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async softDelete(id: string): Promise<void> { return this.delete(id); }
  async findByName(name: string) {
    const raw = await this.delegate.findFirst({ where: { name, deletedAt: null } });
    return raw ? RolePrismaMapper.toDomain(raw) : null;
  }
  async findSystemRoles() {
    const rows = await this.delegate.findMany({ where: { isSystem: true, deletedAt: null } as never });
    return rows.map((r) => RolePrismaMapper.toDomain(r));
  }
  async findWithPermission(_permission: string) { return []; }
  async findPaginated(options: RoleListOptions): Promise<RolePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter?.name) where['name'] = options.filter.name;
    if (options.filter?.isSystemRole !== undefined) where['isSystem'] = options.filter.isSystemRole;
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => RolePrismaMapper.toDomain(r)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
  async getStats(): Promise<RoleStats> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const byLevel: Record<string, number> = {};
    let systemRoleCount = 0;
    for (const r of rows) {
      if (r.isSystem) systemRoleCount++;
    }
    return { total: rows.length, systemRoleCount, byLevel };
  }
}
