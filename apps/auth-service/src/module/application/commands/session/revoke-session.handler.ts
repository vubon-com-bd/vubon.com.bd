/**
 * Revoke Session Command Handler - Application Layer
 * 
 * @module application/commands/session/revoke-session.handler
 * 
 * @description
 * Handles revoking a specific user session.
 * Features:
 * - Ownership validation
 * - Audit logging
 * - Event publishing
 * - Proper error handling
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session revocation
 * ✅ Repository coordination
 * ✅ Security validation
 * ✅ Event publishing
 * ✅ Audit logging
 */

import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';

import { RevokeSessionCommand } from './revoke-session.command';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { UserLoggedOutEvent, LogoutReason, LogoutSource } from '../../events/user-logged-out.event';

import { EventBus, AuditService } from './infrastructure.interface';

// ============================================================
// Revoke Session Response DTO
// ============================================================

export interface RevokeSessionResponseDto {
  success: boolean;
  message: string;
  sessionId: string;
  wasCurrentSession: boolean;
  revokedAt: string;
}

// ============================================================
// Revoke Session Handler
// ============================================================

@Injectable()
export class RevokeSessionHandler {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService
  ) {}
  
  async execute(userId: string, command: RevokeSessionCommand): Promise < RevokeSessionResponseDto > {
    const { sessionId, deviceInfo, correlationId, reason } = command;
    
    // 1. Find session
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }
    
    // 2. Validate ownership
    if (!session.validateOwnership(userId)) {
      await this.auditService.log({
        action: 'REVOKE_SESSION_UNAUTHORIZED',
        userId,
        sessionId,
        sessionOwnerId: session.getUserId(),
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        correlationId,
      });
      throw new UnauthorizedException('Cannot revoke another user\'s session');
    }
    
    // 3. Check if already revoked
    if (session.isRevoked()) {
      return {
        success: true,
        message: 'Session was already revoked',
        sessionId,
        wasCurrentSession: false,
        revokedAt: session.getRevokedAt()?.toISOString() || new Date().toISOString(),
      };
    }
    
    // 4. Check if already expired
    if (session.isExpired()) {
      return {
        success: true,
        message: 'Session was already expired',
        sessionId,
        wasCurrentSession: false,
        revokedAt: session.getExpiresAt().toISOString(),
      };
    }
    
    // 5. Determine if revoking current session
    const wasCurrentSession = deviceInfo?.sessionId === sessionId;
    
    // 6. Revoke the session
    session.revoke(command.getReason());
    await this.sessionRepository.save(session);
    
    // 7. Publish event
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        sessionId,
        wasCurrentSession ? LogoutReason.USER_INITIATED : LogoutReason.USER_INITIATED,
        LogoutSource.USER,
        correlationId,
        undefined,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        undefined,
        command.getReason()
      )
    );
    
    // 8. Audit log
    await this.auditService.log({
      action: 'REVOKE_SESSION',
      userId,
      sessionId,
      wasCurrentSession,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      reason: command.getReason(),
    });
    
    // 9. Return response
    const message = wasCurrentSession ?
      'Successfully logged out from current session' :
      'Session revoked successfully';
    
    return {
      success: true,
      message,
      sessionId,
      wasCurrentSession,
      revokedAt: new Date().toISOString(),
    };
  }
}
