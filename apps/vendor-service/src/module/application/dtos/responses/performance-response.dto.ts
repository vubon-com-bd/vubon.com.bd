export class PerformanceResponseDto {
  id!: string;
  vendorId!: string;
  overallScore!: number;
  rating!: number;
  totalOrders!: number;
  completedOrders!: number;
  cancelledOrders!: number;
  avgResponseTimeHours!: number;
  onTimeDeliveryRate!: number;
  completionRate!: number;
  periodStart!: string;
  periodEnd!: string;
}
