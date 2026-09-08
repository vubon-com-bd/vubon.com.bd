import { createSession, isSessionValid } from '../auth/session-manager';
import { AdminSession, Admin, User, Auth } from '@vubon/shared-types';

// ডামি ডেটা তৈরির ফাংশন (কোনো any নেই)
const createDummyAdmin = (adminId: string): Admin => ({
  adminId,
  userId: '',
  user: {} as User,
  auth: {} as Auth,
  status: 'ACTIVE',
  type: 'FULL_TIME',
  level: 'L1',
  department: 'IT',
  role: 'ADMIN',
  permissions: [],
  isSuperAdmin: false,
  isActive: true,
  joinedAt: new Date(),
  metadata: {
    employeeId: '',
    title: '',
    skills: [],
    languages: [],
    timezone: '',
  },
});

export const createAdminSession = (adminId: string): AdminSession => {
  const session = createSession(adminId);
  return {
    ...session,
    adminId,
    admin: createDummyAdmin(adminId),
    isActive: true,
  };
};

export const isAdminSessionValid = (session: AdminSession): boolean => {
  return isSessionValid(session) && session.isActive;
};
