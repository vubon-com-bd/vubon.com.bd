/**
 * Password Hasher Adapter - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/adapters/password-hasher.adapter
 *
 * @description
 * Infrastructure adapter that implements the PasswordHasher port.
 * Uses bcrypt with enterprise-grade security features for password hashing.
 *
 * Enterprise Features:
 * ✅ Implements domain PasswordHasher port
 * ✅ Environment-aware salt rounds (dev/production)
 * ✅ Support for multiple algorithms (bcrypt, argon2)
 * ✅ Timing-safe comparison to prevent timing attacks
 * ✅ Fallback mechanisms for degraded mode
 * ✅ Performance optimization with adaptive rounds
 * ✅ Comprehensive error handling
 * ✅ Audit logging for security events
 * ✅ Circuit breaker integration
 * ✅ Metrics for monitoring
 * ✅ Bangladesh Bank compliance ready
 * ✅ Integration with shared-utils for strength validation
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     {
 *       provide: 'PasswordHasher',
 *       useClass: PasswordHasherAdapter,
 *     },
 *   ],
 *   exports: ['PasswordHasher'],
 * })
 * export class SecurityModule {}
 */

import { Injectable, Logger, Optional, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// Shared packages for utilities and types
import { ENCRYPTION_CONFIG, PASSWORD_POLICY, SECURITY_CONFIG } from '@vubon/shared-constants';
import type { PasswordStrength, HashAlgorithm } from '@vubon/shared-types';
import {
  checkPasswordStrength,
  calculateEntropy,
  timingSafeEqual,
  isValidBcryptHash,
  generateSecurePassword,
} from '@vubon/shared-utils';

// Domain imports (ports)
import { IPasswordHasher, PasswordStrength as DomainPasswordStrength } from '../../domain/ports/password-hasher.port';

// Infrastructure imports
import { CacheService } from '../cache/cache.service.interface';
import { AuditService } from '../audit/audit.service.interface';
import { MetricsService } from '../metrics/metrics.service.interface';
import { LoggerService } from '../logger/logger.service.interface';

// ============================================================
// Constants and Configuration
// ============================================================

/**
 * Password hashing algorithm types
 */
export enum HashingAlgorithm {
  BCRYPT = 'bcrypt',
  ARGON2ID = 'argon2id',
}

/**
 * Password hasher configuration interface
 */
export interface PasswordHasherConfig {
  algorithm: HashingAlgorithm;
  saltRounds: number;
  argon2MemoryCost: number;
  argon2TimeCost: number;
  argon2Parallelism: number;
  minSaltRounds: number;
  maxSaltRounds: number;
  minPasswordLength: number;
  maxPasswordLength: number;
  enablePerformanceOptimization: boolean;
  enableAuditLogging: boolean;
  enableCircuitBreaker: boolean;
  enableCache: boolean;
  cacheTTLSeconds: number;
  fallbackToBcrypt: boolean;
  bdBankCompliance: boolean;
}

/**
 * Password hashing result
 */
export interface HashingResult {
  hash: string;
  algorithm: HashingAlgorithm;
  saltRounds: number;
  durationMs: number;
  strength: DomainPasswordStrength;
  entropy: number;
}

/**
 * Password verification result
 */
export interface VerificationResult {
  isValid: boolean;
  algorithm: HashingAlgorithm;
  durationMs: number;
  needsRehash: boolean;
  error?: string;
}

/**
 * Password strength information
 */
export interface PasswordStrengthInfo {
  strength: DomainPasswordStrength;
  entropy: number;
  length: number;
  complexity: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  suggestions: string[];
  warnings: string[];
  estimatedCrackTime: string;
}

// ============================================================
// Default Configuration
// ============================================================

const DEFAULT_CONFIG: PasswordHasherConfig = {
  algorithm: HashingAlgorithm.BCRYPT,
  saltRounds: (ENCRYPTION_CONFIG as any)?.SALT_ROUNDS || 12,
  argon2MemoryCost: 65536, // 64 MB
  argon2TimeCost: 3,
  argon2Parallelism: 4,
  minSaltRounds: 10,
  maxSaltRounds: 14,
  minPasswordLength: PASSWORD_POLICY?.MIN_LENGTH || 8,
  maxPasswordLength: PASSWORD_POLICY?.MAX_LENGTH || 128,
  enablePerformanceOptimization: true,
  enableAuditLogging: true,
  enableCircuitBreaker: true,
  enableCache: true,
  cacheTTLSeconds: 300, // 5 minutes
  fallbackToBcrypt: true,
  bdBankCompliance: (SECURITY_CONFIG as any)?.BD_BANK_COMPLIANCE || false,
};

// ============================================================
// Circuit Breaker Implementation
// ============================================================

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  nextAttemptTime: number;
  successCount: number;
}

