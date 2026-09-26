import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateReturnPolicyCommand } from '../../../application/commands/return-policy';
import { GetMyVendorQuery } from '../../../application/queries/vendor';

interface UpdateReturnPolicyBody {
  type: string;
  returnWindowDays: number;
  conditions?: string;
}

@ApiTags('Vendor Return Policy')
@ApiBearerAuth()
@Controller('vendors/return-policy')
@UseGuards(JwtAuthGuard)
export class VendorReturnPolicyController {
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
    @Body() body: UpdateReturnPolicyBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateReturnPolicyCommand(
        user.userId,
        body.type,
        body.returnWindowDays,
        body.conditions,
      ),
    );
  }
}
