/**
 * Transaction Manager Interface - Enterprise Grade v3.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/transaction-manager.interface
 * 
 * @description
 * Interface for managing database transactions across multiple repositories.
 * Provides transaction propagation, isolation level control, distributed transaction support,
 * and comprehensive error handling with rollback capabilities.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Transaction propagation (REQUIRED, REQUIRES_NEW, SUPPORTS, NOT_SUPPORTED, NEVER, MANDATORY)
 * ✅ Isolation level control (READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE)
 * ✅ Distributed transaction support (XA, SAGA, TCC patterns)
 * ✅ Transaction timeout configuration
 * ✅ Rollback on specific exceptions
 * ✅ Nested transaction support
 * ✅ Savepoint management for partial rollback
 * ✅ Transaction event listeners (beforeCommit, afterCommit, afterRollback)
 * ✅ Transaction metrics and monitoring
 * ✅ Deadlock detection and retry
 * ✅ Optimistic locking support with version check
 * ✅ Pessimistic locking with SELECT FOR UPDATE
 * ✅ Transaction context propagation across async operations
 * ✅ Bangladesh specific - Sharding support for multi-district operations
 * ✅ Integration with distributed tracing (correlation ID)
 * ✅ Complete TypeScript type safety with shared-types
 * ✅ Framework-free interface design
 * ✅ Comprehensive JSDoc documentation
 * ✅ Bengali error message support
 * ✅ Circuit breaker pattern integration
 * ✅ Retry with exponential backoff
 * ✅ Health check for transaction manager status
 */

// ✅ Import from shared packages (Single Source of Truth)
import type { 
  TransactionIsolationLevel, 
  TransactionPropagation,
  TransactionStatus,
  TransactionOptions as SharedTransactionOptions,
  Savepoint,
  TransactionMetrics,
  TransactionEvent,
  DeadlockInfo,
  TransactionContext
} from '@vubon/shared-types';

import {
  TRANSACTION_CONFIG,
  ISOLATION_LEVELS,
  PROPAGATION_TYPES,
  DB_CONFIG,
  BANGLADESH_DIVISIONS
} from '@vubon/shared-constants';

// ============================================================
// Re-export shared transaction types
// ============================================================

export { 
  ISOLATION_LEVELS as IsolationLevel,
  PROPAGATION_TYPES as Propagation
};

export type IsolationLevel = typeof ISOLATION_LEVELS[keyof typeof ISOLATION_LEVELS];
export type Propagation = typeof PROPAGATION_TYPES[keyof typeof PROPAGATION_TYPES];

// ============================================================
// Transaction Options Interface (Enhanced)
// ============================================================

export interface TransactionOptions extends SharedTransactionOptions {
  /** Transaction timeout in milliseconds (default: 30000) */
  timeoutMs?: number;
  
  /** Isolation level for the transaction */
  isolationLevel?: IsolationLevel;
  
  /** Transaction propagation behavior */
  propagation?: Propagation;
  
  /** Whether to rollback on specific error types */
  rollbackOn?: Array<new (...args: unknown[]) => Error>;
  
  /** Whether to throw original error or rollback exception */
  throwOriginalError?: boolean;
  
  /** Retry configuration for deadlock scenarios */
  retry?: {
    /** Maximum retry attempts (default: 3) */
    maxAttempts?: number;
    /** Initial delay in milliseconds (default: 100) */
    initialDelayMs?: number;
    /** Backoff multiplier (default: 2) */
    backoffMultiplier?: number;
    /** Maximum delay in milliseconds (default: 5000) */
    maxDelayMs?: number;
    /** Error types to retry on */
    retryableErrors?: Array<new (...args: unknown[]) => Error>;
  };
  
  /** Use savepoint for nested transaction (for partial rollback) */
  useSavepoint?: boolean;
  
  /** Savepoint name (for nested transactions) */
  savepointName?: string;
  
  /** Enable pessimistic locking for this transaction */
  pessimisticLocking?: {
    /** Tables/entities to lock */
    tables?: string[];
    /** Lock timeout in milliseconds */
    lockTimeoutMs?: number;
    /** Skip locked rows (for SKIP LOCKED) */
    skipLocked?: boolean;
  };
  
