/**
 * InvoiceModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { InvoiceModule } from '@modules/invoice/invoice.module';
import { InvoiceController } from '@interfaces/controllers/rest/invoice.controller';
import { INVOICE_COMMAND_HANDLERS } from '@modules/invoice/commands';
import { INVOICE_QUERY_HANDLERS } from '@modules/invoice/queries';

describe('InvoiceModule', () => {
  it('is defined', () => {
    expect(InvoiceModule).toBeDefined();
  });

  it('registers InvoiceController', () => {
    const controllers = Reflect.getMetadata('controllers', InvoiceModule);
    expect(controllers).toContain(InvoiceController);
  });

  it('has 3 command handlers', () => {
    expect(INVOICE_COMMAND_HANDLERS).toHaveLength(3);
  });

  it('has 2 query handlers', () => {
    expect(INVOICE_QUERY_HANDLERS).toHaveLength(2);
  });
});
