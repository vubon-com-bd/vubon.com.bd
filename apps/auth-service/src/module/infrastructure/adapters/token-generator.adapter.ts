/**
 * Token Generator Adapter
 * Implements ITokenGenerator port using shared-utils
 */

import { Injectable } from '@nestjs/common';
import { ITokenGenerator } from '../../domain/ports/token-generator.port.js';
import {
  generateToken,
  generateOTP,
  generateAlphanumeric,
  generateCustomRandom,
  generateUUID,
} from '@vubon/auth-shared-utils';
import { getEnv } from '@vubon/auth-shared-config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenGeneratorAdapter implements ITokenGenerator {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    const env = getEnv();
    this.jwtSecret = env.JWT_SECRET;
    this.jwtExpiresIn = env.JWT_EXPIRES_IN || '7d';
  }

  generateToken(length?: number, encoding?: 'hex' | 'base64' | 'base64url'): string {
    return generateToken(length, encoding);
  }

  generateOTP(digits?: number): string {
    return generateOTP(digits);
  }

  generateAlphanumeric(length?: number): string {
    return generateAlphanumeric(length);
  }

  generateCustomRandom(length?: number, chars?: string): string {
    return generateCustomRandom(length, chars);
  }

  generateUUID(): string {
    return generateUUID();
  }

  generateJWT<T extends Record<string, unknown>>(payload: T, expiresIn?: string): string {
    const expires = expiresIn || this.jwtExpiresIn;
    // Using type assertion to bypass strict type checking
    const options = { expiresIn: expires } as jwt.SignOptions;
    return jwt.sign(payload, this.jwtSecret, options);
  }

  verifyJWT<T extends Record<string, unknown>>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded as T;
    } catch (error) {
      throw new Error(
        `Invalid or expired JWT token: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  generateRefreshToken(userId: string): string {
    const payload = { sub: userId, type: 'refresh' };
    return this.generateJWT(payload, '30d');
  }

  verifyRefreshToken(token: string): string {
    const decoded = this.verifyJWT<{ sub: string; type: string }>(token);
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    return decoded.sub;
  }

  generatePasswordResetToken(userId: string, expiresIn?: string): string {
    const payload = { sub: userId, type: 'password_reset' };
    return this.generateJWT(payload, expiresIn || '1h');
  }

  verifyPasswordResetToken(token: string): string {
    const decoded = this.verifyJWT<{ sub: string; type: string }>(token);
    if (decoded.type !== 'password_reset') {
      throw new Error('Invalid password reset token');
    }
    return decoded.sub;
  }

  generateEmailVerificationToken(userId: string, expiresIn?: string): string {
    const payload = { sub: userId, type: 'email_verification' };
    return this.generateJWT(payload, expiresIn || '7d');
  }

  verifyEmailVerificationToken(token: string): string {
    const decoded = this.verifyJWT<{ sub: string; type: string }>(token);
    if (decoded.type !== 'email_verification') {
      throw new Error('Invalid email verification token');
    }
    return decoded.sub;
  }
}
