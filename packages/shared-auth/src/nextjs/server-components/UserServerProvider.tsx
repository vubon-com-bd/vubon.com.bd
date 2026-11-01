import type { ReactNode } from 'react';
import type { AuthUser } from '../../react/contexts/auth.context.types';
import { getServerUser } from '../utils/get-server-user';

export interface UserServerProviderProps {
  readonly children: (user: AuthUser | null) => ReactNode;
  readonly resolveUser: (accessToken: string) => Promise<AuthUser | null>;
}

/**
 * Server Component that resolves the current user and passes it
 * into a render-prop. No client hydration required.
 */
export async function UserServerProvider({
  children,
  resolveUser,
}: UserServerProviderProps): Promise<JSX.Element> {
  const user = await getServerUser(resolveUser);
  return <>{children(user)}</>;
}
