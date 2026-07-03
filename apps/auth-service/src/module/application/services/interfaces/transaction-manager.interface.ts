/**
 * Transaction Manager Service Interface - Enterprise Grade
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/transaction-manager.interface
 * 
 * @description
 * Service contract for transaction management across the application layer.
 * Defines the boundary between application layer and infrastructure for transaction operations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Programmatic transaction management (begin, commit, rollback)
 * ✅ Declarative transaction management (decorator-based)
 * ✅ Nested transaction support with savepoints
 * ✅ Distributed transaction patterns (Saga, TCC, Outbox)
 * ✅ Compensation pattern support
 * ✅ Transaction monitoring and metrics
 * ✅ Transaction audit logging
 * ✅ Transaction alerting system
 * ✅ Bangladesh Bank compliance integration
 * ✅ Multi-database transaction support
 * ✅ Transaction propagation and isolation
 * ✅ Deadlock detection and recovery
 * ✅ Transaction retry with exponential backoff
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali language support
 * ✅ Bangladesh specific - Mobile operator and network tracking
 * 
 * Security Rules:
 * ✅ Transaction boundaries enforced
 * ✅ Rollback on unhandled exceptions
 * ✅ Timeout enforcement
 * ✅ Deadlock detection and recovery
 * ✅ Isolation levels enforced
 * 
 * @example
 * const transactionManager = new TransactionManagerService(
 *   dataSource, eventBus, logger, monitor
 * );
 * 
 * const result = await transactionManager.runInTransaction(async (context) => {
 *   const user = await userRepository.save(userData, context);
 *   const profile = await profileRepository.save(profileData, context);
 *   return { user, profile };
 * }, {
 *   isolationLevel: 'READ_COMMITTED',
 *   timeoutSeconds: 30,
 *   transactionType: 'REGISTRATION'
 * });
 */

// ============================================================
// ✅ ENTERPRISE: Import from shared packages
// ============================================================

// Types from shared-types
import type {
  TransactionContext,
  TransactionOptions,
  TransactionError,
  TransactionErrorCode,
  NestedTransactionContext,
  SagaParticipant,
  SagaContext,
  TCCTransaction,
  OutboxMessage,
  CompensationAction,
  LockInfo,
  TransactionMetrics,
  TransactionAuditEntry,
  TransactionAlert,
  TransactionMonitorConfig,
  SavepointInfo,
  BBankTransactionCheck,
  BBankTransactionReport,
  TransactionCallback,
  TransactionInterceptor,
  TransactionEventListener,
  TransactionEvent,
} from '@vubon/shared-types';

// Constants from shared-constants
import type {
  TransactionIsolationLevel,
  TransactionPropagation,
  TransactionStatus,
  TransactionType,
  DistributedTransactionPattern,
  DatabaseLockType,
  DeadlockStrategy,
} from '@vubon/shared-constants';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Options Interfaces
// ============================================================

/**
 * Transaction run options
 * Extended from TransactionOptions with additional runtime controls
 */
export interface TransactionRunOptions extends TransactionOptions {
  /** Transaction name (for logging and monitoring) */
  name?: string;
  
  /** Whether to retry on deadlock */
  retryOnDeadlock?: boolean;
  
  /** Whether to retry on timeout */
  retryOnTimeout?: boolean;
  
  /** Whether to retry on connection failure */
  retryOnConnectionFailure?: boolean;
  
  /** Custom retry backoff configuration */
  retryConfig?: {
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffMultiplier?: number;
    jitterFactor?: number;
  };
  
  /** Interceptors to apply */
  interceptors?: TransactionInterceptor[];
  
  /** Event listeners */
  eventListeners?: TransactionEventListener[];
  
  /** Whether to log SQL queries (development only) */
  logQueries?: boolean;
  
  /** Whether to log query parameters (development only) */
  logQueryParams?: boolean;
  
  /** Whether to enable distributed tracing */
  enableTracing?: boolean;
  
  /** Custom trace ID */
  traceId?: string;
  
  /** Whether to skip Bangladesh Bank compliance check */
  skipComplianceCheck?: boolean;
  
  /** Whether to force compliance check (even for non-critical) */
  forceComplianceCheck?: boolean;
}

/**
 * Savepoint creation options
 */
export interface SavepointOptions {
  /** Savepoint name (auto-generated if not provided) */
  name?: string;
  
  /** Whether to rollback on savepoint failure */
  rollbackOnFailure?: boolean;
  
  /** Whether to allow nested savepoints */
  allowNested?: boolean;
  
  /** Maximum depth for nested savepoints */
  maxDepth?: number;
}

