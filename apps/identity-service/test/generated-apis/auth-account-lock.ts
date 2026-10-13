import { TApiModule } from '../utility/type';
import { LockAccountHttpDTODtoPayload, UnlockAccountHttpDTODtoPayload } from '../generated-payloads';

export const authAccountLockApi: TApiModule = {
  "lock": {
    endpoint: "lock",
    method: "POST",
    path: "/auth/account-lock/lock",
    payload: () => LockAccountHttpDTODtoPayload,
  },

  "unlock": {
    endpoint: "unlock",
    method: "POST",
    path: "/auth/account-lock/unlock",
    payload: () => UnlockAccountHttpDTODtoPayload,
  },

  "getStatus": {
    endpoint: "getStatus",
    method: "GET",
    path: "/auth/account-lock/status/:userId",
    extra: [
      { insertAfter: 'status', valueKey: 'userId' }
    ],
  }
};
