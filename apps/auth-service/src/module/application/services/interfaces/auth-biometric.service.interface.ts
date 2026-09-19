import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto';

export interface AuthBiometricServiceInterface
  extends BaseServiceInterface<AuthBiometricEntity, string> {
  enroll(userId: string, input: { biometricId: string; type: string }): Promise<BiometricResponseDTO>;
  verify(userId: string, biometricId: string): Promise<boolean>;
  disable(userId: string): Promise<void>;
}
