/**
 * Password hashing utilities using bcryptjs
 * Provides secure password hashing and comparison functions
 */

import bcrypt from 'bcryptjs';

/**
 * Number of salt rounds for bcrypt hashing
 * Higher rounds = more secure but slower
 * 10-12 rounds is recommended for production
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param password - Plain text password to hash
 * @returns Promise resolving to hashed password
 * @throws Error if password is invalid
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Compare a plain text password with a hashed password
 * @param plainPassword - Plain text password to compare
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise resolving to boolean indicating if passwords match
 * @throws Error if parameters are invalid
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Plain password is required');
  }

  if (!hashedPassword || typeof hashedPassword !== 'string') {
    throw new Error('Hashed password is required');
  }

  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error(
      `Failed to compare passwords: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Synchronous version of hashPassword
 * @param password - Plain text password to hash
 * @returns Hashed password
 * @throws Error if password is invalid
 */
export function hashPasswordSync(password: string): string {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * Synchronous version of comparePassword
 * @param plainPassword - Plain text password to compare
 * @param hashedPassword - Hashed password to compare against
 * @returns boolean indicating if passwords match
 * @throws Error if parameters are invalid
 */
export function comparePasswordSync(plainPassword: string, hashedPassword: string): boolean {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Plain password is required');
  }

  if (!hashedPassword || typeof hashedPassword !== 'string') {
    throw new Error('Hashed password is required');
  }

  try {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error(
      `Failed to compare passwords: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
