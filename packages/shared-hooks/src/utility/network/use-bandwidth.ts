import { useNetworkInfo } from './use-network-info';

/** Approximate downlink bandwidth in Mbps. 0 if unknown. */
export function useBandwidth(): number {
  return useNetworkInfo().downlink ?? 0;
}
