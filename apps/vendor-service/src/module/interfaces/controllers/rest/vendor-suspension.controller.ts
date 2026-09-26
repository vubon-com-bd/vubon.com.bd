import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { SuspendVendorCommand } from '../../../application/commands/suspension';
import { ReinstateVendorCommand } from '../../../application/commands/suspension';
import { AppealSuspensionCommand } from '../../../application/commands/suspension';

interface SuspendBody {
  vendorId: string;
  reason: string;
  notes?: string;
}

interface ReinstateBody {
  vendorId: string;
  reason?: string;
}

interface AppealBody {
  vendorId: string;
  appeal: string;
}

@ApiTags('Vendor Suspension')
@ApiBearerAuth()
@Controller('vendors/suspension')
@UseGuards(JwtAuthGuard)
export class VendorSuspensionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('suspend')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async suspend(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SuspendBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SuspendVendorCommand(body.vendorId, user.userId, body.reason, body.notes),
    );
  }

  @Post('reinstate')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async reinstate(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: ReinstateBody,
  ): Promise<void> {
    return this.commandBus.execute(
      new ReinstateVendorCommand(body.vendorId, user.userId, body.reason),
    );
  }

  @Post('appeal')
  @HttpCode(HttpStatus.ACCEPTED)
  async appeal(@Body() body: AppealBody): Promise<void> {
    return this.commandBus.execute(
      new AppealSuspensionCommand(body.vendorId, body.appeal),
    );
  }
}
