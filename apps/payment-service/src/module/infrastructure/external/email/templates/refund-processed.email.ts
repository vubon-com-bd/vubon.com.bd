export interface RefundProcessedInput {
  readonly refundId: string;
  readonly amount: number;
  readonly currency: string;
}

export function refundProcessedEmail(input: RefundProcessedInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `Refund Processed — ${input.refundId}`,
    html: `
      <h2>Refund Processed</h2>
      <p>Your refund has been processed successfully.</p>
      <p>Refund ID: <strong>${input.refundId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
    `,
  };
}
