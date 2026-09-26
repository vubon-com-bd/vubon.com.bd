export class SubscriptionResponseDto {
  id!: string;
  vendorId!: string;
  plan!: string;
  price!: number;
  currency!: string;
  startedAt!: string;
  expiresAt!: string;
  autoRenew!: boolean;
  cancelledAt!: string | null;
  isActive!: boolean;
}
