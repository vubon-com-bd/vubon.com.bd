import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { OAuthClientEntity } from '../../../../domain/entities/oauth-client.entity.js';
import type {
  OAuthClientRepository,
  OAuthClientListOptions,
  OAuthClientPaginationResult,
  OAuthClientStats,
} from '../../../../domain/repositories/oauth-client.repository.interface.js';

@Injectable()
export class OAuthClientPrismaRepository implements OAuthClientRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  async findById(_id: string): Promise<OAuthClientEntity | null> { return null; }
  async findByClientId(_clientId: string): Promise<OAuthClientEntity | null> { return null; }
  async findActiveClients(): Promise<readonly OAuthClientEntity[]> { return []; }
  async findAll(): Promise<readonly OAuthClientEntity[]> { return []; }
  async exists(_id: string): Promise<boolean> { return false; }
  async save(entity: OAuthClientEntity): Promise<OAuthClientEntity> { return entity; }
  async delete(_id: string): Promise<void> {}
  async softDelete(_id: string): Promise<void> {}
  async findPaginated(_options: OAuthClientListOptions): Promise<OAuthClientPaginationResult> {
    return { items: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
  async getStats(): Promise<OAuthClientStats> {
    return { total: 0, activeCount: 0, publicCount: 0, confidentialCount: 0 };
  }
}
