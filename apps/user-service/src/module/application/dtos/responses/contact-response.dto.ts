/**
 * ContactResponseDTO
 */
export interface ContactResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly value: string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