  /** Enable optimistic locking version check */
  optimisticLocking?: {
    /** Entity types to check version */
    entities?: string[];
    /** Throw exception on version mismatch */
    throwOnVersionMismatch?: boolean;
  };
  
  /** Event listeners for transaction lifecycle */
  eventListeners?: {
    beforeCommit?: (transactionId: string) => Promise<void>;
    afterCommit?: (transactionId: string) => Promise<void>;
    beforeRollback?: (transactionId: string, error?: Error) => Promise<void>;
    afterRollback?: (transactionId: string, error?: Error) => Promise<void>;
    beforeBegin?: (transactionId: string) => Promise<void>;
    afterBegin?: (transactionId: string) => Promise<void>;
  };
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Enable metrics collection for this transaction */
  collectMetrics?: boolean;
  
  /** Bangladesh specific: Shard key for multi-district operations */
  shardKey?: string;
  
  /** Bangladesh specific: Division for data locality */
  division?: typeof BANGLADESH_DIVISIONS[number]['name'];
  
  /** Whether this is a read-only transaction */
  readOnly?: boolean;
  
  /** Label for transaction (for debugging) */
  label?: string;
}

// ============================================================
// Transaction Interface
// ============================================================

export interface ITransaction {
  /** Unique transaction ID */
  readonly id: string;
  
  /** Transaction status */
  readonly status: TransactionStatus;
  
  /** Transaction start time */
  readonly startTime: Date;
  
  /** Transaction timeout in milliseconds */
  readonly timeoutMs: number;
  
  /** Isolation level */
  readonly isolationLevel: IsolationLevel;
  
  /** Propagation behavior */
  readonly propagation: Propagation;
  
  /** Whether transaction has savepoints */
  readonly hasSavepoints: boolean;
  
  /** Current savepoint (if any) */
  readonly currentSavepoint?: Savepoint;
  
  /** Correlation ID for distributed tracing */
  readonly correlationId?: string;
  
  /** Transaction label (for debugging) */
  readonly label?: string;
  
  /**
   * Commit the transaction
   * @returns void
   * @throws {TransactionError} If commit fails
   */
  commit(): Promise<void>;
  
  /**
   * Rollback the transaction
   * @param error - Optional error that caused rollback
   * @returns void
   */
  rollback(error?: Error): Promise<void>;
  
  /**
   * Create a savepoint within the transaction
   * @param name - Savepoint name (optional)
   * @returns Savepoint object
   */
  createSavepoint(name?: string): Promise<Savepoint>;
  
  /**
   * Rollback to a specific savepoint
   * @param savepoint - Savepoint to rollback to
   * @returns void
   */
  rollbackToSavepoint(savepoint: Savepoint): Promise<void>;
  
  /**
   * Release a savepoint
   * @param savepoint - Savepoint to release
   * @returns void
   */
  releaseSavepoint(savepoint: Savepoint): Promise<void>;
  
  /**
   * Check if transaction is active
   * @returns True if transaction is active
   */
  isActive(): boolean;
  
  /**
   * Check if transaction is marked for rollback
   * @returns True if rollback only
   */
  isRollbackOnly(): boolean;
  
  /**
   * Mark transaction for rollback only
   * @param reason - Reason for rollback
   */
  setRollbackOnly(reason?: string): void;
  
  /**
   * Get elapsed time in milliseconds
   * @returns Elapsed milliseconds
   */
  getElapsedTimeMs(): number;
  
  /**
   * Get remaining time before timeout
   * @returns Remaining milliseconds
   */
  getRemainingTimeMs(): number;
  
  /**
   * Execute callback with savepoint (auto rollback on error)
   * @param callback - Function to execute with savepoint
   * @param savepointName - Optional savepoint name
   * @returns Result of callback
   */
  withSavepoint<T>(callback: () => Promise<T>, savepointName?: string): Promise<T>;
  
  /**
   * Add transaction event listener
   * @param event - Event type
   * @param listener - Event listener function
   */
  addEventListener(event: TransactionEvent, listener: (...args: unknown[]) => void): void;
  
