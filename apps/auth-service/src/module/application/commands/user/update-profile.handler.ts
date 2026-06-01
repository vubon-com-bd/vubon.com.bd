/**
 * Update Profile Handler
 * 
 * @module application/commands/user/update-profile.handler
 * 
 * @description
 * Handles user profile updates (non-sensitive fields).
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - profile updates only
 * ✅ Repository coordination
 * ✅ Cache invalidation
 * ✅ Event publishing
 * ✅ Input validation
 */

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateProfileCommand, UpdateProfileResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserCacheRepository } from '../../../infrastructure/persistence/cache/repositories/user.cache.repository';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { UserUpdatedEvent } from '../../events/user-updated.event';

// List of valid IANA timezones (partial - full list would be from config)
const VALID_TIMEZONES = [
  'Asia/Dhaka',
  'Asia/Calcutta',
  'Asia/Kolkata',
  'America/New_York',
  'Europe/London',
  'UTC',
];

const VALID_LANGUAGES = ['en', 'bn'];
const VALID_URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

@Injectable()
@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  private readonly logger = new Logger(UpdateProfileHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCache: UserCacheRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<UpdateProfileResult> {
    const { 
      userId, 
      fullName, 
      phone: phoneRaw, 
      profilePicture, 
      timezone, 
      language, 
      deviceId, 
      ipAddress,
      userAgent,
      correlationId 
    } = command;

    // 1. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // 2. Track changes for event and audit
    const changes: Array<{ field: string; oldValue: any; newValue: any }> = [];

    // 3. Update full name
    if (fullName !== undefined && fullName !== user.getFullName()) {
      if (fullName.length < 2 || fullName.length > 100) {
        throw new BadRequestException('Full name must be between 2 and 100 characters');
      }
      changes.push({
        field: 'fullName',
        oldValue: user.getFullName(),
        newValue: fullName,
      });
      user.updateFullName(fullName);
    }

    // 4. Update phone (with validation)
    let newPhone: Phone | undefined;
    if (phoneRaw !== undefined) {
      try {
        newPhone = phoneRaw ? new Phone(phoneRaw) : undefined;
      } catch (error) {
        throw new BadRequestException('Invalid phone number format');
      }
      
      const currentPhoneValue = user.getPhone()?.getValue();
      if (newPhone?.getValue() !== currentPhoneValue) {
        changes.push({
          field: 'phone',
          oldValue: currentPhoneValue,
          newValue: newPhone?.getValue(),
        });
        user.updatePhone(newPhone);
      }
    }

    // 5. Update profile picture (with URL validation)
    if (profilePicture !== undefined && profilePicture !== user.getProfilePicture()) {
      if (profilePicture && !VALID_URL_REGEX.test(profilePicture)) {
        throw new BadRequestException('Invalid profile picture URL');
      }
      if (profilePicture && !profilePicture.startsWith('https://')) {
        throw new BadRequestException('Profile picture must use HTTPS');
      }
      changes.push({
        field: 'profilePicture',
        oldValue: user.getProfilePicture(),
        newValue: profilePicture,
      });
      user.updateProfilePicture(profilePicture);
    }

    // 6. Update timezone (with validation)
    if (timezone !== undefined && timezone !== user.getTimezone()) {
      if (timezone && !VALID_TIMEZONES.includes(timezone)) {
        throw new BadRequestException(`Invalid timezone. Supported: ${VALID_TIMEZONES.join(', ')}`);
      }
      changes.push({
        field: 'timezone',
        oldValue: user.getTimezone(),
        newValue: timezone,
      });
      user.updateTimezone(timezone);
    }

    // 7. Update language (with validation)
    if (language !== undefined && language !== user.getLanguage()) {
      if (language && !VALID_LANGUAGES.includes(language)) {
        throw new BadRequestException(`Invalid language. Supported: ${VALID_LANGUAGES.join(', ')}`);
      }
      changes.push({
        field: 'language',
        oldValue: user.getLanguage(),
        newValue: language,
      });
      user.updateLanguage(language);
    }

    // 8. Save if any changes
    if (changes.length > 0) {
      await this.userRepository.save(user);

      // 9. Invalidate cache
      await this.userCache.delete(userId);

      // 10. Audit log
      await this.auditService.log({
        action: 'PROFILE_UPDATED',
        userId,
        changes,
        ipAddress,
        deviceId,
        userAgent,
        correlationId,
      });

      // 11. Publish event
      await this.eventBus.publish(
        new UserUpdatedEvent(
          userId,
          changes.map(c => c.field),
          deviceId,
          correlationId,
          { ipAddress, userAgent },
        ),
      );

      this.logger.log(`Profile updated for user ${userId}: ${changes.map(c => c.field).join(', ')}`);
    }

    // 12. Return result
    return {
      id: user.getId(),
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      phone: user.getPhone()?.getValue(),
      role: user.getRole(),
      status: user.getStatus(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isMfaEnabled: user.isMfaEnabled(),
      profilePicture: user.getProfilePicture(),
      timezone: user.getTimezone(),
      language: user.getLanguage(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
