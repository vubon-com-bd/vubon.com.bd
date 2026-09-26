/**
 * Auth2FaController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth 2FA')
@Controller('auth/2fa')
@UseGuards(JwtAuthGuard)
export class Auth2FaController {
  @Post('enable')
  @HttpCode(HttpStatus.OK)
  enable(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { method: string },
  ) {
    return { userId: user.id, enabled: true, method: body.method };
  }

  @Delete('disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  disable(@CurrentUser() user: AuthenticatedUser): void {
    void user;
  }

  @Get('status')
  status(@CurrentUser() user: AuthenticatedUser) {
    return { userId: user.id, enabled: false };
  }
}
