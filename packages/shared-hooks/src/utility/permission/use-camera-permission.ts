import { usePermissionApi } from './use-permission-api';

export function useCameraPermission() {
  return usePermissionApi('camera');
}
