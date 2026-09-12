import { createSession } from '../auth/session-manager';

export interface AdminSession {
  sessionId: string;
  adminId: string;
  token: string;
  status: string;
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
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const createAdminSession = (adminId: string): AdminSession => {
  const session = createSession(adminId);
  return {
    ...session,
    adminId,
    isActive: true,
  };
};

export const isAdminSessionValid = (session: AdminSession): boolean => {
  // Direct validation without calling isSessionValid
  return (
    session.status === 'ACTIVE' && session.isActive && new Date(session.expiresAt) > new Date()
  );
};
