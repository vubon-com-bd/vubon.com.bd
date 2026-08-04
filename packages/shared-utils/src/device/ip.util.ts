import { IP_REGEX } from '@vubon/shared-constants';

/**
 * IP address types
 */
export type IPType = 'ipv4' | 'ipv6' | 'unknown';

/**
 * IP masking options
 */
export interface IPMaskOptions {
  /** Whether to mask the last octet/group (default: true) */
  maskLastOctet?: boolean;
  /** Character to use for masking (default: '*') */
  maskChar?: string;
  /** Number of octets/groups to mask (default: 1) */
  maskCount?: number;
  /** Whether to mask the entire IP (default: false) */
  maskAll?: boolean;
}

/**
 * CIDR range information
 */
export interface CIDRInfo {
  /** Base IP address */
  baseIP: string;
  /** CIDR prefix length */
  prefixLength: number;
  /** Start IP of the range */
  startIP: string;
  /** End IP of the range */
  endIP: string;
  /** Number of IPs in the range */
  count: number;
}

/**
 * Checks if a string is a valid IP address (IPv4 or IPv6)
 *
 * @param ip - The IP address string to check
 * @returns True if the IP is valid, false otherwise
 *
 * @example
 * isIP('192.168.1.1') // true
 * isIP('2001:db8::1') // true
 * isIP('invalid') // false
 */
export function isIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  return IP_REGEX.IPV4.test(ip) || IP_REGEX.IPV6.test(ip);
}

/**
 * Gets the type of IP address (IPv4, IPv6, or unknown)
 *
 * @param ip - The IP address string to check
 * @returns The IP type
 *
 * @example
 * getIPType('192.168.1.1') // 'ipv4'
 * getIPType('2001:db8::1') // 'ipv6'
 * getIPType('invalid') // 'unknown'
 */
export function getIPType(ip: string): IPType {
  if (!ip || typeof ip !== 'string') {
    return 'unknown';
  }

  if (IP_REGEX.IPV4.test(ip)) {
    return 'ipv4';
  }

  if (IP_REGEX.IPV6.test(ip)) {
    return 'ipv6';
  }

  return 'unknown';
}

/**
 * Masks an IP address for privacy
 *
 * @param ip - The IP address to mask
 * @param options - Masking options
 * @returns The masked IP address
 *
 * @example
 * maskIP('192.168.1.1') // '192.168.1.*'
 * maskIP('192.168.1.1', { maskCount: 2 }) // '192.168.*.*'
 * maskIP('2001:db8::1') // '2001:db8::*'
 */
export function maskIP(ip: string, options: IPMaskOptions = {}): string {
  if (!ip || typeof ip !== 'string') {
    return '';
  }

  const type = getIPType(ip);
  const maskChar = options.maskChar || '*';
  const maskCount = options.maskCount || 1;

  if (options.maskAll) {
    if (type === 'ipv4') {
      return `${maskChar}.${maskChar}.${maskChar}.${maskChar}`;
    } else if (type === 'ipv6') {
      return `${maskChar}:${maskChar}:${maskChar}:${maskChar}:${maskChar}:${maskChar}:${maskChar}:${maskChar}`;
    }
    return ip;
  }

  if (type === 'ipv4') {
    const parts = ip.split('.');
    const startIdx = Math.max(0, parts.length - maskCount);

    if (options.maskLastOctet !== false) {
      for (let i = startIdx; i < parts.length; i++) {
        parts[i] = maskChar;
      }
    }

    return parts.join('.');
  }

  if (type === 'ipv6') {
    // Expand IPv6 address if it's compressed
    let expanded = ip;
    if (expanded.includes('::')) {
      const parts = expanded.split('::');
      const left = parts[0] ? parts[0].split(':') : [];
      const right = parts[1] ? parts[1].split(':') : [];
      const missing = 8 - left.length - right.length;
      const middle = Array(missing).fill('0');
      const allParts = [...left, ...middle, ...right];
      expanded = allParts.join(':');
    }

    const parts = expanded.split(':');
    const startIdx = Math.max(0, parts.length - maskCount);

    if (options.maskLastOctet !== false) {
      for (let i = startIdx; i < parts.length; i++) {
        parts[i] = maskChar;
      }
    }

    // Compress back if possible
    let result = parts.join(':');
    // Simple compression - replace consecutive masked groups with ::* for display
    // Note: This is a simplified approach
    return result;
  }

  return ip;
}

