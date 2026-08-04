/**
 * Sleep options interface
 */
export interface SleepOptions {
  /** Whether to throw an error on abort (default: false) */
  throwOnAbort?: boolean;
  /** Custom abort error message */
  abortMessage?: string;
}

/**
 * Backoff options interface
 */
export interface BackoffOptions {
  /** Initial delay in milliseconds (default: 100) */
  initialDelay?: number;
  /** Maximum delay in milliseconds (default: 30000) */
  maxDelay?: number;
  /** Backoff multiplier (default: 2) */
  multiplier?: number;
  /** Whether to add jitter (random variation) (default: false) */
  jitter?: boolean;
  /** Maximum jitter amount in milliseconds (default: 1000) */
  maxJitter?: number;
}

/**
 * Sleep condition function type
 */
export type SleepCondition = () => boolean | Promise<boolean>;

/**
 * Pauses execution for the specified number of milliseconds
 *
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified time
 *
 * @example
 * await sleep(1000); // Sleeps for 1 second
 */
export function sleep(ms: number): Promise<void> {
  if (!isValidNumber(ms)) {
    throw new Error('Sleep duration must be a valid non-negative number');
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Pauses execution with abort support using an AbortSignal
 *
 * @param ms - The number of milliseconds to sleep
 * @param signal - AbortSignal to cancel the sleep
 * @param options - Sleep options
 * @returns A promise that resolves after the specified time or rejects on abort
 *
 * @example
 * const controller = new AbortController();
 * await sleepWithAbort(1000, controller.signal);
 */
export function sleepWithAbort(
  ms: number,
  signal: AbortSignal,
  options: SleepOptions = {}
): Promise<void> {
  if (!isValidNumber(ms)) {
    throw new Error('Sleep duration must be a valid non-negative number');
  }

  if (!signal || typeof signal !== 'object') {
    throw new Error('AbortSignal is required');
  }

  return new Promise((resolve, reject) => {
    // Check if already aborted
    if (signal.aborted) {
      if (options.throwOnAbort) {
        reject(new Error(options.abortMessage || 'Sleep aborted'));
      }
      resolve();
      return;
    }

    const timeoutId = setTimeout(resolve, ms);

    const abortHandler = () => {
      clearTimeout(timeoutId);
      if (options.throwOnAbort) {
        reject(new Error(options.abortMessage || 'Sleep aborted'));
      } else {
        resolve();
      }
    };

    signal.addEventListener('abort', abortHandler, { once: true });

    // Clean up the abort handler if sleep completes normally
    const cleanup = () => {
      signal.removeEventListener('abort', abortHandler);
    };

    // Return a promise that cleans up the handler
    return Promise.resolve().then(cleanup);
  });
}

/**
 * Pauses execution with jitter (random variation) added to the sleep duration
 *
 * @param ms - The base number of milliseconds to sleep
 * @param jitterAmount - Maximum jitter amount in milliseconds (default: ms * 0.1)
 * @returns A promise that resolves after the specified time with jitter
 *
 * @example
 * await sleepWithJitter(1000, 200); // Sleeps between 800-1200ms
 */
export function sleepWithJitter(ms: number, jitterAmount?: number): Promise<void> {
  if (!isValidNumber(ms)) {
    throw new Error('Sleep duration must be a valid non-negative number');
  }

  const jitter = jitterAmount ?? ms * 0.1;
  if (!isValidNumber(jitter) || jitter < 0) {
    throw new Error('Jitter amount must be a valid non-negative number');
  }

  const randomJitter = (Math.random() - 0.5) * jitter * 2;
  const totalMs = Math.max(0, ms + randomJitter);

  return sleep(totalMs);
}

/**
 * Calculates the backoff delay for retry attempts
 *
 * @param attempt - The current attempt number (0-based)
 * @param options - Backoff configuration options
 * @returns The calculated delay in milliseconds
 *
 * @example
 * calculateBackoffDelay(2, { initialDelay: 100, multiplier: 2 }) // 400ms
 */
export function calculateBackoffDelay(attempt: number, options: BackoffOptions = {}): number {
  if (!isValidNumber(attempt) || attempt < 0) {
    throw new Error('Attempt must be a valid non-negative number');
  }

  const initialDelay = options.initialDelay ?? 100;
  const maxDelay = options.maxDelay ?? 30000;
  const multiplier = options.multiplier ?? 2;

  if (!isValidNumber(initialDelay) || initialDelay < 0) {
    throw new Error('Initial delay must be a valid non-negative number');
  }

  if (!isValidNumber(maxDelay) || maxDelay < 0) {
    throw new Error('Maximum delay must be a valid non-negative number');
  }

  if (!isValidNumber(multiplier) || multiplier < 1) {
    throw new Error('Multiplier must be a valid number greater than or equal to 1');
  }

  let delay = initialDelay * Math.pow(multiplier, attempt);

  // Apply jitter if enabled
  if (options.jitter) {
    const maxJitter = options.maxJitter ?? Math.min(delay * 0.3, 1000);
    const randomJitter = Math.random() * maxJitter;
    delay = delay + randomJitter;
  }

  // Cap at maximum delay
  delay = Math.min(delay, maxDelay);

  return Math.round(delay);
}

/**
 * Sleeps until a condition is met or timeout is reached
 *
 * @param condition - Function that returns boolean or Promise<boolean>
 * @param options - Sleep and backoff options
 * @param options.timeout - Maximum time to wait in milliseconds (default: 30000)
 * @param options.interval - Check interval in milliseconds (default: 100)
 * @param options.backoff - Backoff configuration for interval
 * @returns A promise that resolves when condition is met or rejects on timeout
 *
 * @example
 * await sleepUntil(
 *   () => someCondition(),
 *   { timeout: 5000, interval: 100 }
 * );
 */
export function sleepUntil(
  condition: SleepCondition,
  options: {
    timeout?: number;
    interval?: number;
    backoff?: BackoffOptions;
  } = {}
): Promise<void> {
  if (typeof condition !== 'function') {
    throw new Error('Condition must be a function');
  }

  const timeout = options.timeout ?? 30000;
  const interval = options.interval ?? 100;
  const backoffOptions = options.backoff || {};

  if (!isValidNumber(timeout) || timeout < 0) {
    throw new Error('Timeout must be a valid non-negative number');
  }

  if (!isValidNumber(interval) || interval < 0) {
    throw new Error('Interval must be a valid non-negative number');
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    let attempt = 0;

    const checkCondition = async () => {
      try {
        const result = await condition();

        if (result) {
          resolve();
          return;
        }

        // Check for timeout
        const elapsed = Date.now() - startTime;
        if (elapsed >= timeout) {
          reject(new Error(`SleepUntil timeout after ${timeout}ms`));
          return;
        }

        // Calculate next interval with backoff
        const currentInterval = Math.min(
          calculateBackoffDelay(attempt, backoffOptions),
          timeout - elapsed
        );

        attempt++;
        setTimeout(checkCondition, currentInterval);
      } catch (error) {
        reject(error);
      }
    };

    checkCondition();
  });
}

/**
 * Creates a delay with exponential backoff for retry logic
 *
 * @param attempt - The current attempt number (0-based)
 * @param options - Backoff configuration options
 * @returns A promise that resolves after the calculated delay
 *
 * @example
 * await backoffSleep(2, { initialDelay: 100, multiplier: 2 });
 * // Sleeps for ~400ms
 */
export function backoffSleep(attempt: number, options: BackoffOptions = {}): Promise<void> {
  const delay = calculateBackoffDelay(attempt, options);
  return sleep(delay);
}

/**
 * Validates if a value is a valid non-negative number
 *
 * @param value - The value to validate
 * @returns True if the value is a valid non-negative number
 */
function isValidNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= 0;
}
