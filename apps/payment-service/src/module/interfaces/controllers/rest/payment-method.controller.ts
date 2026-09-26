import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddPaymentMethodCommand } from '../../../application/commands/method/add-payment-method.command';
import { UpdatePaymentMethodCommand } from '../../../application/commands/method/update-payment-method.command';
import { DeletePaymentMethodCommand } from '../../../application/commands/method/delete-payment-method.command';
import { SetDefaultMethodCommand } from '../../../application/commands/method/set-default-method.command';
import { ListMethodsQuery } from '../../../application/queries/method/list-methods.query';
import { GetMethodQuery } from '../../../application/queries/method/get-method.query';
import {
  AddMethodRequestDto,
  UpdateMethodRequestDto,
  SetDefaultMethodRequestDto,
} from '../../dtos/requests/method.request.dto';
import { MethodSwagger } from '../../swagger/method.swagger';

@MethodSwagger.Tag()
@Controller('v1/payment-methods')
@UseGuards(JwtAuthGuard)
export class PaymentMethodController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @MethodSwagger.Add()
  async add(@Body() body: AddMethodRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new AddPaymentMethodCommand(
        '',
        body.method,
        body.gateway,
        body.cardToken,
        body.cardLast4,
        body.cardBrand,
        body.cardExpiry,
        body.walletAddress,
        body.isDefault,
      ),
    );
  }

  @Get()
  @MethodSwagger.List()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListMethodsQuery(''));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetMethodQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateMethodRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePaymentMethodCommand(id, body.cardExpiry, body.cardToken),
    );
  }

  @Post('set-default')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setDefault(@Body() body: SetDefaultMethodRequestDto): Promise<void> {
    await this.commandBus.execute(new SetDefaultMethodCommand(body.methodId));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeletePaymentMethodCommand(id));
  }
}
