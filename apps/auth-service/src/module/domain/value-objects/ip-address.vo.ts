/**
 * IP Address Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/ip-address.vo
 * 
 * @description
 * Represents a validated and normalized IP address (IPv4 or IPv6).
 * Uses shared constants for IP ranges (private, Bangladesh ISP, cloud providers).
 * Used for security tracking, geolocation (at infrastructure level),
 * rate limiting, and access control.
 * 
 * Enterprise Rules:
 * ✅ Immutable - IP never changes after creation
 * ✅ Self-validating - Validates format and ranges
 * ✅ Normalized - Consistent format (IPv6 compressed)
 * ✅ Framework-free - No external dependencies
 * ✅ Shared ranges - Reuses constants across services
 * ✅ Bangladesh specific - Local ISP range detection
 * 
 * IMPORTANT: VPN/Proxy detection belongs to INFRASTRUCTURE layer
 * (requires external APIs like IP2Location, MaxMind, etc.)
 * 
 * @example
 * const ip = new IpAddress('192.168.1.1');
 * console.log(ip.isPrivate()); // true
 * console.log(ip.getVersion()); // 4
 * console.log(ip.toCIDR()); // '192.168.1.1/32'
 * console.log(ip.isBangladeshISP()); // false
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: Import IP ranges from shared-constants (reusable across services)
import {
  PRIVATE_IP_RANGES,
  BANGLADESH_ISP_RANGES,
  CLOUD_IP_RANGES,
  type IpRange,
} from '@vubon/shared-constants';

// ==================== Types ====================

/**
 * IP address validation result
 */
export interface IpValidation {
  isValid: boolean;
  normalized?: string;
  version?: 4 | 6;
  error?: string;
}

/**
 * IP address classification categories
 */
export enum IpCategory {
  PUBLIC = 'public',
  PRIVATE = 'private',
  LOOPBACK = 'loopback',
  LINK_LOCAL = 'link_local',
  MULTICAST = 'multicast',
  RESERVED = 'reserved',
  CLOUD = 'cloud',
  /** Bangladesh specific - Local ISP ranges */
  BANGLADESH_ISP = 'bangladesh_isp',
}

// ==================== Regex Patterns ====================

/**
 * IPv4 regex (strict)
 */
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * IPv6 regex (RFC 5954 compliant, supports compression)
 */
const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

// ==================== IP Address Value Object ====================

/**
 * IP Address Value Object
 * 
 * Represents a validated and normalized IP address
 */
