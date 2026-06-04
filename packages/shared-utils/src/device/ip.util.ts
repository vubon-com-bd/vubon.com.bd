/**
 * IP Utilities - IP parsing and masking
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce 
 *
 * @module shared-utils/device/ip.util
 *
 * RULES:
 * ✅ ONLY IP parsing, masking, validation - NO business logic
 * ✅ NO GeoIP API requests, network scanning
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

// ✅ FIXED: IP_CONFIG not exported, using local fallbacks
// import { IP_CONFIG } from '@vubon/shared-constants';

// ==================== Local Fallback Constants ====================

const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

const PRIVATE_IPV4_RANGES = [
  { start: '10.0.0.0', end: '10.255.255.255', description: 'Class A private' },
  { start: '172.16.0.0', end: '172.31.255.255', description: 'Class B private' },
  { start: '192.168.0.0', end: '192.168.255.255', description: 'Class C private' },
  { start: '127.0.0.0', end: '127.255.255.255', description: 'Loopback' },
  { start: '169.254.0.0', end: '169.254.255.255', description: 'Link-local' },
];

const PRIVATE_IPV6_PREFIXES = [
  { prefix: '::1', description: 'Loopback' },
  { prefix: 'fc00::', description: 'Unique Local (ULA)' },
  { prefix: 'fd00::', description: 'Unique Local (ULA)' },
  { prefix: 'fe80::', description: 'Link-local' },
];

const FORWARDED_HEADERS = [
  'x-forwarded-for',
  'x-real-ip',
  'cf-connecting-ip',
  'fastly-client-ip',
  'true-client-ip',
  'x-original-forwarded-for',
  'x-cluster-client-ip',
];

// ==================== Private Helpers ====================

/**
 * Validate IP string input
 */
const validateIP = (ip: string): string => {
  if (!ip || typeof ip !== 'string') {
    throw new Error('IP address is required');
  }
  return ip.trim();
};

/**
 * Convert IP to number for range checking (IPv4 only)
 */
const ipToNumber = (ip: string): number => {
  const parts = ip.split('.').map(Number);
  return ((parts[0] || 0) << 24) + ((parts[1] || 0) << 16) + ((parts[2] || 0) << 8) + (parts[3] || 0);
};

// ==================== Validation ====================

/**
 * Check if string is valid IPv4 address
 *
 * @param ip - String to check
 * @returns True if valid IPv4
 *
 * @example
 * isIPv4('192.168.1.1') // true
 * isIPv4('256.0.0.1') // false
 */
export const isIPv4 = (ip: string): boolean => {
  try {
    const validIP = validateIP(ip);
    return IPV4_REGEX.test(validIP);
  } catch {
    return false;
  }
};

/**
 * Check if string is valid IPv6 address
 *
 * @param ip - String to check
 * @returns True if valid IPv6
 */
export const isIPv6 = (ip: string): boolean => {
  try {
    const validIP = validateIP(ip);
    return IPV6_REGEX.test(validIP);
  } catch {
    return false;
  }
};

/**
 * Check if string is valid IP address (IPv4 or IPv6)
 *
 * @param ip - String to check
 * @returns True if valid IP
 */
export const isIP = (ip: string): boolean => {
  return isIPv4(ip) || isIPv6(ip);
};

/**
 * Get IP version
 *
 * @param ip - IP address
 * @returns 'IPv4', 'IPv6', or null
 */
export const getIPVersion = (ip: string): 'IPv4' | 'IPv6' | null => {
  if (isIPv4(ip)) return 'IPv4';
  if (isIPv6(ip)) return 'IPv6';
  return null;
};

// ==================== Masking ====================

/**
 * Mask IPv4 address for privacy
 * Example: 192.168.1.100 -> 192.168.*.*
 *
 * @param ip - IPv4 address
 * @returns Masked IP
 */
export const maskIPv4 = (ip: string): string => {
  const validIP = validateIP(ip);
  if (!isIPv4(validIP)) return validIP;

  const parts = validIP.split('.');
  if (parts.length !== 4) return validIP;

  parts[2] = '*';
  parts[3] = '*';
  return parts.join('.');
};

/**
 * Mask IPv6 address for privacy
 * Keeps first 2 groups visible
 *
 * @param ip - IPv6 address
 * @returns Masked IP
 */
export const maskIPv6 = (ip: string): string => {
  const validIP = validateIP(ip);
  if (!isIPv6(validIP)) return validIP;

  const parts = validIP.split(':');
  if (parts.length < 4) return validIP;

  const visible = parts.slice(0, 2);
  return `${visible.join(':')}:****:****:****`;
};

/**
 * Mask IP address (auto-detects version)
 *
 * @param ip - IP address
 * @returns Masked IP
 */
export const maskIP = (ip: string): string => {
  if (isIPv4(ip)) return maskIPv4(ip);
  if (isIPv6(ip)) return maskIPv6(ip);
  return ip;
};

