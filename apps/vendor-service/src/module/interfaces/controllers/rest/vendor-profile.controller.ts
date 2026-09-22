import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateProfileCommand } from '../../../application/commands/vendor';
import { GetMyVendorQuery } from '../../../application/queries/vendor';
import { UpdateProfileRequestDto } from '../../dtos/requests/vendor.request.dto';

@ApiTags('Vendor Profile')
@ApiBearerAuth()
@Controller('vendors/profile')
@UseGuards(JwtAuthGuard)
export class VendorProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetMyVendorQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdateProfileRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateProfileCommand(user.userId, body.displayName, body.bio, body.avatarUrl),
    );
  }
}
