/**
 * Password Hasher Port
 * Defines the contract for password hashing and verification
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IPasswordHasher {
  /**
   * Hash a plain text password
   * @param password - The plain text password to hash
   * @returns A promise that resolves to the hashed password string
   * @throws {Error} If hashing fails
   */
  hash(password: string): Promise<string>;

  /**
   * Compare a plain text password with a hashed password
   * @param password - The plain text password to compare
   * @param hash - The hashed password to compare against
   * @returns A promise that resolves to true if the password matches the hash, false otherwise
   * @throws {Error} If comparison fails
   */
  compare(password: string, hash: string): Promise<boolean>;

  /**
   * Check if a hashed password needs to be rehashed
   * This is useful when the hashing algorithm or cost factor changes
   * @param hash - The hashed password to check
   * @returns A promise that resolves to true if rehashing is needed, false otherwise
   */
  needsRehash(hash: string): Promise<boolean>;
}
