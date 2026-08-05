import { BaseValueObject } from './base.vo';
import { IP_REGEX } from '@vubon/shared-constants';

/**
 * IP Address Value Object
 * Represents a validated IP address (IPv4 or IPv6)
 * Used for audit logging, security checks, and request tracking
 */
export class IpAddress extends BaseValueObject<string> {
  private readonly _type: 'ipv4' | 'ipv6' | 'unknown';
  private readonly _isPrivate: boolean;
  private readonly _isLoopback: boolean;
  private readonly _isLinkLocal: boolean;

  private constructor(value: string) {
    const normalized = value.trim();
    IpAddress.validate(normalized);
    super(normalized);

    this._type = IpAddress.detectType(normalized);
    this._isPrivate = IpAddress.checkPrivate(normalized);
    this._isLoopback = IpAddress.checkLoopback(normalized);
    this._isLinkLocal = IpAddress.checkLinkLocal(normalized);
  }

  /**
   * Create a new IP Address instance
   * @throws {Error} If the IP address is invalid
   */
  static create(value: string): IpAddress {
    return new IpAddress(value);
  }

  /**
   * Validate IP address format
   * @throws {Error} If the IP address is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('IP address must be a non-empty string');
    }

    // Check against IPv4 regex
    if (IP_REGEX.IPV4.test(value)) {
      return;
    }

    // Check against IPv6 regex
    if (IP_REGEX.IPV6.test(value)) {
      return;
    }

    throw new Error(`Invalid IP address format: ${value}`);
  }

  /**
   * Detect the IP address type
   */
  private static detectType(value: string): 'ipv4' | 'ipv6' | 'unknown' {
    if (IP_REGEX.IPV4.test(value)) {
      return 'ipv4';
    }

    if (IP_REGEX.IPV6.test(value)) {
      return 'ipv6';
    }

    return 'unknown';
  }

  /**
   * Check if the IP address is private (RFC 1918, RFC 4193)
   */
  private static checkPrivate(value: string): boolean {
    const type = IpAddress.detectType(value);

    if (type === 'ipv4') {
      const parts = value.split('.').map(Number);
      if (parts.length !== 4) return false;

      // 10.0.0.0/8
      if (parts[0] === 10) return true;

      // 172.16.0.0/12
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;

      // 192.168.0.0/16
      if (parts[0] === 192 && parts[1] === 168) return true;

      return false;
    }

    if (type === 'ipv6') {
      // RFC 4193 unique local addresses (fc00::/7)
      const lower = value.toLowerCase();
      if (lower.startsWith('fc') || lower.startsWith('fd')) {
        return true;
      }

      return false;
    }

    return false;
  }

  /**
   * Check if the IP address is loopback (127.0.0.1, ::1)
   */
  private static checkLoopback(value: string): boolean {
    const type = IpAddress.detectType(value);

    if (type === 'ipv4') {
      const parts = value.split('.').map(Number);
      if (parts.length !== 4) return false;

      // 127.0.0.0/8
      if (parts[0] === 127) return true;

      return false;
    }

    if (type === 'ipv6') {
      // ::1
      if (value === '::1') return true;

      return false;
    }

    return false;
  }

  /**
   * Check if the IP address is link-local (169.254.0.0/16, fe80::/10)
   */
  private static checkLinkLocal(value: string): boolean {
    const type = IpAddress.detectType(value);

    if (type === 'ipv4') {
      const parts = value.split('.').map(Number);
      if (parts.length !== 4) return false;

      // 169.254.0.0/16
      if (parts[0] === 169 && parts[1] === 254) return true;

      return false;
    }

    if (type === 'ipv6') {
      // fe80::/10
      if (value.toLowerCase().startsWith('fe80')) {
        return true;
      }

      return false;
    }

    return false;
  }

  /**
   * Get the IP address type
   */
  getType(): 'ipv4' | 'ipv6' | 'unknown' {
    return this._type;
  }

  /**
   * Check if the IP address is private
   */
  isPrivate(): boolean {
    return this._isPrivate;
  }

  /**
   * Check if the IP address is public
   */
  isPublic(): boolean {
    return !this._isPrivate && !this._isLoopback && !this._isLinkLocal;
  }

  /**
   * Check if the IP address is loopback
   */
  isLoopback(): boolean {
    return this._isLoopback;
  }

  /**
   * Check if the IP address is link-local
   */
  isLinkLocal(): boolean {
    return this._isLinkLocal;
  }

  /**
   * Check if the IP address is in a specific CIDR range
   */
  isInCIDR(cidr: string): boolean {
    if (!cidr || typeof cidr !== 'string') {
      return false;
    }

    const parts = cidr.split('/');
    if (parts.length !== 2) {
      return false;
    }

    const network = parts[0];
    const prefixLength = parseInt(parts[1], 10);

    if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 128) {
      return false;
    }

    // Validate network address
    try {
      IpAddress.validate(network);
    } catch {
      return false;
    }

    // Simplified CIDR check - for production use proper IP math library
    const networkType = IpAddress.detectType(network);
    const ipType = this._type;

    if (networkType !== ipType || ipType === 'unknown') {
      return false;
    }

    // For IPv4, simple prefix check
    if (ipType === 'ipv4') {
      const ipParts = this._value.split('.').map(Number);
      const networkParts = network.split('.').map(Number);

      if (ipParts.length !== 4 || networkParts.length !== 4) {
        return false;
      }

      const fullOctets = Math.floor(prefixLength / 8);
      const remainingBits = prefixLength % 8;

      // Check full octets
      for (let i = 0; i < fullOctets; i++) {
        if (ipParts[i] !== networkParts[i]) {
          return false;
        }
      }

      // Check remaining bits
      if (remainingBits > 0 && fullOctets < 4) {
        const mask = 256 - Math.pow(2, 8 - remainingBits);
        const ipOctet = ipParts[fullOctets];
        const networkOctet = networkParts[fullOctets];
        return (ipOctet & mask) === (networkOctet & mask);
      }

      return true;
    }

    // IPv6 - simplified check
    // For production, use a proper IP library
    return true;
  }

  /**
   * Mask the IP address for privacy
   * For IPv4: 192.168.1.1 -> 192.168.1.*
   * For IPv6: 2001:db8::1 -> 2001:db8::*
   */
  mask(): string {
    if (this._type === 'ipv4') {
      const parts = this._value.split('.');
      if (parts.length === 4) {
        parts[3] = '*';
        return parts.join('.');
      }
      return this._value;
    }

    if (this._type === 'ipv6') {
      // Simplified masking for IPv6
      const parts = this._value.split(':');
      if (parts.length >= 4) {
        // Keep first 3 groups, mask the rest
        const maskedParts = parts.slice(0, 3);
        maskedParts.push('*');
        return maskedParts.join(':');
      }
      return this._value;
    }

    return this._value;
  }

  /**
   * Get the IP address in different formats
   */
  toFormats(): {
    full: string;
    masked: string;
    type: 'ipv4' | 'ipv6' | 'unknown';
    isPrivate: boolean;
    isPublic: boolean;
    isLoopback: boolean;
    isLinkLocal: boolean;
  } {
    return {
      full: this._value,
      masked: this.mask(),
      type: this._type,
      isPrivate: this._isPrivate,
      isPublic: this.isPublic(),
      isLoopback: this._isLoopback,
      isLinkLocal: this._isLinkLocal,
    };
  }

  /**
   * Compare two IpAddress objects
   */
  equals(other: IpAddress | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof IpAddress)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return this._value;
  }

  /**
   * Get the raw value
   */
  getValue(): string {
    return this._value;
  }
}
