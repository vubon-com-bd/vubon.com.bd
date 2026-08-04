import { createHash } from 'crypto';

/**
 * Device fingerprint data interface
 */
export interface DeviceFingerprintData {
  /** User agent string */
  userAgent?: string;
  /** Accept language header */
  acceptLanguage?: string;
  /** Timezone offset in minutes */
  timezoneOffset?: number;
  /** Screen resolution (e.g., '1920x1080') */
  screenResolution?: string;
  /** Platform (e.g., 'Win32', 'MacIntel', 'Linux x86_64') */
  platform?: string;
  /** Device memory in GB */
  deviceMemory?: number;
  /** Number of logical processors */
  hardwareConcurrency?: number;
  /** WebGL vendor */
  webglVendor?: string;
  /** WebGL renderer */
  webglRenderer?: string;
  /** Audio fingerprint (base64) */
  audioFingerprint?: string;
  /** Canvas fingerprint (base64) */
  canvasFingerprint?: string;
  /** List of installed fonts */
  fontsList?: string[];
  /** Whether touch is supported */
  touchSupport?: boolean;
  /** Whether cookies are enabled */
  cookiesEnabled?: boolean;
  /** DNT (Do Not Track) status */
  dntStatus?: boolean;
  /** Connection type (e.g., 'wifi', 'cellular', 'ethernet') */
  connectionType?: string;
  /** Additional custom data */
  customData?: Record<string, unknown>;
}

/**
 * Fingerprint comparison result
 */
export interface FingerprintComparisonResult {
  /** Whether the fingerprints match exactly */
  isMatch: boolean;
  /** Similarity score (0-1) where 1 is identical */
  similarityScore: number;
  /** Which components matched */
  matchedComponents: string[];
  /** Which components differed */
  differedComponents: string[];
  /** Confidence level (0-1) */
  confidence: number;
}

/**
 * Versioned fingerprint result
 */
export interface VersionedFingerprint {
  /** The fingerprint hash */
  hash: string;
  /** Component version for tracking changes */
  version: number;
  /** Timestamp when fingerprint was generated */
  timestamp: Date;
  /** Data used to generate the fingerprint */
  data: DeviceFingerprintData;
}

/**
 * Generates a device fingerprint from browser/client data
 *
 * @param data - The device fingerprint data
 * @param options - Optional configuration
 * @param options.includeFingerprintData - Whether to include raw data in the hash (default: false)
 * @returns The SHA-256 fingerprint hash
 *
 * @example
 * const fingerprint = generateFingerprint({
 *   userAgent: 'Mozilla/5.0...',
 *   screenResolution: '1920x1080',
 *   timezoneOffset: -240
 * });
 */
