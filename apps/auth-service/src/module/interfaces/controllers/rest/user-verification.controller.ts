import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { VerifyEmailCommand } from '../../../application/commands/auth/verify-email.command';
import { ListUserActivitiesQuery } from '../../../application/queries/user/list-user-activities.query';
import { VerificationSubmitRequestDTO } from '../../dtos/requests/verification.request.dto';

@ApiTags('Verification')
@Controller('users/verification')
@UseGuards(JwtAuthGuard)
export class UserVerificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async status(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListUserActivitiesQuery(user.userId, 5));
  }

  @Post('submit')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submit(@Body() body: VerificationSubmitRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new VerifyEmailCommand(body.userId, body.code),
    );
  }
}
