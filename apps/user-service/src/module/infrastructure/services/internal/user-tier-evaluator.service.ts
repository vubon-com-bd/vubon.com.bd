import { Injectable } from '@nestjs/common';
import { UserTierService, type UserTier } from '../../../domain/services/user-tier.service';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UserTierEvaluatorService {
  evaluate(user: UserEntity): UserTier {
    return UserTierService.calculate(user);
  }
}
