import { AdminActivity, Admin, User, Auth } from '@vubon/shared-types';
import { USER_ACTIVITY } from '@vubon/shared-constants';

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

export const trackAdminActivity = (
  adminId: string,
  action: 'create' | 'update' | 'delete' | 'view' | 'manage',
  resource: string,
  resourceId: string,
  ip: string
): AdminActivity => {
  const now = new Date();
  // USER_ACTIVITY কনস্ট্যান্টের প্রথম key ব্যবহার করা হচ্ছে (ডামি ডেটার জন্য)
  const activityType = Object.keys(USER_ACTIVITY)[0] as keyof typeof USER_ACTIVITY;

  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    isActive: true,
    isDeleted: false,
    activityId: crypto.randomUUID(),
    userId: '',
    adminId,
    admin: createDummyAdmin(adminId),
    type: activityType, // USER_ACTIVITY এর বৈধ key
    description: `${action} ${resource} ${resourceId}`,
    action,
    resource,
    resourceId,
    beforeState: {},
    afterState: {},
    ipAddress: ip,
    userAgent: '',
    occurredAt: now,
    metadata: {},
  };
};
