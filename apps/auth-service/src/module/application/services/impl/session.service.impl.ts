/**
 * Session Service Implementation - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/impl/session.service.impl
 * 
 * @description
 * Orchestrates session management use cases.
 * NO business logic - coordinates domain entities and repositories.
 * 
 * Enterprise Rules:
 * ✅ Use-case orchestration only
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ DTO mapping
 * ✅ Bangladesh specific - Device type, network type tracking
 * ✅ Enhanced caching with proper invalidation
 * ✅ Health check for service monitoring
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';

import { SessionService, DeviceInfo, ExtendSessionDto, SessionFilterOptions, SessionHeartbeatDto, SessionStatistics, GlobalSessionStatistics, SessionCleanupResult } from '../interfaces/session.service.interface';
import { RevokeSessionDto, RevokeSessionResponseDto, RevokeSessionsByDeviceDto, RevokeSessionsByDeviceResponseDto } from '../../dtos/session/revoke-session.dto';
import { RevokeAllSessionsDto, RevokeAllSessionsResponseDto, BulkRevokeSessionsDto, BulkRevokeSessionsResponseDto } from '../../dtos/session/revoke-all-sessions.dto';
import { PaginationDto, PaginatedResponseDto } from '../../dtos/common/pagination.dto';

import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { Session, SessionStatus } from '../../../domain/entities/session.entity';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';

import { UserLoggedOutEvent, LogoutReason, LogoutSource } from '../../events/user-logged-out.event';
import { SessionExpiredEvent } from '../../events/session-expired.event';
import { SessionRevokedEvent } from '../../events/session-revoked.event';
import { SessionActivityRecordedEvent } from '../../events/session-activity-recorded.event';

import { SessionMapper, BriefSessionResponseDto, SessionResponseDto, CurrentSessionResponseDto } from '../../mappers/session.mapper';
import { EventBus } from '../interfaces/event-bus.interface';
import { AuditService } from '../interfaces/audit.service.interface';
import { CacheService, CacheKeyBuilder } from '../interfaces/cache.service.interface';

// ============================================================
// Constants (to be moved to shared-constants in production)
// ============================================================

const SESSION_CONFIG = {
  EXTENSION_MAX_MINUTES: 24 * 60, // 24 hours
  DEFAULT_IDLE_TIMEOUT_MINUTES: 30,
  MOBILE_IDLE_TIMEOUT_MINUTES: 60,  // Longer timeout for mobile (Bangladesh specific)
  MAX_ACTIVE_SESSIONS_PER_USER: 10,
  SESSION_CACHE_TTL_SECONDS: 300,   // 5 minutes
  HEALTH_CHECK_TIMEOUT_MS: 5000,    // 5 seconds
};

// ============================================================
// Session Service Implementation
// ============================================================

@Injectable()
export class SessionServiceImpl implements SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService
  ) {}

  // ============================================================
  // Health Check
  // ============================================================

  /**
   * Check service health
   */
  async healthCheck(): Promise<{ healthy: boolean; latency: number; error?: string }> {
    const startTime = Date.now();
    try {
      // Test database connection
      await this.sessionRepository.count();
      const latency = Date.now() - startTime;
      return { healthy: true, latency };
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - startTime,
        error: (error as Error).message
      };
    }
  }

  // ============================================================
  // Session Retrieval
  // ============================================================

  async getUserSessions(
    userId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>> {
    // Try cache first for first page
    if (options.page === 1 && !filters) {
      const cacheKey = CacheKeyBuilder.userSessions(userId);
      const cached = await this.cacheService.get<PaginatedResponseDto<BriefSessionResponseDto>>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const sessions = await this.sessionRepository.findByUserIdPaginated(userId, options);
    
    let filteredSessions = sessions.data;
    
    // Apply filters if provided
    if (filters) {
      filteredSessions = this.applyFilters(filteredSessions, filters);
    }
    
    const result = SessionMapper.toPaginatedResponse(
      filteredSessions,
      sessions.total,
      options.page,
      options.limit
    );
    
    // Cache first page result
    if (options.page === 1 && !filters) {
      await this.cacheService.set(
        CacheKeyBuilder.userSessions(userId),
        result,
        SESSION_CONFIG.SESSION_CACHE_TTL_SECONDS
      );
    }
    
    return result;
  }

  async getActiveSessions(userId: string): Promise<BriefSessionResponseDto[]> {
    // Try cache first
    const cacheKey = CacheKeyBuilder.userSessions(userId);
    const cached = await this.cacheService.get<BriefSessionResponseDto[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    const result = SessionMapper.toBriefDtoList(sessions);
    
    // Cache for 5 minutes
    await this.cacheService.set(cacheKey, result, SESSION_CONFIG.SESSION_CACHE_TTL_SECONDS);
    
    return result;
  }

  async getSessionById(userId: string, sessionId: string): Promise<SessionResponseDto> {
    const session = await this.findSessionOrThrow(sessionId);
    
    // Validate ownership
    if (!session.validateOwnership(userId)) {
      // Audit unauthorized access attempt
      await this.auditService.warn(
        'UNAUTHORIZED_SESSION_ACCESS',
        userId,
        { sessionId, targetUserId: session.getUserId() }
      );
      throw new ForbiddenException('Cannot access another user\'s session');
    }

    return SessionMapper.toDto(session);
  }

  async getCurrentSession(userId: string, sessionId: string): Promise<CurrentSessionResponseDto> {
    const session = await this.findSessionOrThrow(sessionId);
    
    if (!session.validateOwnership(userId)) {
      throw new ForbiddenException('Cannot access another user\'s session');
    }

    return SessionMapper.toCurrentSessionDto(session);
  }

  // ============================================================
  // Session Revocation
  // ============================================================

  async revokeSession(
    userId: string,
    sessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<RevokeSessionResponseDto> {
    const session = await this.findSessionOrThrow(sessionId);
    
    if (!session.validateOwnership(userId)) {
      await this.auditService.warn(
        'UNAUTHORIZED_SESSION_REVOCATION',
        userId,
        { sessionId, targetUserId: session.getUserId(), deviceInfo }
      );
      throw new ForbiddenException('Cannot revoke another user\'s session');
    }

    const wasCurrentSession = sessionId === deviceInfo.sessionId;

    // Revoke the session
    session.revoke('User initiated');
    await this.sessionRepository.save(session);
    
    // Invalidate cache
    await this.invalidateSessionCache(userId, sessionId);

    // Publish event
    await this.eventBus.publish(
      new SessionRevokedEvent(
        sessionId,
        userId,
        session.getDeviceId().getValue(),
        'User initiated',
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        deviceInfo.deviceId,
        deviceInfo.correlationId
      )
    );

    // Audit log
    await this.auditService.info(
      'SESSION_REVOKED',
      userId,
      { sessionId, wasCurrentSession, reason: 'User initiated' },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return RevokeSessionResponseDto.success(sessionId, userId, wasCurrentSession, session.getDeviceId().getValue());
  }

  async revokeAllSessions(
    userId: string,
    dto: RevokeAllSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeAllSessionsResponseDto> {
    if (!dto.confirm) {
      throw new BadRequestException('Confirmation required to revoke all sessions');
    }

    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];

    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    for (const session of sessions) {
      if (dto.excludeCurrentSession && session.getId() === deviceInfo.sessionId) {
        continue;
      }
      
      session.revoke(dto.reason || 'User revoked all sessions');
      await this.sessionRepository.save(session);
      sessionsRevoked++;
      revokedSessionIds.push(session.getId());
    }
    
    // Invalidate cache
    await this.invalidateSessionCache(userId);

    // Publish event
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        undefined,
        LogoutReason.USER_INITIATED,
        LogoutSource.USER,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.deviceId,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        undefined,
        `Revoked all sessions (${sessionsRevoked} sessions)`
      )
    );

    await this.auditService.info(
      'ALL_SESSIONS_REVOKED',
      userId,
      { sessionsRevoked, excludedCurrent: dto.excludeCurrentSession, reason: dto.reason },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return RevokeAllSessionsResponseDto.success(
      sessionsRevoked, 
      deviceInfo.sessionId, 
      dto.excludeCurrentSession,
      revokedSessionIds
    );
  }

  async revokeAllExceptCurrent(
    userId: string,
    currentSessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ sessionsRevoked: number; revokedSessionIds: string[] }> {
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];

    for (const session of sessions) {
      if (session.getId() !== currentSessionId) {
        session.revoke('User revoked all other sessions');
        await this.sessionRepository.save(session);
        sessionsRevoked++;
        revokedSessionIds.push(session.getId());
      }
    }
    
    await this.invalidateSessionCache(userId);
    
    await this.auditService.info(
      'OTHER_SESSIONS_REVOKED',
      userId,
      { sessionsRevoked, keptSessionId: currentSessionId },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return { sessionsRevoked, revokedSessionIds };
  }

  async revokeSessionsByDevice(
    userId: string,
    dto: RevokeSessionsByDeviceDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeSessionsByDeviceResponseDto> {
    const sessions = await this.sessionRepository.findByDeviceId(new DeviceId(dto.deviceId));
    let sessionsRevoked = 0;
    let currentSessionExcluded = false;

    for (const session of sessions) {
      if (session.getUserId() !== userId) {
        continue;
      }
      
      if (dto.excludeCurrentSession && session.getId() === deviceInfo.sessionId) {
        currentSessionExcluded = true;
        continue;
      }
      
      session.revoke(dto.reason || 'User revoked sessions from this device');
      await this.sessionRepository.save(session);
      sessionsRevoked++;
    }
    
    await this.invalidateSessionCache(userId);
    
    await this.auditService.info(
      'DEVICE_SESSIONS_REVOKED',
      userId,
      { deviceId: dto.deviceId, sessionsRevoked, excludedCurrent: currentSessionExcluded, reason: dto.reason },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return new RevokeSessionsByDeviceResponseDto(
      true,
      dto.deviceId,
      sessionsRevoked,
      undefined,
      undefined,
      currentSessionExcluded
    );
  }

  async bulkRevokeSessions(
    adminId: string,
    dto: BulkRevokeSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<BulkRevokeSessionsResponseDto> {
    let successfulCount = 0;
    let failedCount = 0;
    const failures: Record<string, string> = {};
    const revokedSessionIds: string[] = [];

    for (const sessionId of dto.sessionIds) {
      try {
        const session = await this.findSessionOrThrow(sessionId);
        session.revoke(dto.reason || 'Admin bulk revocation');
        await this.sessionRepository.save(session);
        successfulCount++;
        revokedSessionIds.push(sessionId);
        await this.invalidateSessionCache(session.getUserId(), sessionId);
      } catch (error) {
        failedCount++;
        failures[sessionId] = (error as Error).message;
      }
    }

    await this.auditService.info(
      'BULK_SESSIONS_REVOKED',
      adminId,
      { 
        requestedCount: dto.sessionIds.length, 
        successfulCount, 
        failedCount, 
        reason: dto.reason,
        userId: dto.userId 
      },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return new BulkRevokeSessionsResponseDto(successfulCount, failedCount, failures, revokedSessionIds);
  }

  // ============================================================
  // Session Validation
  // ============================================================

  async validateSession(sessionId: string): Promise<boolean> {
    // Try cache first
    const cacheKey = CacheKeyBuilder.session(sessionId);
    const cached = await this.cacheService.get<boolean>(cacheKey);
    if (cached !== null) {
      return cached;
    }
    
    const session = await this.sessionRepository.findById(sessionId);
    const isValid = session ? session.isActive() : false;
    
    // Cache result
    await this.cacheService.set(cacheKey, isValid, SESSION_CONFIG.SESSION_CACHE_TTL_SECONDS);
    
    return isValid;
  }

  async validateSessionOwnership(userId: string, sessionId: string): Promise<boolean> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      return false;
    }
    return session.validateOwnership(userId) && session.isActive();
  }

  async isSessionExpired(sessionId: string): Promise<boolean> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      return true;
    }
    return session.isExpired();
  }

  async isSessionIdle(sessionId: string, idleThresholdMinutes?: number): Promise<boolean> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session || !session.isActive()) {
      return true;
    }
    
    const threshold = idleThresholdMinutes || SESSION_CONFIG.DEFAULT_IDLE_TIMEOUT_MINUTES;
    const idleTimeMinutes = session.getIdleTimeMinutes();
    
    return idleTimeMinutes >= threshold;
  }

  // ============================================================
  // Session Management
  // ============================================================

  async extendSession(
    userId: string,
    dto: ExtendSessionDto,
    deviceInfo: DeviceInfo
  ): Promise<SessionResponseDto> {
    const session = await this.findSessionOrThrow(dto.sessionId);
    
    if (!session.validateOwnership(userId)) {
      throw new ForbiddenException('Cannot extend another user\'s session');
    }

    if (dto.minutes <= 0 || dto.minutes > SESSION_CONFIG.EXTENSION_MAX_MINUTES) {
      throw new BadRequestException(
        `Extension minutes must be between 1 and ${SESSION_CONFIG.EXTENSION_MAX_MINUTES}`
      );
    }

    if (!session.canExtend()) {
      throw new BadRequestException('Session cannot be extended (max extensions reached or expired)');
    }

    const newExpiry = session.extend(dto.minutes);
    await this.sessionRepository.save(session);
    
    // Invalidate cache
    await this.invalidateSessionCache(userId, dto.sessionId);
    
    await this.auditService.info(
      'SESSION_EXTENDED',
      userId,
      { sessionId: dto.sessionId, minutesExtended: dto.minutes, newExpiry },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return SessionMapper.toDto(session);
  }

  async sendHeartbeat(
    userId: string,
    dto: SessionHeartbeatDto,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; sessionExtended: boolean; newExpiresAt?: Date }> {
    const session = await this.findSessionOrThrow(dto.sessionId);
    
    if (!session.validateOwnership(userId)) {
      throw new ForbiddenException('Cannot send heartbeat for another user\'s session');
    }
    
    if (!session.isActive()) {
      return { success: false, sessionExtended: false };
    }
    
    // Record activity
    session.recordActivity(dto.currentUrl);
    await this.sessionRepository.save(session);
    
    // Check if session needs extension
    let sessionExtended = false;
    let newExpiresAt: Date | undefined;
    
    const remainingTime = session.getRemainingTimeMinutes();
    if (remainingTime < 30) {  // Extend if less than 30 minutes remaining
      const extended = session.extend(60);  // Extend by 60 minutes
      newExpiresAt = extended;
      sessionExtended = true;
    }
    
    // Invalidate cache
    await this.invalidateSessionCache(userId, dto.sessionId);
    
    return { success: true, sessionExtended, newExpiresAt };
  }

  async recordActivity(
    userId: string,
    sessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<void> {
    const session = await this.findSessionOrThrow(sessionId);
    
    if (!session.validateOwnership(userId)) {
      throw new ForbiddenException('Cannot record activity for another user\'s session');
    }

    session.recordActivity();
    await this.sessionRepository.save(session);
    
    // Invalidate cache
    await this.invalidateSessionCache(userId, sessionId);
    
    await this.eventBus.publish(
      new SessionActivityRecordedEvent(
        sessionId,
        userId,
        session.getDeviceId().getValue(),
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        deviceInfo.correlationId
      )
    );
  }

  async getActiveSessionsCount(userId: string): Promise<number> {
    const cacheKey = CacheKeyBuilder.activeSessionsCount(userId);
    const cached = await this.cacheService.get<number>(cacheKey);
    if (cached !== null) {
      return cached;
    }
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    const count = sessions.length;
    
    await this.cacheService.set(cacheKey, count, SESSION_CONFIG.SESSION_CACHE_TTL_SECONDS);
    
    return count;
  }

  async getSessionStatistics(userId: string): Promise<SessionStatistics> {
    const sessions = await this.sessionRepository.findByUserId(userId);
    
    const totalSessions = sessions.length;
    const activeSessions = sessions.filter(s => s.isActive()).length;
    const expiredSessions = sessions.filter(s => s.isExpired()).length;
    const revokedSessions = sessions.filter(s => s.isRevoked()).length;
    
    const completedSessions = sessions.filter(s => !s.isActive());
    const totalDurationHours = completedSessions.reduce((sum, s) => {
      const duration = s.getAgeMinutes() / 60;
      return sum + duration;
    }, 0);
    const averageSessionDurationHours = completedSessions.length > 0 
      ? totalDurationHours / completedSessions.length 
      : 0;

    const deviceCount = new Map<string, { count: number; type: string }>();
    const networkTypeCount = new Map<string, number>();
    const mobileOperatorCount = new Map<string, number>();
    const districtCount = new Map<string, number>();
    
    for (const session of sessions) {
      const deviceId = session.getDeviceId().getValue();
      const deviceType = session.getUserAgent().getDeviceType();
      deviceCount.set(deviceId, { 
        count: (deviceCount.get(deviceId)?.count || 0) + 1,
        type: deviceType 
      });
      
      const networkType = session.getMetadata().networkType;
      if (networkType) {
        networkTypeCount.set(networkType, (networkTypeCount.get(networkType) || 0) + 1);
      }
      
      const mobileOperator = session.getMetadata().mobileOperator;
      if (mobileOperator) {
        mobileOperatorCount.set(mobileOperator, (mobileOperatorCount.get(mobileOperator) || 0) + 1);
      }
      
      const district = session.getMetadata().district;
      if (district) {
        districtCount.set(district, (districtCount.get(district) || 0) + 1);
      }
    }
    
    let mostUsedDeviceId: string | null = null;
    let maxCount = 0;
    for (const [deviceId, data] of deviceCount) {
      if (data.count > maxCount) {
        maxCount = data.count;
        mostUsedDeviceId = deviceId;
      }
    }
    
    let mostUsedDeviceType: string | null = null;
    const deviceTypeCount = new Map<string, number>();
    for (const [, data] of deviceCount) {
      deviceTypeCount.set(data.type, (deviceTypeCount.get(data.type) || 0) + data.count);
    }
    maxCount = 0;
    for (const [type, count] of deviceTypeCount) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedDeviceType = type;
      }
    }
    
    return {
      totalSessions,
      activeSessions,
      expiredSessions,
      revokedSessions,
      averageSessionDurationHours,
      mostUsedDeviceId,
      mostUsedDeviceType,
      sessionsByNetworkType: Object.fromEntries(networkTypeCount),
      sessionsByMobileOperator: Object.fromEntries(mobileOperatorCount),
      sessionsByDistrict: Array.from(districtCount.entries()).map(([district, count]) => ({ district, count })),
    };
  }

  // ============================================================
  // Admin Operations
  // ============================================================

  async getAllActiveSessions(
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>> {
    const sessions = await this.sessionRepository.findByStatus(SessionStatus.ACTIVE, options);
    
    let filteredSessions = sessions.data;
    
    if (filters) {
      filteredSessions = this.applyFilters(filteredSessions, filters);
    }
    
    return SessionMapper.toPaginatedResponse(
      filteredSessions,
      filteredSessions.length,
      options.page,
      options.limit
    );
  }

  async getSessionsByUser(
    adminId: string,
    targetUserId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>> {
    const sessions = await this.sessionRepository.findByUserIdPaginated(targetUserId, options);
    
    let filteredSessions = sessions.data;
    
    if (filters) {
      filteredSessions = this.applyFilters(filteredSessions, filters);
    }
    
    await this.auditService.info(
      'ADMIN_VIEWED_USER_SESSIONS',
      adminId,
      { targetUserId, sessionCount: filteredSessions.length }
    );
    
    return SessionMapper.toPaginatedResponse(
      filteredSessions,
      filteredSessions.length,
      options.page,
      options.limit
    );
  }

  async getSessionsByDevice(
    adminId: string,
    deviceId: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>> {
    const sessions = await this.sessionRepository.findByDeviceIdPaginated(new DeviceId(deviceId), options);
    
    await this.auditService.info(
      'ADMIN_VIEWED_DEVICE_SESSIONS',
      adminId,
      { deviceId, sessionCount: sessions.total }
    );
    
    return SessionMapper.toPaginatedResponse(
      sessions.data,
      sessions.total,
      sessions.page,
      sessions.limit
    );
  }

  async revokeUserSessions(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<RevokeAllSessionsResponseDto> {
    const sessions = await this.sessionRepository.findActiveSessions(targetUserId);
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];

    for (const session of sessions) {
      session.revoke(reason);
      await this.sessionRepository.save(session);
      sessionsRevoked++;
      revokedSessionIds.push(session.getId());
      await this.invalidateSessionCache(targetUserId, session.getId());
    }

    await this.eventBus.publish(
      new UserLoggedOutEvent(
        targetUserId,
        undefined,
        LogoutReason.REVOKED_BY_ADMIN,
        LogoutSource.ADMIN,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.deviceId,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        adminId,
        reason
      )
    );

    await this.auditService.critical(
      'ADMIN_REVOKED_USER_SESSIONS',
      adminId,
      { targetUserId, sessionsRevoked, reason },
      { ipAddress: deviceInfo.ipAddress, deviceId: deviceInfo.deviceId, userAgent: deviceInfo.userAgent }
    );

    return RevokeAllSessionsResponseDto.success(sessionsRevoked);
  }

  async cleanupStaleSessions(): Promise<SessionCleanupResult> {
    const startTime = Date.now();
    let expiredRevoked = 0;
    let idleRevoked = 0;

    // Clean up expired sessions
    const expiredSessions = await this.sessionRepository.findExpiredSessions({ page: 1, limit: 1000 });
    for (const session of expiredSessions.data) {
      if (!session.isRevoked()) {
        session.expire();
        await this.sessionRepository.save(session);
        expiredRevoked++;
        await this.invalidateSessionCache(session.getUserId(), session.getId());
      }
    }

    // Clean up idle sessions
    const idleSessions = await this.sessionRepository.findIdleSessions(
      SESSION_CONFIG.DEFAULT_IDLE_TIMEOUT_MINUTES,
      { page: 1, limit: 1000 }
    );
    for (const session of idleSessions.data) {
      if (session.isActive()) {
        // Check if mobile device for longer timeout
        const isMobile = session.getUserAgent().isMobile();
        const timeoutMinutes = isMobile 
          ? SESSION_CONFIG.MOBILE_IDLE_TIMEOUT_MINUTES 
          : SESSION_CONFIG.DEFAULT_IDLE_TIMEOUT_MINUTES;
        
        if (session.getIdleTimeMinutes() >= timeoutMinutes) {
          session.expireIdle();
          await this.sessionRepository.save(session);
          idleRevoked++;
          await this.invalidateSessionCache(session.getUserId(), session.getId());
        }
      }
    }

    const durationMs = Date.now() - startTime;

    await this.auditService.info(
      'SESSION_CLEANUP_COMPLETED',
      'system',
      { expiredRevoked, idleRevoked, totalCleaned: expiredRevoked + idleRevoked, durationMs }
    );

    return {
      expiredRevoked,
      idleRevoked,
      totalCleaned: expiredRevoked + idleRevoked,
      durationMs,
    };
  }

  async getGlobalSessionStatistics(adminId: string): Promise<GlobalSessionStatistics> {
    const stats = await this.sessionRepository.getStatistics();
    const activeSessionsByHour = await this.sessionRepository.getActiveSessionsByHour();
    
    return {
      totalActiveSessions: stats.activeSessions,
      totalSessionsLast24h: 0, // Would need separate query
      totalSessionsLast7d: 0,  // Would need separate query
      averageSessionDuration: stats.averageSessionDurationHours,
      medianSessionDuration: stats.medianSessionDurationHours,
      peakConcurrentSessions: stats.peakActiveSessionCount,
      peakConcurrentTime: stats.peakActiveSessionTime,
      topDevices: [], // Would need device aggregation
      sessionsByNetworkType: stats.activeSessionsByNetworkType || {},
      sessionsByMobileOperator: {}, // Would need aggregation
      sessionsByDistrict: stats.activeSessionsByDistrict || [],
      activeSessionsByHour: activeSessionsByHour.map(({ hour, count }) => ({ hour: hour.toString(), count })),
    };
  }

  async getSessionActivityHeatmap(
    adminId: string,
    days: number = 7
  ): Promise<{
    byHour: Array<{ hour: number; count: number }>;
    byDay: Array<{ day: string; count: number }>;
    byDeviceType: Record<string, number>;
    byNetworkType: Record<string, number>;
  }> {
    // This would typically query an analytics service
    // For now, return empty structure
    return {
      byHour: [],
      byDay: [],
      byDeviceType: {},
      byNetworkType: {},
    };
  }

  async getSessionAnomalies(
    adminId: string
  ): Promise<Array<{
    userId: string;
    email: string;
    anomalyType: 'multiple_ips' | 'multiple_devices' | 'unusual_hours' | 'unusual_location';
    description: string;
    detectedAt: Date;
    severity: 'low' | 'medium' | 'high';
  }>> {
    // This would typically run anomaly detection algorithms
    // Return empty array for now
    return [];
  }

  async exportSessionData(
    adminId: string,
    fromDate: Date,
    toDate: Date,
    format: 'json' | 'csv' | 'xlsx'
  ): Promise<{ data: string | Buffer; filename: string; contentType: string }> {
    const sessions = await this.sessionRepository.findByFilters(
      { fromDate, toDate },
      { page: 1, limit: 10000 }
    );
    
    const exportData = sessions.data.map(s => SessionMapper.toExportDto(s));
    
    await this.auditService.info(
      'SESSION_DATA_EXPORTED',
      adminId,
      { fromDate, toDate, format, count: exportData.length }
    );
    
    // Format conversion would be handled by a separate service
    const jsonData = JSON.stringify(exportData, null, 2);
    
    return {
      data: jsonData,
      filename: `sessions_${fromDate.toISOString().split('T')[0]}_${toDate.toISOString().split('T')[0]}.json`,
      contentType: 'application/json',
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async findSessionOrThrow(sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }
    return session;
  }
  
  private async invalidateSessionCache(userId: string, sessionId?: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.activeSessionsCount(userId));
    if (sessionId) {
      await this.cacheService.del(CacheKeyBuilder.session(sessionId));
    }
  }

  private applyFilters(
    sessions: Session[],
    filters: SessionFilterOptions
  ): Session[] {
    let filtered = [...sessions];
    
    if (filters.deviceType) {
      filtered = filtered.filter(s => 
        s.getUserAgent().getDeviceType() === filters.deviceType
      );
    }
    if (filters.networkType) {
      filtered = filtered.filter(s => 
        s.getMetadata().networkType === filters.networkType
      );
    }
    if (filters.mobileOperator) {
      filtered = filtered.filter(s => 
        s.getMetadata().mobileOperator === filters.mobileOperator
      );
    }
    if (filters.district) {
      filtered = filtered.filter(s => 
        s.getMetadata().district === filters.district
      );
    }
    if (filters.status) {
      filtered = filtered.filter(s => 
        s.getStatus() === filters.status
      );
    }
    if (filters.fromDate) {
      filtered = filtered.filter(s => 
        s.getCreatedAt() >= filters.fromDate!
      );
    }
    if (filters.toDate) {
      filtered = filtered.filter(s => 
        s.getCreatedAt() <= filters.toDate!
      );
    }
    
    return filtered;
  }
}
