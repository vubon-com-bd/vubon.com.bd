export interface AbandonedCart48hInput {
  readonly userName: string;
  readonly itemCount: number;
  readonly cartUrl: string;
}

export function abandonedCart48hEmail(input: AbandonedCart48hInput): {
  readonly subject: string;
  readonly html: string;
} {
  return {
    subject: '🚨 Last chance — your cart expires soon',
    html: `
      <h2>Hi ${input.userName},</h2>
      <p>Your cart with <strong>${input.itemCount}</strong> item(s) will expire soon.</p>
      <p><a href="${input.cartUrl}">Checkout Now</a></p>
    `,
  };
}
