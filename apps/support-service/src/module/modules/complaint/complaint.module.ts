import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ComplaintController } from '../../interfaces/controllers/rest/complaint.controller';
import { FileComplaintHandler } from '../../application/commands/complaint/file-complaint.handler';
import { ResolveComplaintHandler } from '../../application/commands/complaint/resolve-complaint.handler';
import { GetComplaintHandler } from '../../application/queries/complaint/get-complaint.handler';
import { ListComplaintsByUserHandler } from '../../application/queries/complaint/list-complaints-by-user.handler';
import { ComplaintService } from '../../application/services/impl/complaint.service';

const HANDLERS = [
  FileComplaintHandler,
  ResolveComplaintHandler,
  GetComplaintHandler,
  ListComplaintsByUserHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ComplaintController],
  providers: [...HANDLERS, ComplaintService],
  exports: [ComplaintService],
})
export class ComplaintModule {}