/**
 * Saga execution options
 */
export interface SagaExecutionOptions extends TransactionRunOptions {
  /** Saga ID (auto-generated if not provided) */
  sagaId?: string;
  
  /** Saga type (choreographed or orchestrated) */
  sagaType?: 'choreographed' | 'orchestrated';
  
  /** Orchestrator ID (if orchestrated) */
  orchestratorId?: string;
  
  /** Whether to compensate on failure */
  compensateOnFailure?: boolean;
  
  /** Whether to continue on participant failure */
  continueOnFailure?: boolean;
  
  /** Maximum compensation attempts */
  maxCompensationAttempts?: number;
  
  /** Compensation timeout in seconds */
  compensationTimeoutSeconds?: number;
}

/**
 * TCC transaction options
 */
export interface TCCOptions extends TransactionRunOptions {
  /** TCC transaction ID (auto-generated) */
  tccId?: string;
  
  /** Resource ID */
  resourceId: string;
  
  /** Resource type */
  resourceType: string;
  
  /** Try phase timeout in seconds */
  tryTimeoutSeconds?: number;
  
  /** Confirm phase timeout in seconds */
  confirmTimeoutSeconds?: number;
  
  /** Cancel phase timeout in seconds */
  cancelTimeoutSeconds?: number;
  
  /** Try phase retry count */
  tryRetryCount?: number;
  
  /** Confirm phase retry count */
  confirmRetryCount?: number;
  
  /** Cancel phase retry count */
  cancelRetryCount?: number;
}

/**
 * Outbox publish options
 */
export interface OutboxPublishOptions extends TransactionRunOptions {
  /** Message ID (auto-generated) */
  messageId?: string;
  
  /** Aggregate ID */
  aggregateId: string;
  
  /** Aggregate type */
  aggregateType: string;
  
  /** Event type */
  eventType: string;
  
  /** Event payload */
  payload: Record<string, unknown>;
  
  /** Message metadata */
  metadata?: Record<string, unknown>;
  
  /** Partition key (for Kafka) */
  partitionKey?: string;
  
  /** Message headers */
  headers?: Record<string, string>;
  
  /** Whether to publish immediately */
  publishImmediately?: boolean;
  
  /** Maximum retries for publishing */
  maxRetries?: number;
  
  /** Retry delay in seconds */
  retryDelaySeconds?: number;
}

/**
 * Distributed lock options
 */
export interface DistributedLockOptions {
  /** Lock key */
  key: string;
  
  /** Lock TTL in seconds */
  ttlSeconds?: number;
  
  /** Maximum wait time for lock in milliseconds */
  waitTimeoutMs?: number;
  
  /** Lock type */
  lockType?: DatabaseLockType;
  
  /** Lock owner (auto-generated) */
  owner?: string;
  
  /** Retry count for lock acquisition */
  retryCount?: number;
  
  /** Retry delay in milliseconds */
  retryDelayMs?: number;
  
  /** Whether to throw on lock acquisition failure */
  throwOnFailure?: boolean;
}

/**
 * Rollback options
 */
export interface RollbackOptions {
  /** Rollback reason */
  reason?: string;
  
  /** Rollback type */
  type?: 'explicit' | 'error' | 'deadlock' | 'timeout' | 'nested' | 'saga_compensation';
  
  /** Savepoint name (if rolling back to savepoint) */
  savepointName?: string;
  
  /** Whether to execute compensating actions */
  executeCompensation?: boolean;
  
  /** Whether to log rollback */
  logRollback?: boolean;
  
  /** Whether to notify event listeners */
  notifyListeners?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Result Interfaces
// ============================================================

/**
 * Generic service result wrapper
 */
export interface ServiceResult<T> {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Response data (if successful) */
  data?: T;
  
  /** Error (if failed) */
  error?: TransactionError;
  
  /** Transaction context */
  context?: TransactionContext;
  
  /** Error code (if failed) */
  errorCode?: TransactionErrorCode;
  
  /** Error message (if failed) */
  errorMessage?: string;
  
  /** Bengali error message */
  errorMessageBn?: string;
  
  /** Performance metrics for the operation */
  metrics?: {
    durationMs: number;
    retryCount: number;
    queryCount?: number;
    lockWaitTimeMs?: number;
    dbTimeMs?: number;
  };
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Duration of operation in milliseconds */
  durationMs?: number;
}

/**
 * Transaction run result
 */
export interface TransactionRunResult<T> extends ServiceResult<T> {
  /** Transaction context */
  context: TransactionContext;
  
  /** Whether transaction was committed */
  committed: boolean;
  
  /** Whether transaction was rolled back */
  rolledBack: boolean;
  
