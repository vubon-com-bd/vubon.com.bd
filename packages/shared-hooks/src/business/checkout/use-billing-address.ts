import { useCallback, useState } from 'react';
import type { BillingAddress, ShippingAddress } from './checkout.types';

export function useBillingAddress(initial: BillingAddress | null = null): {
  readonly address: BillingAddress | null;
  readonly sameAsShipping: boolean;
  readonly set: (address: BillingAddress | null) => void;
  readonly setSameAsShipping: (shipping: ShippingAddress | null) => void;
  readonly isReady: boolean;
} {
  const [address, setAddress] = useState<BillingAddress | null>(initial);
  const [sameAsShipping, setSame] = useState(initial === null);

  const setSameAsShipping = useCallback((shipping: ShippingAddress | null) => {
    setSame(true);
    setAddress(shipping ? { ...shipping } : null);
  }, []);

  const set = useCallback((next: BillingAddress | null) => {
    setSame(false);
    setAddress(next);
  }, []);

  return {
    address,
    sameAsShipping,
    set,
    setSameAsShipping,
    isReady: address !== null,
  };
}
