/**
 * Contact Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface ContactResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly contactType: string;
  readonly contactValue: string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly verifiedAt?: string;
  readonly createdAt: string;
}
