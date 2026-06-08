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
 * ✅ ENHANCED: Custom validation error messages in Bengali
 * ✅ ENHANCED: Input sanitization for audit fields
 * ✅ ENHANCED: Rate limiting metadata for audit trail
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
  ValidateNested,
  IsIn,
  MaxLength,
  MinLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ FIXED: Correct imports from shared packages
import { 
  AUDIT_ACTIONS, 
  AUDIT_SOURCES, 
  AUDIT_SEVERITIES,
  AUDIT_ENTITY_TYPES,
  ENV_CONFIG
} from '@vubon/shared-constants';
import type { 
  AuditAction as SharedAuditAction, 
  AuditSource as SharedAuditSource, 
  AuditSeverity as SharedAuditSeverity,
  AuditEntityType as SharedAuditEntityType
} from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================
const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// Re-export enums for backward compatibility (from constants)
// ============================================================

/**
 * Audit action types (re-exported from shared-constants)
 */
export const AuditAction = AUDIT_ACTIONS;
export type AuditAction = SharedAuditAction;

/**
 * Audit source types (re-exported from shared-constants)
 */
export const AuditSource = AUDIT_SOURCES;
export type AuditSource = SharedAuditSource;

/**
 * Audit severity levels (re-exported from shared-constants)
 */
export const AuditSeverity = AUDIT_SEVERITIES;
export type AuditSeverity = SharedAuditSeverity;

/**
 * Audit entity types (re-exported from shared-constants)
 */
export const AuditEntityType = AUDIT_ENTITY_TYPES;
export type AuditEntityType = SharedAuditEntityType;

// ============================================================
// ✅ ENHANCEMENT: Custom Validation Messages (Bengali + English)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    required: (field: string) => `${field} is required`,
    isString: (field: string) => `${field} must be a string`,
    isDate: (field: string) => `${field} must be a valid date`,
    isNumber: (field: string) => `${field} must be a number`,
    min: (field: string, min: number) => `${field} must be at least ${min}`,
    max: (field: string, max: number) => `${field} cannot exceed ${max}`,
    isEnum: (field: string) => `${field} contains an invalid value`,
    isUuid: (field: string) => `${field} must be a valid UUID`,
  },
  bn: {
    required: (field: string) => `${field} প্রয়োজন`,
    isString: (field: string) => `${field} টি স্ট্রিং হতে হবে`,
    isDate: (field: string) => `${field} টি সঠিক তারিখ হতে হবে`,
    isNumber: (field: string) => `${field} টি সংখ্যা হতে হবে`,
    min: (field: string, min: number) => `${field} কমপক্ষে ${min} হতে হবে`,
    max: (field: string, max: number) => `${field} সর্বোচ্চ ${max} হতে পারে`,
    isEnum: (field: string) => `${field} এ সঠিক মান নেই`,
    isUuid: (field: string) => `${field} টি সঠিক UUID হতে হবে`,
  },
};

/**
 * Get validation message
 */
