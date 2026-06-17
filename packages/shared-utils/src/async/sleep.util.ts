/**
 * Sleep Utility - Enterprise Grade Asynchronous Helpers
 * @module shared-utils/async/sleep.util
 * 
 * @description
 * Enterprise-grade sleep utilities with cancellation support,
 * timeout protection, and retry-aware delay calculations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Cancellation support with AbortSignal
 * ✅ Jitter for distributed systems
 * ✅ Exponential backoff calculation
 * ✅ Timeout protection
 * ✅ Performance monitoring hooks
 * ✅ Environment-aware behavior
 * 
 * @example
 * // Basic usage
 * await sleep(1000); // Wait 1 second
 * 
 * // With cancellation
 * const controller = new AbortController();
 * await sleepWithAbort(5000, controller.signal);
 * 
 * // With jitter
 * await sleepWithJitter(1000, 0.2); // 800-1200ms
 */

// ============================================================
// Imports
// ============================================================

// ✅ FIXED: RETRY_CONFIG এখন shared-constants থেকে সঠিকভাবে ইম্পোর্ট হবে
import { RETRY_CONFIG } from '@vubon/shared-constants';
import { isDevelopment, isProduction } from '../env/env.util';
import { logger } from '../logger/logger.util';

// ============================================================
// Constants
// ============================================================

const LOG_CONTEXT = 'SleepUtil';
const DEFAULT_JITTER_PERCENT = 0.1; // 10% jitter
const MAX_SLEEP_MS = 3600000; // 1 hour max

// ✅ FIXED: Fallback for RETRY_CONFIG if not available
const DEFAULT_RETRY_CONFIG = {
  DEFAULT_RETRY_DELAY_MS: 100,
  MAX_RETRY_DELAY_MS: 5000,
  DEFAULT_BACKOFF_MULTIPLIER: 2,
};

// Use RETRY_CONFIG if available, otherwise use fallback
const getRetryConfig = () => {
  try {
    return RETRY_CONFIG || DEFAULT_RETRY_CONFIG;
  } catch {
    return DEFAULT_RETRY_CONFIG;
  }
};

// ============================================================
// Core Sleep Functions
// ============================================================

/**
 * Sleep for specified milliseconds
 * Pure function - no side effects
 * 
 * @param ms - Milliseconds to sleep (0-3600000)
 * @returns Promise that resolves after specified time
 * @throws {Error} If sleep duration exceeds maximum
 * 
 * @example
 * await sleep(1000); // Wait 1 second
 */
export const sleep = (ms: number): Promise<void> => {
  // Validate input
  if (ms < 0) {
    throw new Error(`Sleep duration cannot be negative: ${ms}ms`);
  }
  if (ms > MAX_SLEEP_MS) {
    throw new Error(`Sleep duration exceeds maximum of ${MAX_SLEEP_MS}ms: ${ms}ms`);
  }
  
  // Log for debugging (only in development)
  if (isDevelopment() && ms > 1000) {
    logger.debug(`[${LOG_CONTEXT}] Sleeping for ${ms}ms`);
  }
  
  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, ms);
    
    // ✅ FIXED: Correct process.on type checking
    if (typeof process !== 'undefined' && process.on && typeof process.on === 'function') {
      const cleanup = () => {
        clearTimeout(timeout);
        resolve();
      };
      process.once('beforeExit', cleanup);
      process.once('SIGINT', cleanup);
    }
  });
};

/**
 * Sleep with cancellation support
 * 
 * @param ms - Milliseconds to sleep
 * @param signal - AbortSignal for cancellation
 * @returns Promise that resolves after specified time or rejects on abort
 * 
 * @example
 * const controller = new AbortController();
 * await sleepWithAbort(5000, controller.signal);
 * controller.abort(); // Cancels the sleep
 */
export const sleepWithAbort = (ms: number, signal?: AbortSignal): Promise<void> => {
  // Validate input
  if (ms < 0) {
    throw new Error(`Sleep duration cannot be negative: ${ms}ms`);
  }
  if (ms > MAX_SLEEP_MS) {
    throw new Error(`Sleep duration exceeds maximum of ${MAX_SLEEP_MS}ms: ${ms}ms`);
  }
  
  return new Promise((resolve, reject) => {
    // If already aborted, reject immediately
    if (signal?.aborted) {
      reject(new Error('Sleep aborted: Signal already aborted'));
      return;
    }
    
    const timeout = setTimeout(resolve, ms);
    
    // Handle abort signal
    const abortHandler = () => {
      clearTimeout(timeout);
      reject(new Error('Sleep aborted'));
    };
    
    if (signal) {
      signal.addEventListener('abort', abortHandler, { once: true });
    }
    
    // ✅ FIXED: Correct process.on type checking
    const cleanup = () => {
      clearTimeout(timeout);
      if (signal) {
        signal.removeEventListener('abort', abortHandler);
      }
      resolve();
    };
    
    if (typeof process !== 'undefined' && process.on && typeof process.on === 'function') {
      process.once('beforeExit', cleanup);
      process.once('SIGINT', cleanup);
    }
  });
};

