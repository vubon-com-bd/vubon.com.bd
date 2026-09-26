/**
 * UserKycController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { SubmitKycCommand } from '../../../application/commands/user/submit-kyc.command';
import { VerifyKycCommand } from '../../../application/commands/user/verify-kyc.command';
import { RejectKycCommand } from '../../../application/commands/user/reject-kyc.command';
import { GetUserKycStatusQuery } from '../../../application/queries/user/get-user-kyc-status.query';
import {
  SubmitKycRequestDTO,
  VerifyKycRequestDTO,
  RejectKycRequestDTO,
} from '../../dtos/requests/kyc.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users KYC')
@Controller('users/kyc')
@UseGuards(JwtAuthGuard)
export class UserKycController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('me')
  async myStatus(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new GetUserKycStatusQuery(user.id as UserId));
  }

  @Post('submit')
  @HttpCode(HttpStatus.OK)
  async submit(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: SubmitKycRequestDTO,
  ) {
    return this.commandBus.execute(
      new SubmitKycCommand(user.id as UserId, body as never),
    );
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() body: VerifyKycRequestDTO) {
    return this.commandBus.execute(new VerifyKycCommand(body));
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  async reject(@Body() body: RejectKycRequestDTO) {
    return this.commandBus.execute(new RejectKycCommand(body));
  }
}
