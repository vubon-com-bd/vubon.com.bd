/**
 * Log levels
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Log entry interface
 */
export interface LogEntry {
  /** Log level */
  level: LogLevel;
  /** Log message */
  message: string;
  /** Timestamp of the log */
  timestamp: Date;
  /** Namespace/context of the log */
  namespace?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Error stack trace (if applicable) */
  stack?: string;
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  /** Minimum log level to output (default: 'info') */
  minLevel?: LogLevel;
  /** Whether to output in JSON format (default: false) */
  json?: boolean;
  /** Whether to include timestamps (default: true) */
  includeTimestamp?: boolean;
  /** Whether to include log level (default: true) */
  includeLevel?: boolean;
  /** Whether to include namespace (default: true) */
  includeNamespace?: boolean;
  /** Custom log formatter */
  formatter?: (entry: LogEntry) => string;
  /** Whether to output to console (default: true) */
  consoleOutput?: boolean;
}

/**
 * Logger interface
 */
export interface Logger {
  /** Log at debug level */
  debug: (message: string, metadata?: Record<string, unknown>) => void;
  /** Log at info level */
  info: (message: string, metadata?: Record<string, unknown>) => void;
  /** Log at warn level */
  warn: (message: string, metadata?: Record<string, unknown>) => void;
  /** Log at error level */
  error: (message: string, metadata?: Record<string, unknown>) => void;
  /** Log at fatal level */
  fatal: (message: string, metadata?: Record<string, unknown>) => void;
  /** Create a child logger with namespace */
  child: (namespace: string) => Logger;
  /** Set minimum log level */
  setMinLevel: (level: LogLevel) => void;
  /** Get current configuration */
  getConfig: () => LoggerConfig;
}

/**
 * Performance log entry
 */
export interface PerformanceLog {
  /** Operation name */
  operation: string;
  /** Start timestamp */
  startTime: Date;
  /** End timestamp */
  endTime: Date;
  /** Duration in milliseconds */
  durationMs: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * ANSI color codes for console output
 */
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

/**
 * Level color mapping
 */
const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: COLORS.fg.cyan,
  info: COLORS.fg.green,
  warn: COLORS.fg.yellow,
  error: COLORS.fg.red,
  fatal: COLORS.fg.crimson + COLORS.bright,
};

/**
 * Level priority mapping
 */
const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: 'info',
  json: false,
  includeTimestamp: true,
  includeLevel: true,
  includeNamespace: true,
  consoleOutput: true,
};

/**
 * Creates a logger instance with the specified configuration
 *
 * @param config - Logger configuration
 * @param namespace - Optional namespace for the logger
 * @returns Logger instance
 *
 * @example
 * const logger = createLogger({ minLevel: 'debug' });
 * logger.info('Application started');
 */
export function createLogger(config: LoggerConfig = {}, namespace: string = 'app'): Logger {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const isProduction = process.env.NODE_ENV === 'production';

  // In production, force JSON output if not specified
  if (isProduction && finalConfig.json === undefined) {
    finalConfig.json = true;
  }

  let currentMinLevel = finalConfig.minLevel || 'info';

  const shouldLog = (level: LogLevel): boolean => {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[currentMinLevel];
  };

  const formatLog = (entry: LogEntry): string => {
    if (finalConfig.formatter) {
      return finalConfig.formatter(entry);
    }

    if (finalConfig.json) {
      return JSON.stringify({
        level: entry.level,
        message: entry.message,
        timestamp: entry.timestamp.toISOString(),
        namespace: entry.namespace,
        ...(entry.metadata && { metadata: entry.metadata }),
        ...(entry.stack && { stack: entry.stack }),
      });
    }

    // Colorful console output
    const parts: string[] = [];

    if (finalConfig.includeTimestamp) {
      const time = entry.timestamp.toLocaleTimeString();
      parts.push(`${COLORS.dim}${time}${COLORS.reset}`);
    }

    if (finalConfig.includeLevel) {
      const color = LEVEL_COLORS[entry.level] || COLORS.fg.white;
      const levelLabel = entry.level.toUpperCase().padStart(5);
      parts.push(`${color}${levelLabel}${COLORS.reset}`);
    }

    if (finalConfig.includeNamespace && entry.namespace) {
      parts.push(`${COLORS.fg.blue}[${entry.namespace}]${COLORS.reset}`);
    }

    parts.push(entry.message);

    if (entry.metadata && Object.keys(entry.metadata).length > 0) {
      parts.push(COLORS.dim + JSON.stringify(entry.metadata) + COLORS.reset);
    }

    if (entry.stack) {
      parts.push(COLORS.dim + entry.stack + COLORS.reset);
    }

    return parts.join(' ');
  };

  const log = (level: LogLevel, message: string, metadata?: Record<string, unknown>): void => {
    if (!shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      namespace,
      metadata,
    };

    // Capture stack trace for errors
    if (level === 'error' || level === 'fatal') {
      const stack = new Error().stack;
      if (stack) {
        entry.stack = stack.split('\n').slice(2).join('\n');
      }
    }

    if (finalConfig.consoleOutput) {
      const formatted = formatLog(entry);

      switch (level) {
        case 'debug':
          console.debug(formatted);
          break;
        case 'info':
          console.info(formatted);
          break;
        case 'warn':
          console.warn(formatted);
          break;
        case 'error':
          console.error(formatted);
          break;
        case 'fatal':
          console.error(formatted);
          break;
      }
    }
  };

  const child = (childNamespace: string): Logger => {
    const childConfig = { ...finalConfig };
    return createLogger(childConfig, `${namespace}:${childNamespace}`);
  };

  const setMinLevel = (level: LogLevel): void => {
    currentMinLevel = level;
  };

  const getConfig = (): LoggerConfig => {
    return { ...finalConfig };
  };

  return {
    debug: (message: string, metadata?: Record<string, unknown>) => {
      log('debug', message, metadata);
    },
    info: (message: string, metadata?: Record<string, unknown>) => {
      log('info', message, metadata);
    },
    warn: (message: string, metadata?: Record<string, unknown>) => {
      log('warn', message, metadata);
    },
    error: (message: string, metadata?: Record<string, unknown>) => {
      log('error', message, metadata);
    },
    fatal: (message: string, metadata?: Record<string, unknown>) => {
      log('fatal', message, metadata);
    },
    child,
    setMinLevel,
    getConfig,
  };
}

