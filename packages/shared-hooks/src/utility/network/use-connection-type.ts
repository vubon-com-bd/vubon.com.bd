import { useNetworkInfo } from './use-network-info';

export function useConnectionType(): string {
  return useNetworkInfo().effectiveType ?? 'unknown';
}
