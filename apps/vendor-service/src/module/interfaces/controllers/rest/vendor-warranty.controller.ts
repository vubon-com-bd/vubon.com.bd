import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdateWarrantyCommand } from '../../../application/commands/warranty';
import { GetMyVendorQuery } from '../../../application/queries/vendor';

interface UpdateWarrantyBody {
  type: string;
  durationDays: number;
  terms?: string;
}

@ApiTags('Vendor Warranty')
@ApiBearerAuth()
@Controller('vendors/warranty')
@UseGuards(JwtAuthGuard)
export class VendorWarrantyController {
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
    @Body() body: UpdateWarrantyBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateWarrantyCommand(user.userId, body.type, body.durationDays, body.terms),
    );
  }
}
