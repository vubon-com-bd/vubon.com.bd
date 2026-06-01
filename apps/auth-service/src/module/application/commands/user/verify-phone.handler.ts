/**
 * Verify Phone Handler
 * 
 * @module application/commands/user/verify-phone.handler
 * 
 * @description
 * Handles phone number verification with OTP.
 * 
 * Enterprise Rules:
 * ✅ OTP verification required
 * ✅ Max attempt limits
 * ✅ Phone marked as verified on success
 * ✅ Audit logging
 */

import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VerifyPhoneCommand, VerifyPhoneResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { SmsService } from '../../../infrastructure/external/sms/sms.service';
import { PhoneVerifiedEvent } from '../../events/phone-verified.event';

const MAX_VERIFICATION_ATTEMPTS = 3;
const MAX_GLOBAL_ATTEMPTS_PER_HOUR = 5;

@Injectable()
@CommandHandler(VerifyPhoneCommand)
export class VerifyPhoneHandler implements ICommandHandler < VerifyPhoneCommand > {
  private readonly logger = new Logger(VerifyPhoneHandler.name);
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly smsService: SmsService,
  ) {}
  
  async execute(command: VerifyPhoneCommand): Promise < VerifyPhoneResult > {
    const { userId, otp, deviceId, ipAddress, userAgent, correlationId } = command;
    
    // 1. Global rate limiting check
    const globalAttempts = await this.getGlobalAttemptCount(userId);
    if (globalAttempts >= MAX_GLOBAL_ATTEMPTS_PER_HOUR) {
      throw new BadRequestException('Too many verification attempts. Please try again later.');
    }
    
    // 2. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    
    // 3. Get pending phone change from cache
    const pendingData = await this.cacheService.get < {
      newPhone: string;
      otp: string;
      attempts: number;
      expiresAt: Date;
      createdAt: Date;
    } > (`phone_change:${userId}`);
    
    if (!pendingData) {
      throw new BadRequestException('No pending phone change request found or request expired');
    }
    
    // 4. Check expiry
    if (new Date() > new Date(pendingData.expiresAt)) {
      await this.cacheService.del(`phone_change:${userId}`);
      await this.auditService.log({
        action: 'PHONE_VERIFY_EXPIRED',
        userId,
        ipAddress,
        deviceId,
        correlationId,
      });
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }
    
    // 5. Check if phone is already verified
    const currentPhone = user.getPhone()?.getValue();
    if (user.isPhoneVerified() && currentPhone === pendingData.newPhone) {
      await this.cacheService.del(`phone_change:${userId}`);
      return {
        success: true,
        message: 'Phone already verified',
        phone: currentPhone!,
        verifiedAt: user.getPhoneVerifiedAt() || new Date(),
      };
    }
    
    // 6. Check attempts
    if (pendingData.attempts >= MAX_VERIFICATION_ATTEMPTS) {
      await this.cacheService.del(`phone_change:${userId}`);
      await this.auditService.log({
        action: 'PHONE_VERIFY_MAX_ATTEMPTS',
        userId,
        attempts: pendingData.attempts,
        ipAddress,
        deviceId,
        correlationId,
      });
      throw new UnauthorizedException('Too many failed attempts. Please request a new OTP.');
    }
    
    // 7. Increment global attempt count
    await this.incrementGlobalAttemptCount(userId);
    
    // 8. Verify OTP
    if (pendingData.otp !== otp) {
      // Increment attempts
      pendingData.attempts++;
      await this.cacheService.set(
        `phone_change:${userId}`,
        pendingData,
        Math.ceil((new Date(pendingData.expiresAt).getTime() - Date.now()) / 1000),
      );
      
      await this.auditService.log({
        action: 'PHONE_VERIFY_FAILED',
        userId,
        attemptsRemaining: MAX_VERIFICATION_ATTEMPTS - pendingData.attempts,
        ipAddress,
        deviceId,
        correlationId,
      });
      
      throw new UnauthorizedException(
        `Invalid OTP. ${MAX_VERIFICATION_ATTEMPTS - pendingData.attempts} attempts remaining.`,
      );
    }
    
    // 9. Validate phone format
    let newPhone: Phone;
    try {
      newPhone = new Phone(pendingData.newPhone);
    } catch (error) {
      await this.cacheService.del(`phone_change:${userId}`);
      throw new BadRequestException('Invalid phone number format in pending request');
    }
    
    // 10. Update user phone
    user.updatePhone(newPhone);
    user.markPhoneVerified();
    await this.userRepository.save(user);
    
    // 11. Clear cache
    await this.cacheService.del(`phone_change:${userId}`);
    
    // 12. Send confirmation SMS
    await this.smsService.sendSms(
      newPhone.getValue(),
      `Your phone number has been successfully verified on Vubon.`,
      'notification',
    );
    
    // 13. Publish event
    await this.eventBus.publish(
      new PhoneVerifiedEvent(
        userId,
        newPhone.getValue(),
        correlationId,
        ipAddress,
        deviceId,
        userAgent,
      ),
    );
    
    // 14. Audit log
    await this.auditService.log({
      action: 'PHONE_VERIFIED',
      userId,
      phone: this.maskPhone(newPhone.getValue()),
      ipAddress,
      deviceId,
      userAgent,
      correlationId,
    });
    
    this.logger.log(`Phone verified for user ${userId}: ${this.maskPhone(newPhone.getValue())}`);
    
    return {
      success: true,
      message: 'Phone number verified successfully',
      phone: newPhone.getValue(),
      verifiedAt: new Date(),
    };
  }
  
  private maskPhone(phone: string): string {
    if (!phone) return 'none';
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
  
  private async getGlobalAttemptCount(userId: string): Promise < number > {
    const key = `phone_verify_global:${userId}`;
    const count = await this.cacheService.get(key);
    return count ? parseInt(count, 10) : 0;
  }
  
  private async incrementGlobalAttemptCount(userId: string): Promise < void > {
    const key = `phone_verify_global:${userId}`;
    const currentCount = await this.getGlobalAttemptCount(userId);
    await this.cacheService.set(key, (currentCount + 1).toString(), 60 * 60);
  }
}
