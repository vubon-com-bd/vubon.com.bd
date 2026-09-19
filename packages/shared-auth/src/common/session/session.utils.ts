import type { SessionInfo } from './session.types';

/** True if session is expiring within `thresholdSeconds`. */
export function isSessionExpiringSoon(session: SessionInfo, thresholdSeconds = 60): boolean {
  const expiresAt = new Date(session.expiresAt).getTime();
  return expiresAt - Date.now() <= thresholdSeconds * 1000;
}

/** Human-readable remaining time. */
export function describeSessionRemaining(session: SessionInfo): string {
  const ms = new Date(session.expiresAt).getTime() - Date.now();
  if (ms <= 0) return 'expired';
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

/** Check whether two sessions belong to the same device. */
export function isSameDevice(a: SessionInfo, b: SessionInfo): boolean {
  if (a.deviceId && b.deviceId) return a.deviceId === b.deviceId;
  return a.userAgent === b.userAgent && a.ipAddress === b.ipAddress;
}
