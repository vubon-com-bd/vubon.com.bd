import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthSocialEntity } from '../../../domain/entities/auth-social.entity';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';

export interface AuthSocialServiceInterface
  extends BaseServiceInterface<AuthSocialEntity, string> {
  login(input: { provider: string; providerUserId: string }): Promise<SocialLoginResponseDTO>;
  link(userId: string, input: { provider: string; providerUserId: string }): Promise<void>;
  unlink(userId: string, provider: string): Promise<void>;
}
