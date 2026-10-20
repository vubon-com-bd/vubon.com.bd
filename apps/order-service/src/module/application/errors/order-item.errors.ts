/**
 * Order Item Application Errors
 * @module order-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class OrderItemNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(itemId: string) {
    super('OrderItem', itemId);
    this.name = 'OrderItemNotFoundApplicationError';
  }
}

export class OrderItemAddError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot add item to order ${orderId}: ${reason}`, 'OrderItemAdd');
    this.name = 'OrderItemAddError';
  }
}

export class OrderItemRemoveError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot remove item from order ${orderId}: ${reason}`, 'OrderItemRemove');
    this.name = 'OrderItemRemoveError';
  }
}

export class OrderItemUpdateError extends CommandError {
  constructor(itemId: string, reason: string) {
    super(`Cannot update order item ${itemId}: ${reason}`, 'OrderItemUpdate');
    this.name = 'OrderItemUpdateError';
  }
}
