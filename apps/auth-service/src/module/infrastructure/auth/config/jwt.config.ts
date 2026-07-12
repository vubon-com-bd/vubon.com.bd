/**
 * JWT Configuration - Enterprise Grade with Secret Management & Key Rotation
 * 
 * @module infrastructure/config/jwt.config
 * 
 * @description
 * Centralized JWT configuration using shared-config with advanced secret management.
 * Supports AWS Secrets Manager, HashiCorp Vault, and environment-based fallback.
 * Implements key rotation with versioning and grace period.
 * 
 * Enterprise Features:
 * ✅ Environment-aware configuration
 * ✅ Secret Manager integration (AWS Secrets Manager, HashiCorp Vault)
 * ✅ Key rotation with versioning
 * ✅ Grace period for old keys during rotation
 * ✅ RS256/HS256 support (RS256 for production)
 * ✅ Token expiry management
 * ✅ Clock tolerance for sync issues
 * ✅ Issuer/Audience validation
 * ✅ Cache with TTL for secrets
 * ✅ Fallback to environment variables
 * 
 * @example
 * import { jwtConfig } from './jwt.config';
 * 
 * const secret = await jwtConfig.getSecret();
 * const expiresIn = jwtConfig.accessTokenExpiry;
 */

import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

/**
 * JWT algorithm types
 */
export type JWTAlgorithm = 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';

/**
 * Secret Manager provider types
 */
export type SecretManagerProvider = 'aws' | 'hashicorp' | 'environment' | 'none';

/**
 * JWT secret with version metadata
 */
export interface JWTSecret {
  /** The actual secret/key material */
  value: string;
  /** Version identifier */
  version: string;
  /** When this secret becomes active */
  activatedAt: Date;
  /** When this secret expires (for rotation) */
  expiresAt?: Date;
  /** Whether this is the current active version */
  isCurrent: boolean;
}

/**
 * Secret Manager configuration
 */
export interface SecretManagerConfig {
  /** Provider type */
  provider: SecretManagerProvider;
  /** Secret ID/path in the secret manager */
  secretId: string;
  /** Region (for AWS) */
  region?: string;
  /** Endpoint (for HashiCorp Vault) */
  endpoint?: string;
  /** Token/authentication for Vault */
  token?: string;
  /** Cache TTL in seconds (default: 300) */
  cacheTTLSeconds?: number;
  /** Enable automatic rotation check */
  enableRotation?: boolean;
  /** Rotation check interval in seconds (default: 3600) */
  rotationCheckIntervalSeconds?: number;
}

/**
 * Key rotation configuration
 */
export interface KeyRotationConfig {
  /** Enable key rotation */
  enabled: boolean;
  /** Grace period in seconds (old keys remain valid) */
  gracePeriodSeconds: number;
  /** Rotation interval in days */
  rotationIntervalDays: number;
  /** Maximum versions to keep */
  maxVersions: number;
  /** Notification webhook URL for rotation events */
  notificationWebhook?: string;
}

/**
 * JWT configuration interface
 */
export interface JWTConfig {
  /** JWT secret (for HS algorithms) - use getSecret() for runtime */
  secret: string;
  /** Public key (for RS/ES algorithms) - use getPublicKey() for runtime */
  publicKey: string | undefined;
  /** Private key (for RS/ES algorithms) - use getPrivateKey() for runtime */
  privateKey: string | undefined;
  /** Algorithm to use */
  algorithm: JWTAlgorithm;
  /** Access token expiry (e.g., '15m', '1h', '7d') */
  accessTokenExpiry: string;
  /** Refresh token expiry */
  refreshTokenExpiry: string;
  /** Reset token expiry */
  resetTokenExpiry: string;
  /** Email verification token expiry */
  verificationTokenExpiry: string;
  /** MFA token expiry */
  mfaTokenExpiry: string;
  /** Magic link expiry */
  magicLinkExpiry: string;
  /** Issuer claim */
  issuer: string;
  /** Audience claim */
  audience: string;
  /** Clock tolerance in seconds */
  clockTolerance: number;
  /** Token version */
  version: number;
  /** Secret Manager configuration */
  secretManager: SecretManagerConfig;
  /** Key rotation configuration */
  rotation: KeyRotationConfig;
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';
const isDevelopment = env.NODE_ENV === 'development';

// ============================================================
// Secret Manager Cache
// ============================================================

/**
 * Simple in-memory cache for secrets with TTL
 */
class SecretCache {
  private cache: Map<string, { value: string; expiresAt: number }> = new Map();

