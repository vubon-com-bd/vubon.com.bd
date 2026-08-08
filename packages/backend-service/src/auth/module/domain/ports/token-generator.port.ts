// packages/backend-service/src/auth/module/domain/ports/token-generator.port.ts

// ✅ Shared types
import type { DefaultRole } from '@vubon/shared-types';
import type { UserId } from '../value-objects/user-id.vo';
import type { Token } from '../value-objects/token.vo';

/**
 * Token type definitions
 */
export type TokenType = 'access' | 'refresh' | 'verification' | 'reset' | 'api_key';

/**
 * Token payload interface
 */
export interface TokenPayload {
  /** User ID */
  userId: string;
  /** User email */
  email: string;
  /** User roles */
  roles: DefaultRole[];
  /** User permissions */
  permissions: string[];
  /** Session ID (for access/refresh tokens) */
  sessionId?: string;
  /** Device ID (for access/refresh tokens) */
  deviceId?: string;
  /** Token type */
  type: TokenType;
  /** Token version (for refresh tokens) */
  version?: number;
  /** Additional claims */
  [key: string]: unknown;
}

/**
 * Token generation options interface
 */
export interface TokenGenerationOptions {
  /** Token expiry time (e.g., '15m', '1h', '7d' or seconds) */
  expiresIn?: string | number;
  /** Token issuer (optional) */
  issuer?: string;
  /** Token audience (optional) */
  audience?: string;
  /** Additional claims to include (optional) */
  additionalClaims?: Record<string, unknown>;
}

/**
 * Token verification result interface
 */
export interface TokenVerificationResult<T = TokenPayload> {
  /** Whether the token is valid */
  isValid: boolean;
  /** Decoded token payload (if valid) */
  payload?: T;
  /** Error message (if invalid) */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Refresh token rotation result interface
 */
export interface RefreshTokenRotationResult {
  /** New refresh token */
  newRefreshToken: Token;
  /** New refresh token version */
  version: number;
  /** Token family ID */
  familyId: string;
}

/**
 * Token Generator Port Interface
 *
 * ডোমেইন লেয়ারকে টোকেন জেনারেশন ও ভেরিফিকেশন সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার JWT বা অন্যান্য টোকেন জেনারেট ও ভেরিফাই করতে পারে।
 */
export interface ITokenGenerator {
  /**
   * একটি অ্যাক্সেস টোকেন জেনারেট করে
   * @param payload - টোকেন পেলোড
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns জেনারেটেড টোকেন (Token Value Object)
   */
  generateAccessToken(payload: Omit<TokenPayload, 'type'>, options?: TokenGenerationOptions): Token;

  /**
   * একটি রিফ্রেশ টোকেন জেনারেট করে
   * @param payload - টোকেন পেলোড
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns জেনারেটেড টোকেন (Token Value Object)
   */
  generateRefreshToken(
    payload: Omit<TokenPayload, 'type'>,
    options?: TokenGenerationOptions
  ): Token;

  /**
   * একটি রিফ্রেশ টোকেন রোটেট করে (নতুন টোকেন তৈরি করে)
   * @param oldRefreshToken - পুরানো রিফ্রেশ টোকেন
   * @param payload - টোকেন পেলোড
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns রিফ্রেশ টোকেন রোটেশন ফলাফল
   */
  rotateRefreshToken(
    oldRefreshToken: Token | string,
    payload: Omit<TokenPayload, 'type' | 'version'>,
    options?: TokenGenerationOptions
  ): Promise<RefreshTokenRotationResult>;

  /**
   * একটি রিফ্রেশ টোকেন ভেরিফাই করে
   * @param token - রিফ্রেশ টোকেন (Token Value Object বা স্ট্রিং)
   * @returns টোকেন ভেরিফিকেশন ফলাফল
   */
  verifyRefreshToken(token: Token | string): TokenVerificationResult<TokenPayload>;

  /**
   * একটি ভেরিফিকেশন টোকেন জেনারেট করে (ইমেইল/ফোন ভেরিফিকেশনের জন্য)
   * @param userId - ইউজার আইডি
   * @param email - ইমেইল ঠিকানা
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns জেনারেটেড টোকেন (Token Value Object)
   */
  generateVerificationToken(
    userId: UserId | string,
    email: string,
    options?: TokenGenerationOptions
  ): Token;

  /**
   * একটি পাসওয়ার্ড রিসেট টোকেন জেনারেট করে
   * @param userId - ইউজার আইডি
   * @param email - ইমেইল ঠিকানা
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns জেনারেটেড টোকেন (Token Value Object)
   */
  generateResetToken(
    userId: UserId | string,
    email: string,
    options?: TokenGenerationOptions
  ): Token;

  /**
   * একটি API কী টোকেন জেনারেট করে
   * @param userId - ইউজার আইডি
   * @param name - API কী এর নাম
   * @param options - টোকেন জেনারেশন অপশন (optional)
   * @returns জেনারেটেড টোকেন (Token Value Object)
   */
  generateApiKey(userId: UserId | string, name: string, options?: TokenGenerationOptions): Token;

  /**
   * একটি টোকেন ভেরিফাই করে
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @param type - টোকেনের ধরন (optional)
   * @returns টোকেন ভেরিফিকেশন ফলাফল
   */
  verifyToken<T = TokenPayload>(
    token: Token | string,
    type?: TokenType
  ): TokenVerificationResult<T>;

  /**
   * একটি টোকেন ডিকোড করে (ভেরিফিকেশন ছাড়া)
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @returns ডিকোডেড টোকেন পেলোড বা null
   */
  decodeToken<T = TokenPayload>(token: Token | string): T | null;

  /**
   * একটি টোকেনের মেয়াদ শেষ হয়েছে কিনা চেক করে
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @returns true যদি মেয়াদ শেষ হয়, false যদি না হয়
   */
  isTokenExpired(token: Token | string): boolean;

  /**
   * একটি টোকেন ব্ল্যাকলিস্টে যোগ করে (রিভোক/লগআউটের জন্য)
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @param expirySeconds - কতক্ষণ ব্ল্যাকলিস্টে রাখা হবে (সেকেন্ডে)
   * @returns সফল হলে true, না হলে false
   */
  revokeToken(token: Token | string, expirySeconds: number): Promise<boolean>;

  /**
   * একটি টোকেন ব্ল্যাকলিস্টেড কিনা চেক করে
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @returns true যদি ব্ল্যাকলিস্টেড হয়, false যদি না হয়
   */
  isTokenRevoked(token: Token | string): Promise<boolean>;

  /**
   * টোকেনের সময় অবশিষ্ট আছে কিনা (সেকেন্ডে)
   * @param token - টোকেন (Token Value Object বা স্ট্রিং)
   * @returns অবশিষ্ট সময় (সেকেন্ডে)
   */
  getTokenRemainingTime(token: Token | string): number;
}
