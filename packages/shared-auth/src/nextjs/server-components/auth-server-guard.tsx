import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getServerSessionId } from '../utils/get-server-session';

export interface AuthServerGuardProps {
  readonly children: ReactNode;
  readonly redirectTo?: string;
}

/**
 * Server Component guard.
 * Redirects to login when no session cookie is present.
 */
export async function AuthServerGuard({
  children,
  redirectTo = '/login',
}: AuthServerGuardProps): Promise<JSX.Element> {
  const sessionId = await getServerSessionId();
  if (!sessionId) redirect(redirectTo);
  return <>{children}</>;
}
