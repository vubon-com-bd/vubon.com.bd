/**
 * Logout Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface LogoutResponseDTO {
  readonly success: true;
  readonly message: string;
  readonly loggedOutAt: string;
}
