import { TApiModule } from '../utility/type';
import { EnableBiometricHttpDTODtoPayload, DisableBiometricHttpDTODtoPayload, VerifyBiometricHttpDTODtoPayload } from '../generated-payloads';

export const authBiometricApi: TApiModule = {
  "enable": {
    endpoint: "enable",
    method: "POST",
    path: "/auth/biometric/enable",
    payload: () => EnableBiometricHttpDTODtoPayload,
  },

  "disable": {
    endpoint: "disable",
    method: "POST",
    path: "/auth/biometric/disable",
    payload: () => DisableBiometricHttpDTODtoPayload,
  },

  "verify": {
    endpoint: "verify",
    method: "POST",
    path: "/auth/biometric/verify",
    payload: () => VerifyBiometricHttpDTODtoPayload,
  }
};
