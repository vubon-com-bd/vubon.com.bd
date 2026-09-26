import { Injectable } from '@nestjs/common';
import { ProfileCompletionService } from '../../../domain/services/profile-completion.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity';

@Injectable()
export class ProfileCompletionCalculatorService {
  calculate(user: UserEntity, profile: UserProfileEntity | null): number {
    return ProfileCompletionService.calculate(user, profile);
  }

  isComplete(user: UserEntity, profile: UserProfileEntity | null): boolean {
    return ProfileCompletionService.isComplete(user, profile);
  }
}
