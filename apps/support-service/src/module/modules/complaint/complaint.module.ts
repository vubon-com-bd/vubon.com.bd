/**
 * ComplaintModule
 * @module support-service/modules/complaint
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ComplaintService } from '../../application/services/impl/complaint.service';
import { ComplaintMapper } from '../../application/mappers/complaint.mapper';
import { FileComplaintHandler } from '../../application/commands/complaint/file-complaint.handler';
import { ResolveComplaintHandler } from '../../application/commands/complaint/resolve-complaint.handler';
import { EscalateComplaintHandler } from '../../application/commands/complaint/escalate-complaint.handler';
import { GetComplaintHandler } from '../../application/queries/complaint/get-complaint.handler';
import { ListComplaintsHandler } from '../../application/queries/complaint/list-complaints.handler';
import { ComplaintController } from '../../interfaces/controllers/rest/complaint.controller';
import { ComplaintControllerMapper } from '../../interfaces/mappers/complaint.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [ComplaintController],
  providers: [
    ComplaintService,
    ComplaintMapper,
    ComplaintControllerMapper,
    FileComplaintHandler,
    ResolveComplaintHandler,
    EscalateComplaintHandler,
    GetComplaintHandler,
    ListComplaintsHandler,
  ],
  exports: [ComplaintService],
})
export class ComplaintModule {}
