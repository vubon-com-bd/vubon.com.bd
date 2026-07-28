/**
 * Authentication API Endpoints
 * Defines all auth-related API calls
 */

import { apiClient } from '../client/axios.client.js';
import type { ApiResponse } from '@vubon/auth-shared-types';

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}

export interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string | null;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string | null;
  message?: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Register a new user
 * @param data - Registration data
 * @returns Promise with registration response
 */
export async function register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
  const response = await apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', data);
  return response.data;
}

/**
 * Login user
 * @param data - Login credentials
 * @returns Promise with login response
 */
export async function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
  return response.data;
}

/**
 * Logout user
 * @param refreshToken - Refresh token for revocation
 * @returns Promise with logout response
 */
export async function logout(refreshToken?: string): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>('/auth/logout', { refreshToken });
  return response.data;
}

/**
 * Refresh access token
 * @param refreshToken - Refresh token
 * @returns Promise with new tokens
 */
export async function refreshToken(
  refreshToken: string,
): Promise<ApiResponse<{ accessToken: string; refreshToken: string; expiresIn: number }>> {
  const response = await apiClient.post<
    ApiResponse<{ accessToken: string; refreshToken: string; expiresIn: number }>
  >('/auth/refresh', { refreshToken });
  return response.data;
}

/**
 * Verify email address
 * @param token - Verification token
 * @returns Promise with verification response
 */
export async function verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/verify-email', {
    token,
  });
  return response.data;
}

/**
 * Request password reset
 * @param email - User's email address
 * @returns Promise with password reset response
 */
export async function forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
    email,
  });
  return response.data;
}

/**
 * Reset password
 * @param token - Reset token
 * @param password - New password
 * @returns Promise with reset response
 */
export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
    token,
    password,
  });
  return response.data;
}

/**
 * Get current user profile
 * @param token - Authentication token
 * @returns Promise with user profile
 */
export async function getProfile(token?: string): Promise<ApiResponse<RegisterResponse>> {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await apiClient.get<ApiResponse<RegisterResponse>>('/auth/profile', { headers });
  return response.data;
}
