import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface CreateOrderItemInput {
  readonly productId: string;
  readonly variantId?: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export class CreateOrderCommand extends BaseCommand {
  readonly type = 'order.create';

  constructor(
    public readonly customerId: string,
    public readonly items: readonly CreateOrderItemInput[],
    public readonly channel: string = 'web',
    public readonly source: string = 'direct',
    public readonly vendorId?: string,
    public readonly note?: string,
  ) {
    super();
  }
}