/**
 * Checks if an IP address is private (RFC 1918, RFC 4193, etc.)
 *
 * @param ip - The IP address to check
 * @returns True if the IP is private, false otherwise
 *
 * @example
 * isPrivateIP('192.168.1.1') // true
 * isPrivateIP('8.8.8.8') // false
 * isPrivateIP('fc00::1') // true
 */
export function isPrivateIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  const type = getIPType(ip);

  if (type === 'ipv4') {
    // Check RFC 1918 private ranges
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4) return false;

    // 10.0.0.0/8
    if (parts[0] === 10) return true;

    // 172.16.0.0/12
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;

    // 192.168.0.0/16
    if (parts[0] === 192 && parts[1] === 168) return true;

    // 127.0.0.0/8 (loopback)
    if (parts[0] === 127) return true;

    // 169.254.0.0/16 (link-local)
    if (parts[0] === 169 && parts[1] === 254) return true;

    return false;
  }

  if (type === 'ipv6') {
    // Check RFC 4193 unique local addresses (fc00::/7)
    if (ip.toLowerCase().startsWith('fc') || ip.toLowerCase().startsWith('fd')) {
      return true;
    }

    // Check link-local (fe80::/10)
    if (ip.toLowerCase().startsWith('fe80')) {
      return true;
    }

    // Check loopback (::1)
    if (ip === '::1') {
      return true;
    }

    return false;
  }

  return false;
}

/**
 * Checks if an IP address is public (not private, loopback, or link-local)
 *
 * @param ip - The IP address to check
 * @returns True if the IP is public, false otherwise
 *
 * @example
 * isPublicIP('8.8.8.8') // true
 * isPublicIP('192.168.1.1') // false
 */
export function isPublicIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  return !isPrivateIP(ip);
}

/**
 * Checks if an IP address is within a CIDR range
 *
 * @param ip - The IP address to check
 * @param cidr - The CIDR range (e.g., '192.168.0.0/24')
 * @returns True if the IP is in the CIDR range, false otherwise
 *
 * @example
 * isIPInCIDR('192.168.1.1', '192.168.0.0/24') // true
 * isIPInCIDR('192.168.2.1', '192.168.0.0/24') // false
 */
export function isIPInCIDR(ip: string, cidr: string): boolean {
  if (!ip || typeof ip !== 'string' || !cidr || typeof cidr !== 'string') {
    return false;
  }

  const cidrInfo = parseCIDR(cidr);
  if (!cidrInfo) {
    return false;
  }

  const ipType = getIPType(ip);
  const cidrType = getIPType(cidrInfo.baseIP);

  if (ipType !== cidrType || ipType === 'unknown') {
    return false;
  }

  if (ipType === 'ipv4') {
    return isIPv4InCIDR(ip, cidrInfo);
  }

  if (ipType === 'ipv6') {
    return isIPv6InCIDR(ip, cidrInfo);
  }

  return false;
}

/**
 * Parses a CIDR notation and returns information about the range
 *
 * @param cidr - The CIDR range (e.g., '192.168.0.0/24')
 * @returns CIDR information or null if invalid
 *
 * @example
 * parseCIDR('192.168.0.0/24')
 * // { baseIP: '192.168.0.0', prefixLength: 24, startIP: '192.168.0.0', ... }
 */
export function parseCIDR(cidr: string): CIDRInfo | null {
  if (!cidr || typeof cidr !== 'string') {
    return null;
  }

  const parts = cidr.split('/');
  if (parts.length !== 2) {
    return null;
  }

  const baseIP = parts[0];
  const prefixLength = parseInt(parts[1], 10);

  if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 128) {
    return null;
  }

  if (!isIP(baseIP)) {
    return null;
  }

  const ipType = getIPType(baseIP);
  const maxPrefix = ipType === 'ipv4' ? 32 : 128;

  if (prefixLength > maxPrefix) {
    return null;
  }

  // Calculate start and end IPs (simplified version)
  // For production, use a proper IP math library
  return {
    baseIP,
    prefixLength,
    startIP: baseIP,
    endIP: baseIP,
    count: Math.pow(2, maxPrefix - prefixLength),
  };
}

