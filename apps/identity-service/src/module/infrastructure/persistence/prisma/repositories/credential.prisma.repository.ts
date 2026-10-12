import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { CredentialEntity } from '../../../../domain/entities/credential.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import type {
  CredentialRepository,
  CredentialListOptions,
  CredentialPaginationResult,
} from '../../../../domain/repositories/credential.repository.interface.js';

@Injectable()
export class CredentialPrismaRepository implements CredentialRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  async findById(id: string): Promise<CredentialEntity | null> {
    // Credentials live on User.password — return null here; read via user repo
    void id;
    return null;
  }
  async findByAuthId(_authId: AuthIdVO): Promise<CredentialEntity | null> { return null; }
  async findByAuthIdRaw(_authId: string): Promise<CredentialEntity | null> { return null; }
  async findAll(): Promise<readonly CredentialEntity[]> { return []; }
  async exists(_id: string): Promise<boolean> { return false; }
  async save(entity: CredentialEntity): Promise<CredentialEntity> { return entity; }
  async delete(_id: string): Promise<void> {}
  async softDelete(_id: string): Promise<void> {}
  async findPaginated(_options: CredentialListOptions): Promise<CredentialPaginationResult> {
    return { items: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
  async findExpired(): Promise<readonly CredentialEntity[]> { return []; }
  async findMustChange(): Promise<readonly CredentialEntity[]> { return []; }
}
