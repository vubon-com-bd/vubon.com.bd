/**
 * Log levels
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Log context interface
 */
export interface LogContext {
  /** Additional metadata */
  [key: string]: unknown;
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  /** Log level (default: 'info') */
  level?: LogLevel;
  /** Whether to enable colors (default: true in development) */
  colors?: boolean;
  /** Whether to output as JSON (default: true in production) */
  json?: boolean;
  /** Namespace for the logger */
  namespace?: string;
  /** Custom timestamp format */
  timestampFormat?: string;
  /** Additional default context */
  defaultContext?: LogContext;
}

/**
 * Logger interface
 */
export interface Logger {
  /** Log debug message */
  debug(message: string, context?: LogContext): void;
  /** Log info message */
  info(message: string, context?: LogContext): void;
  /** Log warn message */
  warn(message: string, context?: LogContext): void;
  /** Log error message */
  error(message: string, context?: LogContext): void;
  /** Log fatal message */
  fatal(message: string, context?: LogContext): void;
  /** Create child logger with namespace */
  child(namespace: string): Logger;
  /** Set log level */
  setLevel(level: LogLevel): void;
}

/**
 * Color codes for different log levels
 */
const COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
  fatal: '\x1b[41m\x1b[37m', // Red background, white text
};

/**
 * Level weights for comparison
 */
const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

/**
 * Creates a new logger instance
 *
 * @param config - Logger configuration
 * @returns Logger instance
 *
 * @example
 * const logger = createLogger({ namespace: 'app', level: 'debug' });
 * logger.info('Application started');
 */
export function createLogger(config: LoggerConfig = {}): Logger {
  const env = process.env.NODE_ENV || 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  const level = config.level || (isTest ? 'warn' : isProduction ? 'info' : 'debug');
  const colors = config.colors ?? (!isProduction && !isTest);
  const json = config.json ?? isProduction;
  const namespace = config.namespace || '';
  const defaultContext = config.defaultContext || {};

  let currentLevel = level;

  /**
   * Formats a log entry
   */
  function formatLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string | Record<string, unknown> {
    const timestamp = new Date().toISOString();
    const mergedContext = { ...defaultContext, ...context };

    if (json) {
      return {
        timestamp,
        level,
        namespace,
        message,
        ...mergedContext,
      };
    }

    const color = colors ? COLORS[level] : '';
    const reset = colors ? '\x1b[0m' : '';
    const levelColor = colors ? color : '';
    const namespaceStr = namespace ? `[${namespace}] ` : '';
    const contextStr =
      Object.keys(mergedContext).length > 0 ? ` ${JSON.stringify(mergedContext)}` : '';

    return `${timestamp} ${levelColor}${level.toUpperCase()}${reset} ${namespaceStr}${message}${contextStr}`;
  }

  /**
   * Outputs a log entry
   */
  function log(level: LogLevel, message: string, context?: LogContext): void {
    // Check if log level is enabled
    if (LEVEL_WEIGHTS[level] < LEVEL_WEIGHTS[currentLevel]) {
      return;
    }

    const entry = formatLogEntry(level, message, context);

    if (json) {
      const consoleMethod = level === 'fatal' ? 'error' : level;
      // eslint-disable-next-line no-console
      console[consoleMethod](JSON.stringify(entry));
      return;
    }

    const consoleMethod = level === 'fatal' ? 'error' : level;
    // eslint-disable-next-line no-console
    console[consoleMethod](entry);
  }

  /**
   * Creates a child logger with a namespace
   */
  function child(childNamespace: string): Logger {
    const childConfig = {
      ...config,
      namespace: namespace ? `${namespace}:${childNamespace}` : childNamespace,
    };
    return createLogger(childConfig);
  }

  /**
   * Sets the log level
   */
  function setLevel(newLevel: LogLevel): void {
    if (newLevel && LEVEL_WEIGHTS[newLevel] !== undefined) {
      currentLevel = newLevel;
    }
  }

  return {
    debug: (message: string, context?: LogContext) => log('debug', message, context),
    info: (message: string, context?: LogContext) => log('info', message, context),
    warn: (message: string, context?: LogContext) => log('warn', message, context),
    error: (message: string, context?: LogContext) => log('error', message, context),
    fatal: (message: string, context?: LogContext) => log('fatal', message, context),
    child,
    setLevel,
  };
}

/**
 * Default logger instance
 */
export const logger = createLogger();

/**
 * Logs a message at debug level
 *
 * @param message - The message to log
 * @param context - Additional context
 */
export function debug(message: string, context?: LogContext): void {
  logger.debug(message, context);
}

/**
 * Logs a message at info level
 *
 * @param message - The message to log
 * @param context - Additional context
 */
export function info(message: string, context?: LogContext): void {
  logger.info(message, context);
}

/**
 * Logs a message at warn level
 *
 * @param message - The message to log
 * @param context - Additional context
 */
export function warn(message: string, context?: LogContext): void {
  logger.warn(message, context);
}

/**
 * Logs a message at error level
 *
 * @param message - The message to log
 * @param context - Additional context
 */
export function error(message: string, context?: LogContext): void {
  logger.error(message, context);
}

/**
 * Logs a message at fatal level
 *
 * @param message - The message to log
 * @param context - Additional context
 */
export function fatal(message: string, context?: LogContext): void {
  logger.fatal(message, context);
}

/**
 * Logs performance metrics for an operation
 *
 * @param operation - Name of the operation
 * @param fn - The function to measure
 * @param context - Additional context
 * @returns The result of the function
 *
 * @example
 * const result = await logPerformance('api-call', async () => {
 *   return await fetchData();
 * });
 */
export async function logPerformance<T>(
  operation: string,
  fn: () => T | Promise<T>,
  context?: LogContext
): Promise<T> {
  const start = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - start;

    logger.debug(`Performance: ${operation} completed`, {
      operation,
      duration,
      ...context,
    });

    return result;
  } catch (error) {
    const duration = performance.now() - start;

    logger.error(`Performance: ${operation} failed`, {
      operation,
      duration,
      error: error instanceof Error ? error.message : String(error),
      ...context,
    });

    throw error;
  }
}

/**
 * Creates a performance logger for measuring multiple operations
 *
 * @param prefix - Prefix for operation names
 * @param _loggerInstance - Logger instance to use (optional, defaults to global logger)
 * @returns Performance logger object
 *
 * @example
 * const perf = createPerformanceLogger('api');
 * await perf.measure('users', () => fetchUsers());
 * await perf.measure('posts', () => fetchPosts());
 */
export function createPerformanceLogger(prefix: string, _loggerInstance: Logger = logger) {
  return {
    /**
     * Measures and logs the performance of an operation
     */
    measure: async <T>(
      operation: string,
      fn: () => T | Promise<T>,
      context?: LogContext
    ): Promise<T> => {
      const fullOperation = `${prefix}:${operation}`;
      return logPerformance(fullOperation, fn, context);
    },

    /**
     * Measures multiple operations in parallel
     */
    measureAll: async <T>(
      operations: Record<string, () => T | Promise<T>>,
      context?: LogContext
    ): Promise<Record<string, T>> => {
      const entries = Object.entries(operations);
      const results: Record<string, T> = {};

      await Promise.all(
        entries.map(async ([name, fn]) => {
          const fullOperation = `${prefix}:${name}`;
          results[name] = await logPerformance(fullOperation, fn, context);
        })
      );

      return results;
    },
  };
}
