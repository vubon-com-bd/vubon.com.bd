/**
 * PasswordHasherServiceInterface — Application-level contract
 * @module auth-service/application/services/interfaces
 *
 * Impl lives in Infrastructure (bcrypt/argon2).
 */
export interface PasswordHasherServiceInterface {
  readonly name: string;
  hash(plain: string): Promise<string>;
  verify(plain: string, hash: string): Promise<boolean>;
  needsRehash(hash: string): boolean;
}
