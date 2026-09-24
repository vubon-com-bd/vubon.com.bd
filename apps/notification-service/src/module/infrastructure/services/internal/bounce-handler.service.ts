import { Injectable } from '@nestjs/common';

export interface BounceInfo {
  readonly notificationId: string;
  readonly bounceType: 'hard' | 'soft' | 'complaint';
  readonly reason: string;
}

@Injectable()
export class BounceHandlerService {
  shouldDisableDevice(bounce: BounceInfo): boolean {
    return bounce.bounceType === 'hard' || bounce.bounceType === 'complaint';
  }

  shouldRetry(bounce: BounceInfo): boolean {
    return bounce.bounceType === 'soft';
  }

  shouldUnsubscribe(bounce: BounceInfo): boolean {
    return bounce.bounceType === 'complaint';
  }
}
