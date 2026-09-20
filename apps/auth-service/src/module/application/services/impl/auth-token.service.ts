import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthTokenServiceInterface } from '../interfaces/auth-token.service.interface';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo';
import { InvalidTokenError } from '../../../domain/errors/token.errors';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';
import type { TokenGeneratorPort } from '../../ports/token-generator.port';

const ACCESS_TTL_MS = 15 * 60 * 1000;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthTokenService
  extends BaseService<AuthTokenEntity, string>
  implements AuthTokenServiceInterface
{
  readonly name = 'AuthTokenService';

  constructor(
    @Inject('AuthTokenRepository') private readonly tokenRepo: AuthTokenRepository,
    @Inject('TokenGeneratorPort') private readonly tokenGenerator: TokenGeneratorPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async generatePair(userId: string): Promise<AuthTokenResponseDTO> {
    const jti = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const access = await this.tokenGenerator.generateAccessToken({
      sub: userId,
      type: 'access',
      jti,
    });
    const refresh = await this.tokenGenerator.generateRefreshToken({
      sub: userId,
      type: 'refresh',
      jti,
    });

    const now = Date.now();
    const accessEntity = AuthTokenEntity.create({
      userId: UserIdVO.create(userId),
      tokenValue: TokenValueVO.create(access),
      tokenType: TokenTypeVO.create('access'),
      expiry: TokenExpiryVO.fromNow(ACCESS_TTL_MS),
      issuedAt: new Date(now),
      revokedAt: null,
    });
    const refreshEntity = AuthTokenEntity.create({
      userId: UserIdVO.create(userId),
      tokenValue: TokenValueVO.create(refresh),
      tokenType: TokenTypeVO.create('refresh'),
      expiry: TokenExpiryVO.fromNow(REFRESH_TTL_MS),
      issuedAt: new Date(now),
      revokedAt: null,
    });

    await this.tokenRepo.save(accessEntity);
    await this.tokenRepo.save(refreshEntity);

    return {
      accessToken: access,
      refreshToken: refresh,
      accessExpiresAt: now + ACCESS_TTL_MS,
      refreshExpiresAt: now + REFRESH_TTL_MS,
      tokenType: 'Bearer',
    };
  }

  async refresh(refreshToken: string): Promise<AuthTokenResponseDTO> {
    const payload = await this.tokenGenerator.verify(refreshToken);
    if (payload.type !== 'refresh') {
      throw new InvalidTokenError('not a refresh token');
    }
    const stored = await this.tokenRepo.findByValue(
      TokenValueVO.create(refreshToken),
    );
    if (!stored || !stored.isActive) {
      throw new InvalidTokenError('refresh token not active');
    }
    const revoked = stored.revoke();
    await this.tokenRepo.save(revoked);
    return this.generatePair(payload.sub);
  }

  async revoke(tokenId: string): Promise<void> {
    const entity = await this.tokenRepo.findById(tokenId);
    if (!entity) {
      throw new InvalidTokenError('token not found');
    }
    const revoked = entity.revoke();
    await this.tokenRepo.save(revoked);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.tokenRepo.revokeAllForUser(UserIdVO.create(userId));
  }
}
