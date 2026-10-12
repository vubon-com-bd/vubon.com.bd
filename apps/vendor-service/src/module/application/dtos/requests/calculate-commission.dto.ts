/**
 * CalculateCommissionRequestDto — preview commission on an order
 * @module vendor-service/application/dtos/requests
 */
export class CalculateCommissionRequestDto {
  vendorId!: string;
  orderAmount!: number;
  currency!: string;
  shippingAmount?: number;
  taxAmount?: number;
}
