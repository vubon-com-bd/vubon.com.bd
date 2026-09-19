import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';

export interface AuthRecoveryCodeServiceInterface
  extends BaseServiceInterface<AuthRecoveryCodeEntity, string> {
  generate(userId: string, count: number): Promise<RecoveryCodesResponseDTO>;
  consume(userId: string, code: string): Promise<boolean>;
  revokeAll(userId: string): Promise<void>;
}
