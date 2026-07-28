/**
 * Shared API for authentication module
 * Exports API client and endpoints
 */

// Export client
export {
  createApiClient,
  apiClient,
  createAuthApiClient,
  setApiBaseUrl,
  setApiHeaders,
  setupAuthInterceptor,
  setupErrorInterceptor,
  setupDataExtractionInterceptor,
  setupLoggingInterceptor,
  setupAllInterceptors,
} from './client/index.js';

// Export endpoints
export {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from './endpoints/index.js';
