import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { SsoConfigEntity } from '../../../../domain/entities/sso-config.entity.js';
import type {
  SsoConfigRepository,
  SsoConfigListOptions,
  SsoConfigPaginationResult,
  SsoConfigStats,
} from '../../../../domain/repositories/sso-config.repository.interface.js';

@Injectable()
export class SsoConfigPrismaRepository implements SsoConfigRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  async findById(_id: string): Promise<SsoConfigEntity | null> { return null; }
  async findByName(_name: string): Promise<SsoConfigEntity | null> { return null; }
  async findByProvider(_provider: string): Promise<readonly SsoConfigEntity[]> { return []; }
  async findActive(): Promise<readonly SsoConfigEntity[]> { return []; }
  async findAll(): Promise<readonly SsoConfigEntity[]> { return []; }
  async exists(_id: string): Promise<boolean> { return false; }
  async save(entity: SsoConfigEntity): Promise<SsoConfigEntity> { return entity; }
  async delete(_id: string): Promise<void> {}
  async softDelete(_id: string): Promise<void> {}
  async findPaginated(_options: SsoConfigListOptions): Promise<SsoConfigPaginationResult> {
    return { items: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
  async getStats(): Promise<SsoConfigStats> {
    return { total: 0, activeCount: 0, byProvider: {} };
  }
}
