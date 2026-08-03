import jwt, { SignOptions } from 'jsonwebtoken';

/**
 * Stores blacklisted tokens in memory (for development)
 * In production, use Redis or database for persistence
 */
const tokenBlacklist: Map<string, { expiresAt: number }> = new Map();

/**
 * Options for signing a JWT token
 */
interface SignTokenOptions {
  /** Token expiry time (e.g., '15m', '1h', '7d' or seconds) */
  expiresIn: jwt.SignOptions['expiresIn'];
  /** Audience claim (optional) */
  audience?: string;
  /** Issuer claim (optional) */
  issuer?: string;
  /** Additional claims (optional) */
  additionalClaims?: Record<string, unknown>;
}

/**
 * Decoded JWT payload structure
 */
interface DecodedToken {
  /** User ID */
  userId: string;
  /** User email */
  email: string;
  /** User roles */
  roles: string[];
  /** User permissions */
  permissions: string[];
  /** Session ID */
  sessionId: string;
  /** Token version */
  version?: number;
  /** Token type */
  type?: 'access' | 'refresh' | 'verification' | 'reset';
  /** Issued at timestamp */
  iat: number;
  /** Expiry timestamp */
  exp: number;
  /** Issuer */
  iss?: string;
  /** Audience */
  aud?: string;
  /** Additional claims */
  [key: string]: unknown;
}

/**
 * Signs a JWT token with the provided payload and options
 *
 * @param payload - The payload to include in the token
 * @param secret - The secret key to sign the token
 * @param expiresIn - Token expiry time (e.g., '15m', '1h', '7d' or seconds)
 * @param options - Additional options like audience, issuer, etc.
 * @returns The signed JWT token string
 *
 * @example
 * const token = signToken(
 *   { userId: '123', email: 'user@example.com' },
 *   'my-secret',
 *   '1h'
 * );
 */
export function signToken(
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: jwt.SignOptions['expiresIn'],
  options: Partial<Omit<SignTokenOptions, 'expiresIn'>> = {}
): string {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a non-empty object');
  }

  if (!secret || typeof secret !== 'string') {
    throw new Error('Secret must be a non-empty string');
  }

  if (!expiresIn) {
    throw new Error('expiresIn is required');
  }

  const signOptions: SignOptions = {
    expiresIn,
  };

  if (options.audience) {
    signOptions.audience = options.audience;
  }

  if (options.issuer) {
    signOptions.issuer = options.issuer;
  }

  // Merge additional claims if provided
  const finalPayload = options.additionalClaims
    ? { ...payload, ...options.additionalClaims }
    : payload;

  try {
    return jwt.sign(finalPayload, secret, signOptions);
  } catch (error) {
    throw new Error(
      `Failed to sign token: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Verifies a JWT token and returns the decoded payload
 *
 * @param token - The JWT token to verify
 * @param secret - The secret key to verify the token
 * @param options - Verification options like audience, issuer, etc.
 * @returns The decoded token payload or null if invalid
 *
 * @example
 * const payload = verifyToken(token, 'my-secret');
 * if (payload) {
 *   // Token is valid
 *   console.log(payload.userId);
 * }
 */
export function verifyToken(
  token: string,
  secret: string,
  options: { audience?: string; issuer?: string } = {}
): DecodedToken | null {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  if (!secret || typeof secret !== 'string') {
    throw new Error('Secret must be a non-empty string');
  }

  const verifyOptions: jwt.VerifyOptions = {};

  if (options.audience) {
    verifyOptions.audience = options.audience;
  }

  if (options.issuer) {
    verifyOptions.issuer = options.issuer;
  }

  try {
    const decoded = jwt.verify(token, secret, verifyOptions);

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as DecodedToken;
    }

    return null;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
}

/**
 * Decodes a JWT token without verification
 *
 * @param token - The JWT token to decode
 * @returns The decoded token payload or null if invalid
 *
 * @example
 * const payload = decodeToken(token);
 * if (payload) {
 *   // Token is decoded (but not verified)
 *   console.log(payload.exp);
 * }
 */
export function decodeToken(token: string): DecodedToken | null {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  try {
    const decoded = jwt.decode(token);

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as DecodedToken;
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Verifies a refresh token specifically
 * This is a convenience wrapper around verifyToken
 *
 * @param token - The refresh token to verify
 * @param secret - The secret key to verify the token
 * @returns The decoded token payload or null if invalid
 */
export function verifyRefreshToken(token: string, secret: string): DecodedToken | null {
  const decoded = verifyToken(token, secret);

  if (decoded && decoded.type === 'refresh') {
    return decoded;
  }

  return null;
}

/**
 * Extracts the version from a token payload
 *
 * @param token - The JWT token to extract version from
 * @returns The version number or 0 if not found
 */
export function getTokenVersion(token: string): number {
  const decoded = decodeToken(token);

  if (decoded && typeof decoded.version === 'number') {
    return decoded.version;
  }

  return 0;
}

/**
 * Checks if a token is expired
 *
 * @param token - The JWT token to check
 * @returns `true` if the token is expired, `false` otherwise
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

/**
 * Adds a token to the blacklist
 *
 * @param token - The JWT token to blacklist
 * @param expirySeconds - How long the token should remain blacklisted (in seconds)
 * @returns A promise that resolves when the token is blacklisted
 */
export async function addToBlacklist(token: string, expirySeconds: number): Promise<void> {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  if (expirySeconds <= 0) {
    throw new Error('Expiry seconds must be greater than 0');
  }

  const expiresAt = Date.now() + expirySeconds * 1000;
  tokenBlacklist.set(token, { expiresAt });

  // Clean up expired tokens periodically
  const expiredTokens: string[] = [];
  const now = Date.now();

  for (const [key, value] of tokenBlacklist.entries()) {
    if (value.expiresAt < now) {
      expiredTokens.push(key);
    }
  }

  for (const key of expiredTokens) {
    tokenBlacklist.delete(key);
  }
}

/**
 * Checks if a token is blacklisted
 *
 * @param token - The JWT token to check
 * @returns A promise that resolves to `true` if the token is blacklisted, `false` otherwise
 */
export async function isBlacklisted(token: string): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const entry = tokenBlacklist.get(token);

  if (!entry) {
    return false;
  }

  // Check if the blacklist entry has expired
  if (entry.expiresAt < Date.now()) {
    tokenBlacklist.delete(token);
    return false;
  }

  return true;
}
