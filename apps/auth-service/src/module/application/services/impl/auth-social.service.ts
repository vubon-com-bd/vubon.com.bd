import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSocialServiceInterface } from '../interfaces/auth-social.service.interface';
import type { AuthSocialRepository } from '../../../domain/repositories/auth-social.repository.interface';
import { AuthSocialEntity } from '../../../domain/entities/auth-social.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../../../domain/value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../../../domain/value-objects/primitives/social-status.vo';
import { SocialLoginFailedError, SocialLinkFailedError } from '../../errors/social.errors';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';

@Injectable()
export class AuthSocialService
  extends BaseService<AuthSocialEntity, string>
  implements AuthSocialServiceInterface
{
  readonly name = 'AuthSocialService';

  constructor(
    @Inject('AuthSocialRepository') private readonly socialRepo: AuthSocialRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async login(input: {
    provider: string;
    providerUserId: string;
  }): Promise<SocialLoginResponseDTO> {
    const accounts = await this.socialRepo.findByUser(
      UserIdVO.create(input.providerUserId),
    );
    const match = accounts.find((a) => a.provider.value === input.provider);
    if (!match) {
      throw new SocialLoginFailedError(input.provider, 'account not linked');
    }
    throw new SocialLoginFailedError(
      input.provider,
      'social login orchestration not yet wired',
    );
  }

  async link(
    userId: string,
    input: { provider: string; providerUserId: string },
  ): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const provider = SocialProviderVO.create(input.provider);
    const existing = await this.socialRepo.findByProvider(userIdVO, provider);
    if (existing) {
      throw new SocialLinkFailedError(input.provider);
    }

    const entity = AuthSocialEntity.create({
      userId: userIdVO,
      provider,
      providerUserId: input.providerUserId,
      accessToken: SocialTokenVO.create('pending'),
      refreshToken: null,
      status: SocialStatusVO.create('linked'),
      linkedAt: new Date(),
    });
    await this.socialRepo.save(entity);
  }

  async unlink(userId: string, provider: string): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const providerVO = SocialProviderVO.create(provider);
    const existing = await this.socialRepo.findByProvider(userIdVO, providerVO);
    if (!existing) return;
    const unlinked = existing.unlink();
    await this.socialRepo.save(unlinked);
  }
}
