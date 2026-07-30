/**
 * Client exports
 */

export {
  createApiClient,
  apiClient,
  createAuthApiClient,
  setApiBaseUrl,
  setApiHeaders,
} from './axios.client.js';

export {
  setupAuthInterceptor,
  setupErrorInterceptor,
  setupDataExtractionInterceptor,
  setupLoggingInterceptor,
  setupAllInterceptors,
} from './interceptors.js';
