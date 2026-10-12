/**
 * Backup Code Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { BackupCodeEntity } from '../entities/backup-code.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const BACKUP_CODE_REPOSITORY = Symbol('BACKUP_CODE_REPOSITORY');

export interface BackupCodeListFilter {
  readonly authId?: string;
  readonly used?: boolean;
}

export interface BackupCodeListOptions {
  readonly page: number;
  readonly limit: number;
  readonly filter?: BackupCodeListFilter;
}

export interface BackupCodePaginationResult {
  readonly items: readonly BackupCodeEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BackupCodeRepository extends BaseRepository<BackupCodeEntity, string> {
  findByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]>;
  findUnusedByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]>;
  countUnusedByAuthId(authId: AuthIdVO): Promise<number>;
  findByCode(authId: AuthIdVO, code: string): Promise<BackupCodeEntity | null>;

  findPaginated(options: BackupCodeListOptions): Promise<BackupCodePaginationResult>;

  deleteAllByAuthId(authId: AuthIdVO): Promise<number>;
  softDelete(id: string): Promise<void>;
}
