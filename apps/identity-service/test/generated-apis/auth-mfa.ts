import { TApiModule } from '../utility/type';
import { SetupMfaHttpDTODtoPayload, EnableMfaHttpDTODtoPayload, DisableMfaHttpDTODtoPayload, VerifyMfaHttpDTODtoPayload, VerifyBackupCodeHttpDTODtoPayload } from '../generated-payloads';

export const authMfaApi: TApiModule = {
  "setup": {
    endpoint: "setup",
    method: "POST",
    path: "/auth/mfa/setup",
    payload: () => SetupMfaHttpDTODtoPayload,
  },

  "enable": {
    endpoint: "enable",
    method: "POST",
    path: "/auth/mfa/enable",
    payload: () => EnableMfaHttpDTODtoPayload,
  },

  "disable": {
    endpoint: "disable",
    method: "POST",
    path: "/auth/mfa/disable",
    payload: () => DisableMfaHttpDTODtoPayload,
  },

  "verify": {
    endpoint: "verify",
    method: "POST",
    path: "/auth/mfa/verify",
    payload: () => VerifyMfaHttpDTODtoPayload,
  },

  "verifyBackupCode": {
    endpoint: "verifyBackupCode",
    method: "POST",
    path: "/auth/mfa/verify-backup-code",
    payload: () => VerifyBackupCodeHttpDTODtoPayload,
  },

  "getSettings": {
    endpoint: "getSettings",
    method: "GET",
    path: "/auth/mfa/settings",
  },

  "getRecoveryCodes": {
    endpoint: "getRecoveryCodes",
    method: "GET",
    path: "/auth/mfa/recovery-codes",
  }
};
