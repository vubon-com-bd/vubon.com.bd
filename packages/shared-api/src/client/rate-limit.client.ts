/**
 * Rate Limit Client - Throttling and queue management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/src/client/rate-limit.client
 * 
 * RULES:
 * ✅ ONLY rate limiting and queue management - NO business logic
 * ✅ NO business retry policy, UI logic, toast
 * ✅ No React components, no side effects beyond queue management
 * ✅ Named exports only
 * ✅ TypeScript strict
 */

// Import config from shared-config
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface RateLimitConfig {
  maxRequests: number;
  perMilliseconds: number;
  maxQueueSize?: number;
  queueTimeoutMs?: number;
}

export interface QueuedRequest<T = unknown> {
  id: string;
  execute: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
  priority: number;
  timestamp: number;
  timeoutId?: ReturnType<typeof setTimeout>;
}

export interface RateLimitStatus {
  remainingRequests: number;
  queueLength: number;
  isLimited: boolean;
  resetTimeMs: number;
}

export interface RateLimitEvent {
  type: 'request_accepted' | 'request_rejected' | 'queue_full' | 'queue_timeout' | 'rate_limited';
  timestamp: number;
  queueLength: number;
  remainingRequests: number;
}

export type RateLimitEventCallback = (event: RateLimitEvent) => void;

// ==================== Constants ====================

const DEFAULT_MAX_QUEUE_SIZE = 100;
const DEFAULT_QUEUE_TIMEOUT_MS = 30000; // 30 seconds
const CLEANUP_INTERVAL_MS = 60000; // 1 minute

// Get defaults from environment (shared-config)
const getDefaultMaxRequests = (): number => {
  const maxRequests = env.RATE_LIMIT_MAX_REQUESTS;
  return maxRequests ? Number(maxRequests) : 100;
};

const getDefaultPerMilliseconds = (): number => {
  const ttl = env.RATE_LIMIT_TTL;
  return (ttl ? Number(ttl) : 60) * 1000;
};

// ==================== Rate Limiter Class ====================

export class RateLimiter {
  private requestTimestamps: number[] = [];
  private queue: QueuedRequest[] = [];
  private processing = false;
  private config: RateLimitConfig;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;
  private eventCallbacks: RateLimitEventCallback[] = [];
  
  constructor(config: RateLimitConfig) {
    this.config = {
      maxQueueSize: DEFAULT_MAX_QUEUE_SIZE,
      queueTimeoutMs: DEFAULT_QUEUE_TIMEOUT_MS,
      ...config,
    };
    
    // Start cleanup interval for stale requests
    if (typeof window !== 'undefined') {
      this.cleanupInterval = setInterval(() => this.cleanupStaleRequests(), CLEANUP_INTERVAL_MS);
    }
  }
  
  /**
   * Register event callback
   */
  onEvent(callback: RateLimitEventCallback): () => void {
    this.eventCallbacks.push(callback);
    return () => {
      const index = this.eventCallbacks.indexOf(callback);
      if (index !== -1) this.eventCallbacks.splice(index, 1);
    };
  }
  
  /**
   * Emit event
   */
  private emitEvent(event: Omit<RateLimitEvent, 'timestamp' | 'queueLength' | 'remainingRequests'>): void {
    const fullEvent: RateLimitEvent = {
      ...event,
      timestamp: Date.now(),
      queueLength: this.queue.length,
      remainingRequests: this.getRemainingRequests(),
    };
    
    for (const callback of this.eventCallbacks) {
      try {
        callback(fullEvent);
      } catch {
        // Ignore callback errors
      }
    }
  }
  
  /**
   * Clean up stale (timed out) requests from queue
   */
  private cleanupStaleRequests(): void {
    const now = Date.now();
    const queueTimeout = this.config.queueTimeoutMs || DEFAULT_QUEUE_TIMEOUT_MS;
    let staleCount = 0;
    
    this.queue = this.queue.filter((request) => {
      const isStale = now - request.timestamp > queueTimeout;
      if (isStale) {
        staleCount++;
        if (request.timeoutId) {
          clearTimeout(request.timeoutId);
        }
        request.reject(new Error('Request timeout in queue'));
        return false;
      }
      return true;
    });
    
    if (staleCount > 0) {
      this.emitEvent({ type: 'queue_timeout' });
    }
  }
  
  /**
   * Check if rate limit is exceeded
   */
  private isRateLimited(): boolean {
    const now = Date.now();
    const windowStart = now - this.config.perMilliseconds;
    
    // Remove outdated timestamps
    this.requestTimestamps = this.requestTimestamps.filter(
      (timestamp) => timestamp >= windowStart
    );
    
    return this.requestTimestamps.length >= this.config.maxRequests;
  }
  
