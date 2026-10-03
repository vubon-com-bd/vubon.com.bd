/**
 * Order Item Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class OrderItemNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(itemId: string) {
    super('OrderItem', itemId);
    this.name = 'OrderItemNotFoundApplicationError';
  }
}

export class OrderItemCreationError extends CommandError {
  constructor(reason: string) {
    super(`Order item creation failed: ${reason}`, 'OrderItemCreation');
    this.name = 'OrderItemCreationError';
  }
}

export class OrderItemUpdateError extends CommandError {
  constructor(itemId: string, reason: string) {
    super(`Order item update failed: ${reason}`, 'OrderItemUpdate');
    void itemId;
    this.name = 'OrderItemUpdateError';
  }
}

export class OrderItemRemoveError extends CommandError {
  constructor(itemId: string, reason: string) {
    super(`Order item remove failed: ${reason}`, 'OrderItemRemove');
    void itemId;
    this.name = 'OrderItemRemoveError';
  }
}

// re-export ApplicationError ব্যবহার যাতে unused import না হয়
export { ApplicationError as _OrderItemAppError };
void ERROR_CODE;
