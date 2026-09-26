import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateShippingCommand } from '../../../application/commands/shipping';
import { SetShippingMethodsCommand } from '../../../application/commands/shipping';
import { GetMyVendorQuery } from '../../../application/queries/vendor';

interface UpdateShippingBody {
  defaultShippingCost: number;
  freeShippingThreshold?: number;
  shipsInternationally?: boolean;
}

interface SetMethodsBody {
  methods: readonly string[];
}

@ApiTags('Vendor Shipping')
@ApiBearerAuth()
@Controller('vendors/shipping')
@UseGuards(JwtAuthGuard)
export class VendorShippingController {
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
    @Body() body: UpdateShippingBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateShippingCommand(
        user.userId,
        body.defaultShippingCost,
        body.freeShippingThreshold,
        body.shipsInternationally,
      ),
    );
  }

  @Patch('methods')
  async setMethods(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SetMethodsBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new SetShippingMethodsCommand(user.userId, body.methods),
    );
  }
}