  /**
   * Get time until next available request slot (ms)
   */
  private getTimeUntilNextSlot(): number {
    if (this.requestTimestamps.length === 0) return 0;
    
    const now = Date.now();
    const oldestTimestamp = Math.min(...this.requestTimestamps);
    const windowStart = now - this.config.perMilliseconds;
    
    if (oldestTimestamp < windowStart) return 0;
    
    return oldestTimestamp - windowStart;
  }
  
  /**
   * Execute multiple requests in batch (with combined rate limiting)
   */
  async executeBatch<T>(
    requests: Array<() => Promise<T>>,
    priority: number = 0
  ): Promise<T[]> {
    // Calculate total "cost" of batch (number of requests)
    const batchCost = requests.length;
    
    // Check if we have enough capacity for the batch
    if (this.getRemainingRequests() < batchCost && this.isRateLimited()) {
      this.emitEvent({ type: 'rate_limited' });
      throw new Error(`Rate limit exceeded. Need ${batchCost} slots, only ${this.getRemainingRequests()} available.`);
    }
    
    // Execute all requests sequentially (respecting rate limit)
    const results: T[] = [];
    for (const request of requests) {
      const result = await this.execute(request, priority);
      results.push(result);
    }
    return results;
  }
  
  /**
   * Execute request with rate limiting and priority queue
   */
  async execute<T>(request: () => Promise<T>, priority: number = 0): Promise<T> {
    // Check queue size limit
    const maxQueueSize = this.config.maxQueueSize || DEFAULT_MAX_QUEUE_SIZE;
    if (this.queue.length >= maxQueueSize) {
      this.emitEvent({ type: 'queue_full' });
      throw new Error('Rate limit queue is full. Please try again later.');
    }
    
    return new Promise((resolve, reject) => {
      const queueItem: QueuedRequest<T> = {
        id: this.generateRequestId(),
        execute: request,
        resolve: resolve as (value: T) => void,
        reject,
        priority,
        timestamp: Date.now(),
      };
      
      // Set timeout for queue item
      const queueTimeout = this.config.queueTimeoutMs || DEFAULT_QUEUE_TIMEOUT_MS;
      queueItem.timeoutId = setTimeout(() => {
        const index = this.queue.findIndex((item) => item.id === queueItem.id);
        if (index !== -1) {
          this.queue.splice(index, 1);
          this.emitEvent({ type: 'queue_timeout' });
          reject(new Error('Request timeout in queue'));
        }
      }, queueTimeout);
      
      this.queue.push(queueItem);
      
      // Sort by priority (higher priority first, then FIFO)
      this.queue.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        return a.timestamp - b.timestamp;
      });
      
      this.processQueue();
    });
  }
  
  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
  
  /**
   * Process queued requests
   */
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    if (this.queue.length === 0) return;
    
    if (this.isRateLimited()) {
      const waitTime = this.getTimeUntilNextSlot();
      this.emitEvent({ type: 'rate_limited' });
      setTimeout(() => this.processQueue(), Math.min(waitTime, 1000));
      return;
    }
    
    this.processing = true;
    
    const request = this.queue.shift();
    if (!request) {
      this.processing = false;
      return;
    }
    
    // Clear timeout if exists
    if (request.timeoutId) {
      clearTimeout(request.timeoutId);
    }
    
    this.requestTimestamps.push(Date.now());
    this.emitEvent({ type: 'request_accepted' });
    
    try {
      const result = await request.execute();
      request.resolve(result);
    } catch (error) {
      this.emitEvent({ type: 'request_rejected' });
      request.reject(error);
    } finally {
      this.processing = false;
      // Process next request immediately
      setImmediate(() => this.processQueue());
    }
  }
  
  /**
   * Clear all queues and timestamps
   */
  clear(): void {
    // Reject all pending requests
    for (const request of this.queue) {
      if (request.timeoutId) {
        clearTimeout(request.timeoutId);
      }
      request.reject(new Error('Rate limiter cleared'));
    }
    this.queue = [];
    this.requestTimestamps = [];
  }
  
  /**
   * Get current queue length
   */
  getQueueLength(): number {
    return this.queue.length;
  }
  
  /**
   * Get remaining requests allowed in current window
   */
  getRemainingRequests(): number {
    const now = Date.now();
    const windowStart = now - this.config.perMilliseconds;
    const recentRequests = this.requestTimestamps.filter(
      (timestamp) => timestamp >= windowStart
    );
    return Math.max(0, this.config.maxRequests - recentRequests.length);
  }
  
  /**
   * Get rate limit status
   */
  getStatus(): RateLimitStatus {
    const remainingRequests = this.getRemainingRequests();
    const isLimited = this.isRateLimited();
    const timeUntilReset = isLimited ? this.getTimeUntilNextSlot() : 0;
    
    return {
      remainingRequests,
      queueLength: this.queue.length,
      isLimited,
      resetTimeMs: timeUntilReset,
    };
  }
  
  /**
   * Check if rate limiter is currently limiting
   */
  isLimited(): boolean {
    return this.isRateLimited();
  }
  
  /**
   * Destroy rate limiter (clean up intervals)
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
  
  /**
   * Update rate limit configuration dynamically
   */
  updateConfig(config: Partial<RateLimitConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
    // Reset timestamps when config changes significantly
    if (config.maxRequests !== undefined || config.perMilliseconds !== undefined) {
      this.requestTimestamps = [];
    }
  }
  
  /**
   * Wait for rate limit to reset
   */
  async waitForReset(): Promise<void> {
    if (!this.isRateLimited()) return;
    
    const waitTime = this.getTimeUntilNextSlot();
    if (waitTime > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// ==================== Rate Limiter Factories (with env defaults) ====================

export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxRequests: getDefaultMaxRequests(),
  perMilliseconds: getDefaultPerMilliseconds(),
  maxQueueSize: 100,
  queueTimeoutMs: 30000,
};

export const AUTH_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  perMilliseconds: 900000, // 15 minutes
  maxQueueSize: 20,
  queueTimeoutMs: 30000,
};

