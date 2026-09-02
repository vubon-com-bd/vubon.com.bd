import { useAuthContext } from './AuthContext';

/**
 * useAuth Hook
 * অথেনটিকেশন হুক
 */
export const useAuth = useAuthContext;

/**
 * useUser Hook
 * ইউজার ডেটা পাওয়ার হুক
 */
export const useUser = () => {
  const { user } = useAuth();
  return user;
};

/**
 * useIsAuthenticated Hook
 * অথেনটিকেটেড কিনা চেক করার হুক
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

/**
 * useAuthLoading Hook
 * লোডিং স্ট্যাটাস চেক করার হুক
 */
export const useAuthLoading = (): boolean => {
  const { isLoading } = useAuth();
  return isLoading;
};

/**
 * useAuthError Hook
 * এরর স্ট্যাটাস চেক করার হুক
 */
export const useAuthError = (): Error | null => {
  const { error } = useAuth();
  return error;
};

/**
 * useLogin Hook
 * লগইন ফাংশন পাওয়ার হুক
 */
export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

/**
 * useLogout Hook
 * লগআউট ফাংশন পাওয়ার হুক
 */
export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

/**
 * useRegister Hook
 * রেজিস্টার ফাংশন পাওয়ার হুক
 */
export const useRegister = () => {
  const { register } = useAuth();
  return register;
};
