import { ApiRequest } from '../common/api-request.types';
import { Auth } from './auth.types';

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  browser: string;
  os: string;
  ipAddress: string;
}

export interface AuthRequest extends ApiRequest {
  userId: string;
  sessionId: string;
  token: string;
  auth: Auth;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: DeviceInfo;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
}
