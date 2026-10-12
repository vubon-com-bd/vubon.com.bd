/**
 * Can Export Data Specification
 * @module analytics-service/domain/specifications
 *
 * Data export eligibility rules।
 * Business Rule:
 * - Permission required
 * - Row count within limit
 * - Format supported
 * - PII masking applied
 * - Date range reasonable
 */
import { Specification } from '@vubon/shared-kernel/domain/base';

export interface ExportRequest {
  readonly userId: string;
  readonly format: string;
  readonly rowCount: number;
  readonly rangeDays: number;
  readonly hasPermission: boolean;
  readonly containsPii: boolean;
  readonly piiMasked: boolean;
  readonly hasAuditTrail: boolean;
}

export interface ExportLimits {
  readonly maxRowsPerExport: number;
  readonly maxRangeDays: number;
  readonly allowedFormats: readonly string[];
}

const DEFAULT_LIMITS: ExportLimits = {
  maxRowsPerExport: 100000,
  maxRangeDays: 730,
  allowedFormats: ['json', 'csv', 'tsv', 'xlsx'],
};

export class CanExportDataSpecification extends Specification<ExportRequest> {
  constructor(private readonly limits: ExportLimits = DEFAULT_LIMITS) {
    super();
  }

  isSatisfiedBy(request: ExportRequest): boolean {
    // 1. Permission
    if (!request.hasPermission) return false;

    // 2. Row count
    if (request.rowCount <= 0 || request.rowCount > this.limits.maxRowsPerExport) {
      return false;
    }

    // 3. Format
    if (!this.limits.allowedFormats.includes(request.format)) {
      return false;
    }

    // 4. Range
    if (request.rangeDays < 1 || request.rangeDays > this.limits.maxRangeDays) {
      return false;
    }

    // 5. PII masking
    if (request.containsPii && !request.piiMasked) {
      return false;
    }

    // 6. Audit trail required for large exports
    if (request.rowCount > 10000 && !request.hasAuditTrail) {
      return false;
    }

    return true;
  }

  explain(request: ExportRequest): string | null {
    if (!request.hasPermission) return 'User lacks export permission';
    if (request.rowCount <= 0) return 'Row count must be positive';
    if (request.rowCount > this.limits.maxRowsPerExport) {
      return `Row count exceeds limit (${this.limits.maxRowsPerExport})`;
    }
    if (!this.limits.allowedFormats.includes(request.format)) {
      return `Unsupported format: ${request.format}`;
    }
    if (request.rangeDays < 1 || request.rangeDays > this.limits.maxRangeDays) {
      return `Range days must be 1-${this.limits.maxRangeDays}`;
    }
    if (request.containsPii && !request.piiMasked) {
      return 'PII must be masked before export';
    }
    if (request.rowCount > 10000 && !request.hasAuditTrail) {
      return 'Large exports (> 10K rows) require audit trail';
    }
    return null;
  }

  /**
   * Chunked export: check if data needs splitting into multiple files
   */
  needsChunking(rowCount: number): boolean {
    return rowCount > this.limits.maxRowsPerExport;
  }

  /**
   * Compute number of chunks needed
   */
  chunkCount(rowCount: number): number {
    return Math.ceil(rowCount / this.limits.maxRowsPerExport);
  }
}
