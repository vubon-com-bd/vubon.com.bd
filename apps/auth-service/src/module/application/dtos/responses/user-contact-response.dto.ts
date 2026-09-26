/**
 * UserContactResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserContactResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly email?: string;
  readonly phone?: string;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