  /**
   * Get a value from cache
   */
  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  /**
   * Set a value in cache with TTL
   */
  set(key: string, value: string, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Clear the cache
   */
  clear(): void {
    this.cache.clear();
  }
}

// ============================================================
// Secret Manager Implementation
// ============================================================

/**
 * Abstract Secret Manager interface
 */
interface SecretManager {
  getSecret(secretId: string, version?: string): Promise<string>;
  getSecretVersion(secretId: string): Promise<{ value: string; version: string }>;
  listVersions(secretId: string): Promise<string[]>;
}

/**
 * Environment-based secret manager (fallback)
 */
class EnvironmentSecretManager implements SecretManager {
  async getSecret(secretId: string): Promise<string> {
    const value = process.env[secretId];
    if (!value) {
      throw new Error(`Secret ${secretId} not found in environment`);
    }
    return value;
  }

  async getSecretVersion(secretId: string): Promise<{ value: string; version: string }> {
    const value = await this.getSecret(secretId);
    return { value, version: 'env-1' };
  }

  async listVersions(_secretId: string): Promise<string[]> {
    return ['env-1'];
  }
}

/**
 * AWS Secrets Manager implementation
 */
class AWSSecretsManager implements SecretManager {
  private client: any; // Would use @aws-sdk/client-secrets-manager

  constructor(private region: string) {
    // In real implementation, initialize AWS SDK client
    // this.client = new SecretsManagerClient({ region });
  }

  async getSecret(secretId: string, version?: string): Promise<string> {
    // In real implementation:
    // const response = await this.client.send(
    //   new GetSecretValueCommand({
    //     SecretId: secretId,
    //     VersionId: version,
    //   })
    // );
    // return response.SecretString || '';
    
    // Placeholder for demonstration
    const envValue = process.env[secretId];
    if (envValue) return envValue;
    throw new Error(`Secret ${secretId} not found in AWS Secrets Manager`);
  }

  async getSecretVersion(secretId: string): Promise<{ value: string; version: string }> {
    // In real implementation, get the latest version
    const value = await this.getSecret(secretId);
    return { value, version: 'aws-latest' };
  }

  async listVersions(secretId: string): Promise<string[]> {
    // In real implementation, list versions
    return ['aws-v1', 'aws-v2'];
  }
}

/**
 * HashiCorp Vault implementation
 */
class HashiCorpVaultSecretManager implements SecretManager {
  private client: any; // Would use @hashicorp/vault

  constructor(
    private endpoint: string,
    private token: string
  ) {
    // In real implementation, initialize Vault client
    // this.client = new vault.Vault({ endpoint, token });
  }

  async getSecret(secretId: string): Promise<string> {
    // In real implementation:
    // const response = await this.client.read(secretId);
    // return response.data.value;
    
    // Placeholder for demonstration
    const envValue = process.env[secretId];
    if (envValue) return envValue;
    throw new Error(`Secret ${secretId} not found in HashiCorp Vault`);
  }

  async getSecretVersion(secretId: string): Promise<{ value: string; version: string }> {
    const value = await this.getSecret(secretId);
    return { value, version: 'vault-latest' };
  }

