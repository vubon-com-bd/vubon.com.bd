export interface HashedPassword {
  hash: string;
  salt: string;
  iterations: number;
  keyLength: number;
}

export interface HasherConfig {
  saltLength: number;
  keyLength: number;
  iterations: number;
  algorithm: string;
}

export interface PasswordHasher {
  hash(password: string): Promise<HashedPassword>;
  compare(password: string, hashedPassword: HashedPassword): Promise<boolean>;
  hashSync(password: string): HashedPassword;
  compareSync(password: string, hashedPassword: HashedPassword): boolean;
  generateSalt(length?: number): string;
  isStrongPassword(password: string): boolean;
  getStrengthScore(password: string): number;
  getStrengthLevel(password: string): 'weak' | 'medium' | 'strong';
  isHashed(password: string): boolean;
  getHasherType(): string;
  getConfig(): HasherConfig;
  validateHashFormat(hash: string): boolean;
  getSaltFromHash(hash: string): string;
  getRoundsFromHash(hash: string): number;
  needsRehash(hash: string, options?: { rounds?: number }): boolean;
}