export function generateFingerprint(
  data: DeviceFingerprintData,
  options: { includeFingerprintData?: boolean } = {}
): string {
  const normalized = normalizeFingerprintData(data);
  const components = [
    normalized.userAgent || '',
    normalized.acceptLanguage || '',
    normalized.timezoneOffset?.toString() || '',
    normalized.screenResolution || '',
    normalized.platform || '',
    normalized.deviceMemory?.toString() || '',
    normalized.hardwareConcurrency?.toString() || '',
    normalized.webglVendor || '',
    normalized.webglRenderer || '',
    normalized.audioFingerprint || '',
    normalized.canvasFingerprint || '',
    (normalized.fontsList || []).join(',') || '',
    normalized.touchSupport?.toString() || '',
    normalized.cookiesEnabled?.toString() || '',
    normalized.dntStatus?.toString() || '',
    normalized.connectionType || '',
  ];

  // If there's custom data, add it to the components
  if (data.customData) {
    const customString = Object.entries(data.customData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${String(value)}`)
      .join('|');
    components.push(customString);
  }

  const combinedString = components.join('|');
  const hash = createHash('sha256').update(combinedString).digest('hex');

  if (options.includeFingerprintData) {
    return hash + ':' + Buffer.from(combinedString).toString('base64');
  }

  return hash;
}

/**
 * Normalizes fingerprint data for consistent hashing
 *
 * @param data - The raw fingerprint data
 * @returns Normalized fingerprint data
 */
function normalizeFingerprintData(data: DeviceFingerprintData): Required<DeviceFingerprintData> {
  return {
    userAgent: data.userAgent?.trim() || '',
    acceptLanguage: data.acceptLanguage?.trim() || '',
    timezoneOffset: data.timezoneOffset ?? 0,
    screenResolution: data.screenResolution?.trim() || '',
    platform: data.platform?.trim() || '',
    deviceMemory: data.deviceMemory ?? 0,
    hardwareConcurrency: data.hardwareConcurrency ?? 0,
    webglVendor: data.webglVendor?.trim() || '',
    webglRenderer: data.webglRenderer?.trim() || '',
    audioFingerprint: data.audioFingerprint?.trim() || '',
    canvasFingerprint: data.canvasFingerprint?.trim() || '',
    fontsList: data.fontsList || [],
    touchSupport: data.touchSupport ?? false,
    cookiesEnabled: data.cookiesEnabled ?? false,
    dntStatus: data.dntStatus ?? false,
    connectionType: data.connectionType?.trim() || '',
    customData: data.customData || {},
  };
}

/**
 * Compares two device fingerprints and determines if they match
 *
 * @param fingerprint1 - The first fingerprint hash
 * @param fingerprint2 - The second fingerprint hash
 * @param options - Comparison options
 * @param options.threshold - Similarity threshold (0-1) for match (default: 0.8)
 * @param options.ignoreVersion - Whether to ignore version differences (default: false)
 * @returns True if the fingerprints match, false otherwise
 *
 * @example
 * const result = compareFingerprints(
 *   'abc123...',
 *   'def456...',
 *   { threshold: 0.9 }
 * );
 */
export function compareFingerprints(
  fingerprint1: string,
  fingerprint2: string,
  options: { threshold?: number; ignoreVersion?: boolean } = {}
): boolean {
  const threshold = options.threshold ?? 0.8;

  // Clean fingerprints by removing version prefixes if specified
  let clean1 = fingerprint1;
  let clean2 = fingerprint2;

  if (options.ignoreVersion) {
    clean1 = removeVersionPrefix(fingerprint1);
    clean2 = removeVersionPrefix(fingerprint2);
  }

  // Exact match check
  if (clean1 === clean2) {
    return true;
  }

  // Calculate similarity score and compare against threshold
  const similarity = fingerprintSimilarity(clean1, clean2);
  return similarity >= threshold;
}

/**
 * Calculates the similarity score between two fingerprints (0-1)
 *
 * @param fingerprint1 - The first fingerprint hash
 * @param fingerprint2 - The second fingerprint hash
 * @returns The similarity score (0-1) where 1 is identical
 *
 * @example
 * const score = fingerprintSimilarity('abc123...', 'abc124...');
 * // 0.95
 */
export function fingerprintSimilarity(fingerprint1: string, fingerprint2: string): number {
  // Handle exact matches
  if (fingerprint1 === fingerprint2) {
    return 1;
  }

  // Handle empty fingerprints
  if (!fingerprint1 && !fingerprint2) {
    return 1;
  }

  if (!fingerprint1 || !fingerprint2) {
    return 0;
  }

  // Clean fingerprints by removing version prefixes if present
  const clean1 = removeVersionPrefix(fingerprint1);
  const clean2 = removeVersionPrefix(fingerprint2);

  // Exact match after cleaning
  if (clean1 === clean2) {
    return 1;
  }

  // Calculate Levenshtein distance
  const distance = levenshteinDistance(clean1, clean2);
  const maxLength = Math.max(clean1.length, clean2.length);

  if (maxLength === 0) {
    return 1;
  }

  // Return similarity as 1 - normalized distance
  return 1 - distance / maxLength;
}

/**
 * Removes version prefix from a fingerprint if present
 *
 * @param fingerprint - The fingerprint to clean
 * @returns The fingerprint without version prefix
 */
function removeVersionPrefix(fingerprint: string): string {
  // Check if fingerprint has version prefix (e.g., "v2_abc123...")
  const parts = fingerprint.split('_');
  if (parts.length > 1 && /^v\d+$/.test(parts[0])) {
    return parts.slice(1).join('_');
  }
  return fingerprint;
}

/**
 * Calculates the Levenshtein distance between two strings
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The Levenshtein distance
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create distance matrix
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Generates a versioned device fingerprint
 *
 * @param data - The device fingerprint data
 * @param version - The version number (default: 1)
 * @returns A versioned fingerprint object
 *
 * @example
 * const fingerprint = generateVersionedFingerprint({
 *   userAgent: 'Mozilla/5.0...',
 *   screenResolution: '1920x1080'
 * }, 2);
 */
export function generateVersionedFingerprint(
  data: DeviceFingerprintData,
  version: number = 1
): VersionedFingerprint {
  const normalized = normalizeFingerprintData(data);
  const hash = generateFingerprint(normalized);

  return {
    hash: `v${version}_${hash}`,
    version,
    timestamp: new Date(),
    data: normalized,
  };
}

/**
 * Compares a versioned fingerprint with a hash
 *
 * @param versionedFingerprint - The versioned fingerprint
 * @param fingerprintHash - The fingerprint hash to compare against
 * @param options - Comparison options
 * @returns The fingerprint comparison result
 *
 * @example
 * const result = compareVersionedFingerprint(
 *   { hash: 'v1_abc123...', version: 1, timestamp: new Date(), data: {} },
 *   'abc123...'
 * );
 */
export function compareVersionedFingerprint(
  versionedFingerprint: VersionedFingerprint,
  fingerprintHash: string,
  options: { threshold?: number } = {}
): FingerprintComparisonResult {
  const cleanFingerprint = removeVersionPrefix(versionedFingerprint.hash);
  const cleanHash = removeVersionPrefix(fingerprintHash);

  const similarity = fingerprintSimilarity(cleanFingerprint, cleanHash);
  const isMatch = similarity >= (options.threshold ?? 0.8);

  // Calculate which components match (for detailed analysis)
  const matchedComponents: string[] = [];
  const differedComponents: string[] = [];

  // Compare each component of the fingerprint data
  const components = [
    'userAgent',
    'acceptLanguage',
    'timezoneOffset',
    'screenResolution',
    'platform',
    'deviceMemory',
    'hardwareConcurrency',
    'webglVendor',
    'webglRenderer',
    'audioFingerprint',
    'canvasFingerprint',
    'fontsList',
    'touchSupport',
    'cookiesEnabled',
    'dntStatus',
    'connectionType',
  ];

  for (const component of components) {
    // Extract component from both fingerprints if possible
    const matchScore = similarity; // Simplified - actual implementation would compare components
    if (matchScore > 0.7) {
      matchedComponents.push(component);
    } else {
      differedComponents.push(component);
    }
  }

  return {
    isMatch,
    similarityScore: similarity,
    matchedComponents,
    differedComponents,
    confidence: similarity,
  };
}

/**
 * Extracts fingerprint components from a fingerprint hash (if available)
 *
 * @param fingerprint - The fingerprint hash
 * @returns The extracted data or null if not available
 */
export function extractFingerprintData(fingerprint: string): DeviceFingerprintData | null {
  try {
    // Check if fingerprint includes embedded data
    const parts = fingerprint.split(':');
    if (parts.length === 2) {
      const encodedData = parts[1];
      const decoded = Buffer.from(encodedData, 'base64').toString('utf-8');
      // Parse the components back to data
      const components = decoded.split('|');
      // This is a simplified implementation - in production you'd want
      // proper serialization/deserialization of the fingerprint data
      return {
        userAgent: components[0] || undefined,
        acceptLanguage: components[1] || undefined,
        timezoneOffset: parseInt(components[2]) || undefined,
        screenResolution: components[3] || undefined,
        platform: components[4] || undefined,
        deviceMemory: parseInt(components[5]) || undefined,
        hardwareConcurrency: parseInt(components[6]) || undefined,
        webglVendor: components[7] || undefined,
        webglRenderer: components[8] || undefined,
        audioFingerprint: components[9] || undefined,
        canvasFingerprint: components[10] || undefined,
        fontsList: components[11] ? components[11].split(',') : undefined,
        touchSupport: components[12] === 'true',
        cookiesEnabled: components[13] === 'true',
        dntStatus: components[14] === 'true',
        connectionType: components[15] || undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
}
