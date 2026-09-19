import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto';

export interface AuthMfaServiceInterface
  extends BaseServiceInterface<AuthMfaEntity, string> {
  setup(userId: string, method: string): Promise<MfaResponseDTO>;
  verify(userId: string, code: string): Promise<boolean>;
  disable(userId: string): Promise<void>;
  isEnabled(userId: string): Promise<boolean>;
}
