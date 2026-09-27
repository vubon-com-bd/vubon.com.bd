/**
 * SettingsResponseDTO
 */
export interface SettingsResponseDTO {
  readonly userId: string;
  readonly theme: string;
  readonly language: string;
  readonly locale: string;
  readonly timezone: string;
  readonly currency: string;
  readonly dateFormat: string;
  readonly timeFormat: string;
  readonly itemsPerPage: number;
  readonly notifications: boolean;
  readonly twoFactor: boolean;
  readonly updatedAt: string;
}
