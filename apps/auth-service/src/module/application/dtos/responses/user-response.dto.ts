/**
 * UserResponseDTO — Public user snapshot returned to clients
 * @module auth-service/application/dtos/responses
 *
 * NOTE: `type` and `status` are plain strings here because the auth-service
 * domain supports a wider set (customer, vendor, admin, moderator, support,
 * logistics) than the shared UserType enum. Application services map
 * domain values into these strings.
 */
export interface UserResponseDTO {
  readonly id: string;
  readonly email: string;
  readonly phone?: string;
  readonly name: string;
  readonly status: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly mfaEnabled: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
