/**
 * Password Hasher Service Interface
 * @module identity-service/application/services/interfaces
 *
 * Abstraction over bcrypt/argon2 — implementation lives in infrastructure.
 */
export const PASSWORD_HASHER_SERVICE = Symbol('PASSWORD_HASHER_SERVICE');

export interface PasswordHasherServiceInterface {
  readonly name: string;
  hash(plain: string): Promise<string>;
  verify(plain: string, hash: string): Promise<boolean>;
}
