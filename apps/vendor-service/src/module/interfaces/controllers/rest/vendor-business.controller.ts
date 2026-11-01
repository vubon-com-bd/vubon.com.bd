/**
 * VendorBusinessController
 * @module vendor-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { UpdateBusinessCommand } from '../../../application/commands/vendor/update-business.command.js';
import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import type { VendorHttpResponseDTO } from '../../dtos/responses/vendor.response.dto.js';

interface UpdateBusinessHttpDTO {
  readonly legalName?: string;
  readonly registrationNumber?: string;
  readonly taxId?: string;
  readonly vatNumber?: string;
  readonly establishedYear?: number;
  readonly employeeCount?: number;
  readonly annualRevenue?: number;
}

@ApiTags('vendor-business')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/business')
@UseGuards(JwtAuthGuard)
export class VendorBusinessController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Patch()
  @ApiOperation({ summary: 'Update business info' })
  async update(
    @Param('vendorId') vendorId: string,
    @Body() dto: UpdateBusinessHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VendorHttpResponseDTO> {
    return this.commandBus.execute(
      new UpdateBusinessCommand({ vendorId, ...dto }, user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get business info' })
  async get(@Param('vendorId') vendorId: string): Promise<VendorHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(vendorId));
  }
}
