export class ReviewResponseDto {
  id!: string;
  vendorId!: string;
  userId!: string;
  orderId!: string;
  rating!: number;
  content!: string | null;
  status!: string;
  createdAt!: string;
}
