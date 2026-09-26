/**
 * UserActivityResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserActivityResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly metadata?: Readonly<Record<string, string>>;
  readonly createdAt: string;
}
