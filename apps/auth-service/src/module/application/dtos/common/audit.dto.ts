/**
 * Audit DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/common/audit.dto
 * 
 * @description
 * Data transfer objects for audit logging and entity tracking.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators for incoming audit data
 * ✅ API documentation for audit endpoints
 * ✅ Correlation ID for distributed tracing
 * ✅ Bangladesh specific - Bengali support for audit messages
 */

import { 
  IsString, 
  IsOptional, 
  IsDate, 
  IsNumber, 
  IsEnum,
  IsUUID,
  IsObject,
  IsArray,
  Min,
  Max,
  IsNotEmpty,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// Audit Action Enum (Bangladesh specific actions added)
// ============================================================

/**
 * Audit action types
 */
export enum AuditAction {
  // CRUD Operations
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  READ = 'READ',
  BULK_CREATE = 'BULK_CREATE',
  BULK_UPDATE = 'BULK_UPDATE',
  BULK_DELETE = 'BULK_DELETE',
  
  // Authentication
  LOGIN = 'LOGIN',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  REGISTER_FAILED = 'REGISTER_FAILED',
  
  // MFA
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  MFA_VERIFIED = 'MFA_VERIFIED',
  MFA_FAILED = 'MFA_FAILED',
  MFA_BACKUP_CODE_USED = 'MFA_BACKUP_CODE_USED',
  
  // Password
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED',
  
  // Account
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_UNLOCKED = 'ACCOUNT_UNLOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_RESTORED = 'ACCOUNT_RESTORED',
  
  // Email/Phone Verification
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  EMAIL_VERIFICATION_SENT = 'EMAIL_VERIFICATION_SENT',
  PHONE_VERIFIED = 'PHONE_VERIFIED',
  PHONE_VERIFICATION_SENT = 'PHONE_VERIFICATION_SENT',
  
  // Social Auth
  SOCIAL_LINK = 'SOCIAL_LINK',
  SOCIAL_UNLINK = 'SOCIAL_UNLINK',
  SOCIAL_LOGIN = 'SOCIAL_LOGIN',
  SOCIAL_LOGIN_FAILED = 'SOCIAL_LOGIN_FAILED',
  
  // Session
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_REVOKED = 'SESSION_REVOKED',
  SESSION_REVOKED_ALL = 'SESSION_REVOKED_ALL',
  SESSION_EXTENDED = 'SESSION_EXTENDED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Device
  DEVICE_REGISTERED = 'DEVICE_REGISTERED',
  DEVICE_TRUSTED = 'DEVICE_TRUSTED',
  DEVICE_UNTRUSTED = 'DEVICE_UNTRUSTED',
  DEVICE_REMOVED = 'DEVICE_REMOVED',
  
  // Admin Actions
  ROLE_CHANGED = 'ROLE_CHANGED',
  USER_SUSPENDED = 'USER_SUSPENDED',
  USER_ACTIVATED = 'USER_ACTIVATED',
  USER_IMPERSONATED = 'USER_IMPERSONATED',
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
  PERMISSION_REVOKED = 'PERMISSION_REVOKED',
  
  // Bangladesh Specific
  BKASH_PAYMENT = 'BKASH_PAYMENT',
  NAGAD_PAYMENT = 'NAGAD_PAYMENT',
  ROCKET_PAYMENT = 'ROCKET_PAYMENT',
  WHATSAPP_LOGIN = 'WHATSAPP_LOGIN',
  IMO_LOGIN = 'IMO_LOGIN',
  DISTRICT_CHANGED = 'DISTRICT_CHANGED',
  UPAZILA_CHANGED = 'UPAZILA_CHANGED',
  
  // System
  SYSTEM_CONFIG_CHANGED = 'SYSTEM_CONFIG_CHANGED',
  SYSTEM_BACKUP = 'SYSTEM_BACKUP',
  SYSTEM_RESTORE = 'SYSTEM_RESTORE',
  SYSTEM_HEALTH_CHECK = 'SYSTEM_HEALTH_CHECK',
  SYSTEM_CACHE_CLEARED = 'SYSTEM_CACHE_CLEARED',
}

/**
 * Audit source types
 */
export enum AuditSource {
  API = 'API',
  ADMIN_PANEL = 'ADMIN_PANEL',
  SYSTEM = 'SYSTEM',
  CRON_JOB = 'CRON_JOB',
  WEBHOOK = 'WEBHOOK',
  MIGRATION = 'MIGRATION',
  MOBILE_APP = 'MOBILE_APP',
  THIRD_PARTY = 'THIRD_PARTY',
}

/**
 * Audit severity levels
 */
export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

// ============================================================
// Entity Audit DTO (for entities with audit fields)
// ============================================================

/**
 * Entity Audit DTO - Embedded in entities
 */
export class AuditDto {
  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'User ID who created the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'User email who created the entity',
    example: 'admin@vubon.com.bd',
  })
  @IsOptional()
  @IsString()
  createdByEmail?: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'User ID who last updated the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiPropertyOptional({
    description: 'Soft delete timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deletedAt?: Date;

  @ApiPropertyOptional({
    description: 'User ID who deleted the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  deletedBy?: string;

  @ApiProperty({
    description: 'Optimistic locking version',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  version: number;

  constructor(
    createdAt: Date,
    updatedAt: Date,
    version: number,
    createdBy?: string,
    updatedBy?: string,
    deletedAt?: Date,
    deletedBy?: string,
    createdByEmail?: string
  ) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.createdByEmail = createdByEmail;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.deletedAt = deletedAt;
    this.deletedBy = deletedBy;
    this.version = version;
  }
}

// ============================================================
// Change Detail DTO
// ============================================================

/**
 * Change detail for audit log
 */
export class ChangeDetail {
  @ApiProperty({ description: 'Field name that changed' })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ description: 'Old value (before change)' })
  oldValue: any;

  @ApiProperty({ description: 'New value (after change)' })
  newValue: any;

  @ApiPropertyOptional({ description: 'Data type of the field', example: 'string' })
  @IsOptional()
  @IsString()
  dataType?: string;

  constructor(field: string, oldValue: any, newValue: any, dataType?: string) {
    this.field = field;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.dataType = dataType;
  }
}