// ==================== Parsing ====================

/**
 * Normalize IP address (remove IPv6 brackets, trim)
 *
 * @param ip - IP address (may contain brackets)
 * @returns Normalized IP
 */
export const normalizeIP = (ip: string): string => {
  const validIP = validateIP(ip);
  return validIP.replace(/^\[|\]$/g, '');
};

/**
 * Extract client IP from HTTP headers (respects proxy headers)
 *
 * @param headers - HTTP headers object
 * @returns Extracted IP or null
 */
export const extractIPFromHeaders = (headers: {
  'x-forwarded-for'?: string;
  'x-real-ip'?: string;
  'cf-connecting-ip'?: string;
  'fastly-client-ip'?: string;
  'true-client-ip'?: string;
  'x-original-forwarded-for'?: string;
  'x-cluster-client-ip'?: string;
  [key: string]: string | undefined;
}): string | null => {
  for (const header of FORWARDED_HEADERS) {
    const value = headers[header];
    if (value) {
      const ips = value.split(',');
      const firstIP = ips[0]?.trim();
      if (firstIP && isIP(firstIP)) {
        return firstIP;
      }
    }
  }
  return null;
};

/**
 * Get the real client IP from request context
 * Extracts from headers or falls back to direct IP
 *
 * @param headers - HTTP headers
 * @param remoteAddress - Direct remote address
 * @returns Client IP address
 */
export const getClientIP = (
  headers: Record<string, string | undefined>,
  remoteAddress?: string
): string | null => {
  const forwardedIP = extractIPFromHeaders(headers);
  if (forwardedIP) return forwardedIP;

  if (remoteAddress) {
    const normalized = normalizeIP(remoteAddress);
    if (isIP(normalized)) return normalized;
  }

  return null;
};

// ==================== Private IP Detection ====================

/**
 * Check if IPv4 is private/local
 */
const isPrivateIPv4 = (ip: string): boolean => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4) return false;

  if (parts[0] === 10) return true;
  if (parts[0] === 172 && (parts[1] || 0) >= 16 && (parts[1] || 0) <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 127) return true;
  if (parts[0] === 169 && parts[1] === 254) return true;

  return false;
};

/**
 * Check if IPv6 is private/local
 */
const isPrivateIPv6 = (ip: string): boolean => {
  const lowerIP = ip.toLowerCase();

  if (lowerIP === '::1') return true;
  if (lowerIP.startsWith('fc') || lowerIP.startsWith('fd')) return true;
  if (lowerIP.startsWith('fe80')) return true;

  return false;
};

/**
 * Check if IP is private/local (not publicly routable)
 *
 * @param ip - IP address
 * @returns True if private IP
 */
export const isPrivateIP = (ip: string): boolean => {
  if (isIPv4(ip)) return isPrivateIPv4(ip);
  if (isIPv6(ip)) return isPrivateIPv6(ip);
  return false;
};

/**
 * Check if IP is public (routable on internet)
 *
 * @param ip - IP address
 * @returns True if public IP
 */
export const isPublicIP = (ip: string): boolean => {
  return isIP(ip) && !isPrivateIP(ip);
};

// ==================== CIDR Helpers ====================

/**
 * Check if IP is within a CIDR range
 *
 * @param ip - IP address to check
 * @param cidr - CIDR notation (e.g., '192.168.0.0/16')
 * @returns True if IP is within range
 */
export const isIPInCIDR = (ip: string, cidr: string): boolean => {
  const [network, maskBits] = cidr.split('/');
  if (!network || !maskBits) return false;
  if (!isIP(network)) return false;

  const mask = parseInt(maskBits, 10);
  if (isNaN(mask)) return false;

  if (isIPv4(ip) && isIPv4(network)) {
    const ipNum = ipToNumber(ip);
    const networkNum = ipToNumber(network);
    const maskNum = ~((1 << (32 - mask)) - 1);
    return (ipNum & maskNum) === (networkNum & maskNum);
  }

  return false;
};

// ==================== Additional Helpers ====================

/**
 * Get the network part of an IPv4 address
 *
 * @param ip - IPv4 address
 * @param maskBits - CIDR mask bits (e.g., 24)
 * @returns Network address
 */
export const getNetworkAddress = (ip: string, maskBits: number): string | null => {
  if (!isIPv4(ip)) return null;
  const ipNum = ipToNumber(ip);
  const maskNum = ~((1 << (32 - maskBits)) - 1);
  const networkNum = ipNum & maskNum;
  
  const parts = [
    (networkNum >>> 24) & 255,
    (networkNum >>> 16) & 255,
    (networkNum >>> 8) & 255,
    networkNum & 255,
  ];
  return parts.join('.');
};

// ==================== Type Exports ====================

export type IPVersion = 'IPv4' | 'IPv6';
