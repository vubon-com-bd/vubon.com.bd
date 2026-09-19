import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto';

export interface AuthLoginAttemptServiceInterface
  extends BaseServiceInterface<AuthLoginAttemptEntity, string> {
  record(input: {
    userId: string | null;
    email: string | null;
    ip: string;
    userAgent: string;
    status: string;
  }): Promise<void>;
  countRecent(userId: string, windowMs: number): Promise<number>;
}
