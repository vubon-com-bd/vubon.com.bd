import { Injectable } from '@nestjs/common';
import type { ReportResponseDTO as AppReportDTO } from '../../application/dtos/responses';
import type { ReportResponseDTO } from '../dtos/responses';

@Injectable()
export class ReportControllerMapper {
  toResponse(appDto: AppReportDTO): ReportResponseDTO {
    return {
      reportId: appDto.reportId,
      type: appDto.type,
      format: appDto.format,
      status: appDto.status,
      frequency: appDto.frequency ?? undefined,
      ownerId: appDto.ownerId,
      generatedAt: appDto.generatedAt ?? undefined,
      nextRunAt: appDto.nextRunAt ?? undefined,
      isReady: appDto.isReady,
      createdAt: appDto.createdAt,
    };
  }

  toResponseList(appDtos: readonly AppReportDTO[]): readonly ReportResponseDTO[] {
    return appDtos.map((dto) => this.toResponse(dto));
  }
}