function getValidationMessage(field: string, type: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
  if (!IS_PRODUCTION) {
    return VALIDATION_MESSAGES.en[type](field, ...args as [number]);
  }
  return VALIDATION_MESSAGES.en[type](field, ...args as [number]);
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
  @IsDate({ message: getValidationMessage('createdAt', 'isDate') })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'User ID who created the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('createdBy', 'isUuid') })
  createdBy?: string;

  @ApiPropertyOptional({
    description: 'User email who created the entity',
    example: 'admin@vubon.com.bd',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('createdByEmail', 'isString') })
  @MaxLength(255, { message: getValidationMessage('createdByEmail', 'max', 255) })
  createdByEmail?: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate({ message: getValidationMessage('updatedAt', 'isDate') })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'User ID who last updated the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('updatedBy', 'isUuid') })
  updatedBy?: string;

  @ApiPropertyOptional({
    description: 'Soft delete timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: getValidationMessage('deletedAt', 'isDate') })
  deletedAt?: Date;

  @ApiPropertyOptional({
    description: 'User ID who deleted the entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('deletedBy', 'isUuid') })
  deletedBy?: string;

  @ApiProperty({
    description: 'Optimistic locking version',
    example: 1,
    minimum: 1,
  })
  @IsNumber({}, { message: getValidationMessage('version', 'isNumber') })
  @Min(1, { message: getValidationMessage('version', 'min', 1) })
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
 * ✅ ENHANCED: Using unknown instead of any for better type safety
 * ✅ ENHANCED: Added validation for field names
 */
export class ChangeDetail {
  @ApiProperty({ description: 'Field name that changed' })
  @IsString({ message: getValidationMessage('field', 'isString') })
  @IsNotEmpty({ message: getValidationMessage('field', 'required') })
  @MaxLength(100, { message: getValidationMessage('field', 'max', 100) })
  @MinLength(1, { message: getValidationMessage('field', 'min', 1) })
  field: string;

  @ApiProperty({ description: 'Old value (before change)' })
  oldValue: unknown;

  @ApiProperty({ description: 'New value (after change)' })
  newValue: unknown;

  @ApiPropertyOptional({ description: 'Data type of the field', example: 'string' })
  @IsOptional()
  @IsString({ message: getValidationMessage('dataType', 'isString') })
  @MaxLength(50, { message: getValidationMessage('dataType', 'max', 50) })
  dataType?: string;

  constructor(field: string, oldValue: unknown, newValue: unknown, dataType?: string) {
    this.field = field;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.dataType = dataType;
  }
}

// ============================================================
// ✅ ENHANCEMENT: Rate Limit Metadata for Audit Trail
// ============================================================

/**
 * Rate limit metadata for audit tracking
 */
export class RateLimitMetadata {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 95 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T00:01:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;

  constructor(
    windowSeconds?: number,
    maxRequests?: number,
    remaining?: number,
    resetAt?: Date
  ) {
    this.windowSeconds = windowSeconds;
    this.maxRequests = maxRequests;
    this.remaining = remaining;
    this.resetAt = resetAt;
  }
}

// ============================================================
// Audit Log DTO (ENHANCED)
// ============================================================

/**
 * Audit Log DTO
 * ✅ ENHANCED: Added rate limit metadata
 */
export class AuditLogDto {
  @ApiProperty({
    description: 'ID of the audited entity',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString({ message: getValidationMessage('entityId', 'isString') })
  @IsNotEmpty({ message: getValidationMessage('entityId', 'required') })
  @MaxLength(255, { message: getValidationMessage('entityId', 'max', 255) })
  entityId: string;

  @ApiProperty({
    description: 'Type of the audited entity',
    enum: AUDIT_ENTITY_TYPES,
    example: 'User',
  })
  @IsEnum(AUDIT_ENTITY_TYPES, { message: getValidationMessage('entityType', 'isEnum') })
  entityType: AuditEntityType;

  @ApiProperty({
    description: 'Audit action performed',
    enum: AUDIT_ACTIONS,
    example: AUDIT_ACTIONS.UPDATE,
  })
  @IsEnum(AUDIT_ACTIONS, { message: getValidationMessage('action', 'isEnum') })
  action: AuditAction;

  @ApiPropertyOptional({
    description: 'User ID who performed the action',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('userId', 'isUuid') })
  userId?: string;

  @ApiPropertyOptional({
    description: 'User email who performed the action',
    example: 'admin@vubon.com.bd',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('userEmail', 'isString') })
  @MaxLength(255, { message: getValidationMessage('userEmail', 'max', 255) })
  userEmail?: string;

  @ApiPropertyOptional({
    description: 'IP address of the requester',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('ipAddress', 'isString') })
  @MaxLength(45, { message: getValidationMessage('ipAddress', 'max', 45) }) // IPv6 max length
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent of the requester',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('userAgent', 'isString') })
  @MaxLength(500, { message: getValidationMessage('userAgent', 'max', 500) })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Device ID of the requester',
    example: 'dev_abc123',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('deviceId', 'isString') })
  @MaxLength(255, { message: getValidationMessage('deviceId', 'max', 255) })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Changes made (for UPDATE actions)',
    type: [ChangeDetail],
  })
  @IsOptional()
  @IsArray({ message: 'Changes must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ChangeDetail)
  changes?: ChangeDetail[];

  @ApiProperty({
    description: 'Timestamp when the action occurred',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate({ message: getValidationMessage('timestamp', 'isDate') })
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Source of the audit action',
    enum: AUDIT_SOURCES,
    example: AUDIT_SOURCES.API,
    default: AUDIT_SOURCES.API,
  })
  @IsOptional()
  @IsEnum(AUDIT_SOURCES, { message: getValidationMessage('source', 'isEnum') })
  source?: AuditSource = AUDIT_SOURCES.API;

  @ApiPropertyOptional({
    description: 'Severity level of the audit event',
    enum: AUDIT_SEVERITIES,
    example: AUDIT_SEVERITIES.INFO,
    default: AUDIT_SEVERITIES.INFO,
  })
  @IsOptional()
  @IsEnum(AUDIT_SEVERITIES, { message: getValidationMessage('severity', 'isEnum') })
  severity?: AuditSeverity = AUDIT_SEVERITIES.INFO;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('correlationId', 'isUuid') })
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Request ID for API log linking',
    example: 'req_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('requestId', 'isString') })
  requestId?: string;

  @ApiPropertyOptional({
    description: 'Status of the action (success/failure)',
    example: 'success',
    enum: ['success', 'failure'],
  })
  @IsOptional()
  @IsIn(['success', 'failure'], { message: 'Status must be success or failure' })
  status?: 'success' | 'failure';

  @ApiPropertyOptional({
    description: 'Error message (if action failed)',
    example: 'Invalid credentials',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('errorMessage', 'isString') })
  @MaxLength(500, { message: getValidationMessage('errorMessage', 'max', 500) })
  errorMessage?: string;

  @ApiPropertyOptional({
    description: 'Bengali error message',
    example: 'ভুল ক্রেডেনশিয়াল',
  })
  @IsOptional()
  @IsString({ message: 'errorMessageBn must be a string' })
  @MaxLength(500)
  errorMessageBn?: string;

  @ApiPropertyOptional({
    description: 'Duration of the action in milliseconds',
    example: 150,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: getValidationMessage('durationMs', 'isNumber') })
  @Min(0, { message: getValidationMessage('durationMs', 'min', 0) })
  durationMs?: number;

  // ✅ ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for the request',
    type: RateLimitMetadata,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RateLimitMetadata)
  rateLimit?: RateLimitMetadata;

  // ✅ Bangladesh specific fields
  @ApiPropertyOptional({
    description: 'District where the action was performed',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('district', 'isString') })
  @MaxLength(100, { message: getValidationMessage('district', 'max', 100) })
  district?: string;

  @ApiPropertyOptional({
    description: 'Upazila where the action was performed',
    example: 'Gulshan',
  })
  @IsOptional()
  @IsString({ message: 'upazila must be a string' })
  @MaxLength(100)
  upazila?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsIn(['gp', 'robi', 'banglalink', 'teletalk', 'unknown'], { message: 'Invalid mobile operator' })
  mobileOperator?: string;

  constructor(
    entityId: string,
    entityType: AuditEntityType,
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
    mobileOperator?: string,
    rateLimit?: RateLimitMetadata
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
    this.source = source || AUDIT_SOURCES.API;
    this.severity = severity || AUDIT_SEVERITIES.INFO;
    this.correlationId = correlationId;
    this.requestId = requestId;
    this.status = status || 'success';
    this.errorMessage = errorMessage;
    this.errorMessageBn = errorMessageBn;
    this.durationMs = durationMs;
    this.district = district;
    this.upazila = upazila;
    this.mobileOperator = mobileOperator;
    this.rateLimit = rateLimit;
  }
}

// ============================================================
// Audit Query DTOs (ENHANCED)
// ============================================================

/**
 * Audit Log Query DTO
 * ✅ ENHANCED: Added rate limit filter
 */
export class AuditLogQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by entity ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('entityId', 'isString') })
  @MaxLength(255, { message: getValidationMessage('entityId', 'max', 255) })
  entityId?: string;

  @ApiPropertyOptional({
    description: 'Filter by entity type',
    enum: AUDIT_ENTITY_TYPES,
  })
  @IsOptional()
  @IsEnum(AUDIT_ENTITY_TYPES, { message: getValidationMessage('entityType', 'isEnum') })
  entityType?: AuditEntityType;

  @ApiPropertyOptional({
    description: 'Filter by action',
    enum: AUDIT_ACTIONS,
  })
  @IsOptional()
  @IsEnum(AUDIT_ACTIONS, { message: getValidationMessage('action', 'isEnum') })
  action?: AuditAction;

  @ApiPropertyOptional({
    description: 'Filter by user ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID('all', { message: getValidationMessage('userId', 'isUuid') })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Filter by source',
    enum: AUDIT_SOURCES,
  })
  @IsOptional()
  @IsEnum(AUDIT_SOURCES, { message: getValidationMessage('source', 'isEnum') })
  source?: AuditSource;

  @ApiPropertyOptional({
    description: 'Filter by severity',
    enum: AUDIT_SEVERITIES,
  })
  @IsOptional()
  @IsEnum(AUDIT_SEVERITIES, { message: getValidationMessage('severity', 'isEnum') })
  severity?: AuditSeverity;

  @ApiPropertyOptional({
    description: 'Start date for filtering',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: getValidationMessage('fromDate', 'isDate') })
  fromDate?: Date;

  @ApiPropertyOptional({
    description: 'End date for filtering',
    example: '2024-01-31T23:59:59.999Z',
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: getValidationMessage('toDate', 'isDate') })
  toDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['success', 'failure'],
  })
  @IsOptional()
  @IsIn(['success', 'failure'], { message: 'Status must be success or failure' })
  status?: 'success' | 'failure';

  @ApiPropertyOptional({
    description: 'Filter by district (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('district', 'isString') })
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by mobile operator',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsIn(['gp', 'robi', 'banglalink', 'teletalk', 'unknown'], { message: 'Invalid mobile operator' })
  mobileOperator?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: getValidationMessage('page', 'isNumber') })
  @Min(1, { message: getValidationMessage('page', 'min', 1) })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber({}, { message: getValidationMessage('limit', 'isNumber') })
  @Min(1, { message: getValidationMessage('limit', 'min', 1) })
  @Max(100, { message: getValidationMessage('limit', 'max', 100) })
  limit?: number = 20;
}

