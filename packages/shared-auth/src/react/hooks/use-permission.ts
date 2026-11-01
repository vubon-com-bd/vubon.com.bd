import { useContext } from 'react';
import { PermissionContext } from '../contexts/permission.context';
import type { PermissionContextValue } from '../contexts/permission.context';

export function usePermission(): PermissionContextValue {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error('usePermission must be used within <PermissionProvider>');
  return ctx;
}