export const API_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxRequests: 60,
  perMilliseconds: 60000, // 1 minute
  maxQueueSize: 100,
  queueTimeoutMs: 30000,
};

export const SEARCH_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxRequests: 20,
  perMilliseconds: 60000, // 1 minute
  maxQueueSize: 50,
  queueTimeoutMs: 30000,
};

export const PAYMENT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  perMilliseconds: 60000, // 1 minute
  maxQueueSize: 10,
  queueTimeoutMs: 60000,
};

/**
 * Create rate limiter with default config
 */
export const createRateLimiter = (config: Partial<RateLimitConfig> = {}): RateLimiter => {
  return new RateLimiter({ ...DEFAULT_RATE_LIMIT_CONFIG, ...config });
};

/**
 * Create auth-specific rate limiter
 */
export const createAuthRateLimiter = (): RateLimiter => {
  return new RateLimiter(AUTH_RATE_LIMIT_CONFIG);
};

/**
 * Create API rate limiter
 */
export const createApiRateLimiter = (): RateLimiter => {
  return new RateLimiter(API_RATE_LIMIT_CONFIG);
};

/**
 * Create search-specific rate limiter
 */
export const createSearchRateLimiter = (): RateLimiter => {
  return new RateLimiter(SEARCH_RATE_LIMIT_CONFIG);
};

/**
 * Create payment-specific rate limiter
 */
export const createPaymentRateLimiter = (): RateLimiter => {
  return new RateLimiter(PAYMENT_RATE_LIMIT_CONFIG);
};

// ==================== Singleton Instances ====================

let defaultLimiter: RateLimiter | null = null;
let authLimiter: RateLimiter | null = null;
let apiLimiter: RateLimiter | null = null;
let searchLimiter: RateLimiter | null = null;
let paymentLimiter: RateLimiter | null = null;

/**
 * Get or create default rate limiter singleton
 */
export const getDefaultRateLimiter = (): RateLimiter => {
  if (!defaultLimiter) {
    defaultLimiter = createRateLimiter();
  }
  return defaultLimiter;
};

/**
 * Get or create auth rate limiter singleton
 */
export const getAuthRateLimiter = (): RateLimiter => {
  if (!authLimiter) {
    authLimiter = createAuthRateLimiter();
  }
  return authLimiter;
};

/**
 * Get or create API rate limiter singleton
 */
export const getApiRateLimiter = (): RateLimiter => {
  if (!apiLimiter) {
    apiLimiter = createApiRateLimiter();
  }
  return apiLimiter;
};

/**
 * Get or create search rate limiter singleton
 */
export const getSearchRateLimiter = (): RateLimiter => {
  if (!searchLimiter) {
    searchLimiter = createSearchRateLimiter();
  }
  return searchLimiter;
};

/**
 * Get or create payment rate limiter singleton
 */
export const getPaymentRateLimiter = (): RateLimiter => {
  if (!paymentLimiter) {
    paymentLimiter = createPaymentRateLimiter();
  }
  return paymentLimiter;
};

/**
 * Reset all rate limiters
 */
export const resetRateLimiters = (): void => {
  if (defaultLimiter) {
    defaultLimiter.destroy();
    defaultLimiter = null;
  }
  if (authLimiter) {
    authLimiter.destroy();
    authLimiter = null;
  }
  if (apiLimiter) {
    apiLimiter.destroy();
    apiLimiter = null;
  }
  if (searchLimiter) {
    searchLimiter.destroy();
    searchLimiter = null;
  }
  if (paymentLimiter) {
    paymentLimiter.destroy();
    paymentLimiter = null;
  }
};

// ==================== Type Exports ====================

export type { QueuedRequest, RateLimitStatus, RateLimitEvent, RateLimitEventCallback };
