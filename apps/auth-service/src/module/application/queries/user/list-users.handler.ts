/**
 * List Users Query Handler - Application Layer
 * 
 * @module application/queries/user/list-users.handler
 * 
 * @description
 * Handles retrieving paginated list of users with filters.
 * Features:
 * - Permission validation (admin-only)
 * - Pagination
 * - Sorting
 * - Search by email, name, phone
 * - Filter by role and status
 * - Audit logging
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only user listing
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ Admin-only access
 * ✅ Audit logging
 */

import { Injectable, ForbiddenException } from '@nestjs/common';

import { ListUsersQuery } from './list-users.query';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';

import { UserMapper, BriefUserResponseDto } from '../../mappers/user.mapper';
import { PaginatedResponseDto } from '../../dtos/common/pagination.dto';

import { AuditService } from './infrastructure.interface';

// ============================================================
// List Users Handler
// ============================================================

@Injectable()
export class ListUsersHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: ListUsersQuery): Promise < PaginatedResponseDto < BriefUserResponseDto >> {
    const { requesterId, requesterRole, page, limit, sortBy, sortOrder, search, role, status, correlationId } = query;
    
    // 1. Permission validation (admin-only)
    if (!query.hasPermission()) {
      await this.auditService.log({
        action: 'LIST_USERS_UNAUTHORIZED',
        requesterId,
        requesterRole,
        correlationId,
      });
      throw new ForbiddenException('Only administrators can list users');
    }
    
    // 2. Audit log for compliance
    await this.auditService.log({
      action: 'LIST_USERS',
      requesterId,
      requesterRole,
      page,
      limit,
      sortBy,
      sortOrder,
      search: query.getSearchTerm(),
      roleFilter: role,
      statusFilter: status,
      correlationId,
    });
    
    // 3. Build filters
    const filters: any = {};
    
    if (query.hasSearch()) {
      filters.search = query.getSearchTerm();
    }
    if (query.hasRoleFilter()) {
      filters.role = role;
    }
    if (query.hasStatusFilter()) {
      filters.status = status;
    }
    
    // 4. Fetch users with pagination and filters
    const usersResult = await this.userRepository.findByFilters(filters, {
      page,
      limit,
      sortBy,
      sortOrder: sortOrder === 'asc' ? 'asc' : 'desc',
    });
    
    // 5. Map to DTO and return paginated response
    return UserMapper.toPaginatedResponse(
      usersResult.data,
      usersResult.total,
      usersResult.page,
      usersResult.limit
    );
  }
}
