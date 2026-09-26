import {
  AUTH_TOKEN_REPO,
  TOKEN_SIGNER,
  ID_GENERATOR,
} from '../tokens';

/**
 * AuthTokenService — Token generation, verification, refresh
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type {
  AuthTokenServiceInterface,
  TokenPurpose,
} from '../interfaces/auth-token.service.interface';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import type { TokenSignerServiceInterface } from '../interfaces/token-signer.service.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import {
  TokenExpiryVO,
  type TokenTypeHint,
} from '../../../domain/value-objects/primitives/token-expiry.vo';
import {
  TokenExpiredAppError,
  TokenInvalidAppError,
} from '../../errors/token.errors';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';


@Injectable()
export class AuthTokenService
  extends BaseService<AuthTokenEntity, string>
  implements AuthTokenServiceInterface {
  readonly name = 'AuthTokenService';

  constructor(
    @Inject(AUTH_TOKEN_REPO) private readonly tokenRepo: AuthTokenRepository,
    @Inject(TOKEN_SIGNER) private readonly signer: TokenSignerServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async generate(input: {
    subjectId: string;
    purpose: TokenPurpose;
    metadata?: Readonly<Record<string, unknown>>;
    parentTokenId?: string;
  }): Promise<AuthTokenEntity> {
    const tokenId = this.idGen.generate();
    const now = Date.now();
    const expiry = TokenExpiryVO.forType(input.purpose as TokenTypeHint, now);

    const jwt = await this.signer.sign({
      sub: input.subjectId,
      jti: tokenId,
      type: input.purpose,
      iat: Math.floor(now / 1000),
      exp: Math.floor(expiry.epochMs / 1000),
      meta: input.metadata,
    });

    const entity = AuthTokenEntity.create({
      id: tokenId,
      subjectId: input.subjectId,
      value: TokenValueVO.of(jwt),
      type: TokenTypeVO.of(input.purpose),
      expiry,
      parentTokenId: input.parentTokenId,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });

    return this.tokenRepo.save(entity);
  }

  async generatePair(subjectId: string): Promise<AuthTokenResponseDTO> {
    const access = await this.generate({ subjectId, purpose: 'access' });
    const refresh = await this.generate({
      subjectId,
      purpose: 'refresh',
      parentTokenId: access.id,
    });

    return {
      accessToken: access.value.value,
      refreshToken: refresh.value.value,
      tokenType: 'Bearer',
      expiresIn: Math.floor(access.expiry.remainingMs(Date.now()) / 1000),
      expiresAt: access.expiry.epochMs,
    };
  }

  async verify(
    token: string,
    purpose?: TokenPurpose,
  ): Promise<AuthTokenEntity> {
    let payload;
    try {
      payload = await this.signer.verify(token);
    } catch {
      throw new TokenInvalidAppError('Signature verification failed');
    }

    if (payload.exp * 1000 <= Date.now()) {
      throw new TokenExpiredAppError(
        new Date(payload.exp * 1000).toISOString(),
      );
    }
    if (purpose && payload.type !== purpose) {
      throw new TokenInvalidAppError(
        `Expected ${purpose}, got ${payload.type}`,
      );
    }

    const entity = await this.tokenRepo.findById(payload.jti);
    if (!entity) {
      throw new TokenInvalidAppError('Token not found in store');
    }
    if (entity.isRevoked()) {
      throw new TokenInvalidAppError('Token has been revoked');
    }
    return entity;
  }

  async revoke(tokenId: string): Promise<void> {
    const entity = await this.tokenRepo.findById(tokenId);
    if (!entity) return;
    entity.revoke(Date.now());
    await this.tokenRepo.save(entity);
  }

  async revokeAllForSubject(subjectId: string): Promise<number> {
    return this.tokenRepo.revokeAllForSubject(subjectId, Date.now());
  }

  async refresh(refreshToken: string): Promise<AuthTokenResponseDTO> {
    const entity = await this.verify(refreshToken, 'refresh');
    entity.revoke(Date.now());
    await this.tokenRepo.save(entity);
    return this.generatePair(entity.subjectId);
  }
}