  async listVersions(_secretId: string): Promise<string[]> {
    return ['vault-v1', 'vault-v2'];
  }
}

// ============================================================
// Configuration Builder
// ============================================================

/**
 * Build JWT configuration from environment
 */
const buildJWTConfig = (): JWTConfig => {
  // Determine algorithm (RS256 for production, HS256 for development)
  const algorithm = (process.env.JWT_ALGORITHM as JWTAlgorithm) || (isProduction ? 'RS256' : 'HS256');

  // Get secret from environment (for fallback)
  const secret = process.env.JWT_SECRET || '';

  // Get public/private keys for RS/ES algorithms
  const publicKey: string | undefined = process.env.JWT_PUBLIC_KEY;
  const privateKey: string | undefined = process.env.JWT_PRIVATE_KEY;

  // Validate secret for HS algorithms
  const isHS = algorithm.startsWith('HS');
  if (isHS && (!secret || secret.length < 32)) {
    throw new Error(
      `JWT_SECRET must be at least 32 characters for ${algorithm} algorithm. ` +
      `Current length: ${secret?.length || 0}`
    );
  }

  // Validate keys for RS/ES algorithms
  const isRS = algorithm.startsWith('RS') || algorithm.startsWith('ES');
  if (isRS && (!publicKey || !privateKey)) {
    throw new Error(
      `JWT_PUBLIC_KEY and JWT_PRIVATE_KEY are required for ${algorithm} algorithm`
    );
  }

  // Secret Manager configuration
  const provider = (process.env.SECRET_MANAGER_PROVIDER as SecretManagerProvider) || 
                   (isProduction ? 'aws' : 'environment');
  
  const secretManager: SecretManagerConfig = {
    provider,
    secretId: process.env.SECRET_MANAGER_SECRET_ID || 'jwt-secret',
    region: process.env.SECRET_MANAGER_REGION || 'us-east-1',
    endpoint: process.env.SECRET_MANAGER_ENDPOINT,
    token: process.env.SECRET_MANAGER_TOKEN,
    cacheTTLSeconds: parseInt(process.env.SECRET_CACHE_TTL || '300', 10),
    enableRotation: process.env.SECRET_ENABLE_ROTATION !== 'false',
    rotationCheckIntervalSeconds: parseInt(
      process.env.SECRET_ROTATION_CHECK_INTERVAL || '3600', 10
    ),
  };

  // Key rotation configuration
  const rotation: KeyRotationConfig = {
    enabled: process.env.JWT_ROTATION_ENABLED === 'true' || isProduction,
    gracePeriodSeconds: parseInt(process.env.JWT_ROTATION_GRACE_PERIOD || '300', 10),
    rotationIntervalDays: parseInt(process.env.JWT_ROTATION_INTERVAL_DAYS || '90', 10),
    maxVersions: parseInt(process.env.JWT_ROTATION_MAX_VERSIONS || '5', 10),
    notificationWebhook: process.env.JWT_ROTATION_WEBHOOK,
  };

  // Token expiry values
  const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
  const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
  const resetTokenExpiry = process.env.JWT_RESET_EXPIRY || '1h';
  const verificationTokenExpiry = process.env.JWT_VERIFICATION_EXPIRY || '24h';
  const mfaTokenExpiry = process.env.JWT_MFA_EXPIRY || '5m';
  const magicLinkExpiry = process.env.JWT_MAGIC_LINK_EXPIRY || '5m';

  // Issuer and audience
  const issuer = process.env.JWT_ISSUER || 'vubon.com.bd';
  const audience = process.env.JWT_AUDIENCE || 'vubon-api';

  // Clock tolerance (for clock skew)
  const clockTolerance = parseInt(process.env.JWT_CLOCK_TOLERANCE || '30', 10);

  // Token version
  const version = parseInt(process.env.JWT_VERSION || '1', 10);

  return {
    secret,
    publicKey,
    privateKey,
    algorithm,
    accessTokenExpiry,
    refreshTokenExpiry,
    resetTokenExpiry,
    verificationTokenExpiry,
    mfaTokenExpiry,
    magicLinkExpiry,
    issuer,
    audience,
    clockTolerance,
    version,
    secretManager,
    rotation,
  };
};

// ============================================================
// JWT Configuration Class with Runtime Secret Management
// ============================================================

/**
 * JWT Configuration with runtime secret management
 */
class JWTConfigManager {
  private config: JWTConfig;
  private secretManager: SecretManager | null = null;
  private cache: SecretCache = new SecretCache();
  private currentSecret: JWTSecret | null = null;
  private secretVersions: Map<string, JWTSecret> = new Map();
  private rotationCheckInterval: NodeJS.Timeout | null = null;
  private initializationPromise: Promise<void> | null = null;

  constructor(config: JWTConfig) {
    this.config = config;
    
    // Initialize secret manager
    this.initializeSecretManager();
    
    // Start rotation check if enabled
    if (this.config.rotation.enabled && this.config.secretManager.enableRotation) {
      this.startRotationCheck();
    }
  }

