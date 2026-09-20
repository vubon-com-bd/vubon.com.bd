import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSsoServiceInterface } from '../interfaces/auth-sso.service.interface';
import type { AuthSsoRepository } from '../../../domain/repositories/auth-sso.repository.interface';
import { AuthSsoEntity } from '../../../domain/entities/auth-sso.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { SsoProviderVO } from '../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../../../domain/value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../../../domain/value-objects/primitives/sso-status.vo';
import { SsoLoginFailedError } from '../../errors/sso.errors';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';

@Injectable()
export class AuthSsoService
  extends BaseService<AuthSsoEntity, string>
  implements AuthSsoServiceInterface
{
  readonly name = 'AuthSsoService';

  constructor(
    @Inject('AuthSsoRepository') private readonly ssoRepo: AuthSsoRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async login(provider: string, externalId: string): Promise<SsoLoginResponseDTO> {
    const match = await this.ssoRepo.findByExternalId(externalId);
    if (!match) {
      throw new SsoLoginFailedError(provider, 'external ID not linked');
    }
    throw new SsoLoginFailedError(
      provider,
      'SSO login orchestration not yet wired',
    );
  }

  async callback(provider: string, token: string): Promise<SsoLoginResponseDTO> {
    void provider;
    void token;
    throw new SsoLoginFailedError(
      provider,
      'SSO callback orchestration not yet wired',
    );
  }

  async link(
    userId: string,
    provider: string,
    externalId: string,
  ): Promise<void> {
    const entity = AuthSsoEntity.create({
      userId: UserIdVO.create(userId),
      provider: SsoProviderVO.create(provider),
      externalId,
      sessionToken: SsoTokenVO.create('pending'),
      status: SsoStatusVO.create('active'),
      linkedAt: new Date(),
    });
    await this.ssoRepo.save(entity);
  }

  async unlink(userId: string, provider: string): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const providerVO = SsoProviderVO.create(provider);
    const existing = await this.ssoRepo.findByProvider(userIdVO, providerVO);
    if (!existing) return;
    const revoked = existing.revoke();
    await this.ssoRepo.save(revoked);
  }
}
