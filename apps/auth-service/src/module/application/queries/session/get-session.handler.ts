/**
 * Get Session Query Handler - Application Layer
 * 
 * @module application/queries/session/get-session.handler
 * 
 * @description
 * Handles retrieving a specific session by ID.
 * Features:
 * - Ownership validation
 * - Complete session details with computed fields
 * - Audit logging
 * - Proper error handling
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session retrieval
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ DTO mapping
 * ✅ Audit logging
 */

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { GetSessionQuery } from './get-session.query';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { SessionMapper, SessionResponseDto } from '../../mappers/session.mapper';

import { AuditService } from './infrastructure.interface';

// ============================================================
// Get Session Handler
// ============================================================

@Injectable()
export class GetSessionHandler {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: GetSessionQuery): Promise < SessionResponseDto > {
    const { sessionId, userId, correlationId } = query;
    
    // 1. Find session
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }
    
    // 2. Validate ownership (userId from JWT)
    if (!session.validateOwnership(userId)) {
      await this.auditService.log({
        action: 'GET_SESSION_UNAUTHORIZED',
        userId,
        sessionId,
        sessionOwnerId: session.getUserId(),
        correlationId,
      });
      throw new UnauthorizedException('Cannot view another user\'s session');
    }
    
    // 3. Audit log (for security monitoring)
    await this.auditService.log({
      action: 'GET_SESSION',
      userId,
      sessionId,
      correlationId,
    });
    
    // 4. Map to DTO with all computed fields
    return SessionMapper.toDto(session);
  }
}
