/**
 * BiometricResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface BiometricResponseDTO {
  readonly enabled: boolean;
  readonly biometricId?: string;
  readonly kind?: 'fingerprint' | 'face' | 'voice' | 'iris';
  readonly enrolledAt?: string;
  readonly deviceId?: string;
}
