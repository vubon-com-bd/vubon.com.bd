/**
 * Location information from IP geolocation
 */
export interface LocationInfo {
  /** Country code (ISO-3166) */
  country?: string;
  /** Country name */
  countryName?: string;
  /** City name */
  city?: string;
  /** District/region name (Bangladesh specific) */
  district?: string;
  /** State/region name */
  region?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Timezone */
  timezone?: string;
  /** ISP name */
  isp?: string;
  /** ASN (Autonomous System Number) */
  asn?: string;
  /** Organization name */
  organization?: string;
  /** Raw geolocation data from provider */
  raw?: Record<string, unknown>;
}

/**
 * IP Geolocation Port
 * Defines the contract for IP geolocation and suspicious IP detection
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IIpGeolocation {
  /**
   * Get location information from an IP address
   * @param ip - The IP address to lookup
   * @returns A promise that resolves to the location information
   * @throws {Error} If geolocation lookup fails
   */
  getLocation(ip: string): Promise<LocationInfo>;

  /**
   * Check if an IP address is suspicious (VPN, proxy, Tor, etc.)
   * @param ip - The IP address to check
   * @returns A promise that resolves to true if suspicious, false otherwise
   */
  isSuspicious(ip: string): Promise<boolean>;

  /**
   * Calculate the distance between two IP addresses in kilometers
   * @param ip1 - The first IP address
   * @param ip2 - The second IP address
   * @returns A promise that resolves to the distance in kilometers
   */
  getDistance(ip1: string, ip2: string): Promise<number>;
}
