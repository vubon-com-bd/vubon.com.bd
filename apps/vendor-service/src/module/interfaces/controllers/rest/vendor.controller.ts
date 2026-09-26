import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Post, Put, Query, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { RegisterVendorCommand } from '../../../application/commands/vendor';
import { UpdateVendorCommand } from '../../../application/commands/vendor';
import { DeleteVendorCommand } from '../../../application/commands/vendor';
import { GetVendorQuery } from '../../../application/queries/vendor';
import { ListVendorsQuery } from '../../../application/queries/vendor';
import { GetMyVendorQuery } from '../../../application/queries/vendor';
import {
  RegisterVendorRequestDto,
  UpdateVendorRequestDto,
} from '../../dtos/requests/vendor.request.dto';
import { VendorSwagger } from '../../swagger/vendor.swagger';

@ApiTags('Vendors')
@ApiBearerAuth()
@Controller('vendors')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @VendorSwagger.Register()
  async register(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RegisterVendorRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterVendorCommand(
        user.userId,
        body.businessName,
        body.businessType,
        body.contactPhone,
        body.contactEmail,
        body.addressLine1,
        body.division,
        body.district,
        body.businessRegistration,
        body.businessDescription,
        body.addressLine2,
        body.upazila,
        body.postalCode,
      ),
    );
  }

  @Get()
  @VendorSwagger.List()
  async list(@Query() query: Record<string, string>): Promise<unknown> {
    return this.queryBus.execute(new ListVendorsQuery(1, 20, query));
  }

  @Get('me')
  async getMy(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetMyVendorQuery(user.userId));
  }

  @Get(':id')
  @VendorSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetVendorQuery(id));
  }

  @Put(':id')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateVendorRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateVendorCommand(id, body.name, body.phone, body.email, body.description),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteVendorCommand(id));
  }
}
