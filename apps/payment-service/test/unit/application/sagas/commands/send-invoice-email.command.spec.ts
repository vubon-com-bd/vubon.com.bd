/**
 * SendInvoiceEmailCommand — Unit Tests
 * @module payment-service/test/unit/application/sagas/commands
 *
 * Simple value-holder command — verifies properties + inheritance.
 */
import { describe, it, expect } from '@jest/globals';
import { SendInvoiceEmailCommand } from '@application/sagas/commands/send-invoice-email.command';

describe('SendInvoiceEmailCommand', () => {
  it('should instantiate with invoiceId + recipientEmail', () => {
    const cmd = new SendInvoiceEmailCommand('inv-1', 'user@example.com');
    expect(cmd.invoiceId).toBe('inv-1');
    expect(cmd.recipientEmail).toBe('user@example.com');
    expect(cmd.type).toBe('payment.saga.send_invoice_email');
  });

  it('should accept optional sagaId', () => {
    const cmd = new SendInvoiceEmailCommand('inv-1', 'a@b.com', 'saga-xyz');
    expect(cmd.sagaId).toBe('saga-xyz');
  });

  it('should have issuedAt timestamp', () => {
    const cmd = new SendInvoiceEmailCommand('inv-1', 'a@b.com');
    expect(cmd.issuedAt).toBeInstanceOf(Date);
  });

  it('should extend BaseSagaCommand (has type field)', () => {
    const cmd = new SendInvoiceEmailCommand('inv-1', 'a@b.com');
    expect(typeof cmd.type).toBe('string');
    expect(cmd.type.length).toBeGreaterThan(0);
  });
});
