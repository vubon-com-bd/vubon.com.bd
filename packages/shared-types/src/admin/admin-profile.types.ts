import { UserProfile } from '../user/user-profile.types';
import { Admin } from './admin.types';

export interface AdminProfile extends UserProfile {
  profileId: string;
  adminId: string;
  admin: Admin;
  employeeId: string;
  title: string;
  department: string;
  managerId?: string;
  skills: string[];
  languages: string[];
  metadata: Record<string, unknown>;
}
