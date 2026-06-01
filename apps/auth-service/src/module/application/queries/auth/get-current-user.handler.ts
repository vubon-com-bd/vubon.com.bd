/**
 * Get Current User Query Handler - Application Layer
 * 
 * @module application/queries/auth/get-current-user.handler
 * 
 * @description
 * Handles retrieving current authenticated user's profile.
 * Features:
 * - Returns complete user profile
 * - Includes session information
 * - Audit logging
 * - Proper error handling
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only user profile retrieval
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ DTO mapping
 * ✅ Audit logging
 */

import { Injectable, NotFoundException } from '@nestjs/common';

import { GetCurrentUserQuery } from './get-current-user.query';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { UserMapper, UserProfileResponseDto } from '../../mappers/user.mapper';

import { AuditService } from './infrastructure.interface';

// ============================================================
// Get Current User Response DTO
// ============================================================

export interface CurrentUserResponseDto extends UserProfileResponseDto {
  currentSession ? : {
    id: string;
    deviceId: string;
    deviceName ? : string;
    ipAddress: string;
    location ? : string;
    lastActivityAt: string;
    expiresAt: string;
    remainingTimeSeconds: number;
  };
}

// ============================================================
// Get Current User Handler
// ============================================================

@Injectable()
export class GetCurrentUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: GetCurrentUserQuery): Promise < CurrentUserResponseDto > {
    const { userId, sessionId, correlationId } = query;
    
    // 1. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    // 2. Map to DTO
    const userProfile = UserMapper.toProfileDto(user);
    
    // 3. Get current session info (if sessionId provided)
    let currentSession: CurrentUserResponseDto['currentSession'] | undefined;
    
    if (sessionId) {
      const session = await this.sessionRepository.findById(sessionId);
      if (session && session.validateOwnership(userId)) {
        currentSession = {
          id: session.getId(),
          deviceId: session.getDeviceId().getValue(),
          deviceName: session.getSessionName(),
          ipAddress: session.getIpAddress().getValue(),
          location: session.getLocation(),
          lastActivityAt: session.getLastActivityAt().toISOString(),
          expiresAt: session.getExpiresAt().toISOString(),
          remainingTimeSeconds: session.getRemainingTimeMs() / 1000,
        };
      }
    }
    
    // 4. Audit log (for compliance - sensitive data access)
    await this.auditService.log({
      action: 'GET_CURRENT_USER',
      userId,
      sessionId,
      correlationId,
      timestamp: new Date(),
    });
    
    // 5. Return combined response
    return {
      ...userProfile,
      currentSession,
    };
  }
}
