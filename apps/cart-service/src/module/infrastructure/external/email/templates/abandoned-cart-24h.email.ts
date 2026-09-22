export interface AbandonedCart24hInput {
  readonly userName: string;
  readonly itemCount: number;
  readonly cartUrl: string;
}

export function abandonedCart24hEmail(input: AbandonedCart24hInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: '⏰ Still thinking it over?',
    html: `
      <h2>Hi ${input.userName},</h2>
      <p>Your cart with <strong>${input.itemCount}</strong> item(s) is still saved.</p>
      <p><a href="${input.cartUrl}">Complete Checkout</a></p>
    `,
  };
}
