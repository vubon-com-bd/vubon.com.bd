import { addHours } from '../common/helper/time.helper';
import { AUTH_SESSION } from '@vubon/shared-constants/src/auth/auth-session.constants';

export interface AuthSession {
  sessionId: string;
  userId: string;
  token: string;
  status: keyof typeof AUTH_SESSION;
  type: string;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo: {
    deviceId: string;
    deviceName: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'other';
    browser: string;
    os: string;
  };
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}

export const createSession = (userId: string): AuthSession => {
  return {
    sessionId: crypto.randomUUID(),
    userId,
    token: crypto.randomUUID(),
    status: 'ACTIVE',
    type: 'session',
    expiresAt: addHours(new Date(), 24),
    lastActivity: new Date(),
    deviceInfo: {
      deviceId: '',
      deviceName: '',
      deviceType: 'other',
      browser: '',
      os: '',
    },
    ipAddress: '',
    userAgent: '',
    metadata: {},
  };
};

export const isSessionValid = (session: AuthSession): boolean => {
  return session.status === 'ACTIVE' && new Date(session.expiresAt) > new Date();
};
