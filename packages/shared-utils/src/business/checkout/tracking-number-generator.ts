/**
 * Tracking Number Generator
 * ট্র্যাকিং নম্বর জেনারেটর
 */

import { idGenerator } from '../../common/generator/id-generator';

export interface TrackingNumberOptions {
  prefix?: string;
  length?: number;
  includeTimestamp?: boolean;
  carrier?: string;
}

export const generateTrackingNumber = (options: TrackingNumberOptions = {}): string => {
  const { prefix = 'TRK', length = 10, includeTimestamp = true, carrier = '' } = options;

  let trackingNumber = prefix;

  if (carrier) {
    trackingNumber += `-${carrier.toUpperCase()}`;
  }

  if (includeTimestamp) {
    const now = new Date();
    const timestamp = now.getTime().toString(36).toUpperCase();
    trackingNumber += `-${timestamp}`;
  }

  const random = idGenerator.shortId(length);
  trackingNumber += `-${random}`;

  return trackingNumber;
};

export const generateShippingTracking = (carrier: string = 'SA'): string => {
  return generateTrackingNumber({
    prefix: 'SHIP',
    length: 8,
    carrier,
  });
};

export const generateDeliveryTracking = (carrier: string = 'REDX'): string => {
  return generateTrackingNumber({
    prefix: 'DLV',
    length: 8,
    carrier,
  });
};

export const generateCourierTracking = (courier: string): string => {
  const courierPrefixes: Record<string, string> = {
    sa_paribahan: 'SA',
    redx: 'RX',
    pathao: 'PT',
    steadfast: 'ST',
    sundarban: 'SU',
    paperfly: 'PF',
    ecourier: 'EC',
  };

  const prefix = courierPrefixes[courier] || 'TRK';
  return generateTrackingNumber({
    prefix,
    length: 10,
    carrier: courier,
  });
};

export const generateReturnTracking = (): string => {
  return generateTrackingNumber({
    prefix: 'RET',
    length: 8,
  });
};

export const validateTrackingNumber = (trackingNumber: string): boolean => {
  const pattern = /^[A-Z]{2,4}(-[A-Z]{2,4})?-[A-Z0-9]{4,12}-[A-Z0-9]{6,12}$/;
  return pattern.test(trackingNumber);
};

export const parseTrackingNumber = (
  trackingNumber: string
): {
  prefix: string;
  carrier?: string;
  timestamp?: string;
  random: string;
} | null => {
  const parts = trackingNumber.split('-');
  if (parts.length < 3) return null;

  return {
    prefix: parts[0],
    carrier: parts[1] || undefined,
    timestamp: parts[2] || undefined,
    random: parts[parts.length - 1],
  };
};
