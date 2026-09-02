/**
 * useAuth Hook
 * অথেনটিকেশন হুক
 *
 * এই ফাইলটি শুধুমাত্র auth.provider থেকে useAuth রি-এক্সপোর্ট করে
 * এবং অন্যান্য হেল্পার হুক প্রদান করে
 */

// সরাসরি auth.provider থেকে useAuth রি-এক্সপোর্ট
export { useAuth } from '../providers/auth.provider';

// Auth প্রোভাইডার থেকেও ইম্পোর্ট করা যায়
import { useAuth as useAuthContext } from '../providers/auth.provider';

/**
 * useUser Hook
 * ইউজার ডেটা পাওয়ার হুক
 */
export const useUser = () => {
  const { user } = useAuthContext();
  return user;
};

/**
 * useIsAuthenticated Hook
 * অথেনটিকেটেড কিনা চেক করার হুক
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated;
};

/**
 * useHasPermission Hook
 * পারমিশন চেক করার হুক
 */
export const useHasPermission = (permission: string): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;
  return user.permissions?.includes(permission) || false;
};

/**
 * useHasRole Hook
 * রোল চেক করার হুক
 */
export const useHasRole = (role: string | string[]): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;

  if (Array.isArray(role)) {
    return role.includes(user.role);
  }

  return user.role === role;
};

/**
 * useHasAnyRole Hook
 * যেকোনো একটি রোল আছে কিনা চেক করার হুক
 */
export const useHasAnyRole = (roles: string[]): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;
  return roles.includes(user.role);
};

/**
 * useIsAdmin Hook
 * অ্যাডমিন কিনা চেক করার হুক
 */
export const useIsAdmin = (): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;
  return user.role === 'admin' || user.role === 'super_admin';
};

/**
 * useIsVendor Hook
 * ভেন্ডর কিনা চেক করার হুক
 */
export const useIsVendor = (): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;
  return user.role === 'vendor';
};

/**
 * useIsVerified Hook
 * ভেরিফাইড কিনা চেক করার হুক
 */
export const useIsVerified = (): boolean => {
  const { user } = useAuthContext();
  if (!user) return false;
  return user.isVerified;
};
