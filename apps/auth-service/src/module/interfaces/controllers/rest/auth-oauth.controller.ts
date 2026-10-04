/**
 * AuthOAuthController — Generic OAuth 2.0 flow
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';

@ApiTags('Auth OAuth')
@Controller('auth/oauth')
export class AuthOAuthController {
  @Public()
  @Get('authorize')
  authorize(@Query('provider') provider: string, @Query('redirectUri') redirectUri: string) {
    return {
      provider,
      redirectUri,
      message: 'OAuth authorize — handled by AuthOAuthService',
    };
  }

  @Public()
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  callback(@Body() body: { provider: string; code: string; state: string }) {
    return body;
  }
}
