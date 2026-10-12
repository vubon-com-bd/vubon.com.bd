/**
 * TokenGeneratorService — JWT signing + opaque token generation
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { JwtService } from '@vubon/shared-kernel/infrastructure/security';
import { AUTH_TOKEN, AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';

export interface AccessTokenPayload {
  readonly sub: string;
  readonly sid: string;
  readonly type: typeof AUTH_TOKEN_TYPE.ACCESS;
  readonly scope?: readonly string[];
}

export interface GeneratedTokenPair {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
  readonly expiresAt: number;
}

@Injectable()
export class TokenGeneratorService {
  private readonly logger = new Logger(TokenGeneratorService.name);

  constructor(private readonly jwt: JwtService) {}

  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwt.sign({
      sub: payload.sub,
      sid: payload.sid,
      type: payload.type,
      scope: payload.scope,
    } as never);
  }

  generateRefreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  generateOpaqueToken(bytes = 32): string {
    return randomBytes(bytes).toString('hex');
  }

  async generatePair(payload: AccessTokenPayload): Promise<GeneratedTokenPair> {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken();
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 15 * 60;
    return {
      accessToken,
      refreshToken,
      expiresIn,
      expiresAt: now + expiresIn,
    };
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  accessTtlSeconds(): number {
    return 15 * 60;
  }

  refreshTtlSeconds(): number {
    return 7 * 24 * 3600;
  }

  issuer(): string {
    return AUTH_TOKEN.ISSUER;
  }

  audience(): string {
    return AUTH_TOKEN.AUDIENCE;
  }
}
