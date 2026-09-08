import { generateId } from '../common/generator/id-generator';
import { AdminReport, Admin, User, Auth } from '@vubon/shared-types';

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

export const generateReport = (
  adminId: string,
  type: string,
  title: string,
  data: Record<string, unknown> = {}
): AdminReport => {
  return {
    reportId: generateId('RPT', 12),
    adminId,
    admin: createDummyAdmin(adminId),
    type,
    title,
    description: '',
    data,
    generatedAt: new Date(),
    format: 'pdf',
    metadata: {},
  };
};
