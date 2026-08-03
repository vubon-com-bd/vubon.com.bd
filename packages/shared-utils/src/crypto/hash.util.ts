import bcrypt from 'bcryptjs';

/**
 * Default number of salt rounds for bcrypt hashing
 * 12 is the recommended balance between security and performance
 */
const DEFAULT_SALT_ROUNDS = 12;

/**
 * Hashes a password using bcrypt with the specified number of salt rounds
 *
 * @param password - The plain text password to hash
 * @param saltRounds - Number of salt rounds to use (default: 12)
 * @returns A promise that resolves to the hashed password string
 *
 * @example
 * const hashedPassword = await hashPassword('mySecurePassword');
 * // Store hashedPassword in database
 */
export async function hashPassword(
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS
): Promise<string> {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Compares a plain text password with a bcrypt hash to verify if they match
 *
 * @param password - The plain text password to compare
 * @param hash - The bcrypt hash to compare against
 * @returns A promise that resolves to `true` if the password matches the hash, `false` otherwise
 *
 * @example
 * const isMatch = await comparePassword('mySecurePassword', storedHash);
 * if (isMatch) {
 *   // Password is correct
 * }
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  if (!hash || typeof hash !== 'string') {
    throw new Error('Hash must be a non-empty string');
  }

  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(
      `Failed to compare password: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Synchronously hashes a password using bcrypt
 * Note: Use async version for better performance in most cases
 *
 * @param password - The plain text password to hash
 * @param saltRounds - Number of salt rounds to use (default: 12)
 * @returns The hashed password string
 *
 * @example
 * const hashedPassword = hashPasswordSync('mySecurePassword');
 */
export function hashPasswordSync(
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS
): string {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(
      `Failed to hash password synchronously: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
