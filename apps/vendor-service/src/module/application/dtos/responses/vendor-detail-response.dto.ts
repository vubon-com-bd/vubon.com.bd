import type { VendorResponseDto } from './vendor-response.dto';

export class VendorDetailResponseDto {
  vendor!: VendorResponseDto;
  businessName!: string | null;
  businessType!: string | null;
  totalProducts!: number;
  totalOrders!: number;
  averageRating!: number;
}
