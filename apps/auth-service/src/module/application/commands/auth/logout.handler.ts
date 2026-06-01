/**
 * Logout Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/logout.handler
 * 
 * @description
 * Handles the logout use case for one or all sessions.
 * Supports:
 * - Single session logout (current or specific)
 * - Logout from all devices
 * - Device-specific logout
 * - Audit logging
 * - Event publishing
 * - Transaction management
 * - Bangladesh specific - Mobile operator and district tracking
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only logout
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Audit logging
 * ✅ Transaction management
 */

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { LogoutCommand, LogoutScope } from './logout.command';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';

import { UserLoggedOutEvent, LogoutReason, LogoutSource } from '../../events/user-logged-out.event';

import { EventBus, AuditService, TransactionManager } from './infrastructure.interface';

// ============================================================
// Types
// ============================================================

/**
 * Logout Response DTO
 */
export interface LogoutResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  sessionsRevoked: number;
  devicesAffected?: number;
  revokedSessionIds?: string[];
  revokedDeviceIds?: string[];
  currentSessionKept?: boolean;
  revokedAt: string;
}

/**
 * Revocation result interface
 */
interface RevocationResult {
  sessionsRevoked: number;
  revokedSessionIds: string[];
  devicesAffected?: number;
  revokedDeviceIds?: string[];
  currentSessionKept?: boolean;
}

// ============================================================
// Logout Handler
// ============================================================

