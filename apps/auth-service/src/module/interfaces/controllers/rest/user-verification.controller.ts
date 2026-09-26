/**
 * UserVerificationController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Verification')
@Controller('users/verification')
@UseGuards(JwtAuthGuard)
export class UserVerificationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':type/status')
  async status(
    @CurrentUser() user: AuthenticatedUser,
    @Param('type') type: string,
  ) {
    return this.queryBus.execute({
      type: 'GetUserVerificationStatusQuery',
      userId: user.id,
      verificationType: type,
    } as never);
  }
}