  /** Whether transaction was retried */
  retried: boolean;
  
  /** Retry count */
  retryCount: number;
  
  /** Commit duration in milliseconds */
  commitDurationMs?: number;
  
  /** Rollback duration in milliseconds */
  rollbackDurationMs?: number;
  
  /** Savepoints created */
  savepoints?: SavepointInfo[];
  
  /** Audit entries */
  auditEntries?: TransactionAuditEntry[];
  
  /** Alerts triggered */
  alerts?: TransactionAlert[];
}

/**
 * Saga execution result
 */
export interface SagaExecutionResult<T> extends TransactionRunResult<T> {
  /** Saga context */
  sagaContext: SagaContext;
  
  /** Completed participants */
  completedParticipants: SagaParticipant[];
  
  /** Failed participant (if any) */
  failedParticipant?: SagaParticipant;
  
  /** Compensation actions executed */
  compensationActions: CompensationAction[];
  
  /** Whether compensation was successful */
  compensationSuccessful: boolean;
  
  /** Compensation duration in milliseconds */
  compensationDurationMs?: number;
  
  /** Saga status */
  sagaStatus: 'completed' | 'compensated' | 'failed';
}

/**
 * TCC transaction result
 */
export interface TCCResult<T> extends TransactionRunResult<T> {
  /** TCC transaction */
  tccTransaction: TCCTransaction;
  
  /** Try phase result */
  tryResult?: unknown;
  
  /** Confirm phase result */
  confirmResult?: unknown;
  
  /** Cancel phase result */
  cancelResult?: unknown;
  
  /** TCC status */
  tccStatus: 'confirmed' | 'cancelled' | 'pending';
  
  /** Try phase duration in milliseconds */
  tryDurationMs?: number;
  
  /** Confirm phase duration in milliseconds */
  confirmDurationMs?: number;
  
  /** Cancel phase duration in milliseconds */
  cancelDurationMs?: number;
}

/**
 * Outbox publish result
 */
export interface OutboxPublishResult {
  /** Outbox message */
  message: OutboxMessage;
  
  /** Whether message was published */
  published: boolean;
  
  /** Publish timestamp */
  publishedAt?: Date;
  
  /** Retry count */
  retryCount: number;
  
  /** Error (if any) */
  error?: string;
  
  /** Duration in milliseconds */
  durationMs: number;
}

/**
 * Distributed lock result
 */
export interface DistributedLockResult {
  /** Lock information */
  lockInfo: LockInfo;
  
  /** Whether lock was acquired */
  acquired: boolean;
  
  /** Wait time in milliseconds */
  waitTimeMs: number;
  
  /** Whether lock was already held */
  alreadyHeld: boolean;
  
  /** Whether lock was released */
  released?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Main Service Interface
// ============================================================

/**
 * Transaction Manager Service Interface
 * 
 * Enterprise-grade service contract for transaction management
 */
export interface ITransactionManagerService {
  // ============================================================
  // Core Transaction Management
  // ============================================================

  /**
   * Run a function within a transaction
   * 
   * @param callback - Function to execute within transaction
   * @param options - Transaction options
   * @returns Transaction result
   * 
   * @example
   * const result = await transactionManager.runInTransaction(
   *   async (context) => {
   *     const user = await userRepository.save(data, context);
   *     return user;
   *   },
   *   { isolationLevel: 'READ_COMMITTED' }
   * );
   */
  runInTransaction<T>(
    callback: TransactionCallback<T>,
    options?: TransactionRunOptions
  ): Promise<TransactionRunResult<T>>;

  /**
   * Begin a transaction manually
   * 
   * @param options - Transaction options
   * @returns Transaction context
   */
  beginTransaction(
    options?: TransactionOptions
  ): Promise<TransactionContext>;

  /**
   * Commit a transaction
   * 
   * @param context - Transaction context
   * @param options - Commit options
   * @returns Commit result
   */
  commitTransaction(
    context: TransactionContext,
    options?: { logCommit?: boolean; notifyListeners?: boolean }
  ): Promise<ServiceResult<{ committed: boolean; commitTimeMs: number }>>;

  /**
   * Rollback a transaction
   * 
   * @param context - Transaction context
   * @param options - Rollback options
   * @returns Rollback result
   */
  rollbackTransaction(
    context: TransactionContext,
    options?: RollbackOptions
  ): Promise<ServiceResult<{ rolledBack: boolean; rollbackTimeMs: number }>>;

  /**
   * Get current transaction context
   * 
   * @param options - Get options
   * @returns Current transaction context or null
   */
  getCurrentContext(
    options?: { throwIfNotFound?: boolean }
  ): Promise<TransactionContext | null>;

