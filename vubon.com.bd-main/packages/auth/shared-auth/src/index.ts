/**
 * Shared Auth Package
 * Exports authentication client and React context/hooks
 */

// Export client
export { AuthClient, createAuthClient, type AuthClientConfig } from './client/auth.client.js';

// Export React components and hooks
export {
  AuthContext,
  useAuthContext,
  defaultAuthContextValue,
  AuthProvider,
  useAuth,
  type AuthContextValue,
  type AuthProviderProps,
} from './react/index.js';
