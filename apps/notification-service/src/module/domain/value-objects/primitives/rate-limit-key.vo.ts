import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class RateLimitKeyVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RateLimitKeyVO {
    BaseCodeVO.validateNonEmpty(raw, 'RateLimitKey');
    return new RateLimitKeyVO(raw);
  }

  static forUser(userId: string, channel: string): RateLimitKeyVO {
    return new RateLimitKeyVO(`rl:user:${userId}:${channel}`);
  }

  static forIp(ip: string, action: string): RateLimitKeyVO {
    return new RateLimitKeyVO(`rl:ip:${ip}:${action}`);
  }
}
