import { AuthError } from '../../common/errors/auth-error';

/** Human-readable message from any auth error. */
export function getAuthErrorMessage(err: unknown): string {
  if (err instanceof AuthError) return err.message;
  if (err instanceof Error) return err.message;
  return 'Authentication failed';
}
