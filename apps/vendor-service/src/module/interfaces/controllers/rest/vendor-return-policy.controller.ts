/**
 * VendorReturnPolicyController
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
  Query,
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

import { InitializeReturnPolicyCommand } from '../../../application/commands/return-policy/initialize-return-policy.command.js';
import { UpdateReturnTypeCommand } from '../../../application/commands/return-policy/update-return-type.command.js';
import { UpdateReturnWindowCommand } from '../../../application/commands/return-policy/update-return-window.command.js';
import { AddReturnExclusionCommand } from '../../../application/commands/return-policy/add-return-exclusion.command.js';

import { GetVendorReturnPolicyQuery } from '../../../application/queries/return-policy/get-vendor-return-policy.query.js';
import { CheckReturnEligibilityQuery } from '../../../application/queries/return-policy/check-return-eligibility.query.js';

interface UpdateTypeBody {
  readonly returnType: string;
}

interface UpdateWindowBody {
  readonly days: number;
}

interface ExclusionBody {
  readonly term: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_RETURN_POLICY)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/return-policy')
export class VendorReturnPolicyController extends BaseController {
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
  @ApiOperation({ summary: 'Initialize return policy' })
  async initialize(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new InitializeReturnPolicyCommand(vendorId, user.userId));
  }

  @Post('type')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update return type' })
  async updateType(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: UpdateTypeBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateReturnTypeCommand(vendorId, body.returnType, user.userId),
    );
  }

  @Post('window')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update return window' })
  async updateWindow(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: UpdateWindowBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateReturnWindowCommand(vendorId, body.days, user.userId),
    );
  }

  @Post('exclusions')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Add return exclusion' })
  async addExclusion(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ExclusionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddReturnExclusionCommand(vendorId, body.term, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get return policy (public)' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorReturnPolicyQuery(vendorId));
  }

  @Get('eligibility')
  @Public()
  @ApiOperation({ summary: 'Check return eligibility' })
  async checkEligibility(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Query('deliveredAt') deliveredAt: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new CheckReturnEligibilityQuery(vendorId, deliveredAt));
  }
}
