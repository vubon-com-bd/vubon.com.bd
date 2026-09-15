import type { ReactNode } from 'react';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';

export interface AuthGateProps {
  readonly authenticated: ReactNode;
  readonly anonymous: ReactNode;
}

export function AuthGate({ authenticated, anonymous }: AuthGateProps): JSX.Element {
  const isAuthed = useIsAuthenticated();
  return <>{isAuthed ? authenticated : anonymous}</>;
}