  /**
   * Check if a transaction is active
   * 
   * @param context - Transaction context
   * @returns Whether transaction is active
   */
  isTransactionActive(context: TransactionContext): Promise<boolean>;

  /**
   * Get transaction status
   * 
   * @param transactionId - Transaction ID
   * @returns Transaction status
   */
  getTransactionStatus(
    transactionId: string
  ): Promise<ServiceResult<{
    status: TransactionStatus;
    context: TransactionContext;
    durationMs: number;
    isActive: boolean;
    isCompleted: boolean;
    isRolledBack: boolean;
  }>>;

  // ============================================================
  // Nested Transaction Management
  // ============================================================

  /**
   * Create a nested transaction (savepoint)
   * 
   * @param parentContext - Parent transaction context
   * @param options - Savepoint options
   * @returns Nested transaction context
   */
  createNestedTransaction(
    parentContext: TransactionContext,
    options?: SavepointOptions
  ): Promise<NestedTransactionContext>;

  /**
   * Commit a nested transaction
   * 
   * @param nestedContext - Nested transaction context
   * @returns Commit result
   */
  commitNestedTransaction(
    nestedContext: NestedTransactionContext
  ): Promise<ServiceResult<{ committed: boolean }>>;

  /**
   * Rollback a nested transaction
   * 
   * @param nestedContext - Nested transaction context
   * @param options - Rollback options
   * @returns Rollback result
   */
  rollbackNestedTransaction(
    nestedContext: NestedTransactionContext,
    options?: RollbackOptions
  ): Promise<ServiceResult<{ rolledBack: boolean }>>;

  /**
   * Get savepoint information
   * 
   * @param transactionId - Transaction ID
   * @param savepointName - Savepoint name
   * @returns Savepoint info
   */
  getSavepointInfo(
    transactionId: string,
    savepointName: string
  ): Promise<ServiceResult<SavepointInfo>>;

  /**
   * List all savepoints for a transaction
   * 
   * @param transactionId - Transaction ID
   * @returns List of savepoints
   */
  listSavepoints(
    transactionId: string
  ): Promise<ServiceResult<SavepointInfo[]>>;

  // ============================================================
  // Distributed Transaction Management (Saga, TCC, Outbox)
  // ============================================================

  /**
   * Execute a Saga distributed transaction
   * 
   * @param participants - Saga participants
   * @param options - Saga execution options
   * @returns Saga execution result
   * 
   * @example
   * const result = await transactionManager.executeSaga([
   *   {
   *     id: 'step1',
   *     name: 'Create Order',
   *     order: 1,
   *     execute: async (ctx) => { ... },
   *     compensate: async (ctx) => { ... },
   *     reversible: true
   *   },
   *   // ... more steps
   * ]);
   */
  executeSaga<T>(
    participants: SagaParticipant[],
    options?: SagaExecutionOptions
  ): Promise<SagaExecutionResult<T>>;

  /**
   * Execute a TCC (Try-Confirm-Cancel) transaction
   * 
   * @param tryAction - Try phase action
   * @param confirmAction - Confirm phase action
   * @param cancelAction - Cancel phase action
   * @param options - TCC options
   * @returns TCC result
   */
  executeTCC<T>(
    tryAction: (context: TransactionContext) => Promise<T>,
    confirmAction: (context: TransactionContext, result: T) => Promise<void>,
    cancelAction: (context: TransactionContext, result: T) => Promise<void>,
    options: TCCOptions
  ): Promise<TCCResult<T>>;

  /**
   * Publish an outbox message
   * 
   * @param options - Outbox publish options
   * @returns Outbox publish result
   */
  publishOutboxMessage(
    options: OutboxPublishOptions
  ): Promise<OutboxPublishResult>;

  /**
   * Publish multiple outbox messages in a batch
   * 
   * @param messages - Array of outbox messages
   * @param options - Publish options
   * @returns Batch publish result
   */
  publishOutboxMessages(
    messages: Omit<OutboxPublishOptions, 'publishImmediately'>[],
    options?: { batchSize?: number; onProgress?: (progress: number) => void }
  ): Promise<ServiceResult<{ total: number; published: number; failed: number; errors: string[] }>>;

  /**
   * Process pending outbox messages (background job)
   * 
   * @param options - Processing options
   * @returns Processing result
   */
  processOutboxMessages(
    options?: { batchSize?: number; maxRetries?: number; retryDelaySeconds?: number }
  ): Promise<ServiceResult<{ processed: number; published: number; failed: number }>>;

