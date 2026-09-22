export class SubmitReviewRequestDto {
  vendorId!: string;
  userId!: string;
  orderId!: string;
  rating!: number;
  content?: string;
}