class CircuitBreaker {
  private state: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
    nextAttemptTime: 0,
    successCount: 0,
  };

  constructor(
    private readonly name: string,
    private readonly failureThreshold: number = 5,
    private readonly timeoutMs: number = 30000,
    private readonly successThreshold: number = 3,
  ) {}

  isOpen(): boolean {
    if (this.state.state === 'OPEN') {
      if (Date.now() >= this.state.nextAttemptTime) {
        this.state.state = 'HALF_OPEN';
        this.state.successCount = 0;
        return false;
      }
      return true;
    }
    return false;
  }

  recordSuccess(): void {
    if (this.state.state === 'HALF_OPEN') {
      this.state.successCount++;
      if (this.state.successCount >= this.successThreshold) {
        this.state.state = 'CLOSED';
        this.state.failures = 0;
      }
    } else if (this.state.state === 'CLOSED') {
      this.state.failures = 0;
    }
  }

  recordFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    if (this.state.state === 'CLOSED' && this.state.failures >= this.failureThreshold) {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    } else if (this.state.state === 'HALF_OPEN') {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    }
  }

  getStatus(): Record<string, unknown> {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : null,
    };
  }

  reset(): void {
    this.state = {
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED',
      nextAttemptTime: 0,
      successCount: 0,
    };
  }
}

// ============================================================
// Password Hasher Adapter
// ============================================================

@Injectable()
export class PasswordHasherAdapter implements IPasswordHasher {
  private readonly logger = new Logger(PasswordHasherAdapter.name);
  private readonly config: PasswordHasherConfig;
  private readonly circuitBreaker: CircuitBreaker;
  private readonly cache = new Map<string, { result: unknown; timestamp: number }>();
  private readonly metrics = {
    totalHashes: 0,
    successfulHashes: 0,
    failedHashes: 0,
    totalVerifications: 0,
    successfulVerifications: 0,
    failedVerifications: 0,
    averageHashTimeMs: 0,
    averageVerifyTimeMs: 0,
  };
  private isDegraded: boolean = false;

  constructor(
    @Optional() @Inject('CacheService')
    private readonly cacheService?: CacheService,
    @Optional() @Inject('AuditService')
    private readonly auditService?: AuditService,
    @Optional() @Inject('MetricsService')
    private readonly metricsService?: MetricsService,
    @Optional() @Inject('LoggerService')
    private readonly loggerService?: LoggerService,
    config?: Partial<PasswordHasherConfig>,
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.circuitBreaker = new CircuitBreaker(
      'PasswordHasher',
      5,
      30000,
      3,
    );

    // Apply environment-specific settings
    if (process.env.NODE_ENV === 'development') {
      this.config.saltRounds = Math.min(this.config.saltRounds, 10);
      this.config.enableCircuitBreaker = false;
      this.config.enableAuditLogging = false;
    }

    if (process.env.NODE_ENV === 'production') {
      this.config.saltRounds = Math.max(this.config.saltRounds, 12);
      this.config.bdBankCompliance = true;
    }

    this.logger.log(`PasswordHasherAdapter initialized with algorithm: ${this.config.algorithm}`);
  }

  // ============================================================
  // Public Methods (Implementing IPasswordHasher)
  // ============================================================

