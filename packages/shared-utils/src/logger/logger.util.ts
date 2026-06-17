/**
 * Logger Utility - Enterprise Grade Logging System
 * @module shared-utils/logger/logger.util
 * 
 * @description
 * Enterprise-grade logging utility with multiple log levels,
 * structured logging, and environment-aware behavior.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multiple log levels (debug, info, warn, error, fatal)
 * ✅ Structured logging with metadata
 * ✅ Environment-aware log levels (debug only in dev)
 * ✅ Performance monitoring hooks
 * ✅ Error stack trace capture
 * ✅ Namespace support
 * ✅ JSON formatting for production
 * ✅ Colored output for development
 * ✅ Cross-package integration
 * 
 * @example
 * // Basic usage
 * logger.info('User logged in', { userId: '123', email: 'user@example.com' });
 * 
 * // Error with context
 * logger.error('Failed to process payment', { orderId: '456', error: err });
 * 
 * // Namespaced logger
 * const authLogger = createLogger('Auth');
 * authLogger.info('Login attempt', { email: 'user@example.com' });
 */

// ============================================================
// Imports
// ============================================================

import { isProduction, isDevelopment } from '../env/env.util';

// ============================================================
// Types
// ============================================================

/**
 * Log level enumeration
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  fatal(message: string, ...args: unknown[]): void;
}

/**
 * Logger options
 */
export interface LoggerOptions {
  /** Minimum log level (default: 'debug' in dev, 'info' in prod) */
  minLevel?: LogLevel;
  /** Enable JSON formatting (default: true in prod, false in dev) */
  jsonFormat?: boolean;
  /** Include timestamps (default: true) */
  includeTimestamp?: boolean;
  /** Include stack traces (default: true) */
  includeStack?: boolean;
  /** Custom log transport function */
  transport?: (level: LogLevel, message: string, metadata: unknown) => void;
}

/**
 * Log entry structure
 */
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  namespace?: string;
  metadata?: unknown;
  stack?: string;
  environment: string;
}

// ============================================================
// Constants
// ============================================================

/**
 * Log level priority
 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

/**
 * Default log level based on environment
 */
const DEFAULT_LOG_LEVEL: LogLevel = isProduction() ? 'info' : 'debug';

/**
 * Default logger options
 */
const DEFAULT_OPTIONS: LoggerOptions = {
  minLevel: DEFAULT_LOG_LEVEL,
  jsonFormat: isProduction(),
  includeTimestamp: true,
  includeStack: true,
};

/**
 * Color codes for development
 */
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Color mapping by log level
 */
const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: COLORS.gray,
  info: COLORS.green,
  warn: COLORS.yellow,
  error: COLORS.red,
  fatal: COLORS.magenta,
};

// ============================================================
// Core Logger Implementation
// ============================================================

/**
 * Enterprise-grade logger
 */
export const logger: Logger = {
  debug: (message: string, ...args: unknown[]) => {
    log('debug', message, ...args);
  },
  info: (message: string, ...args: unknown[]) => {
    log('info', message, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    log('warn', message, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    log('error', message, ...args);
  },
  fatal: (message: string, ...args: unknown[]) => {
    log('fatal', message, ...args);
  },
};

// ============================================================
// Logging Functions
// ============================================================

/**
 * Internal log function
 */
const log = (level: LogLevel, message: string, ...args: unknown[]): void => {
  // Check if logging is enabled for this level
  const minLevel = DEFAULT_OPTIONS.minLevel || DEFAULT_LOG_LEVEL;
  if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[minLevel]) {
    return;
  }
  
  // Extract metadata from args
  let metadata: unknown = undefined;
  if (args.length > 0) {
    // If last arg is an object, use it as metadata
    const lastArg = args[args.length - 1];
    if (typeof lastArg === 'object' && lastArg !== null) {
      metadata = lastArg;
      args = args.slice(0, -1);
    }
    
    // If there are remaining args, include them in the message
    if (args.length > 0) {
      message = `${message} ${args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ')}`;
    }
  }
  
  // Build log entry
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    environment: getEnvironment(),
    metadata,
  };
  
  // Add stack trace for errors
  if (metadata instanceof Error && DEFAULT_OPTIONS.includeStack) {
    entry.stack = metadata.stack;
    if (!entry.message.includes(metadata.message)) {
      entry.message = `${entry.message}: ${metadata.message}`;
    }
  }
  
  // Log to console
  if (DEFAULT_OPTIONS.jsonFormat) {
    // JSON format for production
    console.log(JSON.stringify(entry));
  } else {
    // Colored format for development
    console.log(formatLogEntry(entry));
  }
};

