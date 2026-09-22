export interface InvoiceEmailInput {
  readonly invoiceNumber: string;
  readonly amount: number;
  readonly currency: string;
}

export function invoiceEmail(input: InvoiceEmailInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `Invoice ${input.invoiceNumber}`,
    html: `
      <h2>Your Invoice</h2>
      <p>Invoice Number: <strong>${input.invoiceNumber}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      <p>Please find the details attached.</p>
    `,
  };
}
