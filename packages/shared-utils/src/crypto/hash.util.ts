// @ts-expect-error - bcryptjs এর নিজস্ব টাইপ ডিফিনেশন আছে
import bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 12;

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
