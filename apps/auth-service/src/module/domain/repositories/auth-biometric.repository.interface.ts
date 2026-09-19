import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthBiometricEntity } from '../entities/auth-biometric.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AuthBiometricRepository
  extends BaseRepository<AuthBiometricEntity, UserIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly AuthBiometricEntity[]>;
}
