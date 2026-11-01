import { useCallback, useState } from 'react';
import type { ShippingAddress } from './checkout.types';

export function useShippingAddress(initial: ShippingAddress | null = null): {
  readonly address: ShippingAddress | null;
  readonly set: (address: ShippingAddress | null) => void;
  readonly clear: () => void;
  readonly isReady: boolean;
} {
  const [address, setAddress] = useState<ShippingAddress | null>(initial);
  const clear = useCallback(() => setAddress(null), []);
  return {
    address,
    set: setAddress,
    clear,
    isReady: address !== null,
  };
}
