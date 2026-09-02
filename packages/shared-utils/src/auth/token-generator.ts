/**
 * Auth Token Generator
 * প্রমীকরণ টোকেন জেনারেটর
 */

import { AUTH_TOKEN } from '@vubon/shared-constants';
import { idGenerator } from '../common/generator/id-generator';

export const AuthTokenGenerator = {
  /**
   * Generate JWT token
   * জেডব্লিউটি টোকেন তৈরি করা
   */
  generateJWT: (
    payload: Record<string, unknown>,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.ACCESS
  ): { token: string; expiresAt: Date } => {
    // In real implementation, use a JWT library like jsonwebtoken
    // This is a simplified version
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = btoa(
      JSON.stringify({
        ...payload,
        exp: Math.floor(Date.now() / 1000) + expiresIn,
        iat: Math.floor(Date.now() / 1000),
      })
    );
    const signature = btoa(`${header}.${encodedPayload}.${secret}`);

    const token = `${header}.${encodedPayload}.${signature}`;
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    return { token, expiresAt };
  },

  /**
   * Generate access token
   * অ্যাক্সেস টোকেন তৈরি করা
   */
  generateAccessToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.ACCESS
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.ACCESS,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate refresh token
   * রিফ্রেশ টোকেন তৈরি করা
   */
  generateRefreshToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.REFRESH
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.REFRESH,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate verification token
   * ভেরিফিকেশন টোকেন তৈরি করা
   */
  generateVerificationToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.VERIFICATION
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.VERIFICATION,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate password reset token
   * পাসওয়ার্ড রিসেট টোকেন তৈরি করা
   */
  generatePasswordResetToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.PASSWORD_RESET
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.PASSWORD_RESET,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate magic link token
   * ম্যাজিক লিংক টোকেন তৈরি করা
   */
  generateMagicLinkToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.MAGIC_LINK
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.MAGIC_LINK,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate MFA token
   * এমএফএ টোকেন তৈরি করা
   */
  generateMFAToken: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.MFA
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.MFA,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Generate API key
   * এপিআই কী তৈরি করা
   */
  generateAPIKey: (
    userId: string,
    secret: string,
    expiresIn: number = AUTH_TOKEN.EXPIRY.API_KEY
  ): { token: string; expiresAt: Date } => {
    const payload = {
      sub: userId,
      type: AUTH_TOKEN.API_KEY,
      jti: idGenerator.shortId(16),
    };
    return AuthTokenGenerator.generateJWT(payload, secret, expiresIn);
  },

  /**
   * Verify JWT token
   * জেডব্লিউটি টোকেন ভেরিফাই করা
   */
  verifyJWT: (token: string, secret: string): Record<string, unknown> | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const [header, payload, signature] = parts;
      const expectedSignature = btoa(`${header}.${payload}.${secret}`);

      if (signature !== expectedSignature) return null;

      const decodedPayload = JSON.parse(atob(payload));

      // Check expiration
      if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      return decodedPayload;
    } catch {
      return null;
    }
  },

  /**
   * Decode JWT token without verification
   * ভেরিফিকেশন ছাড়া জেডব্লিউটি টোকেন ডিকোড করা
   */
  decodeJWT: (token: string): Record<string, unknown> | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch {
      return null;
    }
  },
};
