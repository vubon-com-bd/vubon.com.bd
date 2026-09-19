import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthOAuthEntity } from '../../../domain/entities/auth-oauth.entity';

export interface AuthOAuthServiceInterface
  extends BaseServiceInterface<AuthOAuthEntity, string> {
  authorize(provider: string, scope: string): Promise<{ url: string; state: string }>;
  callback(provider: string, code: string, state: string): Promise<void>;
  revoke(userId: string, provider: string): Promise<void>;
}
