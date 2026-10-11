/**
 * Digest Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DigestEntity } from '../entities/digest.entity.js';
import { DigestIdVO } from '../value-objects/primitives/digest-id.vo.js';
import { DigestStatusVO } from '../value-objects/primitives/digest-status.vo.js';
import { DigestFrequencyVO } from '../value-objects/primitives/digest-frequency.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const DIGEST_REPOSITORY = Symbol('DIGEST_REPOSITORY');

export interface DigestListFilter {
  readonly userId?: string;
  readonly status?: string;
  readonly frequency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DigestListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'periodStart' | 'sentAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DigestListFilter;
}

export interface DigestPaginationResult {
  readonly items: readonly DigestEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DigestRepository extends BaseRepository<DigestEntity, string> {
  findByIdVO(id: DigestIdVO): Promise<DigestEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly DigestEntity[]>;
  findByStatus(status: DigestStatusVO): Promise<readonly DigestEntity[]>;
  findByFrequency(frequency: DigestFrequencyVO): Promise<readonly DigestEntity[]>;
  findLatestByUserId(userId: UserIdVO): Promise<DigestEntity | null>;
  findPaginated(options: DigestListOptions): Promise<DigestPaginationResult>;
  /** Ready-to-send digests. */
  findReadyToSend(): Promise<readonly DigestEntity[]>;
}
