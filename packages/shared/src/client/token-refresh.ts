/**
 * Token Refresh - Refresh queue and deduplication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/token-refresh
 *
 * RULES:
 * ✅ ONLY token refresh queue management - NO business logic
 * ✅ NO infinite refresh loops, redirect logic, logout UI handling
 * ✅ Race-safe concurrent refresh prevention
 * ✅ Queue-based request deduplication
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

// Import from shared-config for environment-aware configuration
import { env } from '@vubon/shared-config/env';

// ==================== Constants ====================

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_QUEUE_TIMEOUT_MS = 30000; // 30 seconds
const DEFAULT_COOLDOWN_MS = 5000; // 5 seconds
const DEFAULT_REFRESH_BUFFER_SECONDS = 60; // Refresh 1 minute before expiry

// Get defaults from environment (shared-config)
const getDefaultMaxRetries = (): number => {
  const maxRetries = env.HTTP_MAX_RETRIES;
  return maxRetries ? Number(maxRetries) : DEFAULT_MAX_RETRIES;
};

const getDefaultRefreshBufferSeconds = (): number => {
  const buffer = env.TOKEN_REFRESH_BUFFER_SECONDS;
  return buffer ? Number(buffer) : DEFAULT_REFRESH_BUFFER_SECONDS;
};

// ==================== Types ====================

export type RefreshFunction = () => Promise<string | null>;

export interface RefreshQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
  timestamp: number;
  id: string;
  retryCount?: number;
}

export interface RefreshResult {
  success: boolean;
  token: string | null;
  error?: Error;
  attemptCount?: number;
}

export type RefreshStatus = 'idle' | 'refreshing' | 'failed' | 'cooldown';

export interface RefreshManagerConfig {
  maxRetries?: number;
  queueTimeoutMs?: number;
  cooldownMs?: number;
  refreshBufferSeconds?: number;
  onRefreshSuccess?: (token: string) => void;
  onRefreshFailure?: (error: Error, attemptCount: number) => void;
  onRefreshStart?: () => void;
  onRefreshComplete?: (success: boolean) => void;
}

// ==================== Token Refresh Manager ====================

export class TokenRefreshManager {
  private isRefreshing = false;
  private queue: RefreshQueueItem[] = [];
  private refreshFunction: RefreshFunction | null = null;
  private refreshAttemptCount = 0;
  private maxRetries: number;
  private queueTimeoutMs: number;
  private cooldownMs: number;
  private refreshBufferSeconds: number;
  private lastRefreshTime: number | null = null;
  private refreshTimeout: ReturnType<typeof setTimeout> | null = null;
  private status: RefreshStatus = 'idle';
  private lastError: Error | null = null;
  
  // Callbacks
  private onRefreshSuccess?: (token: string) => void;
  private onRefreshFailure?: (error: Error, attemptCount: number) => void;
  private onRefreshStart?: () => void;
  private onRefreshComplete?: (success: boolean) => void;

  constructor(config: RefreshManagerConfig = {}) {
    this.maxRetries = config.maxRetries ?? getDefaultMaxRetries();
    this.queueTimeoutMs = config.queueTimeoutMs ?? DEFAULT_QUEUE_TIMEOUT_MS;
    this.cooldownMs = config.cooldownMs ?? DEFAULT_COOLDOWN_MS;
    this.refreshBufferSeconds = config.refreshBufferSeconds ?? getDefaultRefreshBufferSeconds();
    this.onRefreshSuccess = config.onRefreshSuccess;
    this.onRefreshFailure = config.onRefreshFailure;
    this.onRefreshStart = config.onRefreshStart;
    this.onRefreshComplete = config.onRefreshComplete;
  }

  /**
   * Set refresh function with optional max retries
   */
  setRefreshFunction(fn: RefreshFunction, maxRetries?: number): void {
    this.refreshFunction = fn;
    if (maxRetries !== undefined) {
      this.maxRetries = maxRetries;
    }
  }

  /**
   * Check if currently refreshing
   */
  isRefreshingToken(): boolean {
    return this.isRefreshing;
  }

  /**
   * Get current refresh status
   */
  getStatus(): RefreshStatus {
    return this.status;
  }

  /**
   * Get last refresh time (epoch ms)
   */
  getLastRefreshTime(): number | null {
    return this.lastRefreshTime;
  }

  /**
   * Get last error (if refresh failed)
   */
  getLastError(): Error | null {
    return this.lastError;
  }

  /**
   * Add request to queue while refreshing
   * Returns a promise that resolves with the new token
   */
  enqueueRefresh(): Promise<string> {
    return new Promise((resolve, reject) => {
      const queueItem: RefreshQueueItem = {
        resolve,
        reject,
        timestamp: Date.now(),
        id: this.generateQueueId(),
      };
      this.queue.push(queueItem);

      // Set timeout to prevent infinite queue waiting
      setTimeout(() => {
        const index = this.queue.findIndex((item) => item.id === queueItem.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
          reject(new Error(`Refresh queue timeout after ${this.queueTimeoutMs}ms`));
        }
      }, this.queueTimeoutMs);
    });
  }

  /**
   * Generate unique queue item ID
   */
  private generateQueueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }

  /**
   * Process queue with new token
   */
  private processQueue(token: string | null, error?: Error): void {
    const queueToProcess = [...this.queue];
    this.queue = [];

    queueToProcess.forEach((item) => {
      if (token) {
        item.resolve(token);
      } else {
        item.reject(error || new Error('Refresh failed: No token received'));
      }
    });
  }

  /**
   * Reset refresh attempt counter
   */
  private resetAttemptCount(): void {
    this.refreshAttemptCount = 0;
    this.lastError = null;
  }

  /**
   * Increment attempt counter
   */
  private incrementAttemptCount(): number {
    this.refreshAttemptCount++;
    return this.refreshAttemptCount;
  }

  /**
   * Set refresh timeout for cooldown (prevent rapid retries)
   */
  private setRefreshCooldown(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    this.status = 'cooldown';
    this.refreshTimeout = setTimeout(() => {
      if (this.status === 'cooldown') {
        this.status = 'idle';
      }
      this.refreshTimeout = null;
    }, this.cooldownMs);
  }

  /**
   * Execute token refresh with retry logic
   */
  async refreshToken(): Promise<string | null> {
    if (!this.refreshFunction) {
      throw new Error('Refresh function not set. Call setRefreshFunction() first.');
    }

    // If already refreshing, queue this request
    if (this.isRefreshing) {
      return this.enqueueRefresh();
    }

    // Check if max retries exceeded
    if (this.refreshAttemptCount >= this.maxRetries) {
      this.status = 'failed';
      this.clearQueue();
      throw new Error(`Refresh failed after ${this.maxRetries} attempts`);
    }

    this.isRefreshing = true;
    this.status = 'refreshing';
    this.incrementAttemptCount();
    this.onRefreshStart?.();

    try {
      const newToken = await this.refreshFunction();

      if (newToken) {
        this.lastRefreshTime = Date.now();
        this.resetAttemptCount();
        this.status = 'idle';
        this.processQueue(newToken);
        this.onRefreshSuccess?.(newToken);
        this.onRefreshComplete?.(true);
        return newToken;
      } else {
        // No token received - refresh failed
        const error = new Error('Refresh returned null token');
        this.lastError = error;
        this.processQueue(null, error);
        this.status = 'failed';
        this.setRefreshCooldown();
        this.onRefreshFailure?.(error, this.refreshAttemptCount);
        this.onRefreshComplete?.(false);
        throw error;
      }
    } catch (error) {
      const refreshError = error instanceof Error ? error : new Error('Refresh failed');
      this.lastError = refreshError;
      this.processQueue(null, refreshError);
      this.status = 'failed';
      this.setRefreshCooldown();
      this.onRefreshFailure?.(refreshError, this.refreshAttemptCount);
      this.onRefreshComplete?.(false);
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Execute refresh with automatic retry on failure (exponential backoff)
   */
  async refreshTokenWithRetry(retryDelayMs: number = 1000): Promise<RefreshResult> {
    const startTime = Date.now();
    const maxRetryDelayMs = 30000; // Max 30 seconds between retries

    try {
      const token = await this.refreshToken();
      return {
        success: true,
        token,
        attemptCount: this.refreshAttemptCount,
      };
    } catch (error) {
      // Check if we have retries left
      if (this.refreshAttemptCount < this.maxRetries) {
        // Calculate delay with exponential backoff (capped at maxRetryDelayMs)
        const delay = Math.min(retryDelayMs * Math.pow(2, this.refreshAttemptCount - 1), maxRetryDelayMs);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.refreshTokenWithRetry(retryDelayMs);
      }

      return {
        success: false,
        token: null,
        error: error instanceof Error ? error : new Error('Refresh failed'),
        attemptCount: this.refreshAttemptCount,
      };
    }
  }

  /**
   * Clear queue (reject all pending requests)
   */
  clearQueue(): void {
    const error = new Error('Refresh cancelled - queue cleared');
    this.queue.forEach((item) => {
      item.reject(error);
    });
    this.queue = [];
  }

  /**
   * Reset manager state
   */
  reset(): void {
    this.clearQueue();
    this.isRefreshing = false;
    this.refreshAttemptCount = 0;
    this.lastRefreshTime = null;
    this.lastError = null;
    this.status = 'idle';

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  /**
   * Check if a refresh is needed (token expired or about to expire)
   */
  isRefreshNeeded(tokenExpiryTimestamp?: number, bufferSeconds?: number): boolean {
    if (!tokenExpiryTimestamp) return true;

    const buffer = bufferSeconds ?? this.refreshBufferSeconds;
    const now = Math.floor(Date.now() / 1000);
    return tokenExpiryTimestamp - now < buffer;
  }

  /**
   * Get queue size (number of pending requests)
   */
  getQueueSize(): number {
    return this.queue.length;
  }

  /**
   * Get attempt count for current refresh cycle
   */
  getAttemptCount(): number {
    return this.refreshAttemptCount;
  }

  /**
   * Get config values
   */
  getConfig(): {
    maxRetries: number;
    queueTimeoutMs: number;
    cooldownMs: number;
    refreshBufferSeconds: number;
  } {
    return {
      maxRetries: this.maxRetries,
      queueTimeoutMs: this.queueTimeoutMs,
      cooldownMs: this.cooldownMs,
      refreshBufferSeconds: this.refreshBufferSeconds,
    };
  }

  /**
   * Update configuration dynamically
   */
  updateConfig(config: Partial<RefreshManagerConfig>): void {
    if (config.maxRetries !== undefined) this.maxRetries = config.maxRetries;
    if (config.queueTimeoutMs !== undefined) this.queueTimeoutMs = config.queueTimeoutMs;
    if (config.cooldownMs !== undefined) this.cooldownMs = config.cooldownMs;
    if (config.refreshBufferSeconds !== undefined) this.refreshBufferSeconds = config.refreshBufferSeconds;
    if (config.onRefreshSuccess !== undefined) this.onRefreshSuccess = config.onRefreshSuccess;
    if (config.onRefreshFailure !== undefined) this.onRefreshFailure = config.onRefreshFailure;
    if (config.onRefreshStart !== undefined) this.onRefreshStart = config.onRefreshStart;
    if (config.onRefreshComplete !== undefined) this.onRefreshComplete = config.onRefreshComplete;
  }

  /**
   * Force reset cooldown (useful after manual logout/login)
   */
  forceResetCooldown(): void {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
    this.status = 'idle';
  }
}

// ==================== Singleton ====================

let refreshManagerInstance: TokenRefreshManager | null = null;

export const createTokenRefreshManager = (config?: RefreshManagerConfig): TokenRefreshManager => {
  if (refreshManagerInstance) {
    refreshManagerInstance.reset();
  }
  refreshManagerInstance = new TokenRefreshManager(config);
  return refreshManagerInstance;
};

export const getTokenRefreshManager = (): TokenRefreshManager | null => {
  return refreshManagerInstance;
};

export const resetTokenRefreshManager = (): void => {
  if (refreshManagerInstance) {
    refreshManagerInstance.reset();
    refreshManagerInstance = null;
  }
};

/**
 * Initialize token refresh manager with refresh function
 * Convenience function to set up the manager
 */
export const initTokenRefreshManager = (
  refreshFn: RefreshFunction,
  config?: RefreshManagerConfig
): TokenRefreshManager => {
  const manager = createTokenRefreshManager(config);
  manager.setRefreshFunction(refreshFn, config?.maxRetries);
  return manager;
};

// ==================== Type Exports ====================

export type { RefreshResult, RefreshStatus, RefreshFunction, RefreshManagerConfig };