/**
 * Default application logger instance
 */
export const logger = createLogger();

/**
 * Logs performance metrics for an operation
 *
 * @param operation - Name of the operation
 * @param fn - The function to measure
 * @param metadata - Additional metadata
 * @param loggerInstance - Logger instance to use (default: default logger)
 * @returns The result of the function
 *
 * @example
 * const result = await logPerformance('database-query', async () => {
 *   return await db.query('SELECT * FROM users');
 * });
 */
export async function logPerformance<T>(
  operation: string,
  fn: () => Promise<T> | T,
  metadata?: Record<string, unknown>,
  loggerInstance: Logger = logger
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await fn();
    const endTime = Date.now();
    const durationMs = endTime - startTime;

    const perfLog: PerformanceLog = {
      operation,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationMs,
      metadata,
    };

    loggerInstance.debug(`Performance: ${operation}`, {
      performance: perfLog,
      ...metadata,
    });

    return result;
  } catch (error) {
    const endTime = Date.now();
    const durationMs = endTime - startTime;

    const perfLog: PerformanceLog = {
      operation,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationMs,
      metadata: {
        ...metadata,
        error: error instanceof Error ? error.message : String(error),
      },
    };

    loggerInstance.error(`Performance error: ${operation}`, {
      performance: perfLog,
      error: error instanceof Error ? error.message : String(error),
      ...metadata,
    });

    throw error;
  }
}

/**
 * Creates a performance logger that can be reused
 *
 * @param operation - Name of the operation
 * @param loggerInstance - Logger instance to use (default: default logger)
 * @returns Performance logger object with start and end methods
 *
 * @example
 * const perf = createPerformanceLogger('api-call');
 * perf.start();
 * // ... do work ...
 * perf.end({ result: 'success' });
 */
export function createPerformanceLogger(
  operation: string,
  loggerInstance: Logger = logger
): {
  start: () => void;
  end: (metadata?: Record<string, unknown>) => void;
  abort: (error?: Error) => void;
} {
  let startTime: number | null = null;

  return {
    start: () => {
      startTime = Date.now();
      loggerInstance.debug(`Performance start: ${operation}`);
    },
    end: (metadata?: Record<string, unknown>) => {
      if (startTime === null) {
        loggerInstance.warn(`Performance end called without start: ${operation}`);
        return;
      }

      const endTime = Date.now();
      const durationMs = endTime - startTime;

      const perfLog: PerformanceLog = {
        operation,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        durationMs,
        metadata,
      };

      loggerInstance.debug(`Performance end: ${operation}`, {
        performance: perfLog,
        ...metadata,
      });

      startTime = null;
    },
    abort: (error?: Error) => {
      if (startTime === null) {
        loggerInstance.warn(`Performance abort called without start: ${operation}`);
        return;
      }

      const endTime = Date.now();
      const durationMs = endTime - startTime;

      const perfLog: PerformanceLog = {
        operation,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        durationMs,
        metadata: {
          aborted: true,
          ...(error && { error: error.message }),
        },
      };

      loggerInstance.warn(`Performance aborted: ${operation}`, {
        performance: perfLog,
        ...(error && { error: error.message }),
      });

      startTime = null;
    },
  };
}

/**
 * Creates a child logger with a namespace
 *
 * @param namespace - Namespace for the child logger
 * @param config - Logger configuration (optional)
 * @returns Child logger instance
 *
 * @example
 * const dbLogger = createChildLogger('database');
 * dbLogger.info('Connected to database');
 */
export function createChildLogger(namespace: string, config?: LoggerConfig): Logger {
  return createLogger(config, namespace);
}
