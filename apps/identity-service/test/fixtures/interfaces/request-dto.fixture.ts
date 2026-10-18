/**
 * Request DTO fixtures for interface layer tests
 * @module identity-service/test/fixtures/interfaces
 */
import type { LoginHttpDTO } from '@interfaces/dtos/requests/auth/login.request.dto.js';
import type { RegisterHttpDTO } from '@interfaces/dtos/requests/auth/register.request.dto.js';
import type { EnableMfaHttpDTO } from '@interfaces/dtos/requests/auth/enable-mfa.request.dto.js';
import type { VerifyMfaHttpDTO } from '@interfaces/dtos/requests/auth/verify-mfa.request.dto.js';
import type { CreateUserHttpDTO } from '@interfaces/dtos/requests/user/create-user.request.dto.js';
import type { SubmitKycHttpDTO } from '@interfaces/dtos/requests/user/submit-kyc.request.dto.js';

export function makeLoginDto(overrides: Partial<LoginHttpDTO> = {}): LoginHttpDTO {
  const dto: LoginHttpDTO = {
    identifier: 'test.user@vubon.com.bd',
    password: 'StrongP@ss123',
    ...overrides,
  };
  return dto;
}

export function makeRegisterDto(
  overrides: Partial<RegisterHttpDTO> = {},
): RegisterHttpDTO {
  const dto: RegisterHttpDTO = {
    email: 'new.user@vubon.com.bd',
    password: 'StrongP@ss123',
    confirmPassword: 'StrongP@ss123',
    acceptTerms: true,
    ...overrides,
  };
  return dto;
}

export function makeEnableMfaDto(
  overrides: Partial<EnableMfaHttpDTO> = {},
): EnableMfaHttpDTO {
  const dto: EnableMfaHttpDTO = {
    method: 'totp',
    code: '123456',
    ...overrides,
  };
  return dto;
}

export function makeVerifyMfaDto(
  overrides: Partial<VerifyMfaHttpDTO> = {},
): VerifyMfaHttpDTO {
  const dto: VerifyMfaHttpDTO = {
    challengeId: '11111111-1111-4111-8111-111111111111',
    code: '123456',
    method: 'totp',
    ...overrides,
  };
  return dto;
}

export function makeCreateUserDto(
  overrides: Partial<CreateUserHttpDTO> = {},
): CreateUserHttpDTO {
  const dto: CreateUserHttpDTO = {
    email: 'new.user@vubon.com.bd',
    password: 'StrongP@ss123',
    type: 'individual',
    acceptTerms: true,
    ...overrides,
  };
  return dto;
}

export function makeSubmitKycDto(
  overrides: Partial<SubmitKycHttpDTO> = {},
): SubmitKycHttpDTO {
  const dto: SubmitKycHttpDTO = {
    documents: [
      {
        type: 'national_id',
        number: '1234567890123',
        frontUrl: 'https://cdn.vubon.com.bd/kyc/front.jpg',
        backUrl: 'https://cdn.vubon.com.bd/kyc/back.jpg',
        selfieUrl: 'https://cdn.vubon.com.bd/kyc/selfie.jpg',
      },
    ],
    ...overrides,
  };
  return dto;
}
