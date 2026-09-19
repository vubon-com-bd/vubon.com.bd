import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthLoginAttemptEntity } from '../entities/auth-login-attempt.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { LoginAttemptIpVO } from '../value-objects/primitives/login-attempt-ip.vo';

export interface AuthLoginAttemptRepository
  extends BaseRepository<AuthLoginAttemptEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly AuthLoginAttemptEntity[]>;
  countRecentByIp(ip: LoginAttemptIpVO, windowMs: number): Promise<number>;
  countRecentByEmail(email: string, windowMs: number): Promise<number>;
}