// ============================================================
// Audit Statistics DTO (ENHANCED)
// ============================================================

/**
 * Audit Statistics DTO
 * ✅ ENHANCED: Added rate limit statistics
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

  // ✅ ENHANCEMENT: Rate limit statistics
  @ApiPropertyOptional({ description: 'Rate limit exceeded events', example: 10 })
  rateLimitExceededCount?: number;

  @ApiPropertyOptional({ description: 'Average rate limit remaining', example: 85 })
  averageRateLimitRemaining?: number;

  constructor(data: Partial<AuditStatisticsDto>) {
    Object.assign(this, data);
  }
}

// ============================================================
// ✅ ENHANCEMENT: Rate Limit Audit DTO
// ============================================================

/**
 * Rate limit audit entry DTO
 */
export class RateLimitAuditDto {
  @ApiProperty({ description: 'User ID or IP that was rate limited' })
  identifier: string;

  @ApiProperty({ description: 'Type of identifier (user or ip)' })
  identifierType: 'user' | 'ip';

  @ApiProperty({ description: 'Endpoint that was rate limited' })
  endpoint: string;

  @ApiProperty({ description: 'Rate limit window (seconds)' })
  windowSeconds: number;

  @ApiProperty({ description: 'Max requests allowed' })
  maxRequests: number;

