import { STATUS } from '@vubon/shared-constants';
import { SESSION } from '@vubon/shared-constants';
import { DeviceInfo } from './auth-request.types';

export interface AuthSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  sessionId: string;
  userId: string;
  token: string;
  status: keyof typeof STATUS;
  type: keyof typeof SESSION;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}