export class IpAddress extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _version: 4 | 6;
  private readonly _category: IpCategory;
  private readonly _number: bigint;
  
  // Cache for equality components (performance optimization)
  private _cachedEqualityComponents: readonly unknown[] | null = null;

  /**
   * Creates a new IP Address value object
   * 
   * @param ip - Raw IP address string
   * @throws {Error} If IP format is invalid
   */
  constructor(ip: string) {
    super();
    
    const validation = IpAddress.validate(ip);
    if (!validation.isValid) {
      throw new Error(`Invalid IP address: ${validation.error}`);
    }
    
    this._value = ip.trim();
    this._normalized = validation.normalized!;
    this._version = validation.version!;
    this._category = IpAddress.determineCategory(this._normalized, this._version);
    this._number = this.calculateNumber();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('IP address cannot be empty');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating IpAddress from known valid value
   */
  public static fromValid(ip: string): IpAddress {
    return new IpAddress(ip);
  }

  /**
   * Creates an IpAddress from unknown input (safe parsing)
   */
  public static tryCreate(ip: unknown): IpAddress | null {
    if (typeof ip !== 'string') {
      return null;
    }
    
    try {
      return new IpAddress(ip);
    } catch {
      return null;
    }
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates an IP address
   * 
   * @param ip - The IP address to validate
   * @returns Validation result with normalized value if valid
   */
  public static validate(ip: string): IpValidation {
    // Check type and emptiness
    if (!ip || typeof ip !== 'string') {
      return {
        isValid: false,
        error: 'IP address cannot be null or undefined',
      };
    }

    const trimmed = ip.trim();
    
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'IP address cannot be empty',
      };
    }

    // Try IPv4
    if (IPV4_REGEX.test(trimmed)) {
      return {
        isValid: true,
        normalized: trimmed,
        version: 4,
        error: undefined,
      };
    }

    // Try IPv6
    if (IPV6_REGEX.test(trimmed)) {
      const normalized = IpAddress.normalizeIPv6(trimmed);
      return {
        isValid: true,
        normalized,
        version: 6,
        error: undefined,
      };
    }

    return {
      isValid: false,
      error: 'Invalid IP address format',
    };
  }

  /**
   * Normalize IPv6 address (compress, lowercase)
   */
  private static normalizeIPv6(ipv6: string): string {
    let normalized = ipv6.toLowerCase();
    
    // Compress the longest sequence of zeros
    const groups = normalized.split(':');
    let longestZeroStart = -1;
    let longestZeroLength = 0;
    let currentStart = -1;
    let currentLength = 0;
    
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (group === '' || group === '0') {
        if (currentStart === -1) {
          currentStart = i;
          currentLength = 1;
        } else {
          currentLength++;
        }
      } else {
        if (currentLength > longestZeroLength) {
          longestZeroStart = currentStart;
          longestZeroLength = currentLength;
        }
        currentStart = -1;
        currentLength = 0;
      }
    }
    
    if (currentLength > longestZeroLength) {
      longestZeroStart = currentStart;
      longestZeroLength = currentLength;
    }
    
    if (longestZeroStart !== -1 && longestZeroLength > 1) {
      const before = groups.slice(0, longestZeroStart);
      const after = groups.slice(longestZeroStart + longestZeroLength);
      normalized = [...before, '', ...after].join(':');
    }
    
    // Remove leading zeros from each group
    normalized = normalized.replace(/\b0+([0-9a-f]+)\b/g, '$1');
    
    return normalized;
  }

  /**
   * Calculate IP as bigint for numeric comparisons
   */
  private calculateNumber(): bigint {
    if (this._version === 4) {
      const parts = this._value.split('.').map(p => parseInt(p, 10));
      return BigInt(
        ((parts[0]! << 24) >>> 0) +
        ((parts[1]! << 16) >>> 0) +
        ((parts[2]! << 8) >>> 0) +
        parts[3]!
      );
    } else {
      // IPv6 to bigint
      let expanded = this.expandIPv6(this._normalized);
      const parts = expanded.split(':');
      let result = 0n;
      for (let i = 0; i < parts.length; i++) {
        result = (result << 16n) + BigInt(parseInt(parts[i] || '0', 16));
      }
      return result;
    }
  }

  /**
   * Expand compressed IPv6 address
   */
  private expandIPv6(ipv6: string): string {
    if (ipv6 === '::') {
      return '0:0:0:0:0:0:0:0';
    }
    
    let expanded = ipv6;
    const missingGroups = 8 - expanded.split(':').length;
    
    if (expanded.includes('::')) {
      expanded = expanded.replace('::', ':' + ':'.repeat(missingGroups));
    }
    
    const groups = expanded.split(':');
    while (groups.length < 8) {
      groups.splice(groups.indexOf(''), 1, '0');
    }
    
    return groups.map(g => g.padStart(4, '0')).join(':');
  }

  /**
   * Check if IP is within a range
   */
  private isInRange(start: string, end: string): boolean {
    try {
      const startIp = new IpAddress(start);
      const endIp = new IpAddress(end);
      return this._number >= startIp._number && this._number <= endIp._number;
    } catch {
      return false;
    }
  }

  /**
   * Determine IP category using shared constants
   */
  private static determineCategory(ip: string, version: 4 | 6): IpCategory {
    const instance = new IpAddress(ip);
    
    // Check private ranges (from shared-constants)
    for (const range of PRIVATE_IP_RANGES[version === 4 ? 'IPv4' : 'IPv6']) {
      if (instance.isInRange(range.start, range.end)) {
        if (range.name === 'Loopback') return IpCategory.LOOPBACK;
        if (range.name === 'Link Local') return IpCategory.LINK_LOCAL;
        return IpCategory.PRIVATE;
      }
    }
    
    // Check Bangladesh ISP ranges (from shared-constants) - IPv4 only
    if (version === 4) {
      for (const range of BANGLADESH_ISP_RANGES) {
        if (instance.isInRange(range.start, range.end)) {
          return IpCategory.BANGLADESH_ISP;
        }
      }
    }
    
    // Check cloud provider ranges (from shared-constants)
    for (const range of CLOUD_IP_RANGES) {
      if (instance.isInRange(range.start, range.end)) {
        return IpCategory.CLOUD;
      }
    }
    
    // Multicast
    if (version === 4) {
      const first = parseInt(ip.split('.')[0]!, 10);
      if (first >= 224 && first <= 239) return IpCategory.MULTICAST;
    } else {
      if (ip.startsWith('ff')) return IpCategory.MULTICAST;
    }
    
    return IpCategory.PUBLIC;
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Get the raw IP address value
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get normalized IP address
   */
  public getNormalized(): string {
    return this._normalized;
  }

  /**
   * Get IP version
   */
  public getVersion(): 4 | 6 {
    return this._version;
  }

  /**
   * Get IP as bigint
   */
  public getNumber(): bigint {
    return this._number;
  }

  /**
   * Get IP category
   */
  public getCategory(): IpCategory {
    return this._category;
  }

  /**
   * Check if IP is private
   */
  public isPrivate(): boolean {
    return this._category === IpCategory.PRIVATE || 
           this._category === IpCategory.LOOPBACK ||
           this._category === IpCategory.LINK_LOCAL;
  }

  /**
   * Check if IP is public (internet routable)
   */
  public isPublic(): boolean {
    return this._category === IpCategory.PUBLIC;
  }

  /**
   * Check if IP is localhost
   */
  public isLocalhost(): boolean {
    return this._category === IpCategory.LOOPBACK;
  }

  /**
   * Check if IP is link-local
   */
  public isLinkLocal(): boolean {
    return this._category === IpCategory.LINK_LOCAL;
  }

  /**
   * Check if IP is multicast
   */
  public isMulticast(): boolean {
    return this._category === IpCategory.MULTICAST;
  }

  /**
   * Check if IP is from Bangladesh ISP
   */
  public isBangladeshISP(): boolean {
    return this._category === IpCategory.BANGLADESH_ISP;
  }

  /**
   * Check if IP is from cloud provider
   */
  public isCloudProvider(): boolean {
    return this._category === IpCategory.CLOUD;
  }

  /**
   * Check if IP is in a CIDR range
   * 
   * @param cidr - CIDR notation (e.g., '192.168.1.0/24')
   */
  public isInCIDR(cidr: string): boolean {
    const [network, maskBits] = cidr.split('/');
    if (!network || !maskBits) return false;
    
    const mask = parseInt(maskBits, 10);
    if (isNaN(mask) || mask < 0 || mask > (this._version === 4 ? 32 : 128)) return false;
    
    try {
      const networkIp = new IpAddress(network);
      const shift = BigInt((this._version === 4 ? 32 : 128) - mask);
      
      return (this._number >> shift) === (networkIp._number >> shift);
    } catch {
      return false;
    }
  }

  /**
   * Get network class (IPv4 only)
   */
  public getNetworkClass(): 'A' | 'B' | 'C' | 'D' | 'E' | null {
    if (this._version !== 4) return null;
    
    const first = parseInt(this._value.split('.')[0]!, 10);
    if (first >= 1 && first <= 126) return 'A';
    if (first >= 128 && first <= 191) return 'B';
    if (first >= 192 && first <= 223) return 'C';
    if (first >= 224 && first <= 239) return 'D';
    if (first >= 240 && first <= 255) return 'E';
    return null;
  }

  /**
   * Check if IP is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '0.0.0.0' || 
           this._value === '::' || 
           this._value === '' ||
           this._value === 'unknown';
  }

  /**
   * Get CIDR notation (single IP)
   */
  public toCIDR(): string {
    return `${this._value}/${this._version === 4 ? 32 : 128}`;
  }

  /**
   * Get equality components with caching for performance
   */
  protected getEqualityComponents(): readonly unknown[] {
    if (!this._cachedEqualityComponents) {
      this._cachedEqualityComponents = [this._normalized, this._version];
    }
    return this._cachedEqualityComponents;
  }

  /**
   * Invalidate cache (useful for testing)
   */
  protected override invalidateCache(): void {
    super.invalidateCache();
    this._cachedEqualityComponents = null;
  }

  /**
   * Convert to JSON
   */
  public override toJSON(): Record<string, unknown> {
    return {
      value: this._value,
      normalized: this._normalized,
      version: this._version,
      category: this._category,
      isPrivate: this.isPrivate(),
      isPublic: this.isPublic(),
      isLocalhost: this.isLocalhost(),
      isBangladeshISP: this.isBangladeshISP(),
      networkClass: this.getNetworkClass(),
    };
  }

  /**
   * String representation
   */
  public override toString(): string {
    return `IpAddress(${this._value})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is an IpAddress
 */
export function isIpAddress(value: unknown): value is IpAddress {
  return value instanceof IpAddress;
}

/**
 * Create IpAddress from request headers
 */
export function createIpFromRequest(
  forwardedFor: string | null | undefined,
  realIp: string | null | undefined,
  remoteAddress: string | null | undefined
): IpAddress | null {
  // Priority: X-Forwarded-For > X-Real-IP > remoteAddress
  const ipString = forwardedFor?.split(',')[0]?.trim() || realIp || remoteAddress;
  
  if (!ipString) return null;
  return IpAddress.tryCreate(ipString);
}

// ============================================================
// Type Exports
// ============================================================

export type { IpRange };
