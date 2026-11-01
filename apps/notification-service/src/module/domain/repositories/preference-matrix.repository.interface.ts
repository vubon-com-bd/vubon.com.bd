/**
 * PreferenceMatrix Repository Interface
 * @module notification-service/domain/repositories
 *
 * Snapshot repository — usually 1 active matrix per user।
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PreferenceMatrixEntity } from '@domain/entities/preference-matrix.entity.js';
import type { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';

export const PREFERENCE_MATRIX_REPOSITORY = Symbol('PREFERENCE_MATRIX_REPOSITORY');

export interface PreferenceMatrixRepository
  extends BaseRepository<PreferenceMatrixEntity, string> {
  findByPreference(preferenceId: PreferenceIdVO | string): Promise<PreferenceMatrixEntity | null>;
  findLatestSnapshot(preferenceId: string): Promise<PreferenceMatrixEntity | null>;
  findHistory(preferenceId: string, limit?: number): Promise<readonly PreferenceMatrixEntity[]>;
  deleteOldSnapshots(preferenceId: string, keepCount: number): Promise<number>;
}
