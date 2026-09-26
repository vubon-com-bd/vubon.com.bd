import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { AddBankAccountCommand } from '../../../application/commands/bank-account';
import { DeleteBankAccountCommand } from '../../../application/commands/bank-account';
import { SetDefaultAccountCommand } from '../../../application/commands/bank-account';
import { GetVendorQuery } from '../../../application/queries/vendor';

interface AddBankAccountBody {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
  branchName?: string;
  routingNumber?: string;
  isDefault?: boolean;
}

@ApiTags('Vendor Bank Accounts')
@ApiBearerAuth()
@Controller('vendors/bank-accounts')
@UseGuards(JwtAuthGuard)
export class VendorBankAccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetVendorQuery(user.userId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: AddBankAccountBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddBankAccountCommand(
        user.userId,
        body.accountNumber,
        body.bankName,
        body.accountHolderName,
        body.branchName,
        body.routingNumber,
        body.isDefault,
      ),
    );
  }

  @Post(':id/default')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setDefault(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    return this.commandBus.execute(new SetDefaultAccountCommand(id, user.userId));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteBankAccountCommand(id));
  }
}
