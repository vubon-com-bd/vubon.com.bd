import { useMemo } from 'react';

export interface DeviceInfo {
  readonly platform: string;
  readonly vendor: string;
  readonly cores: number;
  readonly memoryGb: number | null;
  readonly isTouch: boolean;
}

export function useDeviceInfo(): DeviceInfo {
  return useMemo(() => {
    if (typeof navigator === 'undefined') {
      return { platform: 'unknown', vendor: 'unknown', cores: 0, memoryGb: null, isTouch: false };
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    return {
      platform: nav.platform ?? 'unknown',
      vendor: nav.vendor ?? 'unknown',
      cores: nav.hardwareConcurrency ?? 0,
      memoryGb: typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null,
      isTouch: typeof window !== 'undefined' && 'ontouchstart' in window,
    };
  }, []);
}
