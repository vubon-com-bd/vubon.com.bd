/**
 * IPreferenceService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  UpdatePreferenceRequestDTO,
  BulkUpdatePreferenceRequestDTO,
  UnsubscribeRequestDTO,
} from '@application/dtos/requests/preference/index.js';
import type {
  PreferenceResponseDTO,
  PreferenceMatrixResponseDTO,
  PreferenceDefaultsResponseDTO,
} from '@application/dtos/responses/preference-response.dto.js';

export const PREFERENCE_SERVICE = Symbol('PREFERENCE_SERVICE');

export interface PreferenceListFilterDTO {
  readonly timezone?: string;
  readonly locale?: string;
  readonly locked?: boolean;
}

export interface PreferenceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PreferenceListFilterDTO;
}

export interface PreferenceListResponseDTO {
  readonly items: readonly PreferenceResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface IPreferenceService {
  // Commands
  update(
    dto: UpdatePreferenceRequestDTO,
    actorId?: string,
  ): Promise<PreferenceResponseDTO>;

  bulkUpdate(
    dto: BulkUpdatePreferenceRequestDTO,
    actorId?: string,
  ): Promise<{ readonly updated: number; readonly failed: number }>;

  unsubscribe(
    dto: UnsubscribeRequestDTO,
    actorId?: string,
  ): Promise<PreferenceResponseDTO>;

  // Queries
  getByUser(userId: string): Promise<PreferenceResponseDTO>;
  getMatrix(userId: string): Promise<PreferenceMatrixResponseDTO>;
  getDefaults(): Promise<PreferenceDefaultsResponseDTO>;
  list(options: PreferenceListOptionsDTO): Promise<PreferenceListResponseDTO>;
}
