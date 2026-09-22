export class CreateSubscriptionRequestDto {
  vendorId!: string;
  plan!: string;
  autoRenew?: boolean;
}
