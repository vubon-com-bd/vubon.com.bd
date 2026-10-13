import { TApiModule } from '../utility/type';
import { SubmitKycHttpDTODtoPayload, VerifyKycHttpDTODtoPayload, RejectKycHttpDTODtoPayload } from '../generated-payloads';

export const userKycApi: TApiModule = {
  "submit": {
    endpoint: "submit",
    method: "POST",
    path: "/users/kyc/submit",
    payload: () => SubmitKycHttpDTODtoPayload,
  },

  "verify": {
    endpoint: "verify",
    method: "POST",
    path: "/users/kyc/verify",
    payload: () => VerifyKycHttpDTODtoPayload,
  },

  "reject": {
    endpoint: "reject",
    method: "POST",
    path: "/users/kyc/reject",
    payload: () => RejectKycHttpDTODtoPayload,
  },

  "getStatus": {
    endpoint: "getStatus",
    method: "GET",
    path: "/users/kyc/status",
  }
};