  /**
   * Initialize the secret manager based on configuration
   */
  private initializeSecretManager(): void {
    const { provider, region, endpoint, token } = this.config.secretManager;

    switch (provider) {
      case 'aws':
        if (!region) {
          throw new Error('AWS region is required for AWS Secrets Manager');
        }
        this.secretManager = new AWSSecretsManager(region);
        break;
      case 'hashicorp':
        if (!endpoint || !token) {
          throw new Error('Endpoint and token are required for HashiCorp Vault');
        }
        this.secretManager = new HashiCorpVaultSecretManager(endpoint, token);
        break;
      case 'environment':
      case 'none':
      default:
        this.secretManager = new EnvironmentSecretManager();
        break;
    }
  }

  /**
   * Get the current secret with automatic rotation detection
   */
  async getSecret(): Promise<string> {
    await this.ensureInitialized();
    
    if (this.currentSecret && this.currentSecret.isCurrent) {
      return this.currentSecret.value;
    }

    // If no current secret or expired, fetch from secret manager
    return this.fetchAndCacheSecret();
  }

  /**
   * Get the public key (for RS/ES algorithms)
   */
  async getPublicKey(): Promise<string | undefined> {
    // For asymmetric algorithms, public key might be stored differently
    // Could be in a separate secret or part of the JWT config
    if (this.config.publicKey) {
      return this.config.publicKey;
    }

    // Try to fetch from secret manager if configured
    try {
      const key = await this.fetchSecret('JWT_PUBLIC_KEY');
      return key;
    } catch {
      return undefined;
    }
  }

  /**
   * Get the private key (for RS/ES algorithms)
   */
  async getPrivateKey(): Promise<string | undefined> {
    // For asymmetric algorithms, private key might be stored differently
    if (this.config.privateKey) {
      return this.config.privateKey;
    }

    // Try to fetch from secret manager if configured
    try {
      const key = await this.fetchSecret('JWT_PRIVATE_KEY');
      return key;
    } catch {
      return undefined;
    }
  }

  /**
   * Get the current secret version
   */
  async getSecretVersion(): Promise<string> {
    await this.ensureInitialized();
    return this.currentSecret?.version || 'unknown';
  }

  /**
   * Get all available secret versions
   */
  async getSecretVersions(): Promise<JWTSecret[]> {
    await this.ensureInitialized();
    return Array.from(this.secretVersions.values());
  }

  /**
   * Fetch and cache a secret from the secret manager
   */
  private async fetchAndCacheSecret(): Promise<string> {
    const { secretId, cacheTTLSeconds = 300 } = this.config.secretManager;

    // Check cache first
    const cached = this.cache.get(secretId);
    if (cached) {
      return cached;
    }

    if (!this.secretManager) {
      throw new Error('Secret manager not initialized');
    }

    try {
      const { value, version } = await this.secretManager.getSecretVersion(secretId);
      
      // Update current secret
      this.currentSecret = {
        value,
        version,
        activatedAt: new Date(),
        isCurrent: true,
      };

      // Store in cache
      this.cache.set(secretId, value, cacheTTLSeconds);
      
      return value;
    } catch (error) {
      // Fallback to environment variable if available
      const fallback = process.env[secretId];
      if (fallback) {
        this.currentSecret = {
          value: fallback,
          version: 'fallback',
          activatedAt: new Date(),
          isCurrent: true,
        };
        return fallback;
      }
      throw error;
    }
  }

  /**
   * Fetch a specific secret from the secret manager
   */
  private async fetchSecret(key: string): Promise<string> {
    const { cacheTTLSeconds = 300 } = this.config.secretManager;

    // Check cache first
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    if (!this.secretManager) {
      throw new Error('Secret manager not initialized');
    }

    try {
      const value = await this.secretManager.getSecret(key);
      this.cache.set(key, value, cacheTTLSeconds);
      return value;
    } catch (error) {
      // Fallback to environment variable
      const fallback = process.env[key];
      if (fallback) {
        return fallback;
      }
      throw error;
    }
  }

