/**
 * argon2 adapter (optional).
 * ⚠️ Install `argon2` before using.
 *
 *   pnpm add argon2
 */
export interface Argon2Adapter {
  hash(plain: string): Promise<string>;
  verify(hash: string, plain: string): Promise<boolean>;
}

export const ARGON2_OPTIONS = Object.freeze({
  type: 2 as const, // argon2id
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
});

export async function createArgon2Adapter(): Promise<Argon2Adapter> {
  const mod = (await import('argon2').catch(() => null)) as {
    default?: Argon2Adapter;
    hash?: (plain: string, opts?: unknown) => Promise<string>;
    verify?: (hash: string, plain: string) => Promise<boolean>;
  } | null;
  if (!mod) {
    throw new Error('argon2 is not installed. Run: pnpm add argon2');
  }
  const lib = (mod.default ?? mod) as Argon2Adapter;
  return {
    hash: (plain) => lib.hash(plain),
    verify: (hash, plain) => lib.verify(hash, plain),
  };
}