  /**
   * Register a compensation action
   * 
   * @param context - Transaction context
   * @param action - Compensation action
   * @returns Registration result
   */
  registerCompensation(
    context: TransactionContext,
    action: Omit<CompensationAction, 'id' | 'transactionId' | 'status' | 'createdAt'>
  ): Promise<ServiceResult<{ compensationId: string }>>;

  /**
   * Execute compensation actions for a transaction
   * 
   * @param transactionId - Transaction ID
   * @param options - Compensation options
   * @returns Compensation result
   */
  executeCompensation(
    transactionId: string,
    options?: { skipErrors?: boolean; maxAttempts?: number }
  ): Promise<ServiceResult<{ executed: number; failed: number; compensations: CompensationAction[] }>>;

  // ============================================================
  // Distributed Lock Management
  // ============================================================

  /**
   * Acquire a distributed lock
   * 
   * @param options - Lock options
   * @returns Lock result
   */
  acquireLock(
    options: DistributedLockOptions
  ): Promise<DistributedLockResult>;

  /**
   * Release a distributed lock
   * 
   * @param lockInfo - Lock information
   * @returns Release result
   */
  releaseLock(
    lockInfo: LockInfo
  ): Promise<ServiceResult<{ released: boolean }>>;

  /**
   * Execute a function with distributed lock
   * 
   * @param options - Lock options
   * @param callback - Function to execute
   * @returns Function result
   */
  withLock<T>(
    options: DistributedLockOptions,
    callback: (lockInfo: LockInfo) => Promise<T>
  ): Promise<ServiceResult<T>>;

  /**
   * Check if a lock is held
   * 
   * @param key - Lock key
   * @returns Lock status
   */
  isLockHeld(
    key: string
  ): Promise<ServiceResult<{ held: boolean; owner?: string; expiresAt?: Date }>>;

  /**
   * Get lock information
   * 
   * @param key - Lock key
   * @returns Lock information
   */
  getLockInfo(
    key: string
  ): Promise<ServiceResult<LockInfo | null>>;

  /**
   * Force release a lock (admin only)
   * 
   * @param key - Lock key
   * @param reason - Release reason
   * @param releasedBy - Admin ID
   * @returns Release result
   */
  forceReleaseLock(
    key: string,
    reason: string,
    releasedBy: string
  ): Promise<ServiceResult<{ released: boolean }>>;

  // ============================================================
  // Transaction Monitoring & Metrics
  // ============================================================

  /**
   * Get transaction metrics
   * 
   * @param options - Metrics options
   * @returns Transaction metrics
   */
  getMetrics(
    options?: { fromDate?: Date; toDate?: Date; transactionType?: TransactionType }
  ): Promise<ServiceResult<TransactionMetrics>>;

