import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceTokenValidatorService {
  isValidFcmToken(token: string): boolean {
    return token.length > 20 && /^[A-Za-z0-9_\-:]+$/.test(token);
  }

  isValidApnsToken(token: string): boolean {
    return /^[a-f0-9]{64}$/i.test(token);
  }

  isValid(token: string, platform: string): boolean {
    switch (platform) {
      case 'android':
        return this.isValidFcmToken(token);
      case 'ios':
        return this.isValidApnsToken(token);
      default:
        return token.length > 10;
    }
  }
}