/**
 * Format log entry for development (colored output)
 */
const formatLogEntry = (entry: LogEntry): string => {
  const color = LEVEL_COLORS[entry.level] || COLORS.reset;
  const levelLabel = entry.level.toUpperCase().padEnd(5);
  const timestamp = entry.timestamp.slice(11, 19); // HH:MM:SS
  const metadataStr = entry.metadata 
    ? ` ${COLORS.dim}${JSON.stringify(entry.metadata)}${COLORS.reset}`
    : '';
  
  return `${COLORS.gray}${timestamp}${COLORS.reset} ${color}${levelLabel}${COLORS.reset} ${entry.message}${metadataStr}`;
};

/**
 * Get current environment name
 */
const getEnvironment = (): string => {
  return process.env['NODE_ENV'] || 'development';
};

// ============================================================
// Namespaced Logger
// ============================================================

/**
 * Create a namespaced logger
 * 
 * @param namespace - Namespace for the logger
 * @param options - Logger options
 * @returns Namespaced logger instance
 * 
 * @example
 * const authLogger = createLogger('Auth');
 * authLogger.info('User logged in', { userId: '123' });
 */
export const createLogger = (namespace: string, options?: Partial<LoggerOptions>): Logger => {
  return {
    debug: (message: string, ...args: unknown[]) => {
      logger.debug(`[${namespace}] ${message}`, ...args);
    },
    info: (message: string, ...args: unknown[]) => {
      logger.info(`[${namespace}] ${message}`, ...args);
    },
    warn: (message: string, ...args: unknown[]) => {
      logger.warn(`[${namespace}] ${message}`, ...args);
    },
    error: (message: string, ...args: unknown[]) => {
      logger.error(`[${namespace}] ${message}`, ...args);
    },
    fatal: (message: string, ...args: unknown[]) => {
      logger.fatal(`[${namespace}] ${message}`, ...args);
    },
  };
};

// ============================================================
// Logger Configuration
// ============================================================

/**
 * Configure global logger options
 * 
 * @param options - Logger options
 * 
 * @example
 * configureLogger({ minLevel: 'warn', jsonFormat: true });
 */
export const configureLogger = (options: Partial<LoggerOptions>): void => {
  Object.assign(DEFAULT_OPTIONS, options);
};

/**
 * Get current logger configuration
 * 
 * @returns Current logger options
 * 
 * @example
 * const config = getLoggerConfig();
 * console.log(config.minLevel); // 'info'
 */
export const getLoggerConfig = (): Readonly<LoggerOptions> => {
  return { ...DEFAULT_OPTIONS };
};

/**
 * Set log level
 * 
 * @param level - Minimum log level
 * 
 * @example
 * setLogLevel('warn'); // Only show warnings and above
 */
export const setLogLevel = (level: LogLevel): void => {
  DEFAULT_OPTIONS.minLevel = level;
};

// ============================================================
// Performance Logging
// ============================================================

/**
 * Log performance metrics
 * 
 * @param operation - Operation name
 * @param startTime - Start time in milliseconds
 * @param metadata - Additional metadata
 * 
 * @example
 * const start = performance.now();
 * // ... operation ...
 * logPerformance('api-call', start, { endpoint: '/users' });
 */
export const logPerformance = (
  operation: string,
  startTime: number,
  metadata?: Record<string, unknown>
): void => {
  const duration = performance.now() - startTime;
  
  if (duration > 1000) {
    logger.warn(`Performance: ${operation} took ${duration.toFixed(2)}ms`, {
      operation,
      duration,
      threshold: 1000,
      ...metadata,
    });
  } else if (duration > 100) {
    logger.info(`Performance: ${operation} took ${duration.toFixed(2)}ms`, {
      operation,
      duration,
      ...metadata,
    });
  } else if (isDevelopment()) {
    logger.debug(`Performance: ${operation} took ${duration.toFixed(2)}ms`, {
      operation,
      duration,
      ...metadata,
    });
  }
};

// ============================================================
// Type Exports
// ============================================================

// All functions and types are exported at the top level

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Multiple log levels (debug, info, warn, error, fatal)
// 2. ✅ Structured logging with metadata
// 3. ✅ Environment-aware log levels
// 4. ✅ Performance monitoring hooks
// 5. ✅ Error stack trace capture
// 6. ✅ Namespace support
// 7. ✅ JSON formatting for production
// 8. ✅ Colored output for development
// 9. ✅ Cross-package integration
// 10. ✅ Configurable log level
// 11. ✅ Performance logging with thresholds
// 12. ✅ Type-safe logging interface
// 
// ============================================================
