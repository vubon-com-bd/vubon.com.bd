export interface PaymentSuccessInput {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
}

export function paymentSuccessEmail(input: PaymentSuccessInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: `Payment Successful — Order ${input.orderId}`,
    html: `
      <h2>Payment Successful</h2>
      <p>Your payment for order <strong>${input.orderId}</strong> was successful.</p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      <p>Thank you for your purchase.</p>
    `,
  };
}
