/**
 * bcrypt adapter (optional).
 * ⚠️ Install `bcrypt` or `bcryptjs` before using.
 *
 *   pnpm add bcrypt
 *   pnpm add -D @types/bcrypt
 *
 * If bcrypt is not installed, importing this module will throw
 * at call-time (not at import-time).
 */
export interface BcryptAdapter {
  hash(plain: string, rounds: number): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

export const BCRYPT_ROUNDS = 12;

export async function createBcryptAdapter(): Promise<BcryptAdapter> {
  // dynamic import so missing dep doesn't break the build
  const mod = (await import('bcryptjs').catch(() => null)) as {
    default?: BcryptAdapter;
    hash?: BcryptAdapter['hash'];
    compare?: BcryptAdapter['compare'];
  } | null;
  if (!mod) {
    throw new Error('bcrypt is not installed. Run: pnpm add bcrypt');
  }
  const lib = (mod.default ?? mod) as BcryptAdapter;
  return {
    hash: (plain, rounds) => lib.hash(plain, rounds),
    compare: (plain, hash) => lib.compare(plain, hash),
  };
}