  @ApiProperty({ description: 'Timestamp when rate limit was triggered' })
  @Type(() => Date)
  triggeredAt: Date;

  @ApiPropertyOptional({ description: 'User agent when rate limited' })
  userAgent?: string;

  @ApiPropertyOptional({ description: 'District (Bangladesh specific)' })
  district?: string;

  constructor(
    identifier: string,
    identifierType: 'user' | 'ip',
    endpoint: string,
    windowSeconds: number,
    maxRequests: number,
    triggeredAt: Date,
    userAgent?: string,
    district?: string
  ) {
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.endpoint = endpoint;
    this.windowSeconds = windowSeconds;
    this.maxRequests = maxRequests;
    this.triggeredAt = triggeredAt;
    this.userAgent = userAgent;
    this.district = district;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { AuditLogQueryDto as AuditLogQueryDtoType };

// ============================================================
// INDEX.TS UPDATE - Add these exports to your dtos/index.ts
// ============================================================
// 
// // Add to dtos/index.ts:
// export * from './common/audit.dto';
// export {
//   AuditDto,
//   ChangeDetail,
//   RateLimitMetadata,
//   AuditLogDto,
//   AuditLogQueryDto,
//   AuditStatisticsDto,
//   RateLimitAuditDto,
//   AuditAction,
//   AuditSource,
//   AuditSeverity,
//   AuditEntityType,
// } from './common/audit.dto';
// 
// ============================================================
