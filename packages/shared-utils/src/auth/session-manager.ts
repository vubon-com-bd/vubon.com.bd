import { addHours } from '../common/helper/time.helper';
import { AuthSession } from '@vubon/shared-types';
import { generateToken } from '../common/generator';

export const createSession = (userId: string): AuthSession => {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isDeleted: false,
    sessionId: crypto.randomUUID(),
    userId,
    token: generateToken(32),
    status: 'ACTIVE',
    type: 'DEVICE', // SESSION কনস্ট্যান্টের বৈঠক কী ব্যবহার করুন
    expiresAt: addHours(new Date(), 24),
    lastActivity: new Date(),
    deviceInfo: {
      deviceId: '',
      deviceName: '',
      deviceType: 'other',
      browser: '',
      os: '',
      ipAddress: '',
    },
    ipAddress: '',
    userAgent: '',
    metadata: {},
  };
};

export const isSessionValid = (session: AuthSession): boolean => {
  return session.status === 'ACTIVE' && new Date(session.expiresAt) > new Date();
};
