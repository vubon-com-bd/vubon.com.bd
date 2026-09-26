import { UserEntity } from '../entities/user.entity';
import { UserKycEntity } from '../entities/user-kyc.entity';

export class KycEligibilityService {
  static canSubmit(user: UserEntity, existingKyc: UserKycEntity | null): boolean {
    if (!user.status.isActive()) return false;
    if (!user.emailVerified) return false;
    if (existingKyc?.status.isVerified()) return false;
    return true;
  }
}
