import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@Controller('affiliates/:id/links')
@UseGuards(JwtAuthGuard)
export class AffiliateLinkController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    void this.queryBus;
    return { affiliateId: id, links: [] };
  }
}
