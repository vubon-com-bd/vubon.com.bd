/**
 * Get User Query Handler - Application Layer
 * 
 * @module application/queries/user/get-user.handler
 * 
 * @description
 * Handles retrieving user details by ID with permission-based field filtering.
 * Features:
 * - Permission validation (self vs admin)
 * - Conditional field exposure (sensitive fields only for admin/self)
 * - Audit logging for sensitive data access
 * - Proper error handling
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only user retrieval
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ Permission validation
 * ✅ Audit logging
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';

import { UserMapper, UserResponseDto } from '../../mappers/user.mapper';

import { AuditService } from './infrastructure.interface';

// ============================================================
// User Role Enum
// ============================================================

export enum UserRole {
  USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

// ============================================================
// Get User Handler
// ============================================================

@Injectable()
export class GetUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: GetUserQuery): Promise < UserResponseDto > {
    const { userId: targetUserId, requesterId, requesterRole, includeSensitive, correlationId } = query;
    
    // 1. Find user
    const user = await this.userRepository.findById(targetUserId);
    if (!user) {
      throw new NotFoundException(`User with ID ${targetUserId} not found`);
    }
    
    // 2. Permission validation
    const canViewSensitive = this.canViewSensitiveFields(requesterId, targetUserId, requesterRole);
    const canViewUser = this.canViewUser(requesterId, targetUserId, requesterRole);
    
    if (!canViewUser) {
      await this.auditService.log({
        action: 'GET_USER_UNAUTHORIZED',
        requesterId,
        targetUserId,
        correlationId,
      });
      throw new ForbiddenException('You do not have permission to view this user');
    }
    
    // 3. Audit log for sensitive data access
    if (includeSensitive && canViewSensitive) {
      await this.auditService.log({
        action: 'GET_USER_SENSITIVE_DATA_ACCESSED',
        requesterId,
        targetUserId,
        requesterRole,
        fieldsAccessed: ['phone'],
        correlationId,
      });
    }
    
    // 4. Map to DTO with permission-based field filtering
    const userDto = UserMapper.toDto(user);
    
    // Filter sensitive fields based on permissions
    if (!canViewSensitive) {
      // Remove sensitive fields for unauthorized requesters
      delete(userDto as any).phone;
    }
    
    return userDto;
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private canViewUser(requesterId: string, targetUserId: string, requesterRole: string): boolean {
    // User can view their own profile
    if (requesterId === targetUserId) {
      return true;
    }
    
    // Admin can view any user
    if (requesterRole === UserRole.ADMIN || requesterRole === UserRole.SUPER_ADMIN) {
      return true;
    }
    
    return false;
  }
  
  private canViewSensitiveFields(requesterId: string, targetUserId: string, requesterRole: string): boolean {
    // User can view their own sensitive fields
    if (requesterId === targetUserId) {
      return true;
    }
    
    // Admin can view any user's sensitive fields
    if (requesterRole === UserRole.ADMIN || requesterRole === UserRole.SUPER_ADMIN) {
      return true;
    }
    
    return false;
  }
}