@Injectable()
export class LogoutHandler {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager
  ) {}
  
  async execute(userId: string, command: LogoutCommand): Promise<LogoutResponseDto> {
    const { refreshToken, scope, sessionId, deviceId, reason, keepCurrent, correlationId } = command;
    
    let result: RevocationResult;
    
    await this.transactionManager.runInTransaction(async () => {
      // Determine scope and execute appropriate revocation
      switch (scope) {
        case LogoutScope.ALL:
          result = await this.revokeAllUserSessions(
            userId,
            reason || 'User logged out from all devices',
            keepCurrent ? command.getCurrentSessionId() : undefined,
            correlationId
          );
          break;
          
        case LogoutScope.DEVICE:
          if (!deviceId) {
            throw new Error('Device ID is required for device scope logout');
          }
          result = await this.revokeSessionsByDevice(
            userId,
            deviceId,
            reason || 'User revoked sessions for this device',
            keepCurrent ? command.getCurrentSessionId() : undefined,
            correlationId
          );
          break;
          
        case LogoutScope.EXCEPT_CURRENT:
          result = await this.revokeAllExceptCurrent(
            userId,
            command.getCurrentSessionId(),
            reason || 'User logged out from all other devices',
            correlationId
          );
          break;
          
        case LogoutScope.CURRENT:
        default:
          result = await this.revokeCurrentSession(
            userId,
            refreshToken,
            sessionId,
            reason || 'User logged out',
            correlationId,
            command.getDeviceInfo()
          );
          break;
      }
    });
    
    // Publish event for audit
    await this.publishLogoutEvent(userId, command, result, correlationId);
    
    // Audit log with Bangladesh specific fields
    await this.auditService.log({
      action: 'LOGOUT',
      userId,
      sessionsRevoked: result.sessionsRevoked,
      devicesAffected: result.devicesAffected,
      revokedSessionIds: result.revokedSessionIds,
      revokedDeviceIds: result.revokedDeviceIds,
      ipAddress: command.getDeviceInfo()?.ipAddress,
      deviceId: command.getDeviceInfo()?.deviceId,
      userAgent: command.getDeviceInfo()?.userAgent,
      correlationId,
      reason: command.reason,
      scope: command.scope,
      currentSessionKept: result.currentSessionKept,
      // Bangladesh specific
      district: command.getDeviceInfo()?.district,
      mobileOperator: command.getDeviceInfo()?.mobileOperator,
      networkType: command.getDeviceInfo()?.networkType,
    });
    
    return {
      success: true,
      message: this.getSuccessMessage(result.sessionsRevoked, command.scope),
      messageBn: this.getSuccessMessageBn(result.sessionsRevoked, command.scope),
      sessionsRevoked: result.sessionsRevoked,
      devicesAffected: result.devicesAffected,
      revokedSessionIds: result.revokedSessionIds,
      revokedDeviceIds: result.revokedDeviceIds,
      currentSessionKept: result.currentSessionKept,
      revokedAt: new Date().toISOString(),
    };
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  /**
   * Revoke current session (logout from this device only)
   */
  private async revokeCurrentSession(
    userId: string,
    refreshTokenValue: string | undefined,
    sessionId: string | undefined,
    reason: string,
    correlationId?: string,
    deviceInfo?: any
  ): Promise<RevocationResult> {
    let revokedSessionIds: string[] = [];
    
    // If session ID provided, use it directly
    if (sessionId) {
      const session = await this.sessionRepository.findById(sessionId);
      if (session && session.validateOwnership(userId) && !session.isRevoked()) {
        session.revoke(reason);
        await this.sessionRepository.save(session);
        revokedSessionIds.push(sessionId);
        
        // Revoke associated refresh token
        const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
        if (refreshToken && refreshToken.getUserId() === userId) {
          refreshToken.revoke();
          await this.refreshTokenRepository.save(refreshToken);
        }
      }
      return { sessionsRevoked: revokedSessionIds.length, revokedSessionIds };
    }
    
    // Otherwise use refresh token
    if (!refreshTokenValue) {
      return { sessionsRevoked: 0, revokedSessionIds: [] };
    }
    
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    
    if (!refreshToken || refreshToken.getUserId() !== userId) {
      return { sessionsRevoked: 0, revokedSessionIds: [] };
    }
    
    // Find associated session
    const session = await this.sessionRepository.findByToken(token);
    
    refreshToken.revoke();
    await this.refreshTokenRepository.save(refreshToken);
    
    if (session && session.validateOwnership(userId) && !session.isRevoked()) {
      session.revoke(reason);
      await this.sessionRepository.save(session);
      revokedSessionIds.push(session.getId());
    }
    
    return { sessionsRevoked: revokedSessionIds.length || 1, revokedSessionIds };
  }
  
  /**
   * Revoke specific session by ID
   */
  private async revokeSpecificSession(
    userId: string,
    sessionId: string,
    reason: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    const session = await this.sessionRepository.findById(sessionId);
    
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found`);
    }
    
    if (!session.validateOwnership(userId)) {
      throw new UnauthorizedException('Cannot revoke another user\'s session');
    }
    
    if (session.isRevoked()) {
      return { sessionsRevoked: 0, revokedSessionIds: [] };
    }
    
    session.revoke(reason);
    await this.sessionRepository.save(session);
    
    // Revoke associated refresh token
    const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
    if (refreshToken && refreshToken.getUserId() === userId) {
      refreshToken.revoke();
      await this.refreshTokenRepository.save(refreshToken);
    }
    
    return { sessionsRevoked: 1, revokedSessionIds: [sessionId] };
  }
  
  /**
   * Revoke all sessions for a user
   */
  private async revokeAllUserSessions(
    userId: string,
    reason: string,
    excludeSessionId?: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    for (const session of sessions) {
      if (excludeSessionId && session.getId() === excludeSessionId) {
        continue;
      }
      
      session.revoke(reason);
      await this.sessionRepository.save(session);
      sessionsRevoked++;
      revokedSessionIds.push(session.getId());
      
      const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
      if (refreshToken) {
        refreshToken.revoke();
        await this.refreshTokenRepository.save(refreshToken);
      }
    }
    
    // Revoke any orphaned refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(userId, reason);
    
    return {
      sessionsRevoked,
      revokedSessionIds,
      currentSessionKept: !!excludeSessionId
    };
  }
  
  /**
   * Revoke all sessions except current
   */
  private async revokeAllExceptCurrent(
    userId: string,
    currentSessionId: string | undefined,
    reason: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    if (!currentSessionId) {
      throw new Error('Current session ID is required for "except_current" scope');
    }
    
    return this.revokeAllUserSessions(userId, reason, currentSessionId, correlationId);
  }
  
  /**
   * Revoke sessions by device (Bangladesh specific)
   */
  private async revokeSessionsByDevice(
    userId: string,
    deviceId: string,
    reason: string,
    excludeSessionId?: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];
    const revokedDeviceIds: string[] = [deviceId];
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    for (const session of sessions) {
      const sessionDeviceId = session.getDeviceId()?.getValue();
      if (sessionDeviceId === deviceId) {
        if (excludeSessionId && session.getId() === excludeSessionId) {
          continue;
        }
        
        session.revoke(reason);
        await this.sessionRepository.save(session);
        sessionsRevoked++;
        revokedSessionIds.push(session.getId());
        
        const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
        if (refreshToken) {
          refreshToken.revoke();
          await this.refreshTokenRepository.save(refreshToken);
        }
      }
    }
    
    return {
      sessionsRevoked,
      revokedSessionIds,
      revokedDeviceIds,
      devicesAffected: 1,
      currentSessionKept: !!excludeSessionId
    };
  }
  
  /**
   * Publish logout event for audit and notifications
   */
  private async publishLogoutEvent(
    userId: string,
    command: LogoutCommand,
    result: RevocationResult,
    correlationId?: string
  ): Promise<void> {
    const deviceInfo = command.getDeviceInfo();
    
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        result.revokedSessionIds[0],
        command.scope === LogoutScope.ALL ? LogoutReason.USER_INITIATED_ALL : LogoutReason.USER_INITIATED,
        command.scope === LogoutScope.ALL ? LogoutSource.USER_ALL : LogoutSource.USER,
        correlationId,
        undefined,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        undefined,
        command.reason,
        result.sessionsRevoked,
        result.devicesAffected
      )
    );
  }
  
  /**
   * Get success message in English
   */
  private getSuccessMessage(sessionsRevoked: number, scope: LogoutScope): string {
    switch (scope) {
      case LogoutScope.ALL:
        return `Successfully logged out from ${sessionsRevoked} device${sessionsRevoked !== 1 ? 's' : ''}`;
      case LogoutScope.DEVICE:
        return `Successfully logged out from device`;
      case LogoutScope.EXCEPT_CURRENT:
        return `Successfully logged out from ${sessionsRevoked} other device${sessionsRevoked !== 1 ? 's' : ''}`;
      default:
        return 'Successfully logged out';
    }
  }
  
  /**
   * Get success message in Bengali (Bangladesh specific)
   */
  private getSuccessMessageBn(sessionsRevoked: number, scope: LogoutScope): string {
    switch (scope) {
      case LogoutScope.ALL:
        return `${sessionsRevoked}টি ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`;
      case LogoutScope.DEVICE:
        return `ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`;
      case LogoutScope.EXCEPT_CURRENT:
        return `${sessionsRevoked}টি অন্যান্য ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`;
      default:
        return 'সফলভাবে লগআউট হয়েছে';
    }
  }
}

// ============================================================
// Infrastructure Interfaces (to be implemented)
// ============================================================

/**
 * Event Bus interface (simplified for this handler)
 */
export interface EventBus {
  publish(event: UserLoggedOutEvent): Promise<void>;
}

/**
 * Audit Service interface (simplified for this handler)
 */
export interface AuditService {
  log(entry: {
    action: string;
    userId: string;
    sessionsRevoked: number;
    devicesAffected?: number;
    revokedSessionIds?: string[];
    revokedDeviceIds?: string[];
    ipAddress?: string;
    deviceId?: string;
    userAgent?: string;
    correlationId?: string;
    reason?: string;
    scope?: LogoutScope;
    currentSessionKept?: boolean;
    district?: string;
    mobileOperator?: string;
    networkType?: string;
  }): Promise<void>;
}

/**
 * Transaction Manager interface
 */
export interface TransactionManager {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}
