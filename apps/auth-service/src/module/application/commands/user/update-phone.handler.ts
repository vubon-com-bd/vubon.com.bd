/**
 * Update Phone Handler
 * 
 * @module application/commands/user/update-phone.handler
 * 
 * @description
 * Handles user phone number update with password verification.
 * 
 * Enterprise Rules:
 * ✅ Current password verification required
 * ✅ OTP sent to new phone for verification
 * ✅ Rate limiting for OTP requests
 * ✅ Phone uniqueness check
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdatePhoneCommand, UpdatePhoneResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { SmsService } from '../../../infrastructure/external/sms/sms.service';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { PhoneChangeRequestedEvent } from '../../events/phone-change-requested.event';

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;
const MAX_OTP_REQUESTS_PER_HOUR = 3;
const MAX_VERIFICATION_ATTEMPTS = 3;

@Injectable()
@CommandHandler(UpdatePhoneCommand)
export class UpdatePhoneHandler implements ICommandHandler < UpdatePhoneCommand > {
  private readonly logger = new Logger(UpdatePhoneHandler.name);
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly smsService: SmsService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
  ) {}
  
  async execute(command: UpdatePhoneCommand): Promise < UpdatePhoneResult > {
    const {
      userId,
      newPhone: newPhoneRaw,
      currentPassword,
      deviceId,
      ipAddress,
      userAgent,
      correlationId
    } = command;
    
    // 1. Rate limiting check for OTP requests
    const requestCount = await this.getOtpRequestCount(userId);
    if (requestCount >= MAX_OTP_REQUESTS_PER_HOUR) {
      throw new BadRequestException(
        `Too many OTP requests. Please try again after 1 hour.`,
      );
    }
    
    // 2. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    
    // 3. Verify current password
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue(),
    );
    
    if (!isValid) {
      await this.auditService.log({
        action: 'PHONE_CHANGE_FAILED',
        userId,
        reason: 'Invalid password',
        ipAddress,
        deviceId,
        correlationId,
      });
      throw new UnauthorizedException('Current password is incorrect');
    }
    
    // 4. Validate new phone format
    let newPhone: Phone;
    try {
      newPhone = new Phone(newPhoneRaw);
    } catch (error) {
      throw new BadRequestException('Invalid phone number format');
    }
    
    // 5. Check if phone is already taken by another user
    const existingUser = await this.userRepository.findByPhone(newPhone);
    if (existingUser && existingUser.getId() !== userId) {
      throw new ConflictException('Phone number is already taken');
    }
    
    // 6. Check if same as current phone
    if (newPhone.getValue() === user.getPhone()?.getValue()) {
      throw new BadRequestException('New phone number is the same as current phone');
    }
    
    // 7. Check if there's a pending change already
    const pendingChange = await this.cacheService.get(`phone_change:${userId}`);
    if (pendingChange) {
      throw new BadRequestException(
        'A phone change is already pending. Please check your phone for OTP.',
      );
    }
    
    // 8. Generate OTP
    const otp = this.generateOtp();
    const currentTime = new Date();
    
    // 9. Store OTP in cache with attempt tracking
    await this.cacheService.set(
      `phone_change:${userId}`,
      {
        newPhone: newPhone.getValue(),
        otp,
        attempts: 0,
        createdAt: currentTime,
        expiresAt: new Date(currentTime.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000),
        deviceId,
        ipAddress,
      },
      OTP_EXPIRY_MINUTES * 60,
    );
    
    // 10. Increment OTP request count
    await this.incrementOtpRequestCount(userId);
    
    // 11. Send OTP via SMS
    await this.smsService.sendOtp(newPhone.getValue(), otp, OTP_EXPIRY_MINUTES);
    
    // 12. Publish event
    await this.eventBus.publish(
      new PhoneChangeRequestedEvent(
        userId,
        user.getPhone()?.getValue(),
        newPhone.getValue(),
        correlationId,
        ipAddress,
        deviceId,
      ),
    );
    
    // 13. Audit log
    await this.auditService.log({
      action: 'PHONE_CHANGE_REQUESTED',
      userId,
      oldPhone: user.getPhone()?.getValue() ? this.maskPhone(user.getPhone() !.getValue()) : 'none',
      newPhone: this.maskPhone(newPhone.getValue()),
      ipAddress,
      deviceId,
      userAgent,
      correlationId,
    });
    
    return {
      success: true,
      message: `Verification code sent to ${this.maskPhone(newPhone.getValue())}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`,
      requiresVerification: true,
      maskedPhone: this.maskPhone(newPhone.getValue()),
    };
  }
  
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  private maskPhone(phone: string): string {
    if (!phone) return 'none';
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
  
  private async getOtpRequestCount(userId: string): Promise < number > {
    const key = `phone_otp_requests:${userId}`;
    const count = await this.cacheService.get(key);
    return count ? parseInt(count, 10) : 0;
  }
  
  private async incrementOtpRequestCount(userId: string): Promise < void > {
    const key = `phone_otp_requests:${userId}`;
    const currentCount = await this.getOtpRequestCount(userId);
    await this.cacheService.set(key, (currentCount + 1).toString(), 60 * 60);
  }
}
