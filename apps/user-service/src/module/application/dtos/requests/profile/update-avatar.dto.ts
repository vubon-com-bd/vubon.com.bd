/**
 * UpdateAvatarRequestDTO
 */
export interface UpdateAvatarRequestDTO {
  readonly userId: string;
  readonly avatarUrl: string;
  readonly fileSizeMB?: number;
  readonly mimeType?: string;
}
