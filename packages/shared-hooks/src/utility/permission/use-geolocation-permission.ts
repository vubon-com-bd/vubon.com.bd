import { usePermissionApi } from './use-permission-api';

export function useGeolocationPermission() {
  return usePermissionApi('geolocation');
}