  /**
   * Get transaction audit log
   * 
   * @param options - Audit options
   * @returns Audit entries
   */
  getAuditLog(
    options?: { 
      transactionId?: string; 
      userId?: string; 
      transactionType?: TransactionType;
      fromDate?: Date;
      toDate?: Date;
      limit?: number;
      offset?: number;
    }
  ): Promise<ServiceResult<{
    entries: TransactionAuditEntry[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>>;

  /**
   * Get transaction alerts
   * 
   * @param options - Alert options
   * @returns Active alerts
   */
  getAlerts(
    options?: { 
      status?: 'active' | 'acknowledged' | 'resolved';
      severity?: 'info' | 'warning' | 'critical' | 'emergency';
      limit?: number;
    }
  ): Promise<ServiceResult<TransactionAlert[]>>;

  /**
   * Acknowledge a transaction alert
   * 
   * @param alertId - Alert ID
   * @param acknowledgedBy - Admin ID
   * @param note - Acknowledgment note
   * @returns Acknowledged alert
   */
  acknowledgeAlert(
    alertId: string,
    acknowledgedBy: string,
    note?: string
  ): Promise<ServiceResult<TransactionAlert>>;

  /**
   * Resolve a transaction alert
   * 
   * @param alertId - Alert ID
   * @param resolvedBy - Admin ID
   * @param resolutionNote - Resolution note
   * @returns Resolved alert
   */
  resolveAlert(
    alertId: string,
    resolvedBy: string,
    resolutionNote?: string
  ): Promise<ServiceResult<TransactionAlert>>;

  /**
   * Get monitor configuration
   * 
   * @returns Monitor configuration
   */
  getMonitorConfig(): Promise<ServiceResult<TransactionMonitorConfig>>;

  /**
   * Update monitor configuration
   * 
   * @param config - Updated configuration
   * @param updatedBy - Admin ID
   * @param reason - Update reason
   * @returns Updated configuration
   */
  updateMonitorConfig(
    config: Partial<TransactionMonitorConfig>,
    updatedBy: string,
    reason?: string
  ): Promise<ServiceResult<TransactionMonitorConfig>>;

  // ============================================================
  // Bangladesh Bank Compliance
  // ============================================================

  /**
   * Check transaction compliance with Bangladesh Bank regulations
   * 
   * @param context - Transaction context
   * @param options - Compliance check options
   * @returns Compliance check result
   */
  checkCompliance(
    context: TransactionContext,
    options?: { 
      checkAll?: boolean; 
      autoFix?: boolean;
      requireMfa?: boolean;
      requireKyc?: boolean;
    }
  ): Promise<ServiceResult<BBankTransactionCheck>>;

  /**
   * Generate Bangladesh Bank transaction compliance report
   * 
   * @param fromDate - Start date
   * @param toDate - End date
   * @param generatedBy - Admin ID
   * @param format - Report format
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date,
    generatedBy: string,
    format?: 'json' | 'csv' | 'pdf'
  ): Promise<ServiceResult<BBankTransactionReport>>;

  /**
   * Get Bangladesh Bank compliance status
   * 
   * @param transactionId - Transaction ID
   * @returns Compliance status
   */
  getComplianceStatus(
    transactionId: string
  ): Promise<ServiceResult<{
    compliant: boolean;
    issues: string[];
    warnings: string[];
    score: number;
    lastCheck: Date;
    nextCheck: Date;
    requiredActions: string[];
  }>>;

  /**
   * Run full compliance audit
   * 
   * @param fromDate - Start date
   * @param toDate - End date
   * @param performedBy - Admin ID
   * @returns Audit result
   */
  runComplianceAudit(
    fromDate: Date,
    toDate: Date,
    performedBy: string
  ): Promise<ServiceResult<{
    totalTransactions: number;
    compliant: number;
    nonCompliant: number;
    issues: Array<{ transactionId: string; issue: string; severity: string }>;
    recommendations: string[];
    auditId: string;
    auditCompletedAt: Date;
  }>>;

  // ============================================================
  // Deadlock Detection & Recovery
  // ============================================================

  /**
   * Detect deadlocks in transactions
   * 
   * @param options - Detection options
   * @returns Deadlock detection result
   */
  detectDeadlocks(
    options?: { 
      timeWindowSeconds?: number; 
      minDurationMs?: number;
      includeResolved?: boolean;
    }
  ): Promise<ServiceResult<{
    deadlocks: Array<{
      deadlockId: string;
      transactionIds: string[];
      detectedAt: Date;
      resolvedAt?: Date;
      durationMs: number;
      affectedTables: string[];
      victimTransactionId?: string;
      resolutionStrategy: DeadlockStrategy;
      isResolved: boolean;
    }>;
    total: number;
    active: number;
    resolved: number;
  }>>;

  /**
   * Resolve a deadlock
   * 
   * @param deadlockId - Deadlock ID
   * @param strategy - Resolution strategy
   * @param resolvedBy - Admin ID
   * @returns Resolution result
   */
  resolveDeadlock(
    deadlockId: string,
    strategy: DeadlockStrategy,
    resolvedBy: string
  ): Promise<ServiceResult<{ resolved: boolean; victimTransactionId?: string; resolutionTimeMs: number }>>;

  /**
   * Get deadlock statistics
   * 
   * @param options - Statistics options
   * @returns Deadlock statistics
   */
  getDeadlockStats(
    options?: { fromDate?: Date; toDate?: Date }
  ): Promise<ServiceResult<{
    totalDeadlocks: number;
    resolvedDeadlocks: number;
    unresolvedDeadlocks: number;
    averageDurationMs: number;
    maxDurationMs: number;
    minDurationMs: number;
    byTable: Record<string, number>;
    byStrategy: Record<DeadlockStrategy, number>;
    resolutionRate: number;
  }>>;

  // ============================================================
  // Transaction Interceptor Management
  // ============================================================

  /**
   * Register a transaction interceptor
   * 
   * @param interceptor - Transaction interceptor
   * @param name - Interceptor name
   * @param priority - Execution priority (higher = earlier)
   * @returns Registration result
   */
  registerInterceptor(
    interceptor: TransactionInterceptor,
    name: string,
    priority?: number
  ): Promise<ServiceResult<{ registered: boolean; interceptorId: string }>>;

  /**
   * Unregister a transaction interceptor
   * 
   * @param interceptorId - Interceptor ID
   * @returns Unregistration result
   */
  unregisterInterceptor(
    interceptorId: string
  ): Promise<ServiceResult<{ unregistered: boolean }>>;

  /**
   * Get all registered interceptors
   * 
   * @returns List of interceptors
   */
  getInterceptors(): Promise<ServiceResult<Array<{ id: string; name: string; priority: number }>>>;

  // ============================================================
  // Transaction Event Management
  // ============================================================

  /**
   * Register a transaction event listener
   * 
   * @param listener - Event listener
   * @param name - Listener name
   * @param eventTypes - Event types to listen for (empty = all)
   * @returns Registration result
   */
  registerEventListener(
    listener: TransactionEventListener,
    name: string,
    eventTypes?: TransactionEvent['type'][]
  ): Promise<ServiceResult<{ registered: boolean; listenerId: string }>>;

  /**
   * Unregister a transaction event listener
   * 
   * @param listenerId - Listener ID
   * @returns Unregistration result
   */
  unregisterEventListener(
    listenerId: string
  ): Promise<ServiceResult<{ unregistered: boolean }>>;

  /**
   * Emit a transaction event
   * 
   * @param event - Transaction event
   * @param options - Emit options
   * @returns Emit result
   */
  emitEvent(
    event: TransactionEvent,
    options?: { async?: boolean; timeoutMs?: number }
  ): Promise<ServiceResult<{ emitted: boolean; listenerCount: number }>>;

  // ============================================================
  // Transaction Cleanup & Maintenance
  // ============================================================

  /**
   * Clean up abandoned transactions
   * 
   * @param options - Cleanup options
   * @returns Cleanup result
   */
  cleanupAbandonedTransactions(
    options?: { 
      olderThanMinutes?: number; 
      maxTransactions?: number;
      dryRun?: boolean;
    }
  ): Promise<ServiceResult<{
    cleaned: number;
    failed: number;
    abandonedTransactions: Array<{ transactionId: string; startedAt: Date; durationMinutes: number }>;
    dryRun: boolean;
  }>>;

  /**
   * Clean up expired savepoints
   * 
   * @param options - Cleanup options
   * @returns Cleanup result
   */
  cleanupExpiredSavepoints(
    options?: { olderThanMinutes?: number; maxSavepoints?: number; dryRun?: boolean }
  ): Promise<ServiceResult<{
    cleaned: number;
    failed: number;
    expiredSavepoints: Array<{ name: string; transactionId: string; createdAt: Date }>;
    dryRun: boolean;
  }>>;

  /**
   * Archive old transaction logs
   * 
   * @param options - Archive options
   * @returns Archive result
   */
  archiveTransactionLogs(
    options?: { 
      olderThanDays?: number; 
      archiveLocation?: string;
      compress?: boolean;
      dryRun?: boolean;
    }
  ): Promise<ServiceResult<{
    archived: number;
    failed: number;
    archivePath: string;
    compressedSize: number;
    dryRun: boolean;
  }>>;

  // ============================================================
  // Health & Monitoring
  // ============================================================

  /**
   * Health check for transaction manager
   * 
   * @param options - Health check options
   * @returns Health status
   */
  healthCheck(
    options?: { includeDependencies?: boolean; includePerformance?: boolean }
  ): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    environment: string;
    dependencies: {
      database: boolean;
      cache: boolean;
      eventBus: boolean;
      monitor: boolean;
    };
    performance: {
      averageTransactionTimeMs: number;
      p95TransactionTimeMs: number;
      p99TransactionTimeMs: number;
      successRate: number;
      errorRate: number;
    };
    metrics: {
      activeTransactions: number;
      totalTransactions: number;
      deadlocks: number;
      rollbacks: number;
      timeouts: number;
    };
    lastError?: {
      message: string;
      timestamp: Date;
    };
    lastComplianceCheck?: {
      passed: boolean;
      timestamp: Date;
    };
  }>;

  /**
   * Get service performance metrics
   * 
   * @param period - Time period (1h, 24h, 7d, 30d)
   * @returns Performance metrics
   */
  getPerformanceMetrics(
    period?: '1h' | '24h' | '7d' | '30d'
  ): Promise<ServiceResult<{
    totalTransactions: number;
    averageDurationMs: number;
    p95DurationMs: number;
    p99DurationMs: number;
    successRate: number;
    failureRate: number;
    transactionTypeDistribution: Record<TransactionType, number>;
    isolationLevelDistribution: Record<TransactionIsolationLevel, number>;
    propagationDistribution: Record<TransactionPropagation, number>;
    errorDistribution: Record<TransactionErrorCode, number>;
  }>>;

  /**
   * Reset performance metrics
   * 
   * @param resetBy - Admin ID
   * @param reason - Reset reason
   * @returns Reset result
   */
  resetPerformanceMetrics(
    resetBy: string,
    reason?: string
  ): Promise<ServiceResult<{ reset: boolean; resetAt: Date }>>;

  /**
   * Get transaction service configuration
   * 
   * @returns Transaction service configuration
   */
  getServiceConfig(): Promise<ServiceResult<{
    defaultIsolation: TransactionIsolationLevel;
    defaultPropagation: TransactionPropagation;
    defaultTimeout: number;
    defaultRetryCount: number;
    maxNestedDepth: number;
    defaultLockType: DatabaseLockType;
    defaultDeadlockStrategy: DeadlockStrategy;
    distributedTransactionsEnabled: boolean;
    defaultDistributedPattern: DistributedTransactionPattern;
    monitoringEnabled: boolean;
    auditingEnabled: boolean;
    complianceEnabled: boolean;
    alertingEnabled: boolean;
  }>>;

  /**
   * Update transaction service configuration
   * 
   * @param config - Updated configuration
   * @param updatedBy - Admin ID
   * @param reason - Update reason
   * @returns Updated configuration
   */
  updateServiceConfig(
    config: Partial<{
      defaultIsolation: TransactionIsolationLevel;
      defaultPropagation: TransactionPropagation;
      defaultTimeout: number;
      defaultRetryCount: number;
      maxNestedDepth: number;
      defaultLockType: DatabaseLockType;
      defaultDeadlockStrategy: DeadlockStrategy;
      distributedTransactionsEnabled: boolean;
      defaultDistributedPattern: DistributedTransactionPattern;
      monitoringEnabled: boolean;
      auditingEnabled: boolean;
      complianceEnabled: boolean;
      alertingEnabled: boolean;
    }>,
    updatedBy: string,
    reason?: string
  ): Promise<ServiceResult<{
    updated: boolean;
    updatedAt: Date;
    oldConfig: unknown;
    newConfig: unknown;
  }>>;

  /**
   * Get transaction service version
   * 
   * @returns Service version
   */
  getVersion(): Promise<ServiceResult<{
    version: string;
    buildDate: Date;
    commitHash?: string;
    environment: string;
  }>>;
}

// ============================================================
// Type Exports
// ============================================================

export type {
  TransactionRunOptions as TransactionRunOptionsType,
  SavepointOptions as SavepointOptionsType,
  SagaExecutionOptions as SagaExecutionOptionsType,
  TCCOptions as TCCOptionsType,
  OutboxPublishOptions as OutboxPublishOptionsType,
  DistributedLockOptions as DistributedLockOptionsType,
  RollbackOptions as RollbackOptionsType,
  ServiceResult as ServiceResultType,
  TransactionRunResult as TransactionRunResultType,
  SagaExecutionResult as SagaExecutionResultType,
  TCCResult as TCCResultType,
  OutboxPublishResult as OutboxPublishResultType,
  DistributedLockResult as DistributedLockResultType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Programmatic transaction management (begin, commit, rollback)
// 2. ✅ Declarative transaction management (decorator-based)
// 3. ✅ Nested transaction support with savepoints
// 4. ✅ Distributed transaction patterns (Saga, TCC, Outbox)
// 5. ✅ Compensation pattern support
// 6. ✅ Transaction monitoring and metrics
// 7. ✅ Transaction audit logging
// 8. ✅ Transaction alerting system
// 9. ✅ Bangladesh Bank compliance integration
// 10. ✅ Multi-database transaction support
// 11. ✅ Transaction propagation and isolation
// 12. ✅ Deadlock detection and recovery
// 13. ✅ Transaction retry with exponential backoff
// 14. ✅ Distributed tracing with correlation ID
// 15. ✅ Bengali language support
// 16. ✅ Bangladesh specific - Mobile operator and network tracking
// 17. ✅ Distributed lock management
// 18. ✅ Interceptor and event listener support
// 19. ✅ Transaction cleanup and maintenance
// 20. ✅ Health check and monitoring
// 
// Bangladesh Specific:
// - Bangladesh Bank compliance checks
// - Bangladesh Bank transaction reporting
// - Bengali error messages
// - District/Division tracking
// - Mobile operator and network type tracking
// - Local currency (BDT) thresholds
// - KYC and MFA requirement tracking
// - Local timezone-aware timestamps
// 
// Security Features:
// - Transaction boundaries enforced
// - Rollback on unhandled exceptions
// - Timeout enforcement
// - Deadlock detection and recovery
// - Isolation levels enforced
// - Distributed lock management
// - Audit trail for all transactions
// - Alerting for suspicious activities
// 
// ============================================================
