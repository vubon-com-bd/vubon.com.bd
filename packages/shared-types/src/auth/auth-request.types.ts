import { ApiRequest } from '../common/api-request.types';
import { AuthPublic } from './auth.types';

/**
 * Device information — server-side enriched.
 * ipAddress is filled from request, not trusted from client.
 */
export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  browser: string;
  os: string;
  /** @internal filled by server, not trusted from client */
  ipAddress?: string;
}

/**
 * Auth request interface
 */
export interface AuthRequest extends ApiRequest {
  userId: string;
  sessionId: string;
  token: string;
  auth: AuthPublic;
}

/**
 * Login request interface
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: Omit<DeviceInfo, 'ipAddress'>;
}

/**
 * Register request interface
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
}
