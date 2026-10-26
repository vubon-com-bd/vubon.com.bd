import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTemplatePerformanceQuery } from './get-template-performance.query.js';
import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
} from '@domain/repositories/template.repository.interface.js';

export interface TemplatePerformanceResult {
  readonly templateId: string;
  readonly renders: number;
  readonly sent: number;
  readonly failed: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@QueryHandler(GetTemplatePerformanceQuery)
export class GetTemplatePerformanceHandler
  implements IQueryHandler<GetTemplatePerformanceQuery, TemplatePerformanceResult>
{
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly repo: TemplateRepository,
  ) {}

  async execute(q: GetTemplatePerformanceQuery): Promise<TemplatePerformanceResult> {
    const template = await this.repo.findById(q.templateId);
    return {
      templateId: q.templateId,
      renders: template?.renderedHistory.length ?? 0,
      sent: 0,
      failed: 0,
      fromDate: q.fromDate,
      toDate: q.toDate,
    };
  }
}
