import { useEffect, useState } from 'react';

export interface NetworkInfo {
  readonly effectiveType?: string;
  readonly downlink?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
}

interface NetworkConnection extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function useNetworkInfo(): NetworkInfo {
  const [info, setInfo] = useState<NetworkInfo>(() => readInfo());

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;
    const handler = (): void => setInfo(readInfo());
    conn.addEventListener('change', handler);
    return () => conn.removeEventListener('change', handler);
  }, []);

  return info;
}

function getConnection(): NetworkConnection | null {
  if (typeof navigator === 'undefined') return null;
  const nav = navigator as Navigator & {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection ?? null;
}

function readInfo(): NetworkInfo {
  const conn = getConnection();
  if (!conn) return {};
  return {
    effectiveType: conn.effectiveType,
    downlink: conn.downlink,
    rtt: conn.rtt,
    saveData: conn.saveData,
  };
}
