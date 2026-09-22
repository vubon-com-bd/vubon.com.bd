import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateBusinessCommand } from '../../../application/commands/vendor';
import { GetMyVendorQuery } from '../../../application/queries/vendor';
import { UpdateBusinessRequestDto } from '../../dtos/requests/vendor.request.dto';

@ApiTags('Vendor Business')
@ApiBearerAuth()
@Controller('vendors/business')
@UseGuards(JwtAuthGuard)
export class VendorBusinessController {
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
    @Body() body: UpdateBusinessRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateBusinessCommand(
        user.userId,
        body.businessName,
        body.businessType,
        body.businessRegistration,
        body.businessDescription,
      ),
    );
  }
}