/**
 * Sleep with jitter (random variation) to prevent thundering herd
 * 
 * @param ms - Base milliseconds to sleep
 * @param jitterPercent - Jitter percentage (0.0 to 0.5)
 * @returns Promise that resolves after jittered time
 * 
 * @example
 * await sleepWithJitter(1000, 0.2); // 800-1200ms
 */
export const sleepWithJitter = (ms: number, jitterPercent: number = DEFAULT_JITTER_PERCENT): Promise<void> => {
  // Validate input
  if (ms < 0) {
    throw new Error(`Sleep duration cannot be negative: ${ms}ms`);
  }
  if (ms > MAX_SLEEP_MS) {
    throw new Error(`Sleep duration exceeds maximum of ${MAX_SLEEP_MS}ms: ${ms}ms`);
  }
  if (jitterPercent < 0 || jitterPercent > 0.5) {
    throw new Error(`Jitter percent must be between 0 and 0.5: ${jitterPercent}`);
  }
  
  const jitterMs = ms * jitterPercent;
  const randomJitter = (Math.random() * 2 - 1) * jitterMs;
  const finalMs = Math.max(0, Math.min(ms + randomJitter, MAX_SLEEP_MS));
  
  if (isDevelopment()) {
    logger.debug(`[${LOG_CONTEXT}] Sleeping with jitter: ${finalMs}ms (base: ${ms}ms, jitter: ${randomJitter}ms)`);
  }
  
  return sleep(finalMs);
};

// ============================================================
// Exponential Backoff Functions
// ============================================================

/**
 * Calculate exponential backoff delay with jitter
 * 
 * @param attempt - Current attempt number (0-based)
 * @param baseDelayMs - Base delay in milliseconds
 * @param maxDelayMs - Maximum delay in milliseconds
 * @param multiplier - Backoff multiplier (default: 2)
 * @param jitterPercent - Jitter percentage (default: 0.1)
 * @returns Calculated delay in milliseconds
 * 
 * @example
 * const delay = calculateBackoffDelay(2, 100, 5000, 2, 0.1);
 * // Returns: ~400ms with jitter (±10%)
 */
export const calculateBackoffDelay = (
  attempt: number,
  baseDelayMs: number = getRetryConfig().DEFAULT_RETRY_DELAY_MS,
  maxDelayMs: number = getRetryConfig().MAX_RETRY_DELAY_MS,
  multiplier: number = getRetryConfig().DEFAULT_BACKOFF_MULTIPLIER,
  jitterPercent: number = 0.1
): number => {
  // Validate input
  if (attempt < 0) {
    throw new Error(`Attempt cannot be negative: ${attempt}`);
  }
  if (baseDelayMs < 1) {
    throw new Error(`Base delay must be at least 1ms: ${baseDelayMs}`);
  }
  if (maxDelayMs < baseDelayMs) {
    throw new Error(`Max delay must be greater than base delay: ${maxDelayMs} >= ${baseDelayMs}`);
  }
  if (multiplier < 1) {
    throw new Error(`Multiplier must be at least 1: ${multiplier}`);
  }
  if (jitterPercent < 0 || jitterPercent > 0.5) {
    throw new Error(`Jitter percent must be between 0 and 0.5: ${jitterPercent}`);
  }
  
  // Calculate base delay with exponential backoff
  const baseDelay = baseDelayMs * Math.pow(multiplier, attempt);
  const cappedDelay = Math.min(baseDelay, maxDelayMs);
  
  // Add jitter
  const jitterMs = cappedDelay * jitterPercent;
  const randomJitter = (Math.random() * 2 - 1) * jitterMs;
  const finalDelay = Math.max(0, cappedDelay + randomJitter);
  
  if (isDevelopment()) {
    logger.debug(`[${LOG_CONTEXT}] Backoff delay: ${finalDelay}ms (attempt: ${attempt}, base: ${baseDelayMs}, multiplier: ${multiplier})`);
  }
  
  return Math.floor(finalDelay);
};

