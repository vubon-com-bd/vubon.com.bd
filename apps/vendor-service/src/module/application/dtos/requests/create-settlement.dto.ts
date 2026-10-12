/**
 * CreateSettlementRequestDto — build settlement for a period
 * @module vendor-service/application/dtos/requests
 */
export class CreateSettlementRequestDto {
  vendorId!: string;
  periodStart!: string;
  periodEnd!: string;
  grossAmount!: number;
  commissionAmount!: number;
  netAmount!: number;
  currency!: string;
  orderCount!: number;
  orderIds?: readonly string[];
  idempotencyKey?: string;
}
