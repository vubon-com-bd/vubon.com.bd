import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from '../../interfaces/controllers/rest/user.controller';
import { UserControllerMapper } from '../../interfaces/mappers/user.controller.mapper';
import { UserService } from '../../application/services/impl/user.service';
import { CreateUserHandler } from '../../application/commands/user/create-user.handler';
import { UpdateUserHandler } from '../../application/commands/user/update-user.handler';
import { DeleteUserHandler } from '../../application/commands/user/delete-user.handler';
import { ActivateUserHandler } from '../../application/commands/user/activate-user.handler';
import { DeactivateUserHandler } from '../../application/commands/user/deactivate-user.handler';
import { SuspendUserHandler } from '../../application/commands/user/suspend-user.handler';
import { UnsuspendUserHandler } from '../../application/commands/user/unsuspend-user.handler';
import { GetUserHandler } from '../../application/queries/user/get-user.handler';
import { GetUserByEmailHandler } from '../../application/queries/user/get-user-by-email.handler';
import { ListUsersHandler } from '../../application/queries/user/list-users.handler';
import { SearchUsersHandler } from '../../application/queries/user/search-users.handler';
import { UserOnboardingSaga } from '../../application/sagas/user-onboarding.saga';
import { UserVerificationSaga } from '../../application/sagas/user-verification.saga';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { UserCacheRepository } from '../../infrastructure/persistence/cache/repositories/user.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    UserPrismaRepository,
    UserCacheRepository,
    UserService,
    UserControllerMapper,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    ActivateUserHandler,
    DeactivateUserHandler,
    SuspendUserHandler,
    UnsuspendUserHandler,
    GetUserHandler,
    GetUserByEmailHandler,
    ListUsersHandler,
    SearchUsersHandler,
    UserOnboardingSaga,
    UserVerificationSaga,
  ],
  exports: [UserService, UserPrismaRepository, UserCacheRepository],
})
export class UserModule {}