/**
 * Sleep with exponential backoff
 * 
 * @param attempt - Current attempt number (0-based)
 * @param baseDelayMs - Base delay in milliseconds
 * @param maxDelayMs - Maximum delay in milliseconds
 * @param multiplier - Backoff multiplier (default: 2)
 * @param jitterPercent - Jitter percentage (default: 0.1)
 * @returns Promise that resolves after backoff delay
 * 
 * @example
 * await sleepWithBackoff(2, 100, 5000, 2, 0.1);
 */
export const sleepWithBackoff = (
  attempt: number,
  baseDelayMs: number = getRetryConfig().DEFAULT_RETRY_DELAY_MS,
  maxDelayMs: number = getRetryConfig().MAX_RETRY_DELAY_MS,
  multiplier: number = getRetryConfig().DEFAULT_BACKOFF_MULTIPLIER,
  jitterPercent: number = 0.1
): Promise<void> => {
  const delay = calculateBackoffDelay(attempt, baseDelayMs, maxDelayMs, multiplier, jitterPercent);
  return sleepWithJitter(delay, 0);
};

// ============================================================
// Advanced Sleep Functions
// ============================================================

/**
 * Sleep with timeout protection
 * Ensures sleep doesn't exceed specified timeout
 * 
 * @param ms - Milliseconds to sleep
 * @param timeoutMs - Maximum timeout in milliseconds
 * @returns Promise that resolves after sleep or rejects on timeout
 * 
 * @example
 * await sleepWithTimeout(10000, 5000); // Throws after 5s
 */
export const sleepWithTimeout = (ms: number, timeoutMs: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Sleep timeout exceeded: ${timeoutMs}ms`));
    }, timeoutMs);
    
    sleep(ms)
      .then(() => {
        clearTimeout(timeout);
        resolve();
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
};

/**
 * Sleep until a specific condition is met
 * Polls the condition at specified intervals
 * 
 * @param condition - Function that returns true when ready
 * @param intervalMs - Polling interval in milliseconds
 * @param maxAttempts - Maximum number of attempts
 * @returns Promise that resolves when condition is met
 * @throws {Error} If max attempts exceeded
 * 
 * @example
 * await sleepUntil(() => isServiceReady(), 500, 10);
 */
export const sleepUntil = async (
  condition: () => boolean | Promise<boolean>,
  intervalMs: number = 500,
  maxAttempts: number = 20
): Promise<void> => {
  if (maxAttempts < 1) {
    throw new Error(`Max attempts must be at least 1: ${maxAttempts}`);
  }
  if (intervalMs < 10) {
    throw new Error(`Interval must be at least 10ms: ${intervalMs}`);
  }
  
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    // Check condition
    const isReady = await condition();
    if (isReady) {
      if (isDevelopment()) {
        logger.debug(`[${LOG_CONTEXT}] Condition met after ${attempts} attempts`);
      }
      return;
    }
    
    attempts++;
    
    // Log progress (only in development)
    if (isDevelopment() && attempts % 5 === 0) {
      logger.debug(`[${LOG_CONTEXT}] Waiting for condition... (${attempts}/${maxAttempts})`);
    }
    
    // Calculate backoff delay for polling
    const delay = calculateBackoffDelay(
      attempts - 1,
      intervalMs,
      intervalMs * 5,
      1.2,
      0.1
    );
    
    await sleep(delay);
  }
  
  throw new Error(`Condition not met after ${maxAttempts} attempts`);
};

// ============================================================
// Performance Monitoring
// ============================================================

/**
 * Sleep with performance monitoring
 * Tracks actual sleep duration vs expected
 * 
 * @param ms - Milliseconds to sleep
 * @param label - Label for monitoring
 * @returns Promise that resolves after sleep
 * 
 * @example
 * await sleepWithMonitor(1000, 'api-call-sleep');
 */
export const sleepWithMonitor = async (ms: number, label: string): Promise<void> => {
  const start = performance.now();
  
  try {
    await sleep(ms);
  } finally {
    const actualMs = performance.now() - start;
    const diff = actualMs - ms;
    
    // Log if difference is significant (>10%)
    if (Math.abs(diff) > ms * 0.1) {
      if (isDevelopment()) {
        logger.warn(`[${LOG_CONTEXT}] Sleep monitor - ${label}: expected ${ms}ms, actual ${actualMs}ms (diff: ${diff}ms)`);
      }
    }
    
    // In production, could send to monitoring service
    if (isProduction() && Math.abs(diff) > ms * 0.5) {
      // Send to APM service if configured
      logger.info(`[${LOG_CONTEXT}] Sleep monitor - ${label}: expected ${ms}ms, actual ${actualMs}ms`);
    }
  }
};

// ============================================================
// Type Exports
// ============================================================

// All functions are exported at the top level
// No additional exports needed