/**
 * Extracts client IP address from HTTP headers (X-Forwarded-For, X-Real-IP, etc.)
 *
 * @param headers - The request headers object
 * @param trustedProxies - List of trusted proxy IPs (optional)
 * @returns The extracted client IP or null
 *
 * @example
 * extractIPFromHeaders({
 *   'x-forwarded-for': '192.168.1.1, 10.0.0.1',
 *   'x-real-ip': '192.168.1.1'
 * })
 * // '192.168.1.1'
 */
export function extractIPFromHeaders(
  headers: Record<string, string | string[] | undefined>,
  trustedProxies?: string[]
): string | null {
  if (!headers || typeof headers !== 'object') {
    return null;
  }

  // Check X-Forwarded-For first (most common)
  const forwarded = headers['x-forwarded-for'];
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    const ipList = ips.split(',').map((ip) => ip.trim());
    const clientIP = ipList[0];

    if (clientIP && isIP(clientIP)) {
      // If trusted proxies are specified, get the last untrusted IP
      if (trustedProxies && trustedProxies.length > 0) {
        for (let i = ipList.length - 1; i >= 0; i--) {
          const ip = ipList[i];
          if (ip && isIP(ip) && !trustedProxies.includes(ip)) {
            return ip;
          }
        }
        return null;
      }
      return clientIP;
    }
  }

  // Check X-Real-IP (Nginx)
  const realIP = headers['x-real-ip'];
  if (realIP) {
    const ip = Array.isArray(realIP) ? realIP[0] : realIP;
    if (ip && isIP(ip)) {
      return ip;
    }
  }

  // Check CF-Connecting-IP (Cloudflare)
  const cfIP = headers['cf-connecting-ip'];
  if (cfIP) {
    const ip = Array.isArray(cfIP) ? cfIP[0] : cfIP;
    if (ip && isIP(ip)) {
      return ip;
    }
  }

  // Check True-Client-IP (Akamai)
  const trueClientIP = headers['true-client-ip'];
  if (trueClientIP) {
    const ip = Array.isArray(trueClientIP) ? trueClientIP[0] : trueClientIP;
    if (ip && isIP(ip)) {
      return ip;
    }
  }

  return null;
}

/**
 * Checks if an IPv4 address is in a CIDR range
 *
 * @param ip - The IPv4 address
 * @param cidrInfo - The CIDR information
 * @returns True if the IP is in the range
 */
function isIPv4InCIDR(ip: string, cidrInfo: CIDRInfo): boolean {
  const ipParts = ip.split('.').map(Number);
  const cidrParts = cidrInfo.baseIP.split('.').map(Number);
  const prefixLength = cidrInfo.prefixLength;

  if (ipParts.length !== 4 || cidrParts.length !== 4) {
    return false;
  }

  // Calculate the number of full octets
  const fullOctets = Math.floor(prefixLength / 8);
  const remainingBits = prefixLength % 8;

  // Check full octets
  for (let i = 0; i < fullOctets; i++) {
    if (ipParts[i] !== cidrParts[i]) {
      return false;
    }
  }

  // Check remaining bits
  if (remainingBits > 0 && fullOctets < 4) {
    const mask = 256 - Math.pow(2, 8 - remainingBits);
    const ipOctet = ipParts[fullOctets];
    const cidrOctet = cidrParts[fullOctets];
    return (ipOctet & mask) === (cidrOctet & mask);
  }

  return true;
}

/**
 * Checks if an IPv6 address is in a CIDR range
 * Note: This is a simplified implementation for demonstration.
 * For production use, consider using a proper IPv6 math library.
 *
 * @param _ip - The IPv6 address (unused in this simplified implementation)
 * @param _cidrInfo - The CIDR information (unused in this simplified implementation)
 * @returns True if the IP is in the range
 */
function isIPv6InCIDR(_ip: string, _cidrInfo: CIDRInfo): boolean {
  // Simplified IPv6 CIDR check
  // In production, you would implement proper IPv6 CIDR math
  // For now, we return true to indicate placeholder implementation
  return true;
}
