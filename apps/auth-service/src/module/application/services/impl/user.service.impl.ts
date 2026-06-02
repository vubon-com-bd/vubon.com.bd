/**
 * User Service Implementation - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/impl/user.service.impl
 * 
 * @description
 * Orchestrates user management use cases.
 * NO business logic - coordinates domain entities, repositories, and infrastructure.
 * 
 * Enterprise Rules:
 * ✅ Use-case orchestration only
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ DTO mapping
 * ✅ Transaction management
 * ✅ Bangladesh specific - Phone verification, district/upazila support
 */

import { Injectable, NotFoundException, ConflictException, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService, DeviceInfo, UserFilters } from '../interfaces/user.service.interface';
import { 
  UpdateProfileDto, 
  UpdateProfileResponseDto, 
  UpdateEmailDto, 
  UpdateEmailResponseDto, 
  UpdatePhoneDto, 
  UpdatePhoneResponseDto,
  VerifyEmailChangeDto,
  VerifyPhoneChangeDto,
  UserPreferencesDto
} from '../../dtos/user/update-profile.dto';
import { ChangePasswordDto, ChangePasswordResponseDto, ValidateCurrentPasswordResponseDto, PasswordRulesResponseDto } from '../../dtos/user/change-password.dto';
import { DeleteAccountResponseDto } from '../interfaces/user.service.interface';
import { AdminCreateUserDto, AdminCreateUserResponseDto } from '../../dtos/user/create-user.dto';
import { PaginationDto, PaginatedResponseDto } from '../../dtos/common/pagination.dto';
import { UserResponseDto, BriefUserResponseDto, UserProfileResponseDto } from '../../mappers/user.mapper';
import { AuditDto } from '../../dtos/common/audit.dto';

import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';

import { User, UserStatus, UserRole, UserTier } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  USER_CONFIG, 
  PASSWORD_POLICY, 
  USER_STATUS, 
  USER_ROLES, 
  USER_TIERS, 
  AUDIT_ACTIONS,
  ACCOUNT_CONFIG,
  NOTIFICATION_TEMPLATES
} from '@vubon/shared-constants';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { UserTier as SharedUserTier, UserStatus as SharedUserStatus, UserRole as SharedUserRole } from '@vubon/shared-types';

// ✅ Phase-1 (shared-utils) থেকে ইম্পোর্ট
import { maskEmail, maskPhone, isValidDistrict, isValidUpazila } from '@vubon/shared-utils';

// Events
import { UserRegisteredEvent } from '../../events/user-registered.event';
import { PasswordChangedEvent } from '../../events/password-changed.event';
import { EmailVerifiedEvent } from '../../events/email-verified.event';
import { PhoneVerifiedEvent } from '../../events/phone-verified.event';
import { UserAccountDeletedEvent } from '../../events/user-account-deleted.event';
import { UserProfileUpdatedEvent } from '../../events/user-profile-updated.event';
import { UserRoleChangedEvent } from '../../events/user-role-changed.event';

// Mappers
import { UserMapper } from '../../mappers/user.mapper';

// Infrastructure interfaces
import { PasswordHasher } from '../interfaces/password-hasher.interface';
import { EventBus } from '../interfaces/event-bus.interface';
import { TokenGenerator } from '../interfaces/token-generator.interface';
import { OtpService } from '../interfaces/otp.service.interface';

// ============================================================
// Session Service Interface (for dependency)
// ============================================================

export interface SessionService {
  revokeAllExceptCurrent(userId: string, currentSessionId: string, reason: string): Promise<{ sessionsRevoked: number; revokedSessionIds: string[] }>;
  revokeAllSessions(userId: string, reason: string): Promise<number>;
}

export interface NotificationService {
  sendPasswordChangedNotification(userId: string, email: string, deviceInfo?: DeviceInfo): Promise<void>;
  sendEmailChangeNotification(userId: string, email: string, newEmail: string): Promise<void>;
  sendPhoneChangeNotification(userId: string, email: string, newPhone: string): Promise<void>;
  sendAccountDeletedNotification(userId: string, email: string): Promise<void>;
  sendWelcomeEmail(userId: string, email: string, name: string): Promise<void>;
}

export interface AuditService {
  logUserAction(userId: string, action: string, details: Record<string, unknown>, deviceInfo: DeviceInfo): Promise<void>;
}

export interface TransactionManager {
  runInTransaction<R>(callback: () => Promise<R>): Promise<R>;
}

