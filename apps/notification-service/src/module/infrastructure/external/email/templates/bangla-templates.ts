/**
 * Bangla Email Templates — All Bangla notifications
 * @module notification-service/infrastructure/external/email/templates
 */
import { BanglaEmailTemplate } from './bangla-base.template.js';

// ═══════════════════════════════════════════════════════════
// WELCOME EMAIL
// ═══════════════════════════════════════════════════════════
export interface WelcomeEmailInput {
  readonly name: string;
  readonly email: string;
  readonly locale?: 'en' | 'bn';
  readonly dashboardUrl?: string;
}

export function renderWelcomeEmail(input: WelcomeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভুবনে স্বাগতম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ভুবন.কম.বিডি-তে আপনাকে আন্তরিক স্বাগতম! 🎉</p>
        <p>আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখনই শুরু করুন:</p>
        <ul style="padding-left:20px;">
          <li>হাজারো পণ্য ব্রাউজ করুন</li>
          <li>সহজে অর্ডার করুন</li>
          <li>bKash, Nagad, Rocket দিয়ে পেমেন্ট করুন</li>
          <li>সারাদেশে হোম ডেলিভারি</li>
        </ul>
        <p>যেকোনো প্রশ্নে যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
      ctaButton: {
        label: 'শপিং শুরু করুন',
        url: input.dashboardUrl ?? 'https://vubon.com.bd/shop',
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Welcome to Vubon',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Welcome to Vubon.com.bd! 🎉</p>
      <p>Your account has been created successfully. Start exploring:</p>
      <ul style="padding-left:20px;">
        <li>Browse thousands of products</li>
        <li>Easy ordering</li>
        <li>Pay with bKash, Nagad, Rocket</li>
        <li>Home delivery nationwide</li>
      </ul>
    `,
    ctaButton: {
      label: 'Start Shopping',
      url: input.dashboardUrl ?? 'https://vubon.com.bd/shop',
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CONFIRMATION EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderConfirmationEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly total: number;
  readonly currency: string;
  readonly items?: readonly { name: string; quantity: number; price: number }[];
  readonly locale?: 'en' | 'bn';
  readonly trackUrl?: string;
}

export function renderOrderConfirmationEmail(input: OrderConfirmationEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmtAmount = (n: number) => {
    if (isBangla) {
      return `৳${n.toLocaleString('bn-BD')}`;
    }
    return `৳${n.toLocaleString('en-BD')}`;
  };

  const itemsHtml = (input.items ?? [])
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;">${fmtAmount(item.price)}</td>
      </tr>
    `,
    )
    .join('');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `অর্ডার কনফার্ম - ${input.orderId}`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার <strong>#${input.orderId}</strong> সফলভাবে গ্রহণ করা হয়েছে। ✅</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;">
          ${itemsHtml}
          <tr>
            <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:600;">মোট:</td>
            <td style="padding:12px 8px;text-align:right;font-weight:600;color:#10b981;">${fmtAmount(input.total)}</td>
          </tr>
        </table>
        <p>আমরা শীঘ্রই আপনার অর্ডার প্রসেস করা শুরু করব। ট্র্যাকিং আপডেট SMS-এ পাবেন।</p>
      `,
      ctaButton: {
        label: 'অর্ডার ট্র্যাক করুন',
        url: input.trackUrl ?? `https://vubon.com.bd/orders/${input.orderId}`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: `Order Confirmed - ${input.orderId}`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order <strong>#${input.orderId}</strong> has been confirmed. ✅</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;">
        ${itemsHtml}
        <tr>
          <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:600;">Total:</td>
          <td style="padding:12px 8px;text-align:right;font-weight:600;color:#10b981;">${fmtAmount(input.total)}</td>
        </tr>
      </table>
    `,
    ctaButton: {
      label: 'Track Order',
      url: input.trackUrl ?? `https://vubon.com.bd/orders/${input.orderId}`,
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// PAYMENT RECEIPT EMAIL
// ═══════════════════════════════════════════════════════════
export interface PaymentReceiptEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly transactionId: string;
  readonly method?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentReceiptEmail(input: PaymentReceiptEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmtAmount = isBangla
    ? `৳${input.amount.toLocaleString('bn-BD')}`
    : `৳${input.amount.toLocaleString('en-BD')}`;

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট রিসিট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে। ✅</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#f0fdf4;border-radius:8px;">
          <tr><td style="padding:12px;">অর্ডার:</td><td style="padding:12px;text-align:right;font-weight:600;">#${input.orderId}</td></tr>
          <tr><td style="padding:12px;">পরিমাণ:</td><td style="padding:12px;text-align:right;font-weight:600;color:#10b981;font-size:18px;">${fmtAmount}</td></tr>
          <tr><td style="padding:12px;">পেমেন্ট পদ্ধতি:</td><td style="padding:12px;text-align:right;">${input.method ?? 'Mobile Wallet'}</td></tr>
          <tr><td style="padding:12px;">ট্রানজেকশন:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.transactionId}</td></tr>
        </table>
        <p>এই রিসিট সংরক্ষণ করুন। আপনার অর্ডার শীঘ্রই প্রসেস হবে।</p>
      `,
      ctaButton: {
        label: 'অর্ডার দেখুন',
        url: `https://vubon.com.bd/orders/${input.orderId}`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Payment Receipt',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payment has been received successfully. ✅</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#f0fdf4;border-radius:8px;">
        <tr><td style="padding:12px;">Order:</td><td style="padding:12px;text-align:right;font-weight:600;">#${input.orderId}</td></tr>
        <tr><td style="padding:12px;">Amount:</td><td style="padding:12px;text-align:right;font-weight:600;color:#10b981;font-size:18px;">${fmtAmount}</td></tr>
        <tr><td style="padding:12px;">Method:</td><td style="padding:12px;text-align:right;">${input.method ?? 'Mobile Wallet'}</td></tr>
        <tr><td style="padding:12px;">Transaction:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.transactionId}</td></tr>
      </table>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// PASSWORD RESET EMAIL
