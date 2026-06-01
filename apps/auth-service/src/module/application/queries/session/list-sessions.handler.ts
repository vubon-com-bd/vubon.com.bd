/**
 * List Sessions Query Handler - Application Layer
 * 
 * @module application/queries/session/list-sessions.handler
 * 
 * @description
 * Handles retrieving paginated list of user sessions.
 * Features:
 * - Database-level pagination (efficient)
 * - Sorting and filtering
 * - Status filtering
 * - Active sessions only option
 * - Audit logging
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session listing
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ DTO mapping
 * ✅ Audit logging
 */

import { Injectable } from '@nestjs/common';

import { ListSessionsQuery } from './list-sessions.query';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { SessionMapper, BriefSessionResponseDto } from '../../mappers/session.mapper';
import { PaginatedResponseDto } from '../../dtos/common/pagination.dto';

import { AuditService } from './infrastructure.interface';

// ============================================================
// List Sessions Handler
// ============================================================

@Injectable()
export class ListSessionsHandler {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: ListSessionsQuery): Promise < PaginatedResponseDto < BriefSessionResponseDto >> {
    const { userId, page, limit, sortBy, sortOrder, status, activeOnly, correlationId } = query;
    
    // 1. Audit log (for security monitoring)
    await this.auditService.log({
      action: 'LIST_SESSIONS',
      userId,
      page,
      limit,
      sortBy,
      sortOrder,
      status,
      activeOnly,
      correlationId,
    });
    
    // 2. Build pagination options
    const paginationOptions = {
      page,
      limit,
      sortBy: sortBy || 'lastActivityAt',
      sortOrder: sortOrder || 'desc',
    };
    
    // 3. Fetch sessions with pagination
    let sessionsResult;
    
    if (activeOnly) {
      // Get only active sessions
      const sessions = await this.sessionRepository.findActiveSessions(userId);
      const total = sessions.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedItems = sessions.slice(start, end);
      
      sessionsResult = {
        data: paginatedItems,
        total,
        page,
        limit,
      };
    } else if (status) {
      // Filter by status
      sessionsResult = await this.sessionRepository.findByStatus(status, paginationOptions);
    } else {
      // Get all sessions with pagination
      sessionsResult = await this.sessionRepository.findByUserIdPaginated(userId, paginationOptions);
    }
    
    // 4. Map to DTO and return paginated response
    return SessionMapper.toPaginatedResponse(
      sessionsResult.data,
      sessionsResult.total,
      sessionsResult.page,
      sessionsResult.limit
    );
  }
}