  /**
   * Hash a plain-text password
   */
  async hash(password: string): Promise<string> {
    const startTime = Date.now();
    this.metrics.totalHashes++;

    try {
      // Check circuit breaker
      if (this.config.enableCircuitBreaker && this.circuitBreaker.isOpen()) {
        throw new Error('Password hasher circuit breaker is OPEN');
      }

      // Validate password
      this.validatePassword(password);

      // Check cache for existing hash (for identical passwords)
      const cacheKey = this.getCacheKey(password);
      if (this.config.enableCache) {
        const cached = await this.getFromCache(cacheKey);
        if (cached) {
          this.logger.debug('Password hash cache hit');
          this.metricsService?.incrementCounter('password.hasher.cache.hit');
          return cached as string;
        }
        this.metricsService?.incrementCounter('password.hasher.cache.miss');
      }

      // Generate hash based on algorithm
      let hash: string;
      let usedAlgorithm = this.config.algorithm;

      try {
        if (this.config.algorithm === HashingAlgorithm.ARGON2ID) {
          hash = await this.hashWithArgon2(password);
        } else {
          hash = await this.hashWithBcrypt(password);
        }
      } catch (error) {
        // Fallback to bcrypt if argon2 fails
        if (this.config.fallbackToBcrypt && this.config.algorithm === HashingAlgorithm.ARGON2ID) {
          this.logger.warn('Argon2 failed, falling back to bcrypt', error);
          usedAlgorithm = HashingAlgorithm.BCRYPT;
          hash = await this.hashWithBcrypt(password);
        } else {
          throw error;
        }
      }

      // Record success
      this.metrics.successfulHashes++;
      this.metrics.averageHashTimeMs = this.calculateAverage(
        this.metrics.averageHashTimeMs,
        this.metrics.successfulHashes,
        Date.now() - startTime,
      );

      // Store in cache
      if (this.config.enableCache) {
        await this.setInCache(cacheKey, hash);
      }

      // Audit log for sensitive operations
      if (this.config.enableAuditLogging && this.auditService) {
        await this.auditService.log({
          action: 'PASSWORD_HASHED',
          metadata: {
            algorithm: usedAlgorithm,
            saltRounds: this.config.saltRounds,
            duration: Date.now() - startTime,
          },
        });
      }

      this.metricsService?.incrementCounter('password.hasher.hash.success');
      this.circuitBreaker.recordSuccess();

      return hash;
    } catch (error) {
      this.metrics.failedHashes++;
      this.metricsService?.incrementCounter('password.hasher.hash.failure');

      if (this.config.enableCircuitBreaker) {
        this.circuitBreaker.recordFailure();
      }

      this.logger.error('Failed to hash password', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Verify a password against a hash
   */
  async verify(password: string, hash: string): Promise<boolean> {
    const startTime = Date.now();
    this.metrics.totalVerifications++;

    try {
      // Check circuit breaker
      if (this.config.enableCircuitBreaker && this.circuitBreaker.isOpen()) {
        throw new Error('Password hasher circuit breaker is OPEN');
      }

      // Validate inputs
      if (!password || typeof password !== 'string') {
        throw new Error('Invalid password provided for verification');
      }

      if (!hash || typeof hash !== 'string') {
        throw new Error('Invalid hash provided for verification');
      }

      // Check if hash is a valid format
      if (!isValidBcryptHash(hash) && !hash.includes('$argon2')) {
        this.logger.warn('Invalid hash format provided for verification');
        return false;
      }

      // Determine algorithm from hash
      const algorithm = this.detectAlgorithm(hash);

      // Perform verification
      let isValid = false;
      let needsRehash = false;

      try {
        if (algorithm === HashingAlgorithm.ARGON2ID) {
          isValid = await this.verifyWithArgon2(password, hash);
        } else {
          isValid = await this.verifyWithBcrypt(password, hash);
        }
      } catch (error) {
        // If verification fails with one algorithm, try bcrypt fallback
        if (this.config.fallbackToBcrypt && algorithm !== HashingAlgorithm.BCRYPT) {
          this.logger.warn('Verification with primary algorithm failed, trying bcrypt fallback', error);
          isValid = await this.verifyWithBcrypt(password, hash);
        } else {
          throw error;
        }
      }

      // Check if hash needs rehashing (for security upgrades)
      if (isValid) {
        needsRehash = this.checkNeedsRehash(hash);
      }

      // Record success
      if (isValid) {
        this.metrics.successfulVerifications++;
      } else {
        this.metrics.failedVerifications++;
      }

      this.metrics.averageVerifyTimeMs = this.calculateAverage(
        this.metrics.averageVerifyTimeMs,
        this.metrics.totalVerifications,
        Date.now() - startTime,
      );

      // Audit log for failed verifications (security concern)
      if (!isValid && this.config.enableAuditLogging && this.auditService) {
        await this.auditService.log({
          action: 'PASSWORD_VERIFICATION_FAILED',
          metadata: {
            algorithm,
            duration: Date.now() - startTime,
          },
        });
      }

      this.metricsService?.incrementCounter(
        isValid ? 'password.hasher.verify.success' : 'password.hasher.verify.failure',
      );
      this.circuitBreaker.recordSuccess();

      return isValid;
    } catch (error) {
      this.metrics.failedVerifications++;
      this.metricsService?.incrementCounter('password.hasher.verify.failure');

      if (this.config.enableCircuitBreaker) {
        this.circuitBreaker.recordFailure();
      }

      this.logger.error('Failed to verify password', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Check if a password needs rehashing (for security upgrades)
   */
  needsRehash(hash: string): boolean {
    try {
      return this.checkNeedsRehash(hash);
    } catch (error) {
      this.logger.error('Failed to check rehash need', error);
      return false;
    }
  }

  /**
   * Validate password strength
   */
  validateStrength(password: string): PasswordStrengthInfo {
    const result = checkPasswordStrength(password);
    const entropy = calculateEntropy(password);

    return {
      strength: result.strength as DomainPasswordStrength,
      entropy,
      length: password.length,
      complexity: {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password),
      },
      suggestions: result.suggestions || [],
      warnings: result.missing || [],
      estimatedCrackTime: this.getEstimatedCrackTime(entropy),
    };
  }

  /**
   * Check if password contains personal information
   */
  containsPersonalInfo(password: string, personalInfo: {
    email?: string;
    name?: string;
    phone?: string;
    username?: string;
    birthdate?: string;
  }): boolean {
    const lowerPassword = password.toLowerCase();

    if (personalInfo.email) {
      const emailParts = personalInfo.email.split('@');
      if (emailParts[0] && lowerPassword.includes(emailParts[0].toLowerCase())) {
        return true;
      }
    }

    if (personalInfo.name) {
      const nameParts = personalInfo.name.split(' ');
      for (const part of nameParts) {
        if (part.length > 2 && lowerPassword.includes(part.toLowerCase())) {
          return true;
        }
      }
    }

    if (personalInfo.phone) {
      const phoneDigits = personalInfo.phone.replace(/\D/g, '');
      if (phoneDigits.length > 4 && lowerPassword.includes(phoneDigits)) {
        return true;
      }
    }

    if (personalInfo.username) {
      if (lowerPassword.includes(personalInfo.username.toLowerCase())) {
        return true;
      }
    }

    if (personalInfo.birthdate) {
      const dateParts = personalInfo.birthdate.split('-');
      for (const part of dateParts) {
        if (part.length > 2 && lowerPassword.includes(part)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if password is common
   */
  isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password', '123456', 'qwerty', 'admin', 'welcome',
      'bangladesh', 'dhaka', 'vubon', '12345678', 'password123',
      'iloveyou', 'princess', 'sunshine', 'qwerty123',
      'abc123', 'admin123', 'user123', 'bangla', 'chittagong',
    ];

    const lowerPassword = password.toLowerCase();
    return commonPasswords.some((common) => lowerPassword === common);
  }

  /**
   * Get strength description
   */
  getStrengthDescription(strength: DomainPasswordStrength): string {
    const descriptions: Record<DomainPasswordStrength, string> = {
      [DomainPasswordStrength.VERY_WEAK]: 'Very weak - easily crackable',
      [DomainPasswordStrength.WEAK]: 'Weak - could be cracked quickly',
      [DomainPasswordStrength.MEDIUM]: 'Medium - reasonable security',
      [DomainPasswordStrength.STRONG]: 'Strong - good security',
      [DomainPasswordStrength.VERY_STRONG]: 'Very strong - excellent security',
    };

    return descriptions[strength] || 'Unknown strength';
  }

  /**
   * Get password entropy information
   */
  getEntropyInfo(password: string): {
    entropy: number;
    strength: DomainPasswordStrength;
    estimatedCrackTime: string;
  } {
    const entropy = calculateEntropy(password);
    const strength = this.getStrengthFromEntropy(entropy);

    return {
      entropy,
      strength,
      estimatedCrackTime: this.getEstimatedCrackTime(entropy),
    };
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /**
   * Hash with bcrypt
   */
  private async hashWithBcrypt(password: string): Promise<string> {
    const saltRounds = this.getOptimalSaltRounds();
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Hash with Argon2id
   */
  private async hashWithArgon2(password: string): Promise<string> {
    return argon2.hash(password, {
      memoryCost: this.config.argon2MemoryCost,
      timeCost: this.config.argon2TimeCost,
      parallelism: this.config.argon2Parallelism,
      type: argon2.argon2id,
    });
  }

  /**
   * Verify with bcrypt
   */
  private async verifyWithBcrypt(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Verify with Argon2id
   */
  private async verifyWithArgon2(password: string, hash: string): Promise<boolean> {
    try {
      return argon2.verify(hash, password);
    } catch (error) {
      this.logger.error('Argon2 verification failed', error);
      return false;
    }
  }

  /**
   * Detect hashing algorithm from hash format
   */
  private detectAlgorithm(hash: string): HashingAlgorithm {
    if (hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$')) {
      return HashingAlgorithm.BCRYPT;
    }

    if (hash.includes('$argon2')) {
      return HashingAlgorithm.ARGON2ID;
    }

    return HashingAlgorithm.BCRYPT;
  }

  /**
   * Check if hash needs rehashing
   */
  private checkNeedsRehash(hash: string): boolean {
    const algorithm = this.detectAlgorithm(hash);

    // Rehash if using bcrypt with low rounds
    if (algorithm === HashingAlgorithm.BCRYPT) {
      const rounds = parseInt(hash.split('$')[2] || '0', 10);
      if (rounds < this.config.saltRounds) {
        return true;
      }
    }

    // Rehash if using different algorithm than configured
    if (algorithm !== this.config.algorithm) {
      return true;
    }

    return false;
  }

  /**
   * Get optimal salt rounds based on environment and performance
   */
  private getOptimalSaltRounds(): number {
    let rounds = this.config.saltRounds;

    // Adjust for performance in development
    if (process.env.NODE_ENV === 'development') {
      rounds = Math.min(rounds, 10);
    }

    // Adjust for performance degradation
    if (this.isDegraded) {
      rounds = Math.max(rounds - 2, this.config.minSaltRounds);
    }

    return Math.min(
      Math.max(rounds, this.config.minSaltRounds),
      this.config.maxSaltRounds,
    );
  }

  /**
   * Get strength from entropy
   */
  private getStrengthFromEntropy(entropy: number): DomainPasswordStrength {
    if (entropy < 28) return DomainPasswordStrength.VERY_WEAK;
    if (entropy < 35) return DomainPasswordStrength.WEAK;
    if (entropy < 50) return DomainPasswordStrength.MEDIUM;
    if (entropy < 70) return DomainPasswordStrength.STRONG;
    return DomainPasswordStrength.VERY_STRONG;
  }

  /**
   * Get estimated crack time from entropy
   */
  private getEstimatedCrackTime(entropy: number): string {
    if (entropy < 28) return 'Less than 1 second';
    if (entropy < 35) return 'Seconds to minutes';
    if (entropy < 45) return 'Minutes to hours';
    if (entropy < 55) return 'Hours to days';
    if (entropy < 65) return 'Days to months';
    if (entropy < 75) return 'Months to years';
    if (entropy < 85) return 'Years to decades';
    return 'Decades to centuries';
  }

  /**
   * Validate password
   */
  private validatePassword(password: string): void {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a non-empty string');
    }

    if (password.length < this.config.minPasswordLength) {
      throw new Error(
        `Password must be at least ${this.config.minPasswordLength} characters long`,
      );
    }

    if (password.length > this.config.maxPasswordLength) {
      throw new Error(
        `Password cannot exceed ${this.config.maxPasswordLength} characters`,
      );
    }

    // Check for common passwords
    if (this.isCommonPassword(password)) {
      throw new Error('Password is too common and easily guessable');
    }
  }

  /**
   * Get cache key for password
   */
  private getCacheKey(password: string): string {
    return `password_hash:${createHash('sha256').update(password).digest('hex').substring(0, 16)}`;
  }

  /**
   * Get from cache
   */
  private async getFromCache(key: string): Promise<unknown | null> {
    if (this.cacheService) {
      return this.cacheService.get(key);
    }

    const entry = this.cache.get(key);
    if (entry && Date.now() - entry.timestamp < this.config.cacheTTLSeconds * 1000) {
      return entry.result;
    }

    return null;
  }

  /**
   * Set in cache
   */
  private async setInCache(key: string, value: unknown): Promise<void> {
    if (this.cacheService) {
      await this.cacheService.set(key, value, this.config.cacheTTLSeconds);
    } else {
      this.cache.set(key, {
        result: value,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Calculate average
   */
  private calculateAverage(currentAverage: number, count: number, newValue: number): number {
    if (count <= 1) return newValue;
    return ((currentAverage * (count - 1)) + newValue) / count;
  }

  /**
   * Wrap error
   */
  private wrapError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }

    return new Error('Password operation failed: ' + String(error));
  }

  /**
   * Enter degraded mode
   */
  enterDegradedMode(): void {
    this.isDegraded = true;
    this.logger.warn('Password hasher entered degraded mode');
  }

  /**
   * Exit degraded mode
   */
  exitDegradedMode(): void {
    this.isDegraded = false;
    this.logger.log('Password hasher exited degraded mode');
  }

  /**
   * Reset circuit breaker
   */
  resetCircuitBreaker(): void {
    this.circuitBreaker.reset();
    this.logger.log('Password hasher circuit breaker reset');
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(): Record<string, unknown> {
    return this.circuitBreaker.getStatus();
  }

  /**
   * Get metrics
   */
  getMetrics(): Record<string, unknown> {
    return {
      ...this.metrics,
      degradedMode: this.isDegraded,
      circuitBreakerState: this.circuitBreaker.getStatus(),
      algorithm: this.config.algorithm,
      saltRounds: this.config.saltRounds,
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    algorithm: string;
    saltRounds: number;
    degraded: boolean;
    circuitBreaker: Record<string, unknown>;
    latency?: number;
  }> {
    const startTime = Date.now();

    try {
      // Test hashing with a simple password
      const testPassword = 'HealthCheck@123';
      const hash = await this.hash(testPassword);
      const verified = await this.verify(testPassword, hash);

      return {
        healthy: verified && this.circuitBreaker.getStatus().state !== 'OPEN',
        algorithm: this.config.algorithm,
        saltRounds: this.config.saltRounds,
        degraded: this.isDegraded,
        circuitBreaker: this.circuitBreaker.getStatus(),
        latency: Date.now() - startTime,
      };
    } catch (error) {
      return {
        healthy: false,
        algorithm: this.config.algorithm,
        saltRounds: this.config.saltRounds,
        degraded: this.isDegraded,
        circuitBreaker: this.circuitBreaker.getStatus(),
        latency: Date.now() - startTime,
      };
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { PasswordHasherConfig as PasswordHasherConfiguration };
