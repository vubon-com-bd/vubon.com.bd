/**
 * VendorSettingsController
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { InitializeVendorSettingsCommand } from '../../../application/commands/settings/initialize-vendor-settings.command.js';
import { SetVacationModeCommand } from '../../../application/commands/settings/set-vacation-mode.command.js';
import { SetAutoAcceptOrdersCommand } from '../../../application/commands/settings/set-auto-accept-orders.command.js';
import { SetAutoPayoutCommand } from '../../../application/commands/settings/set-auto-payout.command.js';
import { UpdateNotificationsCommand } from '../../../application/commands/settings/update-notifications.command.js';
import { UpdateLocaleCommand } from '../../../application/commands/settings/update-locale.command.js';

import { GetVendorSettingsQuery } from '../../../application/queries/settings/get-vendor-settings.query.js';

interface InitializeBody {
  readonly currency: string;
}

interface VacationBody {
  readonly enabled: boolean;
  readonly message?: string;
}

interface ToggleBody {
  readonly enabled: boolean;
}

interface NotificationsBody {
  readonly orderAlerts?: boolean;
  readonly payoutAlerts?: boolean;
  readonly reviewAlerts?: boolean;
  readonly stockAlerts?: boolean;
  readonly emailEnabled?: boolean;
  readonly smsEnabled?: boolean;
  readonly pushEnabled?: boolean;
}

interface LocaleBody {
  readonly timezone: string;
  readonly locale: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_SETTINGS)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/settings')
export class VendorSettingsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('initialize')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Initialize settings' })
  async initialize(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: InitializeBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new InitializeVendorSettingsCommand(vendorId, body.currency, user.userId),
    );
  }

  @Post('vacation')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Toggle vacation mode' })
  async setVacation(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: VacationBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SetVacationModeCommand(vendorId, body.enabled, body.message, user.userId),
    );
  }

  @Patch('auto-accept')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Toggle auto-accept orders' })
  async setAutoAccept(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ToggleBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SetAutoAcceptOrdersCommand(vendorId, body.enabled, user.userId),
    );
  }

  @Patch('auto-payout')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Toggle auto-payout' })
  async setAutoPayout(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ToggleBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SetAutoPayoutCommand(vendorId, body.enabled, user.userId),
    );
  }

  @Patch('notifications')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update notification preferences' })
  async updateNotifications(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: NotificationsBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateNotificationsCommand(vendorId, body, user.userId),
    );
  }

  @Patch('locale')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update timezone & locale' })
  async updateLocale(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: LocaleBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateLocaleCommand(vendorId, body.timezone, body.locale, user.userId),
    );
  }

  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get settings' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorSettingsQuery(vendorId));
  }
}
