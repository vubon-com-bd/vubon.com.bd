import { ApiRequest } from '../common/api-request.types';
import { Auth } from './auth.types';

/**
 * Device information interface
 */
export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  browser: string;
  os: string;
  ipAddress: string;
}

/**
 * Auth request interface
 */
export interface AuthRequest extends ApiRequest {
  userId: string;
  sessionId: string;
  token: string;
  auth: Auth;
}

/**
 * Login request interface
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: DeviceInfo;
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