// ============================================================
// Audit Log DTO
// ============================================================

/**
 * Audit Log DTO
 */
export class AuditLogDto {
  @ApiProperty({
    description: 'ID of the audited entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  entityId: string;

  @ApiProperty({
    description: 'Type of the audited entity',
    example: 'User',
    enum: ['User', 'Session', 'MFA', 'SocialAccount', 'RefreshToken', 'AccountLock', 'Device', 'LoginAttempt'],
  })
  @IsString()
  @IsNotEmpty()
  entityType: string;

  @ApiProperty({
    description: 'Audit action performed',
    enum: AuditAction,
    example: AuditAction.UPDATE,
  })
  @IsEnum(AuditAction)
  action: AuditAction;

  @ApiPropertyOptional({
    description: 'User ID who performed the action',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'User email who performed the action',
    example: 'admin@vubon.com.bd',
  })
  @IsOptional()
  @IsString()
  userEmail?: string;

  @ApiPropertyOptional({
    description: 'IP address of the requester',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent of the requester',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Device ID of the requester',
    example: 'dev_abc123',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Changes made (for UPDATE actions)',
    type: [ChangeDetail],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChangeDetail)
  changes?: ChangeDetail[];

  @ApiProperty({
    description: 'Timestamp when the action occurred',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Source of the audit action',
    enum: AuditSource,
    example: AuditSource.API,
    default: AuditSource.API,
  })
  @IsOptional()
  @IsEnum(AuditSource)
  source?: AuditSource = AuditSource.API;

  @ApiPropertyOptional({
    description: 'Severity level of the audit event',
    enum: AuditSeverity,
    example: AuditSeverity.INFO,
    default: AuditSeverity.INFO,
  })
  @IsOptional()
  @IsEnum(AuditSeverity)
  severity?: AuditSeverity = AuditSeverity.INFO;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Request ID for API log linking',
    example: 'req_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiPropertyOptional({
    description: 'Status of the action (success/failure)',
    example: 'success',
    enum: ['success', 'failure'],
  })
  @IsOptional()
  @IsString()
  status?: 'success' | 'failure';

  @ApiPropertyOptional({
    description: 'Error message (if action failed)',
    example: 'Invalid credentials',
  })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'ভুল ক্রেডেনশিয়াল',
  })
  @IsOptional()
  @IsString()
  errorMessageBn?: string;

  @ApiPropertyOptional({
    description: 'Duration of the action in milliseconds',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  durationMs?: number;

  // Bangladesh specific fields
  @ApiPropertyOptional({
    description: 'District where the action was performed',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Upazila where the action was performed',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString()
  upazila?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsString()
  mobileOperator?: string;

  constructor(
    entityId: string,
    entityType: string,
    action: AuditAction,
    userId?: string,
    ipAddress?: string,
    userAgent?: string,
    changes?: ChangeDetail[],
    source?: AuditSource,
    correlationId?: string,
    requestId?: string,
    status?: 'success' | 'failure',
    errorMessage?: string,
    durationMs?: number,
    severity?: AuditSeverity,
    userEmail?: string,
    deviceId?: string,
    errorMessageBn?: string,
    district?: string,
    upazila?: string,
    mobileOperator?: string
  ) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.action = action;
    this.userId = userId;
    this.userEmail = userEmail;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.deviceId = deviceId;
    this.changes = changes;
    this.timestamp = new Date();
    this.source = source || AuditSource.API;
    this.severity = severity || AuditSeverity.INFO;
    this.correlationId = correlationId;
    this.requestId = requestId;
    this.status = status || 'success';
    this.errorMessage = errorMessage;
    this.errorMessageBn = errorMessageBn;
    this.durationMs = durationMs;
    this.district = district;
    this.upazila = upazila;
    this.mobileOperator = mobileOperator;
  }
}

// ============================================================
// Audit Query DTOs
// ============================================================

/**
 * Audit Log Query DTO
 */
export class AuditLogQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by entity ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({
    description: 'Filter by entity type',
    enum: ['User', 'Session', 'MFA', 'SocialAccount', 'RefreshToken', 'AccountLock', 'Device', 'LoginAttempt'],
  })
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional({
    description: 'Filter by action',
    enum: AuditAction,
  })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional({
    description: 'Filter by user ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Filter by source',
    enum: AuditSource,
  })
  @IsOptional()
  @IsEnum(AuditSource)
  source?: AuditSource;

  @ApiPropertyOptional({
    description: 'Filter by severity',
    enum: AuditSeverity,
  })
  @IsOptional()
  @IsEnum(AuditSeverity)
  severity?: AuditSeverity;

  @ApiPropertyOptional({
    description: 'Start date for filtering',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @ApiPropertyOptional({
    description: 'End date for filtering',
    example: '2024-01-31T23:59:59.999Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['success', 'failure'],
  })
  @IsOptional()
  @IsString()
  status?: 'success' | 'failure';

  @ApiPropertyOptional({
    description: 'Filter by district (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by mobile operator',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsString()
  mobileOperator?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

/**
 * Audit Log Response DTO (paginated)
 */
export class AuditLogResponseDto {
  @ApiProperty({ description: 'Audit log entries', type: [AuditLogDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuditLogDto)
  items: AuditLogDto[];

  @ApiProperty({ description: 'Total number of entries', example: 100 })
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Items per page', example: 20 })
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 5 })
  @IsNumber()
  @Min(0)
  totalPages: number;

  @ApiProperty({ description: 'Whether there is a next page', example: true })
  @IsBoolean()
  hasNextPage: boolean;

  @ApiProperty({ description: 'Whether there is a previous page', example: false })
  @IsBoolean()
  hasPreviousPage: boolean;

  constructor(items: AuditLogDto[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
  }
}

// ============================================================
// Audit Statistics DTO
// ============================================================

/**
 * Audit Statistics DTO
 */
export class AuditStatisticsDto {
  @ApiProperty({ description: 'Total number of audit events', example: 1000 })
  totalEvents: number;

  @ApiProperty({ description: 'Events by action', type: 'object', additionalProperties: { type: 'number' } })
  eventsByAction: Record<string, number>;

  @ApiProperty({ description: 'Events by severity', type: 'object', additionalProperties: { type: 'number' } })
  eventsBySeverity: Record<string, number>;

  @ApiProperty({ description: 'Events by source', type: 'object', additionalProperties: { type: 'number' } })
  eventsBySource: Record<string, number>;

  @ApiProperty({ description: 'Events by hour of day', type: 'object', additionalProperties: { type: 'number' } })
  eventsByHour: Record<number, number>;

  @ApiProperty({ description: 'Top users by activity', type: 'array', items: { type: 'object' } })
  topUsers: Array<{ userId: string; count: number }>;

  @ApiProperty({ description: 'Top IP addresses', type: 'array', items: { type: 'object' } })
  topIpAddresses: Array<{ ipAddress: string; count: number }>;

  @ApiProperty({ description: 'Average response time (ms)', example: 45 })
  averageResponseTimeMs: number;

  @ApiProperty({ description: 'Success rate percentage', example: 99.5 })
  successRate: number;

  @ApiPropertyOptional({ description: 'Events by district (Bangladesh specific)', type: 'object' })
  eventsByDistrict?: Record<string, number>;

  @ApiPropertyOptional({ description: 'Events by mobile operator', type: 'object' })
  eventsByMobileOperator?: Record<string, number>;

  constructor(data: Partial<AuditStatisticsDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { AuditLogQueryDto as AuditLogQueryDtoType };
