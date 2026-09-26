export interface PaymentFailedInput {
  readonly orderId: string;
  readonly reason: string;
}

export function paymentFailedEmail(input: PaymentFailedInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `Payment Failed — Order ${input.orderId}`,
    html: `
      <h2>Payment Failed</h2>
      <p>Your payment for order <strong>${input.orderId}</strong> failed.</p>
      <p>Reason: ${input.reason}</p>
      <p>Please try again or contact support.</p>
    `,
  };
}
