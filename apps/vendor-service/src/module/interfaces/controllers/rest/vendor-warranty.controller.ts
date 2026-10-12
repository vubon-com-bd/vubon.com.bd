/**
 * VendorWarrantyController
 * @module vendor-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { CurrentUser, Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { InitializeWarrantyCommand } from '../../../application/commands/warranty/initialize-warranty.command.js';
import { UpdateWarrantyTypeCommand } from '../../../application/commands/warranty/update-warranty-type.command.js';
import { UpdateWarrantyPeriodCommand } from '../../../application/commands/warranty/update-warranty-period.command.js';
import { AddWarrantyExclusionCommand } from '../../../application/commands/warranty/add-warranty-exclusion.command.js';
import { RemoveWarrantyExclusionCommand } from '../../../application/commands/warranty/remove-warranty-exclusion.command.js';

import { GetVendorWarrantyQuery } from '../../../application/queries/warranty/get-vendor-warranty.query.js';

interface UpdateTypeBody {
  readonly warrantyType: string;
}

interface UpdatePeriodBody {
  readonly days: number;
}

interface ExclusionBody {
  readonly term: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_WARRANTY)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/warranty')
export class VendorWarrantyController extends BaseController {
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
  @ApiOperation({ summary: 'Initialize warranty config' })
  async initialize(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new InitializeWarrantyCommand(vendorId, user.userId));
  }

  @Post('type')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update warranty type' })
  async updateType(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: UpdateTypeBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateWarrantyTypeCommand(vendorId, body.warrantyType, user.userId),
    );
  }

  @Post('period')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update warranty period' })
  async updatePeriod(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: UpdatePeriodBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateWarrantyPeriodCommand(vendorId, body.days, user.userId),
    );
  }

  @Post('exclusions')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Add warranty exclusion' })
  async addExclusion(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ExclusionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddWarrantyExclusionCommand(vendorId, body.term, user.userId),
    );
  }

  @Post('exclusions/remove')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Remove warranty exclusion' })
  async removeExclusion(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ExclusionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RemoveWarrantyExclusionCommand(vendorId, body.term, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get warranty config (public)' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorWarrantyQuery(vendorId));
  }
}