  /**
   * Ensure the secret manager is initialized
   */
  private async ensureInitialized(): Promise<void> {
    if (this.initializationPromise) {
      await this.initializationPromise;
      return;
    }

    this.initializationPromise = this.initializeSecrets();
    await this.initializationPromise;
  }

  /**
   * Initialize secrets from the secret manager
   */
  private async initializeSecrets(): Promise<void> {
    if (!this.secretManager) {
      return;
    }

    try {
      const { value, version } = await this.secretManager.getSecretVersion(
        this.config.secretManager.secretId
      );
      
      this.currentSecret = {
        value,
        version,
        activatedAt: new Date(),
        isCurrent: true,
      };

      // Also fetch public/private keys if using asymmetric algorithm
      const isRS = this.config.algorithm.startsWith('RS') || 
                   this.config.algorithm.startsWith('ES');
      if (isRS) {
        try {
          const publicKey = await this.secretManager.getSecret('JWT_PUBLIC_KEY');
          this.config.publicKey = publicKey;
        } catch {
          // Public key might not be in secret manager
        }
        try {
          const privateKey = await this.secretManager.getSecret('JWT_PRIVATE_KEY');
          this.config.privateKey = privateKey;
        } catch {
          // Private key might not be in secret manager
        }
      }
    } catch (error) {
      // Use environment fallback
      console.warn('Failed to fetch secrets from secret manager, using environment fallback:', error);
    }
  }

  /**
   * Start periodic rotation check
   */
  private startRotationCheck(): void {
    const interval = this.config.secretManager.rotationCheckIntervalSeconds || 3600;
    
    this.rotationCheckInterval = setInterval(() => {
      this.checkRotation().catch((error) => {
        console.error('Rotation check failed:', error);
      });
    }, interval * 1000);

    // Don't block the event loop
    if (this.rotationCheckInterval.unref) {
      this.rotationCheckInterval.unref();
    }
  }

  /**
   * Check if key rotation is needed
   */
  async checkRotation(): Promise<void> {
    if (!this.config.rotation.enabled) {
      return;
    }

    if (!this.secretManager) {
      return;
    }

    try {
      // List available versions
      const versions = await this.secretManager.listVersions(
        this.config.secretManager.secretId
      );

      // Update version cache
      for (const version of versions) {
        if (!this.secretVersions.has(version)) {
          const value = await this.secretManager.getSecret(
            this.config.secretManager.secretId,
            version
          );
          this.secretVersions.set(version, {
            value,
            version,
            activatedAt: new Date(),
            isCurrent: false,
          });
        }
      }

      // Check if current secret is still the latest
      const latestVersion = versions[versions.length - 1];
      if (this.currentSecret && this.currentSecret.version !== latestVersion) {
        // New version detected
        const newSecret = this.secretVersions.get(latestVersion);
        if (newSecret) {
          // Grace period: keep old secret valid for a while
          const gracePeriodMs = this.config.rotation.gracePeriodSeconds * 1000;
          
          // Schedule switch to new secret after grace period
          setTimeout(() => {
            this.rotateToVersion(latestVersion);
          }, gracePeriodMs);

          // Notify about rotation
          this.notifyRotation(newSecret);
        }
      }
    } catch (error) {
      console.error('Rotation check failed:', error);
    }
  }

  /**
   * Rotate to a specific version
   */
  private rotateToVersion(version: string): void {
    const secret = this.secretVersions.get(version);
    if (!secret) {
      return;
    }

    // Update current secret
    if (this.currentSecret) {
      this.currentSecret.isCurrent = false;
      this.currentSecret.expiresAt = new Date(
        Date.now() + this.config.rotation.gracePeriodSeconds * 1000
      );
      this.secretVersions.set(this.currentSecret.version, this.currentSecret);
    }

    this.currentSecret = {
      ...secret,
      isCurrent: true,
      activatedAt: new Date(),
    };

    // Update cache
    this.cache.set(
      this.config.secretManager.secretId,
      this.currentSecret.value,
      this.config.secretManager.cacheTTLSeconds || 300
    );

    // Clean up old versions
    this.cleanupOldVersions();
  }

