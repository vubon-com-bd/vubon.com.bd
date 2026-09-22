import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetPublicProfileQuery } from '../../../application/queries/profile/get-public-profile.query';

@ApiTags('Public Profile')
@Controller('public/users')
export class PublicProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetPublicProfileQuery(id));
  }
}
