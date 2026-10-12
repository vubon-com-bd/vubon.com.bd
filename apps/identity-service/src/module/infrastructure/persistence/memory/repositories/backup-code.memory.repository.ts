import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { BackupCodeEntity } from '../../../../domain/entities/backup-code.entity.js';
import type {
  BackupCodeRepository,
  BackupCodeListOptions,
  BackupCodePaginationResult,
} from '../../../../domain/repositories/backup-code.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryBackupCodeRepository
  extends InMemoryRepository<BackupCodeEntity, string>
  implements BackupCodeRepository
{
  protected idOf(entity: BackupCodeEntity): string { return entity.id; }
  async findByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }
  async findUnusedByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]> {
    return (await this.findByAuthId(authId)).filter((e) => !e.used);
  }
  async countUnusedByAuthId(authId: AuthIdVO): Promise<number> {
    return (await this.findUnusedByAuthId(authId)).length;
  }
  async findByCode(authId: AuthIdVO, code: string): Promise<BackupCodeEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.code.value === code) ?? null;
  }
  async findPaginated(options: BackupCodeListOptions): Promise<BackupCodePaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return { items: all.slice(start, start + options.limit), total: all.length, page: options.page, limit: options.limit, totalPages: Math.ceil(all.length / options.limit) };
  }
  async deleteAllByAuthId(_authId: AuthIdVO): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
