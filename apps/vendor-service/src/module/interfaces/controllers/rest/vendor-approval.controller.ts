import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
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
import { ApproveVendorCommand } from '../../../application/commands/approval';
import { RejectVendorCommand } from '../../../application/commands/approval';
import { RequestInfoCommand } from '../../../application/commands/approval';
import { GetApprovalStatusQuery } from '../../../application/queries/approval';

interface RejectBody {
  vendorId: string;
  reason: string;
}

interface RequestInfoBody {
  vendorId: string;
  message: string;
}

@ApiTags('Vendor Approval')
@ApiBearerAuth()
@Controller('vendors/approval')
@UseGuards(JwtAuthGuard)
export class VendorApprovalController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async getStatus(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetApprovalStatusQuery(vendorId));
  }

  @Post(':vendorId/approve')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async approve(
    @Param('vendorId') vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ApproveVendorCommand(vendorId, user.userId),
    );
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async reject(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RejectBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RejectVendorCommand(body.vendorId, user.userId, body.reason),
    );
  }

  @Post('request-info')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async requestInfo(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RequestInfoBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new RequestInfoCommand(body.vendorId, user.userId, body.message),
    );
  }
}
