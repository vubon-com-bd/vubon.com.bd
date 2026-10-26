/**
 * IPreferenceMatrixService — contract
 * @module notification-service/application/services/interfaces
 */
import type { PreferenceMatrixResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

export const PREFERENCE_MATRIX_SERVICE = Symbol('PREFERENCE_MATRIX_SERVICE');

export interface IPreferenceMatrixService {
  getByUser(userId: string): Promise<PreferenceMatrixResponseDTO>;
  getSnapshot(userId: string): Promise<PreferenceMatrixResponseDTO | null>;
  getHistory(userId: string, limit?: number): Promise<readonly PreferenceMatrixResponseDTO[]>;
}
