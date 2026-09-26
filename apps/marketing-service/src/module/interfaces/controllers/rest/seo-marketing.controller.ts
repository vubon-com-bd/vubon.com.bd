import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@Controller('seo-marketing')
@UseGuards(JwtAuthGuard)
export class SeoMarketingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  async track(@Body() body: { pageUrl: string; keyword: string }): Promise<unknown> {
    void this.commandBus;
    return body;
  }

  @Get('audit')
  async audit(@Query('pageUrl') pageUrl: string): Promise<{ score: number }> {
    void this.queryBus;
    return { score: 0 };
  }
}
