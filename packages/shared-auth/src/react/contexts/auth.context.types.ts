export interface AuthUser {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
}

export interface AuthContextValue {
  readonly user: AuthUser | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  login: (input: { identifier: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