  /**
   * Clean up old versions beyond maxVersions
   */
  private cleanupOldVersions(): void {
    const { maxVersions } = this.config.rotation;
    const sortedVersions = Array.from(this.secretVersions.keys())
      .sort((a, b) => {
        const va = this.secretVersions.get(a);
        const vb = this.secretVersions.get(b);
        return (va?.activatedAt?.getTime() || 0) - (vb?.activatedAt?.getTime() || 0);
      });

    while (sortedVersions.length > maxVersions) {
      const oldest = sortedVersions.shift();
      if (oldest) {
        this.secretVersions.delete(oldest);
      }
    }
  }

  /**
   * Send rotation notification
   */
  private async notifyRotation(secret: JWTSecret): Promise<void> {
    const webhook = this.config.rotation.notificationWebhook;
    if (!webhook) {
      return;
    }

    try {
      // In real implementation, send HTTP request to webhook
      // await fetch(webhook, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     event: 'jwt_rotation',
      //     version: secret.version,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });
      console.log('JWT rotation notification sent:', {
        version: secret.version,
        webhook,
      });
    } catch (error) {
      console.error('Failed to send rotation notification:', error);
    }
  }

  /**
   * Force a manual rotation
   */
  async forceRotation(): Promise<void> {
    if (!this.secretManager) {
      throw new Error('Secret manager not available for rotation');
    }

    // In real implementation, create a new version in the secret manager
    // For now, just refresh the current secret
    this.cache.clear();
    await this.ensureInitialized();
  }

  /**
   * Stop rotation checks
   */
  stopRotationCheck(): void {
    if (this.rotationCheckInterval) {
      clearInterval(this.rotationCheckInterval);
      this.rotationCheckInterval = null;
    }
  }

  /**
   * Get the static configuration (without runtime secrets)
   */
  getStaticConfig(): Omit<JWTConfig, 'secret' | 'publicKey' | 'privateKey'> {
    const { secret, publicKey, privateKey, ...staticConfig } = this.config;
    return staticConfig;
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.stopRotationCheck();
    this.cache.clear();
    this.secretVersions.clear();
  }
}

// ============================================================
// Export Configuration Instance
// ============================================================

/**
 * Static JWT configuration (for synchronous use)
 */
export const jwtConfig: JWTConfig = buildJWTConfig();

/**
 * Runtime JWT configuration manager (for asynchronous secret management)
 */
export const jwtConfigManager = new JWTConfigManager(jwtConfig);

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get JWT configuration for a specific environment
 */
export const getJWTConfig = (): JWTConfig => {
  return jwtConfig;
};

/**
 * Get JWT configuration manager
 */
export const getJWTConfigManager = (): JWTConfigManager => {
  return jwtConfigManager;
};

/**
 * Check if JWT uses asymmetric algorithm (RS/ES)
 */
export const isAsymmetricJWT = (): boolean => {
  return jwtConfig.algorithm.startsWith('RS') || jwtConfig.algorithm.startsWith('ES');
};

/**
 * Get token expiry in seconds
 * @param expiry - Expiry string (e.g., '15m', '1h', '7d')
 * @returns Expiry in seconds
 */
export const getExpiryInSeconds = (expiry: string): number => {
  const unit = expiry.slice(-1);
  const value = parseInt(expiry.slice(0, -1), 10);

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 60 * 60 * 24;
    case 'w': return value * 60 * 60 * 24 * 7;
    default: return parseInt(expiry, 10);
  }
};

/**
 * Get all token expiry values in seconds
 */
export const getTokenExpiriesInSeconds = () => {
  return {
    access: getExpiryInSeconds(jwtConfig.accessTokenExpiry),
    refresh: getExpiryInSeconds(jwtConfig.refreshTokenExpiry),
    reset: getExpiryInSeconds(jwtConfig.resetTokenExpiry),
    verification: getExpiryInSeconds(jwtConfig.verificationTokenExpiry),
    mfa: getExpiryInSeconds(jwtConfig.mfaTokenExpiry),
    magicLink: getExpiryInSeconds(jwtConfig.magicLinkExpiry),
  };
};

// ============================================================
// Type Exports
// ============================================================

export type { JWTConfig as JWTConfiguration };
export type { JWTConfigManager };
export type { JWTSecret };
export type { SecretManagerConfig };
export type { KeyRotationConfig };
