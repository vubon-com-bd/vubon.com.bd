import { usePermissionApi } from './use-permission-api';

export function useMicrophonePermission() {
  return usePermissionApi('microphone');
}
