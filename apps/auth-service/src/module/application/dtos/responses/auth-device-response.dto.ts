/**
 * AuthDeviceResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthDeviceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly type: string;
  readonly status: string;
  readonly fingerprintMasked: string;
  readonly firstSeenAt: string;
  readonly lastSeenAt: string;
  readonly isTrusted: boolean;
}
