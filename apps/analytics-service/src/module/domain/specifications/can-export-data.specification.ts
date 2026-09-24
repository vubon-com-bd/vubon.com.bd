import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface ExportContext {
  readonly rowCount: number;
  readonly requestedByRole: string;
}

export class CanExportDataSpecification extends Specification<ExportContext> {
  constructor(private readonly maxRows = 100_000) {
    super();
  }

  isSatisfiedBy(candidate: ExportContext): boolean {
    if (candidate.rowCount > this.maxRows) return false;
    return ['admin', 'analyst', 'owner'].includes(candidate.requestedByRole);
  }
}