// ============================================================
// User Service Implementation
// ============================================================

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly auditRepository: AuditRepository,
    private readonly sessionService: SessionService,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly tokenGenerator: TokenGenerator,
    private readonly otpService: OtpService,
    private readonly transactionManager: TransactionManager
  ) {}

  // ============================================================
  // Profile Operations
  // ============================================================

  async getProfile(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.findUserOrThrow(userId);
    return UserMapper.toProfileDto(user);
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateProfileResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // ✅ Validate district if provided
    if (dto.preferredDistrict && !isValidDistrict(dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
    }

    // ✅ Validate upazila if provided
    if (dto.preferredUpazila && !isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila} for district ${dto.preferredDistrict}`);
    }

    // Update fields using domain methods
    if (dto.fullName !== undefined) {
      user.updateFullName(dto.fullName);
    }

    if (dto.displayName !== undefined) {
      user.updateDisplayName(dto.displayName);
    }

    if (dto.profilePicture !== undefined) {
      user.updateAvatar(dto.profilePicture);
    }

    if (dto.timezone !== undefined) {
      user.updateTimezone(dto.timezone);
    }

    if (dto.language !== undefined) {
      user.updatePreferredLanguage(dto.language);
    }

    if (dto.preferredDistrict !== undefined) {
      user.updatePreferredDistrict(dto.preferredDistrict);
    }

    if (dto.preferredUpazila !== undefined) {
      user.updatePreferredUpazila(dto.preferredUpazila);
    }

    if (dto.preferences !== undefined) {
      user.updatePreferences(dto.preferences);
    }

    await this.userRepository.save(user);

    // Publish event
    await this.eventBus.publish(
      new UserProfileUpdatedEvent(
        userId,
        user.getEmail().getValue(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        dto
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PROFILE_UPDATED,
      { updatedFields: Object.keys(dto).filter(k => dto[k as keyof UpdateProfileDto] !== undefined) },
      deviceInfo
    );

    return new UpdateProfileResponseDto(
      user.getId(),
      user.getEmail().getValue(),
      user.getFullName(),
      user.getUpdatedAt(),
      user.getPhone()?.getValue(),
      user.getAvatar(),
      user.getTimezone(),
      user.getPreferredLanguage(),
      user.getDisplayName(),
      user.getPreferredDistrict(),
      user.getPreferredUpazila()
    );
  }

  // ============================================================
  // Email Change Operations
  // ============================================================

  async updateEmail(
    userId: string,
    dto: UpdateEmailDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateEmailResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password
    const isValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.getPasswordHash()
    );

    if (!isValid) {
      await this.auditService.logUserAction(
        userId,
        AUDIT_ACTIONS.EMAIL_CHANGE_FAILED,
        { reason: 'Invalid password' },
        deviceInfo
      );
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check email uniqueness
    const newEmail = new Email(dto.newEmail);
    const isTaken = await this.userRepository.isEmailTaken(newEmail, userId);
    
    if (isTaken) {
      throw new ConflictException('Email is already taken');
    }

    // Generate verification token
    const token = await this.tokenGenerator.generateEmailChangeToken(
      userId,
      dto.newEmail,
      { 
        sessionId: deviceInfo.sessionId,
        deviceId: deviceInfo.deviceId 
      }
    );

    // Send verification email
    await this.notificationService.sendEmailChangeNotification(
      userId,
      user.getEmail().getValue(),
      dto.newEmail
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.EMAIL_CHANGE_INITIATED,
      { newEmail: maskEmail(dto.newEmail) },
      deviceInfo
    );

    return new UpdateEmailResponseDto(
      true,
      maskEmail(dto.newEmail),
      undefined,
      'Email change initiated. Please verify your new email address.'
    );
  }

  async verifyEmailChange(
    userId: string,
    dto: VerifyEmailChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateEmailResponseDto> {
    const user = await this.findUserOrThrow(userId);
    
    // Verify token
    const payload = await this.tokenGenerator.verifyToken(dto.token);
    
    if (!payload || payload.type !== 'email_change' || payload.sub !== userId) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const newEmail = new Email(payload.email);
    
    // Update email in domain
    const oldEmail = user.getEmail().getValue();
    user.updateEmail(newEmail);
    await this.userRepository.save(user);

    // Publish event
    await this.eventBus.publish(
      new EmailVerifiedEvent(
        userId,
        newEmail.getValue(),
        'email_change',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        oldEmail
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.EMAIL_CHANGED,
      { oldEmail: maskEmail(oldEmail), newEmail: maskEmail(newEmail.getValue()) },
      deviceInfo
    );

    return new UpdateEmailResponseDto(
      false,
      maskEmail(newEmail.getValue()),
      undefined,
      'Email updated successfully.'
    );
  }

  // ============================================================
  // Phone Change Operations (Bangladesh specific)
  // ============================================================

  async updatePhone(
    userId: string,
    dto: UpdatePhoneDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdatePhoneResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password
    const isValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.getPasswordHash()
    );

    if (!isValid) {
      await this.auditService.logUserAction(
        userId,
        AUDIT_ACTIONS.PHONE_CHANGE_FAILED,
        { reason: 'Invalid password' },
        deviceInfo
      );
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check phone uniqueness
    const newPhone = new Phone(dto.newPhone);
    const isTaken = await this.userRepository.isPhoneTaken(newPhone, userId);
    
    if (isTaken) {
      throw new ConflictException('Phone number is already taken');
    }

    // Send OTP to new phone
    const otpResult = await this.otpService.generateAndSend(
      newPhone.getE164(),
      'phone_change',
      dto.method || 'sms',
      deviceInfo
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PHONE_CHANGE_INITIATED,
      { newPhone: maskPhone(dto.newPhone), method: dto.method },
      deviceInfo
    );

    return new UpdatePhoneResponseDto(
      true,
      maskPhone(dto.newPhone),
      otpResult.sessionId,
      dto.method,
      'Phone change initiated. Please verify your new phone number.'
    );
  }

  async verifyPhoneChange(
    userId: string,
    dto: VerifyPhoneChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdatePhoneResponseDto> {
    const user = await this.findUserOrThrow(userId);
    
    // Verify OTP
    const isValid = await this.otpService.verify(dto.otp, dto.sessionId, 'phone_change');
    
    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }

    // Get new phone from OTP session
    const newPhoneNumber = await this.otpService.getTarget(dto.sessionId);
    const newPhone = new Phone(newPhoneNumber);
    
    const oldPhone = user.getPhone()?.getValue();
    user.updatePhone(newPhone);
    await this.userRepository.save(user);

    // Publish event
    await this.eventBus.publish(
      new PhoneVerifiedEvent(
        userId,
        newPhone.getE164(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PHONE_CHANGED,
      { oldPhone: oldPhone ? maskPhone(oldPhone) : null, newPhone: maskPhone(newPhoneNumber) },
      deviceInfo
    );

    return new UpdatePhoneResponseDto(
      false,
      maskPhone(newPhoneNumber),
      undefined,
      undefined,
      'Phone number updated successfully.'
    );
  }

  // ============================================================
  // Password Operations
  // ============================================================

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ChangePasswordResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Verify current password (unless skipped for reset flow)
    if (!dto.skipCurrentPasswordValidation) {
      const isValid = await this.passwordHasher.compare(
        dto.currentPassword,
        user.getPasswordHash()
      );

      if (!isValid) {
        await this.auditService.logUserAction(
          userId,
          AUDIT_ACTIONS.PASSWORD_CHANGE_FAILED,
          { reason: 'Invalid current password' },
          deviceInfo
        );
        throw new UnauthorizedException('Current password is incorrect');
      }
    }

    // ✅ Check password history (prevent reuse) - using config constant
    const preventReuseCount = ACCOUNT_CONFIG.PASSWORD_PREVENT_REUSE_COUNT || 5;
    const recentHashes = await this.passwordHistoryRepository.getRecentHashes(userId, preventReuseCount);
    for (const hash of recentHashes) {
      const isReused = await this.passwordHasher.compare(dto.newPassword, hash);
      if (isReused) {
        throw new BadRequestException('Cannot reuse recent passwords');
      }
    }

    // ✅ Validate new password strength
    const strengthResult = await this.passwordHasher.validateStrength(dto.newPassword);
    if (!strengthResult.isValid) {
      throw new BadRequestException(strengthResult.errors.join(', '));
    }

    // Hash new password
    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);

    // Change password in domain
    user.changePassword(hashedPassword);
    
    // Save to password history
    await this.passwordHistoryRepository.add(userId, hashedPassword, {
      changedBy: userId,
      changedByType: 'user',
      ipAddress: deviceInfo.ipAddress,
      userAgent: deviceInfo.userAgent,
      deviceId: deviceInfo.deviceId,
      sessionId: deviceInfo.sessionId
    });

    // Save user with transaction
    let sessionsRevoked = 0;
    
    await this.transactionManager.runInTransaction(async () => {
      await this.userRepository.save(user);
      
      // Revoke other sessions
      if (dto.logoutOtherDevices) {
        const result = await this.sessionService.revokeAllExceptCurrent(
          userId,
          deviceInfo.sessionId || '',
          'Password changed'
        );
        sessionsRevoked = result.sessionsRevoked;
      }
    });

    // Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        userId,
        user.getEmail().getValue(),
        'user_change',
        'user_initiated',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        `Sessions revoked: ${sessionsRevoked}`
      )
    );

    // Send notification
    await this.notificationService.sendPasswordChangedNotification(
      userId,
      user.getEmail().getValue(),
      deviceInfo
    );

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.PASSWORD_CHANGED,
      { sessionsRevoked, method: dto.skipCurrentPasswordValidation ? 'reset' : 'user_change' },
      deviceInfo
    );

    return ChangePasswordResponseDto.success(
      sessionsRevoked,
      false,
      undefined,
      deviceInfo.sessionId
    );
  }

  async validateCurrentPassword(
    userId: string,
    password: string
  ): Promise<ValidateCurrentPasswordResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return new ValidateCurrentPasswordResponseDto(false);
    }

    const isValid = await this.passwordHasher.compare(password, user.getPasswordHash());
    return new ValidateCurrentPasswordResponseDto(isValid);
  }

  async getPasswordRules(): Promise<PasswordRulesResponseDto> {
    return new PasswordRulesResponseDto();
  }

  // ============================================================
  // Account Management
  // ============================================================

  async deleteAccount(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<DeleteAccountResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Soft delete
    user.delete();
    await this.userRepository.save(user);

    // Revoke all sessions
    const sessionsRevoked = await this.sessionService.revokeAllSessions(userId, 'Account deleted');

    // Publish event
    await this.eventBus.publish(
      new UserAccountDeletedEvent(
        userId,
        user.getEmail().getValue(),
        'user_initiated',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent
      )
    );

    // Send notification
    await this.notificationService.sendAccountDeletedNotification(userId, user.getEmail().getValue());

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.ACCOUNT_DELETED,
      { sessionsRevoked },
      deviceInfo
    );

    // ✅ Use config constant for data retention
    const dataRetentionDays = ACCOUNT_CONFIG.DATA_RETENTION_DAYS || 30;
    const reactivationDeadline = new Date(Date.now() + dataRetentionDays * 24 * 60 * 60 * 1000);

    return {
      success: true,
      message: `Account deleted successfully. Your data will be retained for ${dataRetentionDays} days.`,
      userId,
      deletedAt: new Date().toISOString(),
      dataRetentionDays,
      canReactivate: true,
      reactivationDeadline: reactivationDeadline.toISOString()
    };
  }

  async restoreAccount(userId: string, deviceInfo: DeviceInfo): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.getStatus() !== UserStatus.DELETED) {
      throw new NotFoundException('Deleted user not found');
    }

    user.restore();
    await this.userRepository.save(user);

    // Audit log
    await this.auditService.logUserAction(
      userId,
      AUDIT_ACTIONS.ACCOUNT_RESTORED,
      {},
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  // ============================================================
  // User Query Operations
  // ============================================================

  async getUserById(requesterId: string, targetUserId: string): Promise<UserResponseDto> {
    // Check permission (can view own profile or admin)
    if (requesterId !== targetUserId) {
      const requester = await this.userRepository.findById(requesterId);
      if (!requester || !requester.isAdmin()) {
        throw new ForbiddenException('Cannot view other user profiles');
      }
    }

    const user = await this.findUserOrThrow(targetUserId);
    return UserMapper.toDto(user);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    const emailVo = new Email(email);
    const user = await this.userRepository.findByEmail(emailVo);
    return user ? UserMapper.toDto(user) : null;
  }

  async getUserByPhone(phone: string): Promise<UserResponseDto | null> {
    const phoneVo = new Phone(phone);
    const user = await this.userRepository.findByPhone(phoneVo);
    return user ? UserMapper.toDto(user) : null;
  }

  async listUsers(options: PaginationDto): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findAll(options);
    return UserMapper.toBriefPaginatedResponse(
      result.items,
      result.total,
      result.page,
      result.limit
    );
  }

  async searchUsers(
    filters: UserFilters,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByFilters(filters, options);
    return UserMapper.toBriefPaginatedResponse(
      result.items,
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByRole(
    role: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByRole(role, options);
    return UserMapper.toBriefPaginatedResponse(
      result.items,
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByStatus(
    status: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByStatus(status, options);
    return UserMapper.toBriefPaginatedResponse(
      result.items,
      result.total,
      result.page,
      result.limit
    );
  }

  async getUsersByTier(
    tier: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>> {
    const result = await this.userRepository.findByTier(tier as UserTier, options);
    return UserMapper.toBriefPaginatedResponse(
      result.items,
      result.total,
      result.page,
      result.limit
    );
  }

  // ============================================================
  // Admin User Management
  // ============================================================

  async createUser(
    adminId: string,
    dto: AdminCreateUserDto,
    deviceInfo: DeviceInfo
  ): Promise<AdminCreateUserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can create users');
    }

    // Check if user exists
    const email = new Email(dto.email);
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException('User already exists');
    }

    // Check password match
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Validate password strength
    const strengthResult = await this.passwordHasher.validateStrength(dto.password);
    if (!strengthResult.isValid) {
      throw new BadRequestException(strengthResult.errors.join(', '));
    }

    // Hash password
    const hashedPassword = await this.passwordHasher.hash(dto.password);

    // Create user
    const user = User.create(
      email,
      hashedPassword,
      dto.fullName,
      dto.phone ? new Phone(dto.phone) : undefined,
      { generate: () => uuidv4() }
    );

    // Set display name if provided
    if (dto.displayName) {
      user.updateDisplayName(dto.displayName);
    }

    // Set role if provided and not default
    if (dto.role && dto.role !== 'CUSTOMER') {
      user.changeRole(dto.role, adminId);
    }

    // Set tier if provided
    if (dto.userTier && dto.userTier !== 'BRONZE') {
      user.updateTier(dto.userTier as UserTier);
    }

    // Set preferences
    if (dto.preferredLanguage) {
      user.updatePreferredLanguage(dto.preferredLanguage);
    }
    if (dto.preferredDistrict) {
      // ✅ Validate district
      if (!isValidDistrict(dto.preferredDistrict)) {
        throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
      }
      user.updatePreferredDistrict(dto.preferredDistrict);
    }
    if (dto.preferredUpazila) {
      // ✅ Validate upazila
      if (!isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
        throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila}`);
      }
      user.updatePreferredUpazila(dto.preferredUpazila);
    }
    if (dto.preferences) {
      user.updatePreferences(dto.preferences);
    }

    // Mark as verified if specified
    if (dto.isEmailVerified) {
      user.markEmailVerified();
    }
    if (dto.isPhoneVerified) {
      user.markPhoneVerified();
    }

    await this.userRepository.save(user);

    // Publish event
    await this.eventBus.publish(
      new UserRegisteredEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        'admin_created',
        'admin_portal',
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        dto.isEmailVerified,
        dto.isPhoneVerified,
        undefined,
        user.getRole(),
        user.getTier(),
        { createdBy: adminId }
      )
    );

    // Send welcome email if requested
    if (dto.sendWelcomeEmail) {
      await this.notificationService.sendWelcomeEmail(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName()
      );
    }

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_CREATED,
      { 
        targetUserId: user.getId(),
        email: user.getEmail().getValue(),
        role: user.getRole(),
        isEmailVerified: dto.isEmailVerified,
        isPhoneVerified: dto.isPhoneVerified
      },
      deviceInfo
    );

    return new AdminCreateUserResponseDto(
      user.getId(),
      user.getEmail().getValue(),
      user.getFullName(),
      !dto.isEmailVerified,
      !dto.isPhoneVerified,
      user.getRole(),
      user.getTier(),
      adminId,
      dto.requirePasswordChange,
      dto.isEmailVerified,
      dto.isPhoneVerified,
      dto.businessName,
      user.getCreatedAt(),
      user.getPhone()?.getValue()
    );
  }

  async updateUser(
    adminId: string,
    targetUserId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can update other users');
    }

    const user = await this.findUserOrThrow(targetUserId);

    // ✅ Validate district if provided
    if (dto.preferredDistrict && !isValidDistrict(dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid district: ${dto.preferredDistrict}`);
    }

    // ✅ Validate upazila if provided
    if (dto.preferredUpazila && !isValidUpazila(dto.preferredUpazila, dto.preferredDistrict)) {
      throw new BadRequestException(`Invalid upazila: ${dto.preferredUpazila} for district ${dto.preferredDistrict}`);
    }

    // Update fields using domain methods
    if (dto.fullName !== undefined) {
      user.updateFullName(dto.fullName);
    }
    if (dto.displayName !== undefined) {
      user.updateDisplayName(dto.displayName);
    }
    if (dto.phone !== undefined) {
      user.updatePhone(new Phone(dto.phone));
    }
    if (dto.profilePicture !== undefined) {
      user.updateAvatar(dto.profilePicture);
    }
    if (dto.timezone !== undefined) {
      user.updateTimezone(dto.timezone);
    }
    if (dto.language !== undefined) {
      user.updatePreferredLanguage(dto.language);
    }
    if (dto.preferredDistrict !== undefined) {
      user.updatePreferredDistrict(dto.preferredDistrict);
    }
    if (dto.preferredUpazila !== undefined) {
      user.updatePreferredUpazila(dto.preferredUpazila);
    }

    await this.userRepository.save(user);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_UPDATED,
      { 
        targetUserId,
        updatedFields: Object.keys(dto).filter(k => dto[k as keyof UpdateProfileDto] !== undefined)
      },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async deleteUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<DeleteAccountResponseDto> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can delete users');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    // Hard delete
    await this.userRepository.permanentDelete(targetUserId);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_PERMANENTLY_DELETED,
      { targetUserId, userEmail: user.getEmail().getValue() },
      deviceInfo
    );

    return {
      success: true,
      message: 'User permanently deleted',
      userId: targetUserId,
      deletedAt: new Date().toISOString(),
      dataRetentionDays: 0,
      canReactivate: false
    };
  }

  async activateUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    user.activate();
    await this.userRepository.save(user);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_ACTIVATED,
      { targetUserId },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async deactivateUser(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    user.deactivate();
    await this.userRepository.save(user);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_DEACTIVATED,
      { targetUserId, reason },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async suspendUser(
    adminId: string,
    targetUserId: string,
    reason: string,
    durationDays: number,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrThrow(targetUserId);
    
    user.suspend(reason);
    await this.userRepository.save(user);

    // Revoke all sessions
    await this.sessionService.revokeAllSessions(targetUserId, `Account suspended: ${reason}`);

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_SUSPENDED,
      { targetUserId, reason, durationDays },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  async changeUserRole(
    adminId: string,
    targetUserId: string,
    newRole: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto> {
    // Check super admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isSuperAdmin()) {
      throw new ForbiddenException('Only super admins can change roles');
    }

    const user = await this.findUserOrThrow(targetUserId);
    
    const oldRole = user.getRole();
    user.changeRole(newRole, adminId);
    await this.userRepository.save(user);

    // Publish event
    await this.eventBus.publish(
      new UserRoleChangedEvent(
        targetUserId,
        user.getEmail().getValue(),
        oldRole,
        newRole,
        adminId,
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent
      )
    );

    // Audit log
    await this.auditService.logUserAction(
      adminId,
      AUDIT_ACTIONS.USER_ROLE_CHANGED,
      { targetUserId, oldRole, newRole },
      deviceInfo
    );

    return UserMapper.toDto(user);
  }

  // ============================================================
  // Statistics & Analytics
  // ============================================================

  async getUserStatistics(): Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
    verifiedEmailPercentage: number;
    mfaEnabledPercentage: number;
    byRole: Record<string, number>;
    byStatus: Record<string, number>;
    byTier: Record<string, number>;
  }> {
    const stats = await this.userRepository.getStatistics();
    const totalUsers = stats.totalUsers;
    
    return {
      totalUsers: stats.totalUsers,
      activeUsers: stats.activeUsers,
      newUsersToday: stats.newUsersLast24h,
      newUsersThisWeek: stats.newUsersLast7Days,
      newUsersThisMonth: stats.newUsersLast30Days,
      verifiedEmailPercentage: totalUsers > 0 ? (stats.emailVerifiedUsers / totalUsers) * 100 : 0,
      mfaEnabledPercentage: totalUsers > 0 ? (stats.mfaEnabledUsers / totalUsers) * 100 : 0,
      byRole: stats.byRole,
      byStatus: stats.byStatus,
      byTier: stats.byTier,
    };
  }

  async getRegistrationTrends(days: number): Promise<Array<{ date: string; count: number }>> {
    return this.userRepository.getRegistrationTrends(days);
  }

  async exportUsersForAudit(
    adminId: string,
    filters?: UserFilters
  ): Promise<UserResponseDto[]> {
    // Check admin permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Only admins can export user data');
    }

    const users = await this.userRepository.exportForAudit(filters);
    return users.map(user => UserMapper.toDto(user));
  }

  async getUserAuditLog(
    userId: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<AuditDto>> {
    const logs = await this.auditRepository.findByUserId(userId, options);
    return logs;
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
