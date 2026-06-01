/**
 * Revoke All Sessions Command Handler - Application Layer
 * 
 * @module application/commands/session/revoke-all-sessions.handler
 * 
 * @description
 * Handles revoking all user sessions (logout from all devices).
 * Features:
 * - Confirmation validation
 * - Optional exclusion of current session
 * - Batch processing with transaction
 * - Audit logging
 * - Event publishing
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session revocation
 * ✅ Repository coordination
 * ✅ Security validation
 * ✅ Event publishing
 * ✅ Transaction management
 */

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { RevokeAllSessionsCommand } from './revoke-all-sessions.command';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { UserLoggedOutEvent, LogoutReason, LogoutSource } from '../../events/user-logged-out.event';

import { EventBus, AuditService, TransactionManager } from './infrastructure.interface';

// ============================================================
// Revoke All Sessions Response DTO
// ============================================================

export interface RevokeAllSessionsResponseDto {
  success: boolean;
  message: string;
  sessionsRevoked: number;
  revokedAt: string;
}

// ============================================================
// Revoke All Sessions Handler
// ============================================================

@Injectable()
export class RevokeAllSessionsHandler {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager
  ) {}
  
  async execute(userId: string, command: RevokeAllSessionsCommand): Promise < RevokeAllSessionsResponseDto > {
    // 1. Validate confirmation
    if (!command.isConfirmed()) {
      throw new BadRequestException('Confirmation required to revoke all sessions');
    }
    
    const { deviceInfo, correlationId } = command;
    
    // 2. Get all active sessions for user
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    if (sessions.length === 0) {
      return {
        success: true,
        message: 'No active sessions found',
        sessionsRevoked: 0,
        revokedAt: new Date().toISOString(),
      };
    }
    
    // 3. Prepare batch update
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];
    const currentSessionId = command.getCurrentSessionId();
    
    // 4. Process sessions
    for (const session of sessions) {
      // Skip current session if requested
      if (currentSessionId && session.getId() === currentSessionId) {
        continue;
      }
      
      // Skip if already revoked
      if (session.isRevoked()) {
        continue;
      }
      
      // Revoke the session
      session.revoke(command.getReason());
      revokedSessionIds.push(session.getId());
      sessionsRevoked++;
    }
    
    // 5. Batch save all sessions
    if (sessionsRevoked > 0) {
      await this.transactionManager.runInTransaction(async () => {
        for (const session of sessions) {
          if (revokedSessionIds.includes(session.getId())) {
            await this.sessionRepository.save(session);
          }
        }
      });
    }
    
    // 6. Publish events for each revoked session
    for (const sessionId of revokedSessionIds) {
      await this.eventBus.publish(
        new UserLoggedOutEvent(
          userId,
          sessionId,
          LogoutReason.USER_INITIATED_ALL,
          LogoutSource.USER_ALL,
          correlationId,
          undefined,
          deviceInfo?.deviceId,
          deviceInfo?.ipAddress,
          deviceInfo?.userAgent,
          undefined,
          command.getReason()
        )
      );
    }
    
    // 7. Audit log
    await this.auditService.log({
      action: 'REVOKE_ALL_SESSIONS',
      userId,
      sessionsRevoked,
      revokedSessionIds,
      excludedCurrentSession: !!currentSessionId,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      reason: command.getReason(),
    });
    
    // 8. Return response
    const message = sessionsRevoked === 0 ?
      'No sessions were revoked' :
      `Successfully revoked ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''}`;
    
    return {
      success: true,
      message,
      sessionsRevoked,
      revokedAt: new Date().toISOString(),
    };
  }
}