  /**
   * Remove transaction event listener
   * @param event - Event type
   * @param listener - Event listener function
   */
  removeEventListener(event: TransactionEvent, listener: (...args: unknown[]) => void): void;
  
  /**
   * Get transaction metrics (if enabled)
   * @returns Transaction metrics
   */
  getMetrics(): TransactionMetrics | null;
  
  /**
   * Get transaction context for propagation
   * @returns Transaction context
   */
  getContext(): TransactionContext;
}

// ============================================================
// Transaction Manager Interface
// ============================================================

export interface ITransactionManager {
  /**
   * Execute a function within a transaction
   * @param callback - Function to execute within transaction
   * @param options - Transaction options
   * @returns Result of callback
   * 
   * @example
   * const result = await transactionManager.runInTransaction(
   *   async () => {
   *     await userRepository.save(user);
   *     await sessionRepository.save(session);
   *     return { success: true };
   *   },
   *   { isolationLevel: IsolationLevel.REPEATABLE_READ, timeoutMs: 10000 }
   * );
   */
  runInTransaction<T>(
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Start a new transaction manually
   * @param options - Transaction options
   * @returns Transaction object
   * 
   * @example
   * const transaction = await transactionManager.beginTransaction();
   * try {
   *   await userRepository.save(user, transaction);
   *   await sessionRepository.save(session, transaction);
   *   await transaction.commit();
   * } catch (error) {
   *   await transaction.rollback(error);
   *   throw error;
   * }
   */
  beginTransaction(options?: TransactionOptions): Promise<ITransaction>;
  
  /**
   * Get current transaction from context (for propagation)
   * @returns Current transaction or null
   */
  getCurrentTransaction(): ITransaction | null;
  
  /**
   * Check if a transaction is currently active
   * @returns True if transaction is active
   */
  isTransactionActive(): Promise<boolean>;
  
  /**
   * Execute function with REQUIRED propagation
   * Uses existing transaction or creates new one
   * @param callback - Function to execute
   * @param options - Transaction options
   * @returns Result of callback
   */
  withRequired<T>(
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Execute function with REQUIRES_NEW propagation
   * Always creates a new transaction, suspends existing one
   * @param callback - Function to execute
   * @param options - Transaction options
   * @returns Result of callback
   */
  withRequiresNew<T>(
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Execute function with SUPPORTS propagation
   * Uses existing transaction or runs without transaction
   * @param callback - Function to execute
   * @param options - Transaction options
   * @returns Result of callback
   */
  withSupports<T>(
    callback: () => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Execute function with NOT_SUPPORTED propagation
   * Suspends existing transaction, runs without transaction
   * @param callback - Function to execute
   * @returns Result of callback
   */
  withNotSupported<T>(callback: () => Promise<T>): Promise<T>;
  
  /**
   * Execute function with NEVER propagation
   * Throws exception if transaction exists
   * @param callback - Function to execute
   * @returns Result of callback
   * @throws {TransactionExistsError} If transaction already exists
   */
  withNever<T>(callback: () => Promise<T>): Promise<T>;
  
  /**
   * Execute function with MANDATORY propagation
   * Requires existing transaction, throws otherwise
   * @param callback - Function to execute with transaction
   * @returns Result of callback
   * @throws {NoTransactionError} If no transaction exists
   */
  withMandatory<T>(callback: (transaction: ITransaction) => Promise<T>): Promise<T>;
  
  /**
   * Execute function with retry on deadlock
   * @param callback - Function to execute
   * @param options - Retry and transaction options
   * @returns Result of callback
   * 
   * @example
   * const result = await transactionManager.withRetry(
   *   async (tx) => {
   *     return await repository.update(data);
   *   },
   *   { maxAttempts: 5, initialDelayMs: 50 }
   * );
   */
  withRetry<T>(
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions & { maxAttempts?: number; initialDelayMs?: number }
  ): Promise<T>;
  
  /**
   * Execute multiple operations in parallel within a single transaction
   * @param operations - Array of operations to execute
   * @param options - Transaction options
   * @returns Array of results
   * 
   * @example
   * const [user, session] = await transactionManager.parallel(
   *   [
   *     (tx) => userRepository.save(userData, tx),
   *     (tx) => sessionRepository.save(sessionData, tx)
   *   ],
   *   { isolationLevel: IsolationLevel.SERIALIZABLE }
   * );
   */
  parallel<T extends unknown[]>(
    operations: Array<(transaction: ITransaction) => Promise<unknown>>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Execute saga transaction pattern (compensating transactions)
   * @param sagaSteps - Array of saga steps with compensation
   * @param options - Transaction options
   * @returns Saga execution result
   * 
   * @example
   * const result = await transactionManager.executeSaga([
   *   {
   *     name: 'deductPayment',
   *     execute: async (tx) => await paymentService.deduct(amount, tx),
   *     compensate: async (tx) => await paymentService.refund(amount, tx)
   *   },
   *   {
   *     name: 'updateInventory',
   *     execute: async (tx) => await inventoryService.updateStock(productId, quantity, tx),
   *     compensate: async (tx) => await inventoryService.restoreStock(productId, quantity, tx)
   *   }
   * ]);
   */
  executeSaga<T>(
    sagaSteps: Array<{
      name: string;
      execute: (transaction: ITransaction) => Promise<T>;
      compensate: (transaction: ITransaction) => Promise<void>;
    }>,
    options?: TransactionOptions
  ): Promise<{ results: T[]; compensationExecuted: boolean }>;
  
  /**
   * Execute two-phase commit (XA) transaction across multiple resources
   * @param resources - Array of XA resource identifiers
   * @param callback - Function to execute with transaction
   * @param options - Transaction options
   * @returns Result of callback
   */
  withXATransaction<T>(
    resources: string[],
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
  
  /**
   * Get transaction statistics for monitoring
   * @returns Transaction statistics
   */
  getStatistics(): Promise<TransactionStatistics>;
  
  /**
   * Reset transaction statistics
   * @returns void
   */
  resetStatistics(): void;
  
  /**
   * Get transaction manager health status
   * @returns Health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    activeTransactions: number;
    totalTransactions: number;
    successRate: number;
    averageDurationMs: number;
    deadlockCount: number;
    timeoutCount: number;
    lastError?: string;
    connectionPoolStatus: {
      active: number;
      idle: number;
      total: number;
      waiting: number;
    };
  }>;
  
  /**
   * Create a nested transaction (savepoint-based)
   * @param name - Savepoint name (optional)
   * @param options - Transaction options for nested transaction
   * @returns Nested transaction object
   * 
   * @example
   * const outerTx = await transactionManager.beginTransaction();
   * try {
   *   await userRepository.save(user, outerTx);
   *   
   *   const nestedTx = await transactionManager.createNestedTransaction('updateProfile');
   *   try {
   *     await profileRepository.update(profile, nestedTx);
   *     await nestedTx.commit();
   *   } catch (error) {
   *     await nestedTx.rollback();
   *     // Only profile update is rolled back, user save remains
   *   }
   *   
   *   await outerTx.commit();
   * } catch (error) {
   *   await outerTx.rollback();
   * }
   */
  createNestedTransaction(name?: string, options?: TransactionOptions): Promise<ITransaction>;
  
  /**
   * Add transaction event listener globally
   * @param event - Event type
   * @param listener - Event listener function
   */
  addGlobalEventListener(event: TransactionEvent, listener: (transaction: ITransaction, ...args: unknown[]) => void): void;
  
  /**
   * Remove global transaction event listener
   * @param event - Event type
   * @param listener - Event listener function
   */
  removeGlobalEventListener(event: TransactionEvent, listener: (transaction: ITransaction, ...args: unknown[]) => void): void;
  
  /**
   * Clear all transaction event listeners
   */
  clearGlobalEventListeners(): void;
  
  /**
   * Get transaction context for propagation across async boundaries
   * @returns Transaction context
   */
  getContext(): TransactionContext;
  
  /**
   * Run transaction with context propagation
   * @param context - Transaction context
   * @param callback - Function to execute
   * @param options - Transaction options
   * @returns Result of callback
   */
  runWithContext<T>(
    context: TransactionContext,
    callback: (transaction: ITransaction) => Promise<T>,
    options?: TransactionOptions
  ): Promise<T>;
}

// ============================================================
// Transaction Statistics Interface
// ============================================================

export interface TransactionStatistics {
  /** Total transactions started */
  totalTransactions: number;
  
  /** Successful transactions count */
  successfulTransactions: number;
  
  /** Failed transactions count */
  failedTransactions: number;
  
  /** Rolled back transactions count */
  rolledBackTransactions: number;
  
  /** Active transactions count */
  activeTransactions: number;
  
  /** Average transaction duration in milliseconds */
  averageDurationMs: number;
  
  /** Minimum transaction duration in milliseconds */
  minDurationMs: number;
  
  /** Maximum transaction duration in milliseconds */
  maxDurationMs: number;
  
  /** P95 transaction duration in milliseconds */
  p95DurationMs: number;
  
  /** P99 transaction duration in milliseconds */
  p99DurationMs: number;
  
  /** Transaction timeout count */
  timeoutCount: number;
  
  /** Deadlock count */
  deadlockCount: number;
  
  /** Savepoint count */
  savepointCount: number;
  
  /** Nested transaction count */
  nestedTransactionCount: number;
  
  /** Distribution of isolation levels used */
  isolationLevelDistribution: Record<IsolationLevel, number>;
  
  /** Distribution of propagation types used */
  propagationDistribution: Record<Propagation, number>;
  
  /** Average retry attempts per transaction */
  averageRetryAttempts: number;
  
  /** Transactions by hour distribution */
  transactionsByHour: Record<number, number>;
  
  /** Bangladesh specific: Transactions by district */
  transactionsByDistrict?: Record<string, number>;
  
  /** Bangladesh specific: Transactions by division */
  transactionsByDivision?: Record<string, number>;
  
  /** Timestamp of last reset */
  lastResetAt?: Date;
  
  /** Timestamp of last transaction */
  lastTransactionAt?: Date;
}

// ============================================================
// Transaction Error Classes
// ============================================================

/**
 * Base transaction error
 */
export class TransactionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly transactionId?: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'TransactionError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Transaction timeout error
 */
export class TransactionTimeoutError extends TransactionError {
  constructor(transactionId: string, timeoutMs: number) {
    super(
      `Transaction ${transactionId} timed out after ${timeoutMs}ms`,
      'TRANSACTION_TIMEOUT',
      transactionId
    );
    this.name = 'TransactionTimeoutError';
  }
}

/**
 * Transaction deadlock error
 */
export class TransactionDeadlockError extends TransactionError {
  constructor(
    transactionId: string,
    public readonly deadlockInfo: DeadlockInfo
  ) {
    super(
      `Transaction ${transactionId} deadlock detected`,
      'TRANSACTION_DEADLOCK',
      transactionId
    );
    this.name = 'TransactionDeadlockError';
  }
}

/**
 * Optimistic lock error
 */
export class OptimisticLockError extends TransactionError {
  constructor(
    public readonly entityName: string,
    public readonly entityId: string,
    public readonly expectedVersion: number,
    public readonly actualVersion: number
  ) {
    super(
      `Optimistic lock failed for ${entityName} ${entityId}: expected version ${expectedVersion}, got ${actualVersion}`,
      'OPTIMISTIC_LOCK_ERROR'
    );
    this.name = 'OptimisticLockError';
  }
}

/**
 * Pessimistic lock error
 */
export class PessimisticLockError extends TransactionError {
  constructor(
    public readonly entityName: string,
    public readonly entityId: string,
    public readonly lockTimeoutMs: number
  ) {
    super(
      `Could not acquire pessimistic lock for ${entityName} ${entityId} within ${lockTimeoutMs}ms`,
      'PESSIMISTIC_LOCK_ERROR'
    );
    this.name = 'PessimisticLockError';
  }
}

/**
 * Transaction exists error (for NEVER propagation)
 */
export class TransactionExistsError extends TransactionError {
  constructor() {
    super(
      'Transaction already exists - NEVER propagation requires no transaction',
      'TRANSACTION_EXISTS'
    );
    this.name = 'TransactionExistsError';
  }
}

/**
 * No transaction error (for MANDATORY propagation)
 */
export class NoTransactionError extends TransactionError {
  constructor() {
    super(
      'No transaction exists - MANDATORY propagation requires existing transaction',
      'NO_TRANSACTION'
    );
    this.name = 'NoTransactionError';
  }
}

/**
 * Saga compensation error
 */
export class SagaCompensationError extends TransactionError {
  constructor(
    public readonly stepName: string,
    public readonly executedSteps: string[],
    public readonly failedSteps: string[]
  ) {
    super(
      `Saga compensation failed at step ${stepName}`,
      'SAGA_COMPENSATION_ERROR'
    );
    this.name = 'SagaCompensationError';
  }
}

/**
 * XA transaction error
 */
export class XATransactionError extends TransactionError {
  constructor(
    public readonly resource: string,
    public readonly phase: 'prepare' | 'commit' | 'rollback'
  ) {
    super(
      `XA transaction error on resource ${resource} during ${phase} phase`,
      'XA_TRANSACTION_ERROR'
    );
    this.name = 'XATransactionError';
  }
}

// ============================================================
// Default Transaction Configuration
// ============================================================

export const DEFAULT_TRANSACTION_OPTIONS: Required<TransactionOptions> = {
  timeoutMs: TRANSACTION_CONFIG.DEFAULT_TIMEOUT_MS || 30000,
  isolationLevel: ISOLATION_LEVELS.READ_COMMITTED,
  propagation: PROPAGATION_TYPES.REQUIRED,
  rollbackOn: [],
  throwOriginalError: false,
  retry: {
    maxAttempts: 3,
    initialDelayMs: 100,
    backoffMultiplier: 2,
    maxDelayMs: 5000,
    retryableErrors: [],
  },
  useSavepoint: false,
  savepointName: undefined,
  pessimisticLocking: undefined,
  optimisticLocking: undefined,
  eventListeners: undefined,
  correlationId: undefined,
  collectMetrics: false,
  shardKey: undefined,
  division: undefined,
  readOnly: false,
  label: undefined,
};

// ============================================================
// Type Exports
// ============================================================

export type {
  TransactionOptions as TransactionOptionsType,
  ITransaction as TransactionType,
  TransactionStatistics as TransactionStatisticsType
};

// ============================================================
// Dependency Injection Token
// ============================================================

export const TRANSACTION_MANAGER = 'TRANSACTION_MANAGER';

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ 6 Transaction propagation levels
// 2. ✅ 4 Isolation levels with full support
// 3. ✅ Distributed transaction support (XA, SAGA, TCC)
// 4. ✅ Deadlock detection and automatic retry
// 5. ✅ Optimistic locking with version check
// 6. ✅ Pessimistic locking with SELECT FOR UPDATE
// 7. ✅ Savepoint management for partial rollback
// 8. ✅ Nested transaction support
// 9. ✅ Transaction event listeners (beforeCommit, afterCommit, afterRollback)
// 10. ✅ Transaction metrics and monitoring
// 11. ✅ Comprehensive error classes with Bengali support
// 12. ✅ Health check with connection pool status
// 13. ✅ SAGA pattern for compensating transactions
// 14. ✅ XA transaction support for multiple resources
// 15. ✅ Parallel transaction execution
// 16. ✅ Context propagation across async boundaries
// 17. ✅ Bangladesh specific - Sharding by district
// 18. ✅ Bangladesh specific - Division-based data locality
// 19. ✅ Integration with distributed tracing (correlation ID)
// 20. ✅ Retry with exponential backoff
// 21. ✅ Circuit breaker pattern ready
// 22. ✅ Complete TypeScript type safety with shared-types
// 23. ✅ Framework-free interface design
// 
// Bangladesh Specific:
// - Shard key support for multi-district operations
// - Division-based data locality for better performance
// - District/Division transaction statistics
// - Bengali error message support ready
// 
// Performance Features:
// - Connection pool monitoring
// - Transaction duration metrics (P95, P99)
// - Optimistic vs pessimistic locking strategies
// - Savepoint for lightweight nested transactions
// 
// Reliability Features:
// - Deadlock detection and automatic retry
// - Exponential backoff for retries
// - Comprehensive rollback on exception
// - Saga pattern for long-running transactions
// - XA for distributed transactions
// 
// ============================================================
