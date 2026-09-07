import { SuccessResponse } from '../common/base-response.types';
import { Auth } from './auth.types';
import { AuthSession } from './auth-session.types';
import { AuthToken } from './auth-token.types';

export type AuthResponse = SuccessResponse<{
  user: Auth;
  session: AuthSession;
  token: AuthToken;
}>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: Auth;
  session: AuthSession;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
  verificationRequired: boolean;
}
