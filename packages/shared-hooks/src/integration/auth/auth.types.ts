export interface AuthMe {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  readonly avatarUrl?: string;
}

export interface LoginInput {
  readonly identifier: string;
  readonly password: string;
}

export interface LoginOutput {
  readonly userId: string;
  readonly sessionId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface AuthQueryOptions {
  readonly enabled?: boolean;
  readonly staleTimeMs?: number;
}
