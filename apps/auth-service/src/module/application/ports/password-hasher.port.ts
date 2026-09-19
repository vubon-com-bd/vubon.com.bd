/**
 * Password Hasher Port
 * Application-layer contract for password hashing.
 * Implementation lives in infrastructure layer (bcrypt/argon2).
 */
export interface PasswordHasherPort {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}
