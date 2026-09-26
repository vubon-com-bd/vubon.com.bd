import type { HashedPassword } from '@vubon/shared-utils/security/password';

export interface PasswordServiceContract {
  hash(plain: string): Promise<HashedPassword>;
  verify(plain: string, stored: HashedPassword): Promise<boolean>;
}
