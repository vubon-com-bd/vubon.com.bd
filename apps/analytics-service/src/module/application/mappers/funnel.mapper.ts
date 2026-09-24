import { Injectable } from '@nestjs/common';
import { FunnelEntity } from '../../domain/entities/funnel.entity';
import { FunnelAnalysisVO } from '../../domain/value-objects/composites/funnel-analysis.vo';
import type {
  FunnelResponseDTO,
  FunnelAnalysisResponseDTO,
} from '../dtos/responses';
import {
  toFunnelResponse,
  toFunnelAnalysisResponse,
} from '../dtos/responses';

@Injectable()
export class FunnelMapper {
  toResponse(entity: FunnelEntity): FunnelResponseDTO {
    return toFunnelResponse(entity);
  }

  analysisToResponse(vo: FunnelAnalysisVO): FunnelAnalysisResponseDTO {
    return toFunnelAnalysisResponse(vo);
  }
}
