import { AuthProvider, type AuthProviderProps } from './auth.provider';
import { PermissionProvider } from './permission.provider';
import { SessionProvider } from './session.provider';
import { UserProvider } from './user.provider';
import type { SessionInfo } from '../../common/session/session.types';

export interface RootAuthProviderProps extends AuthProviderProps {
  readonly session?: SessionInfo | null;
}

export function RootAuthProvider({
  children,
  session = null,
  ...authProps
}: RootAuthProviderProps): JSX.Element {
  return (
    <AuthProvider {...authProps}>
      <UserProvider user={authProps.initialUser ?? null}>
        <SessionProvider session={session}>
          <PermissionProvider
            roles={authProps.initialRoles ?? []}
            permissions={authProps.initialPermissions ?? []}
          >
            {children}
          </PermissionProvider>
        </SessionProvider>
      </UserProvider>
    </AuthProvider>
  );
}
