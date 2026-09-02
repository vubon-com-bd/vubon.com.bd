/**
 * Auth IP Validator
 * প্রমীকরণ IP ভ্যালিডেটর
 */

export const AuthIPValidator = {
  /**
   * Validate IP address
   * IP অ্যাড্রেস ভ্যালিডেট করা
   */
  isValid: (ip: string): boolean => {
    // IPv4 validation
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipv4Regex.test(ip)) return true;

    // IPv6 validation (simplified)
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv6Regex.test(ip);
  },

  /**
   * Check if IP is private
   * IP প্রাইভেট কিনা চেক করা
   */
  isPrivate: (ip: string): boolean => {
    // Private IPv4 ranges
    const privateRanges = [
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/,
      /^192\.168\.\d{1,3}\.\d{1,3}$/,
      /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    ];

    return privateRanges.some((regex) => regex.test(ip));
  },

  /**
   * Check if IP is in allowed list
   * IP অনুমোদিত লিস্টে আছে কিনা চেক করা
   */
  isAllowed: (ip: string, allowedIPs: string[]): boolean => {
    if (!allowedIPs || allowedIPs.length === 0) return true;
    return allowedIPs.includes(ip);
  },

  /**
   * Check if IP is in blocked list
   * IP ব্লকড লিস্টে আছে কিনা চেক করা
   */
  isBlocked: (ip: string, blockedIPs: string[]): boolean => {
    if (!blockedIPs || blockedIPs.length === 0) return false;
    return blockedIPs.includes(ip);
  },

  /**
   * Check if IP is in CIDR range
   * IP CIDR রেঞ্জের মধ্যে আছে কিনা চেক করা
   */
  isInCIDR: (ip: string, cidr: string): boolean => {
    if (!AuthIPValidator.isValid(ip)) return false;

    try {
      const [range, prefix] = cidr.split('/');
      if (!range || !prefix) return false;

      const prefixLength = parseInt(prefix, 10);
      if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) return false;

      // Simplified CIDR check for IPv4
      const ipParts = ip.split('.').map(Number);
      const rangeParts = range.split('.').map(Number);

      const ipBinary = ipParts.map((part) => part.toString(2).padStart(8, '0')).join('');
      const rangeBinary = rangeParts.map((part) => part.toString(2).padStart(8, '0')).join('');

      return ipBinary.slice(0, prefixLength) === rangeBinary.slice(0, prefixLength);
    } catch (error) {
      // Log error using console.warn (allowed by ESLint)
      console.warn('CIDR check error:', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  },

  /**
   * Get IP location (simplified)
   * IP লোকেশন পাওয়া (সরলীকৃত)
   */
  getLocation: (ip: string): { country: string; city: string; timezone: string } | null => {
    if (!AuthIPValidator.isValid(ip)) return null;
    if (AuthIPValidator.isPrivate(ip)) {
      return {
        country: 'Local',
        city: 'Local Network',
        timezone: 'UTC',
      };
    }

    // In real implementation, this would use a geolocation service
    // Simplified version with mock data
    return {
      country: 'Bangladesh',
      city: 'Dhaka',
      timezone: 'Asia/Dhaka',
    };
  },

  /**
   * Check if IP is from Bangladesh
   * IP বাংলাদেশ থেকে কিনা চেক করা
   */
  isFromBangladesh: (ip: string): boolean => {
    if (!AuthIPValidator.isValid(ip)) return false;
    if (AuthIPValidator.isPrivate(ip)) return true;

    // In real implementation, this would check against a GeoIP database
    // Simplified version
    const location = AuthIPValidator.getLocation(ip);
    return location?.country === 'Bangladesh';
  },

  /**
   * Mask IP address
   * IP অ্যাড্রেস মাস্ক করা
   */
  mask: (ip: string): string => {
    if (!AuthIPValidator.isValid(ip)) return ip;

    const parts = ip.split('.');
    if (parts.length === 4) {
      // IPv4: mask last two octets
      return `${parts[0]}.${parts[1]}.*.*`;
    }

    // IPv6: mask last 4 groups
    const groups = ip.split(':');
    if (groups.length >= 4) {
      const maskedGroups = groups.slice(0, 4);
      return `${maskedGroups.join(':')}:****:****`;
    }

    return ip;
  },
};
