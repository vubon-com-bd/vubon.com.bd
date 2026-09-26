/**
 * UserPreferencesResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserPreferencesResponseDTO {
  readonly userId: string;
  readonly theme: 'light' | 'dark' | 'system';
  readonly currency: string;
  readonly dateFormat: string;
  readonly reduceMotion: boolean;
  readonly updatedAt: string;
}
