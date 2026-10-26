/**
 * DeviceTokenValidatorInfraService — validate device tokens
 * @module notification-service/infrastructure/services/internal
 *
 * Validates FCM/APNs/WebPush device tokens before enqueue।
 * Uses domain `DeviceTokenVO` + `DevicePlatformVO` + provider-specific checks।
 */
import { Injectable, Logger } from '@nestjs/common';

import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

export interface ValidateTokenRequest {
  readonly token: string;
  readonly platform: string;
}

export interface ValidateTokenResult {
  readonly valid: boolean;
  readonly platform?: string;
  readonly reason?: string;
  readonly maskedToken: string;
}

const PLATFORM_PATTERNS: Readonly<Record<string, RegExp>> = {
  android: /^[A-Za-z0-9_\-:]+$/, // FCM tokens
  ios: /^[a-fA-F0-9]{64,}$/, // APNs hex tokens
  web: /^[A-Za-z0-9_\-]+$/, // WebPush subscription endpoint fragment
  windows: /^[A-Za-z0-9_\-]+$/,
  macos: /^[a-fA-F0-9]{64,}$/,
};

@Injectable()
export class DeviceTokenValidatorInfraService {
  private readonly logger = new Logger(DeviceTokenValidatorInfraService.name);

  validate(request: ValidateTokenRequest): ValidateTokenResult {
    const maskedToken = this.maskToken(request.token);

    // 1. Domain-level validation
    try {
      DeviceTokenVO.create(request.token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return {
        valid: false,
        maskedToken,
        reason: `invalid-domain-token: ${msg}`,
      };
    }

    // 2. Platform validation
    let platform: DevicePlatformVO;
    try {
      platform = DevicePlatformVO.create(request.platform);
    } catch {
      return {
        valid: false,
        maskedToken,
        reason: `invalid-platform: ${request.platform}`,
      };
    }

    // 3. Platform-specific pattern
    const pattern = PLATFORM_PATTERNS[platform.value];
    if (pattern && !pattern.test(request.token)) {
      return {
        valid: false,
        platform: platform.value,
        maskedToken,
        reason: `token-does-not-match-${platform.value}-pattern`,
      };
    }

    return {
      valid: true,
      platform: platform.value,
      maskedToken,
    };
  }

  private maskToken(token: string): string {
    if (token.length <= 8) return '****';
    return `${token.slice(0, 4)}${'*'.repeat(Math.max(0, token.length - 8))}${token.slice(-4)}`;
  }
}