// ═══════════════════════════════════════════════════════════
export interface PasswordResetEmailInput {
  readonly name?: string;
  readonly resetUrl: string;
  readonly expiresIn?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPasswordResetEmail(input: PasswordResetEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const expiry = input.expiresIn ?? (isBangla ? '৩০ মিনিট' : '30 minutes');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পাসওয়ার্ড রিসেট',
      locale: 'bn',
      greeting: input.name ? `প্রিয় ${input.name},` : 'প্রিয় গ্রাহক,',
      bodyHtml: `
        <p>আপনার পাসওয়ার্ড রিসেট করার জন্য অনুরোধ পেয়েছি।</p>
        <p>নিচের বাটনে ক্লিক করে নতুন পাসওয়ার্ড সেট করুন:</p>
        <p style="color:#ef4444;">⚠️ এই লিংক ${expiry}-এর জন্য বৈধ।</p>
        <p>যদি আপনি এই অনুরোধ না করে থাকেন, দয়া করে এই ইমেইল উপেক্ষা করুন। আপনার পাসওয়ার্ড পরিবর্তন হবে না।</p>
      `,
      ctaButton: {
        label: 'পাসওয়ার্ড রিসেট করুন',
        url: input.resetUrl,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Password Reset',
    locale: 'en',
    greeting: input.name ? `Hi ${input.name},` : 'Hello,',
    bodyHtml: `
      <p>We received a request to reset your password.</p>
      <p>Click the button below to set a new password:</p>
      <p style="color:#ef4444;">⚠️ This link is valid for ${expiry}.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    ctaButton: {
      label: 'Reset Password',
      url: input.resetUrl,
      variant: 'primary',
    },
  });
}

// ═══════════════════════════════════════════════════════════
// MFA CODE EMAIL
// ═══════════════════════════════════════════════════════════
export interface MfaCodeEmailInput {
  readonly name?: string;
  readonly code: string;
  readonly expiresIn?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderMfaCodeEmail(input: MfaCodeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const expiry = input.expiresIn ?? (isBangla ? '৫ মিনিট' : '5 minutes');

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেরিফিকেশন কোড',
      locale: 'bn',
      greeting: input.name ? `প্রিয় ${input.name},` : 'প্রিয় গ্রাহক,',
      bodyHtml: `
        <p>আপনার ওয়ান-টাইম ভেরিফিকেশন কোড:</p>
        <div style="text-align:center;margin:24px 0;">
          <div style="display:inline-block;background:#f1f5f9;border-radius:8px;padding:16px 32px;font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:monospace;">
            ${input.code}
          </div>
        </div>
        <p style="color:#ef4444;text-align:center;">এই কোড ${expiry}-এর জন্য বৈধ।</p>
        <p style="font-size:13px;color:#64748b;">আপনি এই কোড কারও সাথে শেয়ার করবেন না।</p>
      `,
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Verification Code',
    locale: 'en',
    greeting: input.name ? `Hi ${input.name},` : 'Hello,',
    bodyHtml: `
      <p>Your one-time verification code:</p>
      <div style="text-align:center;margin:24px 0;">
        <div style="display:inline-block;background:#f1f5f9;border-radius:8px;padding:16px 32px;font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:monospace;">
          ${input.code}
        </div>
      </div>
      <p style="color:#ef4444;text-align:center;">This code is valid for ${expiry}.</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY NOTIFICATION EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly status: 'shipped' | 'out_for_delivery' | 'delivered' | 'failed';
  readonly trackingNumber?: string;
  readonly estimatedAt?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryEmail(input: DeliveryEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  const statusBn = {
    shipped: 'পাঠানো হয়েছে',
    out_for_delivery: 'ডেলিভারির জন্য পথে',
    delivered: 'ডেলিভারি সম্পন্ন',
    failed: 'ডেলিভারি ব্যর্থ',
  };

  const statusEn = {
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    failed: 'Delivery Failed',
  };

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `ডেলিভারি - ${statusBn[input.status]}`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার <strong>#${input.orderId}</strong>-এর স্ট্যাটাস: <strong style="color:#3b82f6;">${statusBn[input.status]}</strong></p>
        ${input.trackingNumber ? `<p>ট্র্যাকিং নম্বর: <code style="background:#f1f5f9;padding:2px 8px;border-radius:4px;">${input.trackingNumber}</code></p>` : ''}
        ${input.estimatedAt ? `<p>সম্ভাব্য ডেলিভারি: ${input.estimatedAt}</p>` : ''}
        ${input.status === 'delivered' ? '<p>🎉 ধন্যবাদ! আপনার অর্ডার সফলভাবে ডেলিভারি হয়েছে।</p>' : ''}
      `,
      ctaButton: {
        label: 'ট্র্যাক করুন',
        url: `https://vubon.com.bd/orders/${input.orderId}/track`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: `Delivery - ${statusEn[input.status]}`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order <strong>#${input.orderId}</strong> status: <strong>${statusEn[input.status]}</strong></p>
      ${input.trackingNumber ? `<p>Tracking: <code>${input.trackingNumber}</code></p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// PAYMENT FAILED EMAIL
// ═══════════════════════════════════════════════════════════
export interface PaymentFailedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentFailedEmail(input: PaymentFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট ব্যর্থ হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত! আপনার পেমেন্ট সম্পন্ন হয়নি।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p><strong>পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>আবার চেষ্টা করুন অথবা অন্য পেমেন্ট পদ্ধতি বেছে নিন।</p>
      `,
      ctaButton: {
        label: 'আবার পেমেন্ট করুন',
        url: `https://vubon.com.bd/orders/${input.orderId}/retry`,
        variant: 'primary',
      },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Sorry! Your payment did not complete.</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      <p><strong>Amount:</strong> ৳${input.amount.toLocaleString('en-BD')}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
    `,
    ctaButton: { label: 'Retry Payment', url: `https://vubon.com.bd/orders/${input.orderId}/retry`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// REFUND EMAIL
// ═══════════════════════════════════════════════════════════
export interface RefundEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRefundEmail(input: RefundEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিফান্ড সফলভাবে প্রক্রিয়া করা হয়েছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p><strong>রিফান্ড পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>
        <p>আপনার অ্যাকাউন্টে ৩-৭ কর্মদিবসের মধ্যে জমা হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Processed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your refund has been processed successfully. ✅</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      <p><strong>Amount:</strong> ৳${input.amount.toLocaleString('en-BD')}</p>
      <p>It will appear in your account within 3-7 business days.</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// USER SUSPENDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface AccountSuspendedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderAccountSuspendedEmail(input: AccountSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্ট সাময়িকভাবে স্থগিত করা হয়েছে।</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>বিস্তারিত জানতে বা আপিল করতে যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Suspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account has been temporarily suspended.</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
      <p>Contact us to appeal: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// STATUS CHANGED EMAIL
// ═══════════════════════════════════════════════════════════
export interface StatusChangedEmailInput {
  readonly name: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderStatusChangedEmail(input: StatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট স্ট্যাটাস পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টের স্ট্যাটাস পরিবর্তন হয়েছে।</p>
        <p><strong>আগের:</strong> ${input.fromStatus}</p>
        <p><strong>নতুন:</strong> ${input.toStatus}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Status Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account status has changed.</p>
      <p><strong>From:</strong> ${input.fromStatus}</p>
      <p><strong>To:</strong> ${input.toStatus}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// ROLE ASSIGNED EMAIL
// ═══════════════════════════════════════════════════════════
export interface RoleAssignedEmailInput {
  readonly name: string;
  readonly role: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRoleAssignedEmail(input: RoleAssignedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন রোল নির্ধারিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার অ্যাকাউন্টে নতুন রোল যোগ করা হয়েছে: <strong>${input.role}</strong></p>`,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Role Assigned',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A new role has been assigned to your account: <strong>${input.role}</strong></p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ROLE REVOKED EMAIL
// ═══════════════════════════════════════════════════════════
export interface RoleRevokedEmailInput {
  readonly name: string;
  readonly role: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRoleRevokedEmail(input: RoleRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রোল প্রত্যাহার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার অ্যাকাউন্ট থেকে রোল প্রত্যাহার করা হয়েছে: <strong>${input.role}</strong></p>`,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Role Revoked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A role has been revoked from your account: <strong>${input.role}</strong></p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR WELCOME EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorWelcomeEmailInput {
  readonly name: string;
  readonly businessName: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorWelcomeEmail(input: VendorWelcomeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর হিসেবে স্বাগতম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ভুবন মার্কেটপ্লেসে ভেন্ডর হিসেবে আপনাকে স্বাগতম! 🎉</p>
        <p><strong>ব্যবসার নাম:</strong> ${input.businessName}</p>
        <p>পরবর্তী ধাপ:</p>
        <ul style="padding-left:20px;">
          <li>আপনার প্রোফাইল সম্পূর্ণ করুন</li>
          <li>ব্যবসার ডকুমেন্ট আপলোড করুন</li>
          <li>প্রথম পণ্য যোগ করুন</li>
          <li>অনুমোদনের জন্য অপেক্ষা করুন</li>
        </ul>
      `,
      ctaButton: { label: 'ভেন্ডর ড্যাশবোর্ডে যান', url: 'https://vubon.com.bd/vendor', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Welcome Vendor',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Welcome to Vubon marketplace as a vendor! 🎉</p>
      <p><strong>Business:</strong> ${input.businessName}</p>
    `,
    ctaButton: { label: 'Go to Vendor Dashboard', url: 'https://vubon.com.bd/vendor', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR APPROVED EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorApprovedEmailInput {
  readonly name: string;
  readonly businessName: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorApprovedEmail(input: VendorApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! 🎉 আপনার ভেন্ডর অ্যাকাউন্ট অনুমোদিত হয়েছে।</p>
        <p><strong>ব্যবসা:</strong> ${input.businessName}</p>
        <p>এখন আপনি পণ্য বিক্রি শুরু করতে পারবেন।</p>
      `,
      ctaButton: { label: 'পণ্য যোগ করুন', url: 'https://vubon.com.bd/vendor/products/new', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Approved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Congratulations! 🎉 Your vendor account is approved.</p>`,
    ctaButton: { label: 'Add Products', url: 'https://vubon.com.bd/vendor/products/new', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VENDOR SUSPENDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface VendorSuspendedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorSuspendedEmail(input: VendorSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ভেন্ডর অ্যাকাউন্ট স্থগিত করা হয়েছে।</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>বিস্তারিত বা আপিলের জন্য যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Suspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your vendor account has been suspended.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART EMAIL
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartEmail(input: AbandonedCartEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার কার্টে পণ্য অপেক্ষা করছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টে <strong>${input.itemCount}টি পণ্য</strong> অপেক্ষা করছে! 🛒</p>
        <p>এখনই চেকআউট করুন এবং আপনার পণ্য বুঝে নিন।</p>
      `,
      ctaButton: { label: 'চেকআউট করুন', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Your Cart is Waiting',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>You have <strong>${input.itemCount} items</strong> in your cart! 🛒</p>`,
    ctaButton: { label: 'Checkout Now', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// LOW STOCK EMAIL
// ═══════════════════════════════════════════════════════════
export interface LowStockEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly available: number;
  readonly threshold: number;
  readonly locale?: 'en' | 'bn';
}

export function renderLowStockEmail(input: LowStockEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্টক কম',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ আপনার একটি পণ্যের স্টক কমে গেছে।</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p><strong>বর্তমান স্টক:</strong> ${input.available}</p>
        <p><strong>থ্রেশহোল্ড:</strong> ${input.threshold}</p>
        <p>অনুগ্রহ করে স্টক পুনরায় পূরণ করুন।</p>
      `,
      ctaButton: { label: 'স্টক আপডেট করুন', url: `https://vubon.com.bd/vendor/products/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Low Stock Alert',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ Low stock for one of your products.</p>
      <p><strong>Product ID:</strong> ${input.productId}</p>
      <p><strong>Available:</strong> ${input.available}</p>
      <p><strong>Threshold:</strong> ${input.threshold}</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// OUT OF STOCK EMAIL
// ═══════════════════════════════════════════════════════════
export interface OutOfStockEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOutOfStockEmail(input: OutOfStockEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্টক শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>🚫 আপনার পণ্য স্টক শেষ হয়ে গেছে!</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p>অনুগ্রহ করে দ্রুত স্টক পুনরায় পূরণ করুন।</p>
      `,
      ctaButton: { label: 'স্টক আপডেট করুন', url: `https://vubon.com.bd/vendor/products/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Out of Stock',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>🚫 Your product is out of stock!</p><p><strong>Product ID:</strong> ${input.productId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// REVIEW POSTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReviewPostedEmailInput {
  readonly name: string;
  readonly productId: string;
  readonly rating: number;
  readonly reviewText?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReviewPostedEmail(input: ReviewPostedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const stars = '⭐'.repeat(Math.min(input.rating, 5));
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন রিভিউ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পণ্যে একটি নতুন রিভিউ এসেছে! 🎉</p>
        <p><strong>পণ্য ID:</strong> ${input.productId}</p>
        <p><strong>রেটিং:</strong> ${stars} (${input.rating}/5)</p>
        ${input.reviewText ? `<p><strong>রিভিউ:</strong> "${input.reviewText}"</p>` : ''}
      `,
      ctaButton: { label: 'রিভিউ দেখুন', url: `https://vubon.com.bd/vendor/reviews/${input.productId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Review',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A new review has been posted on your product! 🎉</p>
      <p><strong>Product:</strong> ${input.productId}</p>
      <p><strong>Rating:</strong> ${stars} (${input.rating}/5)</p>
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART — DETECTED (Initial)
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartDetectedEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartDetectedEmail(input: AbandonedCartDetectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার কার্টে পণ্য অপেক্ষা করছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টে <strong>${input.itemCount}টি পণ্য</strong> রয়েছে। 🛒</p>
        <p><strong>মোট মূল্য:</strong> ৳${input.cartValue.toLocaleString('bn-BD')}</p>
        <p>এখনই চেকআউট করুন এবং আপনার পণ্য বুঝে নিন!</p>
      `,
      ctaButton: { label: 'চেকআউট করুন', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Your Cart is Waiting',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>You have <strong>${input.itemCount} items</strong> in your cart.</p>`,
    ctaButton: { label: 'Checkout Now', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART — REMINDER (1h / 24h / 72h)
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartReminderEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly remindersSent: number;
  readonly cartValue?: number;
  readonly discount?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartReminderEmail(input: AbandonedCartReminderEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const reminderLabels: Record<number, string> = {
    1: '১ ঘণ্টা',
    2: '২৪ ঘণ্টা',
    3: '৭২ ঘণ্টা',
  };
  const label = reminderLabels[input.remindersSent] ?? `${input.remindersSent}`;
  
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `রিমাইন্ডার #${input.remindersSent}`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনি ${label} আগে কার্টে কিছু পণ্য রেখেছিলেন। 🛒</p>
        ${input.discount ? `<p style="color:#16a34a;font-size:18px;"><strong>🎁 ${input.discount}% ছাড়!</strong></p>` : ''}
        ${input.cartValue ? `<p><strong>কার্টে মোট:</strong> ৳${input.cartValue.toLocaleString('bn-BD')}</p>` : ''}
        <p>এখনই চেকআউট করুন!</p>
      `,
      ctaButton: { label: 'চেকআউট করুন', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: `Reminder #${input.remindersSent}`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>You left items in your cart ${label} ago.</p>`,
    ctaButton: { label: 'Checkout Now', url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART — RECOVERED
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartRecoveredEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly recoveredValue: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartRecoveredEmail(input: AbandonedCartRecoveredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্বাগতম ফিরে! 🎉',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! আপনার কার্ট থেকে সফলভাবে অর্ডার করা হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p><strong>পরিমাণ:</strong> ৳${input.recoveredValue.toLocaleString('bn-BD')}</p>
        <p>আপনার পণ্য শীঘ্রই পাঠানো হবে।</p>
      `,
      ctaButton: { label: 'অর্ডার ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Welcome Back! 🎉',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your abandoned cart was recovered successfully!</p>`,
    ctaButton: { label: 'Track Order', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// ABANDONED CART — LOST (Final Offer)
// ═══════════════════════════════════════════════════════════
export interface AbandonedCartLostEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount: number;
  readonly discount?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderAbandonedCartLostEmail(input: AbandonedCartLostEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const discount = input.discount ?? 15;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: `শেষ সুযোগ! ${discount}% ছাড় 🎁`,
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টের পণ্যগুলো শীঘ্রই স্টক থেকে সরে যাবে।</p>
        <p style="color:#16a34a;font-size:20px;"><strong>🎁 ${discount}% বিশেষ ছাড়!</strong></p>
        <p>শুধু আপনার জন্য — আজ রাত ১২টা পর্যন্ত।</p>
        <p>এখনই চেকআউট করুন!</p>
      `,
      ctaButton: { label: `${discount}% ছাড় নিন`, url: `https://vubon.com.bd/cart/${input.cartId}?coupon=COMEBACK${discount}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: `Last Chance! ${discount}% Off 🎁`,
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your cart items are about to go out of stock.</p>`,
    ctaButton: { label: `Get ${discount}% Off`, url: `https://vubon.com.bd/cart/${input.cartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CART EXPIRED
// ═══════════════════════════════════════════════════════════
export interface CartExpiredEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderCartExpiredEmail(input: CartExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার কার্ট এক্সপায়ার হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টটি ${input.itemCount ? `${input.itemCount}টি পণ্য সহ ` : ''}এক্সপায়ার হয়ে গেছে। 😔</p>
        <p>কোনো সমস্যা নেই! আপনি সহজেই নতুন করে শুরু করতে পারেন।</p>
        <p>আজকের বেস্ট ডিলগুলো দেখুন।</p>
      `,
      ctaButton: { label: 'আবার শুরু করুন', url: 'https://vubon.com.bd/shop', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Your Cart Expired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your cart has expired. Start fresh today!</p>`,
    ctaButton: { label: 'Start Shopping', url: 'https://vubon.com.bd/shop', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CART MERGER — COMPLETED
// ═══════════════════════════════════════════════════════════
export interface CartMergerCompletedEmailInput {
  readonly name: string;
  readonly sourceCartId?: string;
  readonly targetCartId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCartMergerCompletedEmail(input: CartMergerCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট সফলভাবে merge হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার দুটি কার্ট সফলভাবে একসাথে করা হয়েছে। ✅</p>
        <p>সব পণ্য এখন একটি কার্টে — চেকআউট করতে প্রস্তুত!</p>
      `,
      ctaButton: { label: 'কার্ট দেখুন', url: `https://vubon.com.bd/cart/${input.targetCartId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Carts Merged Successfully',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your carts have been merged successfully.</p>`,
    ctaButton: { label: 'View Cart', url: `https://vubon.com.bd/cart/${input.targetCartId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COUPON / VOUCHER / CART TEMPLATES
// ═══════════════════════════════════════════════════════════

function simpleBanglaEmail(input: { title: string; titleEn: string; greeting: string; bodyBn: string; bodyEn: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return BanglaEmailTemplate.render({
    title: isBangla ? input.title : input.titleEn,
    locale: isBangla ? 'bn' : 'en',
    greeting: input.greeting,
    bodyHtml: isBangla ? input.bodyBn : input.bodyEn,
  });
}

// ─── Coupon ────────────────────────────────────────────────
export function renderCouponAppliedEmail(input: { name: string; code: string; discount: number; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কুপন প্রয়োগ হয়েছে',
    titleEn: 'Coupon Applied',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>✅ আপনার কুপন <strong>${input.code}</strong> সফলভাবে প্রয়োগ হয়েছে!</p><p><strong>ছাড়:</strong> ৳${input.discount.toLocaleString('bn-BD')}</p>`,
    bodyEn: `<p>✅ Your coupon <strong>${input.code}</strong> applied successfully!</p><p><strong>Discount:</strong> ৳${input.discount.toLocaleString('en-BD')}</p>`,
    locale: input.locale,
  });
}

export function renderCouponRejectedEmail(input: { name: string; code: string; reason?: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কুপন গ্রহণ হয়নি',
    titleEn: 'Coupon Not Accepted',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>❌ দুঃখিত, কুপন <strong>${input.code}</strong> গ্রহণ করা যায়নি।</p>${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
    bodyEn: `<p>❌ Sorry, coupon <strong>${input.code}</strong> could not be applied.</p>${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    locale: input.locale,
  });
}

export function renderCouponRemovedEmail(input: { name: string; code: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কুপন সরানো হয়েছে',
    titleEn: 'Coupon Removed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>কুপন <strong>${input.code}</strong> সরানো হয়েছে।</p>`,
    bodyEn: `<p>Coupon <strong>${input.code}</strong> has been removed.</p>`,
    locale: input.locale,
  });
}

// ─── Voucher ────────────────────────────────────────────────
export function renderVoucherAppliedEmail(input: { name: string; code: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'ভাউচার প্রয়োগ হয়েছে',
    titleEn: 'Voucher Applied',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>✅ আপনার ভাউচার <strong>${input.code}</strong> সফলভাবে প্রয়োগ হয়েছে!</p>`,
    bodyEn: `<p>✅ Your voucher <strong>${input.code}</strong> applied successfully!</p>`,
    locale: input.locale,
  });
}

export function renderVoucherRedeemedEmail(input: { name: string; code: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'ভাউচার ব্যবহৃত হয়েছে',
    titleEn: 'Voucher Redeemed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>✅ আপনার ভাউচার <strong>${input.code}</strong> সফলভাবে ব্যবহৃত হয়েছে।</p>`,
    bodyEn: `<p>✅ Your voucher <strong>${input.code}</strong> has been redeemed.</p>`,
    locale: input.locale,
  });
}

export function renderVoucherRejectedEmail(input: { name: string; code: string; reason?: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'ভাউচার গ্রহণ হয়নি',
    titleEn: 'Voucher Not Accepted',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>❌ দুঃখিত, ভাউচার <strong>${input.code}</strong> গ্রহণ করা যায়নি।</p>${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
    bodyEn: `<p>❌ Sorry, voucher <strong>${input.code}</strong> could not be applied.</p>${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    locale: input.locale,
  });
}

export function renderVoucherRemovedEmail(input: { name: string; code: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'ভাউচার সরানো হয়েছে',
    titleEn: 'Voucher Removed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>ভাউচার <strong>${input.code}</strong> সরানো হয়েছে।</p>`,
    bodyEn: `<p>Voucher <strong>${input.code}</strong> has been removed.</p>`,
    locale: input.locale,
  });
}

// ─── Cart Status ────────────────────────────────────────────
export function renderCartStatusChangedEmail(input: { name: string; fromStatus: string; toStatus: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কার্ট স্ট্যাটাস পরিবর্তন',
    titleEn: 'Cart Status Changed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>আপনার কার্টের স্ট্যাটাস পরিবর্তন হয়েছে।</p><p><strong>আগের:</strong> ${input.fromStatus}</p><p><strong>নতুন:</strong> ${input.toStatus}</p>`,
    bodyEn: `<p>Your cart status changed.</p><p><strong>From:</strong> ${input.fromStatus}</p><p><strong>To:</strong> ${input.toStatus}</p>`,
    locale: input.locale,
  });
}

// ─── Cart Merger ────────────────────────────────────────────
export function renderCartMergerFailedEmail(input: { name: string; reason?: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কার্ট মার্জ ব্যর্থ',
    titleEn: 'Cart Merge Failed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>❌ দুঃখিত, আপনার কার্টগুলো merge করা যায়নি।</p>${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
    bodyEn: `<p>❌ Sorry, your carts could not be merged.</p>${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    locale: input.locale,
  });
}

// ─── Cart Item ──────────────────────────────────────────────
export function renderCartItemAddedEmail(input: { name: string; productName: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'পণ্য কার্টে যোগ হয়েছে',
    titleEn: 'Item Added',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>✅ <strong>${input.productName}</strong> আপনার কার্টে যোগ হয়েছে।</p>`,
    bodyEn: `<p>✅ <strong>${input.productName}</strong> added to your cart.</p>`,
    locale: input.locale,
  });
}

export function renderCartItemRemovedEmail(input: { name: string; productName: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'পণ্য সরানো হয়েছে',
    titleEn: 'Item Removed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p><strong>${input.productName}</strong> আপনার কার্ট থেকে সরানো হয়েছে।</p>`,
    bodyEn: `<p><strong>${input.productName}</strong> removed from your cart.</p>`,
    locale: input.locale,
  });
}

export function renderCartItemQuantityChangedEmail(input: { name: string; productName: string; oldQty: number; newQty: number; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'পরিমাণ পরিবর্তন',
    titleEn: 'Quantity Changed',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p><strong>${input.productName}</strong>-এর পরিমাণ পরিবর্তন: ${input.oldQty} → ${input.newQty}</p>`,
    bodyEn: `<p><strong>${input.productName}</strong> quantity changed: ${input.oldQty} → ${input.newQty}</p>`,
    locale: input.locale,
  });
}

// ─── Saved for Later ───────────────────────────────────────
export function renderSavedForLaterSavedEmail(input: { name: string; productName: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'পরে কেনার জন্য সংরক্ষিত',
    titleEn: 'Saved for Later',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p><strong>${input.productName}</strong> পরে কেনার জন্য সংরক্ষণ করা হয়েছে।</p>`,
    bodyEn: `<p><strong>${input.productName}</strong> saved for later.</p>`,
    locale: input.locale,
  });
}

export function renderSavedForLaterMovedEmail(input: { name: string; productName: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'কার্টে ফিরিয়ে আনা',
    titleEn: 'Moved to Cart',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p><strong>${input.productName}</strong> আপনার কার্টে ফিরিয়ে আনা হয়েছে।</p>`,
    bodyEn: `<p><strong>${input.productName}</strong> moved back to your cart.</p>`,
    locale: input.locale,
  });
}

// ─── Guest Cart ────────────────────────────────────────────
export function renderGuestCartCreatedEmail(input: { name: string; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'স্বাগতম!',
    titleEn: 'Welcome!',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>আপনার guest cart তৈরি হয়েছে। চেকআউট করতে চাইলে login করুন।</p>`,
    bodyEn: `<p>Your guest cart is ready. Login to checkout.</p>`,
    locale: input.locale,
  });
}

export function renderGuestCartMergedEmail(input: { name: string; itemCount: number; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'গেস্ট কার্ট merge হয়েছে',
    titleEn: 'Guest Cart Merged',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>আপনার গেস্ট কার্ট merge হয়েছে। <strong>${input.itemCount}টি পণ্য</strong> যুক্ত হয়েছে।</p>`,
    bodyEn: `<p>Your guest cart merged. <strong>${input.itemCount} items</strong> added.</p>`,
    locale: input.locale,
  });
}

// ─── Cart Tax ──────────────────────────────────────────────
export function renderCartTaxRecalculatedEmail(input: { name: string; taxAmount: number; locale?: 'en' | 'bn' }): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  return simpleBanglaEmail({
    title: 'ট্যাক্স পুনরায় গণনা',
    titleEn: 'Tax Recalculated',
    greeting: isBangla ? `প্রিয় ${input.name},` : `Hi ${input.name},`,
    bodyBn: `<p>আপনার কার্টের ট্যাক্স পুনরায় গণনা হয়েছে: <strong>৳${input.taxAmount.toLocaleString('bn-BD')}</strong></p>`,
    bodyEn: `<p>Your cart tax recalculated: <strong>৳${input.taxAmount.toLocaleString('en-BD')}</strong></p>`,
    locale: input.locale,
  });
}
