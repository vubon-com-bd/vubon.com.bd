/**
 * DTO Fixtures for Application Layer tests
 * @module identity-service/test/fixtures/application
 */
import type { LoginRequestDTO } from '@application/dtos/requests/auth/login.dto.js';
import type { RegisterRequestDTO } from '@application/dtos/requests/auth/register.dto.js';
import type { ResetPasswordRequestDTO } from '@application/dtos/requests/auth/reset-password.dto.js';
import type { VerifyMfaRequestDTO } from '@application/dtos/requests/auth/verify-mfa.dto.js';
import type { EnableMfaRequestDTO } from '@application/dtos/requests/auth/enable-mfa.dto.js';
import { TEST_EMAIL, TEST_PASSWORD_PLAIN, TEST_OTP_CODE } from '../ids.fixture.js';

export const makeLoginDTO = (overrides: Partial<LoginRequestDTO> = {}): LoginRequestDTO => ({
  identifier: TEST_EMAIL,
  password: TEST_PASSWORD_PLAIN,
  rememberMe: false,
  ...overrides,
} as LoginRequestDTO);

export const makeLoginDTOWithMfa = (overrides: Partial<LoginRequestDTO> = {}): LoginRequestDTO => ({
  identifier: TEST_EMAIL,
  password: TEST_PASSWORD_PLAIN,
  rememberMe: false,
  mfaCode: TEST_OTP_CODE,
  ...overrides,
} as LoginRequestDTO);

export const makeRegisterDTO = (overrides: Partial<RegisterRequestDTO> = {}): RegisterRequestDTO => ({
  email: TEST_EMAIL,
  password: TEST_PASSWORD_PLAIN,
  confirmPassword: TEST_PASSWORD_PLAIN,
  firstName: 'Test',
  lastName: 'User',
  acceptTerms: true as never,
  ...overrides,
} as RegisterRequestDTO);

export const makeResetPasswordDTO = (overrides: Partial<ResetPasswordRequestDTO> = {}): ResetPasswordRequestDTO => ({
  token: 'reset-token-abcdefghijklmnop',
  newPassword: TEST_PASSWORD_PLAIN,
  confirmPassword: TEST_PASSWORD_PLAIN,
  ...overrides,
} as ResetPasswordRequestDTO);

export const makeVerifyMfaDTO = (overrides: Partial<VerifyMfaRequestDTO> = {}): VerifyMfaRequestDTO => ({
  challengeId: '11111111-1111-4111-8111-111111111111',
  code: TEST_OTP_CODE,
  method: 'totp',
  rememberDevice: false,
  ...overrides,
} as VerifyMfaRequestDTO);

export const makeEnableMfaDTO = (overrides: Partial<EnableMfaRequestDTO> = {}): EnableMfaRequestDTO => ({
  method: 'totp',
  code: TEST_OTP_CODE,
  ...overrides,
} as EnableMfaRequestDTO);
