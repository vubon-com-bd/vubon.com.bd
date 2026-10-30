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

// ═══════════════════════════════════════════════════════════
// DELIVERY SCHEDULED EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryScheduledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly estimatedAt?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryScheduledEmail(input: DeliveryScheduledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডেলিভারি নির্ধারিত হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের ডেলিভারি নির্ধারিত হয়েছে! 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.estimatedAt ? `<p><strong>আনুমানিক ডেলিভারি:</strong> ${input.estimatedAt}</p>` : ''}
        <p>ডেলিভারির আগে আমরা আপনাকে আবার জানাবো।</p>
      `,
      ctaButton: { label: 'অর্ডার ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Delivery Scheduled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order delivery has been scheduled! 📦</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      ${input.estimatedAt ? `<p><strong>Estimated:</strong> ${input.estimatedAt}</p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY IN TRANSIT EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryInTransitEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryInTransitEmail(input: DeliveryInTransitEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার অর্ডার পথে আছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার এখন পথে আছে! 🚚</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.trackingNumber ? `<p><strong>ট্র্যাকিং নম্বর:</strong> ${input.trackingNumber}</p>` : ''}
        <p>শীঘ্রই আপনার কাছে পৌঁছে যাবে।</p>
      `,
      ctaButton: { label: 'ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}/track`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order In Transit',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your order is on the way! 🚚</p>
      <p><strong>Order:</strong> #${input.orderId}</p>
      ${input.trackingNumber ? `<p><strong>Tracking:</strong> ${input.trackingNumber}</p>` : ''}
    `,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY OUT FOR DELIVERY EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryOutForDeliveryEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryOutForDeliveryEmail(input: DeliveryOutForDeliveryEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আজ ডেলিভারি হবে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আজ আপনার অর্ডার ডেলিভারি হবে! 🎉</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>ডেলিভারি ম্যান শীঘ্রই আসবেন। অনুগ্রহ করে বাসায় থাকুন।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Arriving Today',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is arriving today! 🎉</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY FAILED EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryFailedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryFailedEmail(input: DeliveryFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডেলিভারি ব্যর্থ হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার ডেলিভারি সম্পন্ন হয়নি। 😔</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>আমরা আবার চেষ্টা করব, অথবা আপনি সরাসরি যোগাযোগ করুন।</p>
      `,
      ctaButton: { label: 'রিশিডিউল করুন', url: `https://vubon.com.bd/orders/${input.orderId}/reschedule`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Delivery Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Sorry, your delivery failed.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CANCEL REQUESTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCancelRequestedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCancelRequestedEmail(input: OrderCancelRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার বাতিলের অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার বাতিলের অনুরোধ পেয়েছি। 📝</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>আমরা যাচাই করে শীঘ্রই জানাবো।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cancellation Requested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your cancellation request has been received.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CANCEL APPROVED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCancelApprovedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCancelApprovedEmail(input: OrderCancelApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার বাতিল অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার বাতিল অনুমোদিত হয়েছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>রিফান্ড ৩-৭ কর্মদিবসের মধ্যে প্রক্রিয়া হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cancellation Approved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your cancellation has been approved. ✅</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CANCEL REJECTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCancelRejectedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCancelRejectedEmail(input: OrderCancelRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার বাতিল প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার অর্ডার বাতিলের অনুরোধ প্রত্যাখ্যাত হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>সাহায্যের জন্য যোগাযোগ করুন: <a href="mailto:support@vubon.com.bd">support@vubon.com.bd</a></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cancellation Rejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Sorry, your cancellation was rejected.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CANCEL REFUNDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCancelRefundedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCancelRefundedEmail(input: OrderCancelRefundedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের রিফান্ড সম্পন্ন হয়েছে। 💰</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.amount ? `<p><strong>পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>` : ''}
        <p>আপনার অ্যাকাউন্টে ৩-৭ কর্মদিবসের মধ্যে জমা হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Processed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your refund has been processed. 💰</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER ITEM ADDED EMAIL (Vendor)
// ═══════════════════════════════════════════════════════════
export interface OrderItemAddedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly productName?: string;
  readonly quantity?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderItemAddedEmail(input: OrderItemAddedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন আইটেম যোগ হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার একটি অর্ডারে নতুন আইটেম যোগ হয়েছে। 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.quantity ? `<p><strong>পরিমাণ:</strong> ${input.quantity}</p>` : ''}
      `,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/vendor/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Item Added',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>New item added to order.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER ITEM REMOVED EMAIL (Vendor)
// ═══════════════════════════════════════════════════════════
export interface OrderItemRemovedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly productName?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderItemRemovedEmail(input: OrderItemRemovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আইটেম সরানো হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার একটি অর্ডার থেকে আইটেম সরানো হয়েছে। ❌</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Item Removed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Item removed from order.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT COMPLETED EMAIL
// ═══════════════════════════════════════════════════════════
export interface CheckoutCompletedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly total?: number;
  readonly currency?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCheckoutCompletedEmail(input: CheckoutCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট সম্পূর্ণ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার চেকআউট সম্পূর্ণ হয়েছে! ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.total ? `<p><strong>মোট:</strong> ৳${input.total.toLocaleString('bn-BD')}</p>` : ''}
        <p>আমরা শীঘ্রই আপনার অর্ডার প্রক্রিয়া করব।</p>
      `,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Checkout Complete',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your checkout is complete! ✅</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT ABANDONED EMAIL
// ═══════════════════════════════════════════════════════════
export interface CheckoutAbandonedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCheckoutAbandonedEmail(input: CheckoutAbandonedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট সম্পূর্ণ করুন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার চেকআউট সম্পূর্ণ হয়নি! 🛒</p>
        <p>আপনার নির্বাচিত পণ্যগুলি এখনো কার্টে অপেক্ষা করছে।</p>
        <p>সম্পূর্ণ করুন এবং অর্ডার নিশ্চিত করুন।</p>
      `,
      ctaButton: { label: 'চেকআউট চালিয়ে যান', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Complete Your Checkout',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>You didn't finish your checkout! 🛒</p>`,
    ctaButton: { label: 'Continue Checkout', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT EXPIRED EMAIL
// ═══════════════════════════════════════════════════════════
export interface CheckoutExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCheckoutExpiredEmail(input: CheckoutExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার চেকআউট সেশন মেয়াদ শেষ হয়েছে। আবার শুরু করুন।</p>`,
      ctaButton: { label: 'আবার চেকআউট', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Checkout Expired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your checkout session has expired. Please start again.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY DELIVERED EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryDeliveredEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryDeliveredEmail(input: DeliveryDeliveredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডেলিভারি সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার সফলভাবে ডেলিভারি হয়েছে! 🎉</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>ধন্যবাদ ভুবনকে বেছে নেওয়ার জন্য।</p>
      `,
      ctaButton: { label: 'রিভিউ দিন', url: `https://vubon.com.bd/orders/${input.orderId}/review`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Delivery Complete',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order has been delivered! 🎉</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY CANCELLED EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryCancelledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryCancelledEmail(input: DeliveryCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডেলিভারি বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ডেলিভারি বাতিল করা হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Delivery Cancelled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your delivery has been cancelled.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER COMPLETED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCompletedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCompletedEmail(input: OrderCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার সম্পূর্ণ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে! ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>আবার কেনাকাটা করতে ভুবনে আসুন।</p>
      `,
      ctaButton: { label: 'আবার কিনুন', url: 'https://vubon.com.bd/shop', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Completed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is complete! ✅</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER OUT FOR DELIVERY EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderOutForDeliveryEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderOutForDeliveryEmail(input: OrderOutForDeliveryEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার ডেলিভারির জন্য বের হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার ডেলিভারির জন্য বের হয়েছে! 🚚</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>শীঘ্রই আপনার কাছে পৌঁছে যাবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Out for Delivery',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is out for delivery! 🚚</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER CANCEL PROCESSED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderCancelProcessedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderCancelProcessedEmail(input: OrderCancelProcessedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল প্রক্রিয়া সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার বাতিল প্রক্রিয়া সম্পন্ন হয়েছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cancellation Processed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your cancellation has been fully processed. ✅</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN PICKUP SCHEDULED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnPickupScheduledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly returnId?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnPickupScheduledEmail(input: ReturnPickupScheduledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন পিকআপ নির্ধারিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিটার্ন পিকআপ নির্ধারিত হয়েছে। 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>আমাদের প্রতিনিধি শীঘ্রই পণ্য সংগ্রহ করতে আসবেন।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Pickup Scheduled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your return pickup has been scheduled. 📦</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN PICKED UP EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnPickedUpEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnPickedUpEmail(input: ReturnPickedUpEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন পণ্য গৃহীত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিটার্ন পণ্য সফলভাবে সংগ্রহ করা হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>আমরা পরিদর্শন করে শীঘ্রই রিফান্ড প্রক্রিয়া করব।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Picked Up',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your returned item has been picked up. 📦</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN REFUNDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnRefundedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnRefundedEmail(input: ReturnRefundedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন রিফান্ড সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিটার্নের রিফান্ড সম্পন্ন হয়েছে। 💰</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.amount ? `<p><strong>পরিমাণ:</strong> ৳${input.amount.toLocaleString('bn-BD')}</p>` : ''}
        <p>৩-৭ কর্মদিবসের মধ্যে অ্যাকাউন্টে জমা হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Refunded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your return has been refunded. 💰</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN REPLACED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnReplacedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnReplacedEmail(input: ReturnReplacedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পণ্য প্রতিস্থাপিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পণ্য প্রতিস্থাপন করা হয়েছে। 🔄</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>নতুন পণ্য শীঘ্রই আপনার কাছে পৌঁছে যাবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Item Replaced',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your item has been replaced. 🔄</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN INSPECTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnInspectedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnInspectedEmail(input: ReturnInspectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন পরিদর্শন সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিটার্ন পণ্য পরিদর্শন সম্পন্ন হয়েছে। 🔍</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>শীঘ্রই পরবর্তী পদক্ষেপ নেওয়া হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Inspected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your return has been inspected. 🔍</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// TRACKING UPDATED EMAIL
// ═══════════════════════════════════════════════════════════
export interface TrackingUpdatedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly location?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderTrackingUpdatedEmail(input: TrackingUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ট্র্যাকিং আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের ট্র্যাকিং আপডেট এসেছে। 📍</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.trackingNumber ? `<p><strong>ট্র্যাকিং:</strong> ${input.trackingNumber}</p>` : ''}
        ${input.location ? `<p><strong>অবস্থান:</strong> ${input.location}</p>` : ''}
      `,
      ctaButton: { label: 'ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}/track`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Tracking Update',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Tracking update for your order. 📍</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER ITEM UPDATED EMAIL (Vendor)
// ═══════════════════════════════════════════════════════════
export interface OrderItemUpdatedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly productName?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderItemUpdatedEmail(input: OrderItemUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার আইটেম আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার একটি অর্ডারের আইটেম আপডেট হয়েছে। 📝</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
      `,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/vendor/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Item Updated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Order item updated.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER ITEM QUANTITY CHANGED EMAIL (Vendor)
// ═══════════════════════════════════════════════════════════
export interface OrderItemQuantityChangedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly productName?: string;
  readonly oldQuantity?: number;
  readonly newQuantity?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderItemQuantityChangedEmail(input: OrderItemQuantityChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পরিমাণ পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অর্ডার আইটেমের পরিমাণ পরিবর্তন হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.oldQuantity && input.newQuantity ? `<p><strong>পুরনো → নতুন:</strong> ${input.oldQuantity} → ${input.newQuantity}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Quantity Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Order item quantity changed.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER ITEM STATUS CHANGED EMAIL (Vendor)
// ═══════════════════════════════════════════════════════════
export interface OrderItemStatusChangedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly status?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderItemStatusChangedEmail(input: OrderItemStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আইটেম স্ট্যাটাস পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অর্ডার আইটেমের স্ট্যাটাস পরিবর্তন হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.status ? `<p><strong>নতুন স্ট্যাটাস:</strong> ${input.status}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Item Status Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Order item status changed.</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY PICKED UP EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryPickedUpEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryPickedUpEmail(input: DeliveryPickedUpEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পণ্য সংগ্রহ করা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের পণ্য কুরিয়ার সংগ্রহ করেছে। 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.trackingNumber ? `<p><strong>ট্র্যাকিং:</strong> ${input.trackingNumber}</p>` : ''}
        <p>শীঘ্রই এটি পথে যাত্রা শুরু করবে।</p>
      `,
      ctaButton: { label: 'ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}/track`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Picked Up',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order has been picked up by courier.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// DELIVERY RESCHEDULED EMAIL
// ═══════════════════════════════════════════════════════════
export interface DeliveryRescheduledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly newEstimatedAt?: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeliveryRescheduledEmail(input: DeliveryRescheduledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডেলিভারি পুনর্নির্ধারিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ডেলিভারি পুনর্নির্ধারিত হয়েছে। 📅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.newEstimatedAt ? `<p><strong>নতুন তারিখ:</strong> ${input.newEstimatedAt}</p>` : ''}
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Delivery Rescheduled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your delivery has been rescheduled.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER NOTE ADDED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderNoteAddedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly note?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderNoteAddedEmail(input: OrderNoteAddedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডারে নতুন নোট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারে একটি নতুন নোট যোগ হয়েছে। 📝</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.note ? `<p><strong>নোট:</strong> "${input.note}"</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Note Added',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A new note was added to your order.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER PRIORITY CHANGED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderPriorityChangedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly fromPriority?: string;
  readonly toPriority?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderPriorityChangedEmail(input: OrderPriorityChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডারের অগ্রাধিকার পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের অগ্রাধিকার পরিবর্তন হয়েছে। ⚡</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.fromPriority ? `<p><strong>আগের:</strong> ${input.fromPriority}</p>` : ''}
        ${input.toPriority ? `<p><strong>নতুন:</strong> ${input.toPriority}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Priority Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Order priority updated.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER FULFILLMENT STARTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderFulfillmentStartedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderFulfillmentStartedEmail(input: OrderFulfillmentStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার প্রস্তুত হচ্ছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার প্রস্তুত করা শুরু হয়েছে! 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>শীঘ্রই প্যাকিং সম্পন্ন হবে।</p>
      `,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Preparing Your Order',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is being prepared.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER FULFILLMENT FULFILLED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderFulfillmentFulfilledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderFulfillmentFulfilledEmail(input: OrderFulfillmentFulfilledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার প্রস্তুত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার সম্পূর্ণ প্রস্তুত! ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>শীঘ্রই শিপমেন্টের জন্য পাঠানো হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Ready',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is ready to ship.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT STARTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface CheckoutStartedEmailInput {
  readonly name: string;
  readonly checkoutId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCheckoutStartedEmail(input: CheckoutStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার চেকআউট শুরু হয়েছে। 🛒</p>
        <p><strong>চেকআউট:</strong> #${input.checkoutId}</p>
        <p>সম্পূর্ণ করতে ধাপগুলো অনুসরণ করুন।</p>
      `,
      ctaButton: { label: 'চেকআউট চালিয়ে যান', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Checkout Started',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your checkout has started. 🛒</p><p><strong>Checkout:</strong> #${input.checkoutId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT STEP CHANGED EMAIL
// ═══════════════════════════════════════════════════════════
export interface CheckoutStepChangedEmailInput {
  readonly name: string;
  readonly checkoutId: string;
  readonly fromStep?: string;
  readonly toStep?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCheckoutStepChangedEmail(input: CheckoutStepChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট ধাপ পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>চেকআউট প্রক্রিয়ার পরবর্তী ধাপে এগিয়ে গেছে।</p>
        <p><strong>চেকআউট:</strong> #${input.checkoutId}</p>
        ${input.fromStep ? `<p><strong>আগের ধাপ:</strong> ${input.fromStep}</p>` : ''}
        ${input.toStep ? `<p><strong>বর্তমান ধাপ:</strong> ${input.toStep}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Checkout Step Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Checkout moved to next step.</p><p><strong>Checkout:</strong> #${input.checkoutId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// FULFILLMENT CANCELLED EMAIL
// ═══════════════════════════════════════════════════════════
export interface FulfillmentCancelledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderFulfillmentCancelledEmail(input: FulfillmentCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ফুলফিলমেন্ট বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার অর্ডারের ফুলফিলমেন্ট বাতিল হয়েছে।</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Fulfillment Cancelled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Order fulfillment cancelled.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// PARTIALLY FULFILLED EMAIL
// ═══════════════════════════════════════════════════════════
export interface PartiallyFulfilledEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly fulfilledItems?: number;
  readonly totalItems?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderPartiallyFulfilledEmail(input: PartiallyFulfilledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আংশিক প্রস্তুত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের কিছু অংশ প্রস্তুত হয়েছে। 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.fulfilledItems && input.totalItems ? `<p><strong>প্রস্তুত:</strong> ${input.fulfilledItems}/${input.totalItems} আইটেম</p>` : ''}
        <p>বাকিগুলো শীঘ্রই প্রস্তুত হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Partially Fulfilled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is partially fulfilled.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RESTOCKED EMAIL
// ═══════════════════════════════════════════════════════════
export interface RestockedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly productName?: string;
  readonly quantity?: number;
  readonly locale?: 'en' | 'bn';
}

export function renderRestockedEmail(input: RestockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্টক পুনরুদ্ধার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডারের পণ্য স্টকে ফেরত এসেছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.quantity ? `<p><strong>পরিমাণ:</strong> ${input.quantity}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Restocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Product restocked.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// TRACKING LOCATION UPDATED EMAIL
// ═══════════════════════════════════════════════════════════
export interface TrackingLocationUpdatedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly location?: string;
  readonly trackingNumber?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderTrackingLocationUpdatedEmail(input: TrackingLocationUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অবস্থান আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার প্যাকেজের নতুন অবস্থান আপডেট হয়েছে। 📍</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.location ? `<p><strong>অবস্থান:</strong> ${input.location}</p>` : ''}
        ${input.trackingNumber ? `<p><strong>ট্র্যাকিং:</strong> ${input.trackingNumber}</p>` : ''}
      `,
      ctaButton: { label: 'ট্র্যাক করুন', url: `https://vubon.com.bd/orders/${input.orderId}/track`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Location Updated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Package location updated.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// TRACKING STATUS CHANGED EMAIL
// ═══════════════════════════════════════════════════════════
export interface TrackingStatusChangedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly fromStatus?: string;
  readonly toStatus?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderTrackingStatusChangedEmail(input: TrackingStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ট্র্যাকিং স্ট্যাটাস আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার প্যাকেজের ট্র্যাকিং স্ট্যাটাস আপডেট হয়েছে। 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.fromStatus ? `<p><strong>আগের:</strong> ${input.fromStatus}</p>` : ''}
        ${input.toStatus ? `<p><strong>বর্তমান:</strong> ${input.toStatus}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Tracking Updated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Tracking status updated.</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER PACKED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderPackedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderPackedEmail(input: OrderPackedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার প্যাকিং সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার সফলভাবে প্যাক করা হয়েছে! 📦</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>শীঘ্রই ডেলিভারির জন্য পাঠানো হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Packed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order has been packed! 📦</p><p><strong>Order:</strong> #${input.orderId}</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER PROCESSING STARTED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderProcessingStartedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderProcessingStartedEmail(input: OrderProcessingStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার প্রসেসিং শুরু',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার প্রসেস করা শুরু হয়েছে! 🔄</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        <p>আমরা শীঘ্রই এটি প্যাক করে পাঠাব।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Processing Started',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order is being processed! 🔄</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// ORDER RETURNED EMAIL
// ═══════════════════════════════════════════════════════════
export interface OrderReturnedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderReturnedEmail(input: OrderReturnedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অর্ডার রিটার্ন সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অর্ডার রিটার্ন সম্পন্ন হয়েছে। ↩️</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>রিফান্ড শীঘ্রই প্রসেস করা হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Order Returned',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your order has been returned. ↩️</p>`,
  });
}

// ═══════════════════════════════════════════════════════════
// RETURN CLOSED EMAIL
// ═══════════════════════════════════════════════════════════
export interface ReturnClosedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly returnId?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderReturnClosedEmail(input: ReturnClosedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন ক্লোজ সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিটার্ন কেস সফলভাবে ক্লোজ করা হয়েছে। ✅</p>
        <p><strong>অর্ডার:</strong> #${input.orderId}</p>
        ${input.returnId ? `<p><strong>রিটার্ন:</strong> #${input.returnId}</p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Closed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your return has been closed. ✅</p>`,
  });
}

// ═══════════════════════════════════════════════════════════════
// Security Alert Email (New Login Detection)
// ═══════════════════════════════════════════════════════════════

export interface SecurityAlertEmailInput {
  readonly name: string;
  readonly email: string;
  readonly device?: string;
  readonly ip?: string;
  readonly time?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderSecurityAlertEmail(input: SecurityAlertEmailInput): string {
  const isBn = (input.locale ?? 'bn') === 'bn';
  const title = isBn ? '🔐 নতুন লগইন সনাক্ত' : '🔐 New Login Detected';
  const greeting = isBn ? `প্রিয় ${input.name},` : `Dear ${input.name},`;
  const bodyText = isBn
    ? 'আপনার অ্যাকাউন্টে একটি নতুন লগইন সনাক্ত হয়েছে।'
    : 'A new login was detected on your account.';
  const detailText = isBn
    ? `<strong>ডিভাইস:</strong> ${input.device ?? 'অজানা'}<br><strong>IP:</strong> ${input.ip ?? 'অজানা'}<br><strong>সময়:</strong> ${input.time ?? new Date().toISOString()}`
    : `<strong>Device:</strong> ${input.device ?? 'Unknown'}<br><strong>IP:</strong> ${input.ip ?? 'Unknown'}<br><strong>Time:</strong> ${input.time ?? new Date().toISOString()}`;
  const warning = isBn
    ? 'এটি আপনি না হলে অবিলম্বে পাসওয়ার্ড পরিবর্তন করুন।'
    : 'If this was not you, please change your password immediately.';

  return `<!DOCTYPE html>
<html lang="${isBn ? 'bn' : 'en'}"><head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f4;padding:20px;margin:0;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
<div style="background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);color:#fff;padding:32px 24px;text-align:center;">
<h1 style="margin:0;font-size:24px;font-weight:700;">${title}</h1>
</div>
<div style="padding:32px;">
<p style="font-size:16px;color:#333;margin:0 0 16px;">${greeting}</p>
<p style="font-size:16px;color:#333;margin:0 0 16px;line-height:1.6;">${bodyText}</p>
<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px;margin:20px 0;color:#7f1d1d;font-size:14px;line-height:1.8;">
${detailText}
</div>
<div style="background:#fef9c3;border-left:4px solid #eab308;padding:16px;color:#713f12;font-size:14px;margin:20px 0;">
<strong>⚠️ ${warning}</strong>
</div>
<p style="color:#666;font-size:14px;margin:24px 0 0;">— Vubon.com.bd Security Team</p>
</div>
<div style="background:#f9fafb;padding:16px;text-align:center;color:#6b7280;font-size:12px;">
© ${new Date().getFullYear()} Vubon.com.bd — All rights reserved
</div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════
// Invoice Email Templates
// ═══════════════════════════════════════════════════════════════

export interface InvoiceEmailInput {
  readonly name: string;
  readonly email: string;
  readonly invoiceNumber: string;
  readonly total: number | string;
  readonly currency?: string;
  readonly actionLabel?: string;
  readonly actionDescription?: string;
  readonly color?: 'blue' | 'green' | 'red' | 'gray' | 'orange';
  readonly locale?: 'en' | 'bn';
}

const INVOICE_ACTION_TEMPLATES: Record<string, { bn: string; en: string; color: string; icon: string }> = {
  created: {
    bn: 'ইনভয়েস তৈরি',
    en: 'Invoice Created',
    color: '#2563eb',
    icon: '📄',
  },
  paid: {
    bn: 'ইনভয়েস পরিশোধিত',
    en: 'Invoice Paid',
    color: '#16a34a',
    icon: '✅',
  },
  overdue: {
    bn: 'ইনভয়েস মেয়াদোত্তীর্ণ',
    en: 'Invoice Overdue',
    color: '#dc2626',
    icon: '⚠️',
  },
  voided: {
    bn: 'ইনভয়েস বাতিল',
    en: 'Invoice Voided',
    color: '#6b7280',
    icon: '🚫',
  },
  refunded: {
    bn: 'ইনভয়েস রিফান্ড',
    en: 'Invoice Refunded',
    color: '#ea580c',
    icon: '💰',
  },
};

export function renderInvoiceEmail(input: InvoiceEmailInput & { actionType: keyof typeof INVOICE_ACTION_TEMPLATES }): string {
  const isBn = input.locale !== 'en';
  const tpl = INVOICE_ACTION_TEMPLATES[input.actionType] ?? INVOICE_ACTION_TEMPLATES.created;
  const title = `${tpl.icon} ${isBn ? tpl.bn : tpl.en}`;
  const greeting = isBn ? `প্রিয় ${input.name},` : `Dear ${input.name},`;
  const description = input.actionDescription
    ?? (isBn
      ? `আপনার ইনভয়েস ${input.invoiceNumber} ${tpl.bn} হয়েছে।`
      : `Your invoice ${input.invoiceNumber} has been ${tpl.en.toLowerCase()}.`);
  const amountLabel = isBn ? 'মোট পরিমাণ' : 'Total Amount';
  const invoiceLabel = isBn ? 'ইনভয়েস নম্বর' : 'Invoice Number';
  const currency = input.currency ?? 'BDT';
  const amount = typeof input.total === 'number' ? input.total : Number(input.total) || 0;
  const footer = isBn ? 'ভুবন.কম.বিডি বিলিং টিম' : 'Vubon.com.bd Billing Team';
  const supportLabel = isBn ? 'প্রশ্ন থাকলে যোগাযোগ করুন' : 'Questions? Contact us';
  const ctaLabel = isBn ? 'ইনভয়েস দেখুন' : 'View Invoice';

  return `<!DOCTYPE html>
<html lang="${isBn ? 'bn' : 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:${tpl.color};padding:32px 24px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">${title}</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">${input.invoiceNumber}</p>
    </div>
    <div style="padding:32px 28px;">
      <p style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:600;">${greeting}</p>
      <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">${description}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;padding:0;margin:0 0 24px;">
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
            <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">${invoiceLabel}</div>
            <div style="color:#111827;font-size:16px;font-weight:600;">${input.invoiceNumber}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px;">
            <div style="color:#6b7280;font-size:13px;margin-bottom:4px;">${amountLabel}</div>
            <div style="color:${tpl.color};font-size:22px;font-weight:700;">৳${amount.toLocaleString()} ${currency}</div>
          </td>
        </tr>
      </table>
      <div style="text-align:center;margin:28px 0;">
        <a href="https://vubon.com.bd/invoices" style="display:inline-block;background:${tpl.color};color:#ffffff;padding:13px 32px;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">${ctaLabel}</a>
      </div>
      <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:13px;line-height:1.6;">
        ${supportLabel}: <a href="mailto:support@vubon.com.bd" style="color:${tpl.color};text-decoration:none;">support@vubon.com.bd</a><br>
        — ${footer}
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function renderInvoiceCreatedEmail(input: InvoiceEmailInput): string {
  return renderInvoiceEmail({ ...input, actionType: 'created' });
}

export function renderInvoicePaidEmail(input: InvoiceEmailInput): string {
  return renderInvoiceEmail({ ...input, actionType: 'paid' });
}

export function renderInvoiceOverdueEmail(input: InvoiceEmailInput): string {
  return renderInvoiceEmail({ ...input, actionType: 'overdue' });
}

export function renderInvoiceVoidedEmail(input: InvoiceEmailInput): string {
  return renderInvoiceEmail({ ...input, actionType: 'voided' });
}

export function renderInvoiceRefundedEmail(input: InvoiceEmailInput): string {
  return renderInvoiceEmail({ ...input, actionType: 'refunded' });
}


// ═══════════════════════════════════════════════════════════
// ADDED — Priority Templates (Auto-generated, 2026)
// ═══════════════════════════════════════════════════════════

// ─── Identity: Auth & Security ──────────────────────────────
export interface AuthLockedEmailInput {
  readonly name: string;
  readonly lockedUntil?: string;
  readonly locale?: 'en' | 'bn';
  readonly supportUrl?: string;
}

export function renderAuthLockedEmail(input: AuthLockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট লক',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নিরাপত্তার কারণে আপনার অ্যাকাউন্ট সাময়িকভাবে লক করা হয়েছে।</p>
        ${input.lockedUntil ? `<p>লক খুলবে: <strong>${input.lockedUntil}</strong></p>` : ''}
        <p>আপনি যদি এটি না করে থাকেন, অনুগ্রহ করে সহায়তা দলে যোগাযোগ করুন।</p>
      `,
      ctaButton: {
        label: 'সহায়তা পান',
        url: input.supportUrl ?? 'https://vubon.com.bd/support',
        variant: 'primary',
      },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Locked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account has been temporarily locked for security reasons.</p>
      ${input.lockedUntil ? `<p>Unlocks at: <strong>${input.lockedUntil}</strong></p>` : ''}
      <p>If this wasn't you, please contact support immediately.</p>
    `,
    ctaButton: {
      label: 'Get Support',
      url: input.supportUrl ?? 'https://vubon.com.bd/support',
      variant: 'primary',
    },
  });
}

export interface MfaEnabledEmailInput {
  readonly name: string;
  readonly method?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderMfaEnabledEmail(input: MfaEnabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'MFA চালু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টে দুই-ধাপ যাচাই (MFA) চালু করা হয়েছে।</p>
        ${input.method ? `<p>পদ্ধতি: <strong>${input.method}</strong></p>` : ''}
        <p>এখন থেকে লগইনে অতিরিক্ত যাচাই কód প্রয়োজন হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'MFA Enabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Two-factor authentication has been enabled on your account.</p>
      ${input.method ? `<p>Method: <strong>${input.method}</strong></p>` : ''}
      <p>You'll now need an additional verification step to log in.</p>
    `,
  });
}

export interface MfaDisabledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
}

export function renderMfaDisabledEmail(input: MfaDisabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'MFA বন্ধ হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টে MFA বন্ধ করা হয়েছে।</p>
        <p>নিরাপত্তার জন্য আমরা সুপারিশ করি MFA আবার চালু করতে।</p>
      `,
      ctaButton: {
        label: 'MFA চালু করুন',
        url: 'https://vubon.com.bd/settings/security',
        variant: 'primary',
      },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'MFA Disabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Two-factor authentication has been disabled on your account.</p>
      <p>For security, we strongly recommend re-enabling MFA.</p>
    `,
    ctaButton: {
      label: 'Enable MFA',
      url: 'https://vubon.com.bd/settings/security',
      variant: 'primary',
    },
  });
}

export interface PasswordChangedEmailInput {
  readonly name: string;
  readonly changedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPasswordChangedEmail(input: PasswordChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পাসওয়ার্ড পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টের পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।</p>
        <p>পরিবর্তনের সময়: <strong>${input.changedAt}</strong></p>
        <p>যদি আপনি এটি না করে থাকেন, অবিলম্বে সহায়তা দলে যোগাযোগ করুন।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Password Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account password has been changed successfully.</p>
      <p>Changed at: <strong>${input.changedAt}</strong></p>
      <p>If this wasn't you, contact support immediately.</p>
    `,
  });
}

export interface PhoneVerifiedEmailInput {
  readonly name: string;
  readonly phone: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPhoneVerifiedEmail(input: PhoneVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ফোন যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ফোন নম্বর <strong>${input.phone}</strong> সফলভাবে যাচাই করা হয়েছে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Phone Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your phone number <strong>${input.phone}</strong> has been verified successfully.</p>`,
  });
}

export interface EmailVerifiedEmailInput {
  readonly name: string;
  readonly email: string;
  readonly locale?: 'en' | 'bn';
}

export function renderEmailVerifiedEmail(input: EmailVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ইমেইল যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার ইমেইল <strong>${input.email}</strong> সফলভাবে যাচাই হয়েছে।</p>`,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Email Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your email <strong>${input.email}</strong> has been verified successfully.</p>`,
  });
}

export interface UserSuspendedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderUserSuspendedEmail(input: UserSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট সাসপেন্ড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে।</p>
        ${input.reason ? `<p>কারণ: <strong>${input.reason}</strong></p>` : ''}
        <p>আপিল করতে সহায়তা দলে যোগাযোগ করুন।</p>
      `,
      ctaButton: { label: 'আপিল করুন', url: 'https://vubon.com.bd/support', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Suspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your account has been suspended.</p>
      ${input.reason ? `<p>Reason: <strong>${input.reason}</strong></p>` : ''}
      <p>Contact support to appeal.</p>
    `,
    ctaButton: { label: 'Appeal', url: 'https://vubon.com.bd/support', variant: 'primary' },
  });
}

export interface SessionCreatedEmailInput {
  readonly name: string;
  readonly device?: string;
  readonly ipAddress?: string;
  readonly loginAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderSessionCreatedEmail(input: SessionCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন লগইন সনাক্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টে একটি নতুন লগইন সনাক্ত হয়েছে।</p>
        <p>ডিভাইস: <strong>${input.device ?? 'অজানা'}</strong></p>
        ${input.ipAddress ? `<p>IP: <strong>${input.ipAddress}</strong></p>` : ''}
        <p>সময়: <strong>${input.loginAt}</strong></p>
        <p>যদি এটি আপনি না হয়ে থাকেন, এখনই পাসওয়ার্ড পরিবর্তন করুন।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Login Detected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A new login was detected on your account.</p>
      <p>Device: <strong>${input.device ?? 'Unknown'}</strong></p>
      ${input.ipAddress ? `<p>IP: <strong>${input.ipAddress}</strong></p>` : ''}
      <p>Time: <strong>${input.loginAt}</strong></p>
      <p>If this wasn't you, change your password immediately.</p>
    `,
  });
}

export interface DeviceRegisteredEmailInput {
  readonly name: string;
  readonly deviceType: string;
  readonly registeredAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderDeviceRegisteredEmail(input: DeviceRegisteredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন ডিভাইস নিবন্ধিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টে একটি নতুন ডিভাইস নিবন্ধিত হয়েছে।</p>
        <p>ডিভাইস: <strong>${input.deviceType}</strong></p>
        <p>সময়: <strong>${input.registeredAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Device Registered',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A new device has been registered to your account.</p>
      <p>Device: <strong>${input.deviceType}</strong></p>
      <p>Time: <strong>${input.registeredAt}</strong></p>
    `,
  });
}

export interface KycVerifiedEmailInput {
  readonly name: string;
  readonly verifiedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderKycVerifiedEmail(input: KycVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'KYC অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! আপনার KYC যাচাই সফলভাবে সম্পন্ন হয়েছে।</p>
        <p>যাচাইয়ের সময়: <strong>${input.verifiedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'KYC Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Congratulations! Your KYC verification has been completed successfully.</p>
      <p>Verified at: <strong>${input.verifiedAt}</strong></p>
    `,
  });
}

// ─── Vendor: Lifecycle & Payouts ────────────────────────────
export interface VendorApprovedLifecycleEmailInput {
  readonly name: string;
  readonly vendorId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorApprovedLifecycleEmail(input: VendorApprovedLifecycleEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর অ্যাকাউন্ট অনুমোদিত!',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! আপনার ভেন্ডর অ্যাকাউন্ট অনুমোদিত হয়েছে। 🎉</p>
        <p>এখন আপনি ভুবন.কম.বিডি-তে প্রোডাক্ট বিক্রি শুরু করতে পারেন।</p>
        <p>ভেন্ডর ড্যাশবোর্ডে লগইন করে প্রোডাক্ট যোগ করুন।</p>
      `,
      ctaButton: {
        label: 'ভেন্ডর ড্যাশবোর্ডে যান',
        url: 'https://vubon.com.bd/vendor/dashboard',
        variant: 'primary',
      },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Account Approved!',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Congratulations! Your vendor account has been approved. 🎉</p>
      <p>You can now start selling on Vubon.com.bd.</p>
      <p>Log in to your vendor dashboard to add products.</p>
    `,
    ctaButton: {
      label: 'Go to Dashboard',
      url: 'https://vubon.com.bd/vendor/dashboard',
      variant: 'primary',
    },
  });
}

export interface VendorRejectedEmailInput {
  readonly name: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorRejectedEmail(input: VendorRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর আবেদন প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার ভেন্ডর আবেদন প্রত্যাখ্যাত হয়েছে।</p>
        ${input.reason ? `<p>কারণ: <strong>${input.reason}</strong></p>` : ''}
        <p>আপনি আবার আবেদন করতে পারেন।</p>
      `,
      ctaButton: { label: 'আবার আবেদন করুন', url: 'https://vubon.com.bd/vendor/apply', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Application Rejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Unfortunately, your vendor application has been rejected.</p>
      ${input.reason ? `<p>Reason: <strong>${input.reason}</strong></p>` : ''}
      <p>You may apply again.</p>
    `,
    ctaButton: { label: 'Apply Again', url: 'https://vubon.com.bd/vendor/apply', variant: 'primary' },
  });
}

export interface VendorReinstatedEmailInput {
  readonly name: string;
  readonly reinstatedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorReinstatedEmail(input: VendorReinstatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর অ্যাকাউন্ট পুনর্বহাল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সুসংবাদ! আপনার ভেন্ডর অ্যাকাউন্ট পুনর্বহাল করা হয়েছে।</p>
        <p>পুনর্বহালের সময়: <strong>${input.reinstatedAt}</strong></p>
        <p>আপনি আবার বিক্রি শুরু করতে পারেন।</p>
      `,
      ctaButton: { label: 'ড্যাশবোর্ডে যান', url: 'https://vubon.com.bd/vendor/dashboard', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Account Reinstated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Good news! Your vendor account has been reinstated.</p>
      <p>Reinstated at: <strong>${input.reinstatedAt}</strong></p>
      <p>You can resume selling now.</p>
    `,
    ctaButton: { label: 'Go to Dashboard', url: 'https://vubon.com.bd/vendor/dashboard', variant: 'primary' },
  });
}

export interface VendorVerifiedEmailInput {
  readonly name: string;
  readonly verifiedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorVerifiedEmail(input: VendorVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর ভেরিফাইড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ভেন্ডর অ্যাকাউন্ট সফলভাবে ভেরিফাই হয়েছে।</p>
        <p>এখন আপনার প্রোডাক্টে "ভেরিফাইড ভেন্ডর" ব্যাজ দেখাবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your vendor account has been verified.</p>
      <p>Your products will now show a "Verified Vendor" badge.</p>
    `,
  });
}

export interface VendorDeletedEmailInput {
  readonly name: string;
  readonly deletedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorDeletedEmail(input: VendorDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর অ্যাকাউন্ট মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার ভেন্ডর অ্যাকাউন্ট মুছে ফেলা হয়েছে।</p>
        <p>মুছে ফেলার সময়: <strong>${input.deletedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Account Deleted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your vendor account has been deleted.</p>
      <p>Deleted at: <strong>${input.deletedAt}</strong></p>
    `,
  });
}

export interface PayoutProcessedEmailInput {
  readonly name: string;
  readonly amount: number;
  readonly currency: string;
  readonly method?: string;
  readonly processedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPayoutProcessedEmail(input: PayoutProcessedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেআউট সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেআউট সফলভাবে সম্পন্ন হয়েছে।</p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
        ${input.method ? `<p>পদ্ধতি: <strong>${input.method}</strong></p>` : ''}
        <p>সময়: <strong>${input.processedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payout Processed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payout has been processed successfully.</p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      ${input.method ? `<p>Method: <strong>${input.method}</strong></p>` : ''}
      <p>Processed at: <strong>${input.processedAt}</strong></p>
    `,
  });
}

export interface PayoutFailedEmailInput {
  readonly name: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPayoutFailedEmail(input: PayoutFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেআউট ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার পেআউট ব্যর্থ হয়েছে।</p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
        ${input.reason ? `<p>কারণ: <strong>${input.reason}</strong></p>` : ''}
        <p>সহায়তা দলে যোগাযোগ করুন।</p>
      `,
      ctaButton: { label: 'সহায়তা', url: 'https://vubon.com.bd/support', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payout Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Unfortunately, your payout has failed.</p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      ${input.reason ? `<p>Reason: <strong>${input.reason}</strong></p>` : ''}
      <p>Please contact support.</p>
    `,
    ctaButton: { label: 'Contact Support', url: 'https://vubon.com.bd/support', variant: 'primary' },
  });
}

export interface VendorVerificationApprovedEmailInput {
  readonly name: string;
  readonly approvedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderVendorVerificationApprovedEmail(input: VendorVerificationApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ভেন্ডর ভেরিফিকেশন অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অভিনন্দন! আপনার ভেন্ডর ভেরিফিকেশন অনুমোদিত হয়েছে।</p>
        <p>সময়: <strong>${input.approvedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Vendor Verification Approved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Congratulations! Your vendor verification has been approved.</p>
      <p>Approved at: <strong>${input.approvedAt}</strong></p>
    `,
  });
}

// ─── Payment: Additional Events ─────────────────────────────
export interface PaymentAuthorizedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentAuthorizedEmail(input: PaymentAuthorizedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেমেন্ট অনুমোদিত হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
        <p>শীঘ্রই চূড়ান্ত হবে।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Authorized',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payment has been authorized.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      <p>It will be finalized shortly.</p>
    `,
  });
}

export interface PaymentCompletedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentCompletedEmail(input: PaymentCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Completed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payment has been completed successfully.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
    `,
  });
}

export interface PaymentCapturedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPaymentCapturedEmail(input: PaymentCapturedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট ক্যাপচার হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার পেমেন্ট ক্যাপচার সম্পন্ন হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Captured',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your payment has been captured.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
    `,
  });
}

export interface RefundCompletedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly refundedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRefundCompletedEmail(input: RefundCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার রিফান্ড সফলভাবে সম্পন্ন হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
        <p>সময়: <strong>${input.refundedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Completed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your refund has been completed successfully.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      <p>Refunded at: <strong>${input.refundedAt}</strong></p>
    `,
  });
}

export interface RefundFailedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderRefundFailedEmail(input: RefundFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার রিফান্ড ব্যর্থ হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        <p>পরিমাণ: <strong>${input.amount} ${input.currency}</strong></p>
        ${input.reason ? `<p>কারণ: <strong>${input.reason}</strong></p>` : ''}
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Unfortunately, your refund has failed.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      <p>Amount: <strong>${input.amount} ${input.currency}</strong></p>
      ${input.reason ? `<p>Reason: <strong>${input.reason}</strong></p>` : ''}
    `,
  });
}

// ─── Cart: Additional Events ────────────────────────────────
export interface CartCheckedOutEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCartCheckedOutEmail(input: CartCheckedOutEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'চেকআউট সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্ট চেকআউট সম্পন্ন হয়েছে।</p>
        <p>আইটেম সংখ্যা: <strong>${input.itemCount}</strong></p>
        <p>মোট: <strong>${input.total} ${input.currency}</strong></p>
        <p>পরবর্তী ধাপে পেমেন্ট সম্পন্ন করুন।</p>
      `,
      ctaButton: { label: 'পেমেন্ট করুন', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Checkout Completed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your cart checkout has been completed.</p>
      <p>Items: <strong>${input.itemCount}</strong></p>
      <p>Total: <strong>${input.total} ${input.currency}</strong></p>
      <p>Proceed to payment.</p>
    `,
    ctaButton: { label: 'Proceed to Payment', url: 'https://vubon.com.bd/checkout', variant: 'primary' },
  });
}

export interface CartConvertedEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly orderId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCartConvertedEmail(input: CartConvertedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট অর্ডারে রূপান্তরিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্ট সফলভাবে অর্ডারে রূপান্তরিত হয়েছে।</p>
        <p>অর্ডার নম্বর: <strong>#${input.orderId}</strong></p>
      `,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cart Converted to Order',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your cart has been successfully converted to an order.</p>
      <p>Order Number: <strong>#${input.orderId}</strong></p>
    `,
    ctaButton: { label: 'View Order', url: `https://vubon.com.bd/orders/${input.orderId}`, variant: 'primary' },
  });
}

export interface CartCreatedEmailInput {
  readonly name: string;
  readonly cartId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderCartCreatedEmail(input: CartCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার জন্য একটি নতুন শপিং কার্ট প্রস্তুত করা হয়েছে।</p>`,
      ctaButton: { label: 'শপিং শুরু করুন', url: 'https://vubon.com.bd/shop', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cart Created',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A new shopping cart is ready for you.</p>`,
    ctaButton: { label: 'Start Shopping', url: 'https://vubon.com.bd/shop', variant: 'primary' },
  });
}

// ─── Product: Additional Events ─────────────────────────────
export interface ProductCreatedEmailInput {
  readonly name: string;
  readonly productName: string;
  readonly productId: string;
  readonly locale?: 'en' | 'bn';
}

export function renderProductCreatedEmail(input: ProductCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রোডাক্ট তৈরি',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার নতুন প্রোডাক্ট সফলভাবে তৈরি হয়েছে।</p>
        <p>প্রোডাক্ট: <strong>${input.productName}</strong></p>
        <p>এখন এটি প্রকাশ করতে পারেন।</p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Product Created',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your new product has been created successfully.</p>
      <p>Product: <strong>${input.productName}</strong></p>
      <p>You can publish it now.</p>
    `,
  });
}

export interface ProductPublishedEmailInput {
  readonly name: string;
  readonly productName: string;
  readonly publishedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderProductPublishedEmail(input: ProductPublishedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রোডাক্ট প্রকাশিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার প্রোডাক্ট সফলভাবে প্রকাশিত হয়েছে।</p>
        <p>প্রোডাক্ট: <strong>${input.productName}</strong></p>
        <p>সময়: <strong>${input.publishedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Product Published',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your product has been published successfully.</p>
      <p>Product: <strong>${input.productName}</strong></p>
      <p>Published at: <strong>${input.publishedAt}</strong></p>
    `,
  });
}

export interface ProductDeletedEmailInput {
  readonly name: string;
  readonly productName: string;
  readonly deletedAt: string;
  readonly locale?: 'en' | 'bn';
}

export function renderProductDeletedEmail(input: ProductDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রোডাক্ট মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার প্রোডাক্ট মুছে ফেলা হয়েছে।</p>
        <p>প্রোডাক্ট: <strong>${input.productName}</strong></p>
        <p>সময়: <strong>${input.deletedAt}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Product Deleted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your product has been deleted.</p>
      <p>Product: <strong>${input.productName}</strong></p>
      <p>Deleted at: <strong>${input.deletedAt}</strong></p>
    `,
  });
}

export interface PricingChangedEmailInput {
  readonly name: string;
  readonly productName: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly locale?: 'en' | 'bn';
}

export function renderPricingChangedEmail(input: PricingChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মূল্য পরিবর্তন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>একটি প্রোডাক্টের মূল্য পরিবর্তিত হয়েছে।</p>
        <p>প্রোডাক্ট: <strong>${input.productName}</strong></p>
        <p>পুরানো: <strong>${input.oldPrice} ${input.currency}</strong></p>
        <p>নতুন: <strong>${input.newPrice} ${input.currency}</strong></p>
      `,
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Price Changed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A product's price has changed.</p>
      <p>Product: <strong>${input.productName}</strong></p>
      <p>Old: <strong>${input.oldPrice} ${input.currency}</strong></p>
      <p>New: <strong>${input.newPrice} ${input.currency}</strong></p>
    `,
  });
}

// ─── Order: Return Rejected ─────────────────────────────────
export interface OrderReturnRejectedEmailInput {
  readonly name: string;
  readonly orderId: string;
  readonly reason?: string;
  readonly locale?: 'en' | 'bn';
}

export function renderOrderReturnRejectedEmail(input: OrderReturnRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিটার্ন প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>দুঃখিত, আপনার রিটার্ন অনুরোধ প্রত্যাখ্যাত হয়েছে।</p>
        <p>অর্ডার: <strong>#${input.orderId}</strong></p>
        ${input.reason ? `<p>কারণ: <strong>${input.reason}</strong></p>` : ''}
        <p>সহায়তা দলে যোগাযোগ করুন।</p>
      `,
      ctaButton: { label: 'সহায়তা', url: 'https://vubon.com.bd/support', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Return Rejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Unfortunately, your return request has been rejected.</p>
      <p>Order: <strong>#${input.orderId}</strong></p>
      ${input.reason ? `<p>Reason: <strong>${input.reason}</strong></p>` : ''}
      <p>Contact support for help.</p>
    `,
    ctaButton: { label: 'Contact Support', url: 'https://vubon.com.bd/support', variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USER SECURITY EVENT
// ═══════════════════════════════════════════════════════════
export interface UserSecurityEventEmailInput {
  readonly name: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
  readonly eventType: string;
  readonly description?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly occurredAt: string;
}

export function renderUserSecurityEventEmail(input: UserSecurityEventEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নিরাপত্তা সতর্কতা',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ আপনার অ্যাকাউন্টে একটি নিরাপত্তা ইভেন্ট সনাক্ত হয়েছে।</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#fef2f2;border-radius:8px;">
          <tr><td style="padding:12px;">ইভেন্ট:</td><td style="padding:12px;text-align:right;font-weight:600;">${input.eventType}</td></tr>
          <tr><td style="padding:12px;">বিবরণ:</td><td style="padding:12px;text-align:right;">${input.description ?? 'N/A'}</td></tr>
          <tr><td style="padding:12px;">সময়:</td><td style="padding:12px;text-align:right;">${input.occurredAt}</td></tr>
          ${input.ipAddress ? `<tr><td style="padding:12px;">IP:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.ipAddress}</td></tr>` : ''}
        </table>
        <p><strong>আপনি যদি এই কাজ না করে থাকেন, অবিলম্বে পাসওয়ার্ড পরিবর্তন করুন।</strong></p>
      `,
      ctaButton: {
        label: 'পাসওয়ার্ড পরিবর্তন করুন',
        url: 'https://vubon.com.bd/account/password',
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Security Alert',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ A security event was detected on your account.</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#fef2f2;border-radius:8px;">
        <tr><td style="padding:12px;">Event:</td><td style="padding:12px;text-align:right;font-weight:600;">${input.eventType}</td></tr>
        <tr><td style="padding:12px;">Description:</td><td style="padding:12px;text-align:right;">${input.description ?? 'N/A'}</td></tr>
        <tr><td style="padding:12px;">Time:</td><td style="padding:12px;text-align:right;">${input.occurredAt}</td></tr>
        ${input.ipAddress ? `<tr><td style="padding:12px;">IP:</td><td style="padding:12px;text-align:right;font-family:monospace;">${input.ipAddress}</td></tr>` : ''}
      </table>
      <p><strong>If this wasn't you, change your password immediately.</strong></p>
    `,
    ctaButton: {
      label: 'Change Password',
      url: 'https://vubon.com.bd/account/password',
      variant: 'primary',
    },
  });
}


// ═══════════════════════════════════════════════════════════
// SESSION REVOKED
// ═══════════════════════════════════════════════════════════
export interface SessionRevokedEmailInput {
  readonly name: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
  readonly deviceInfo?: string;
  readonly ipAddress?: string;
  readonly revokedAt: string;
  readonly reason?: string;
}

export function renderSessionRevokedEmail(input: SessionRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেশন বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার একটি সেশন বাতিল করা হয়েছে।</p>
        <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#fef3c7;border-radius:8px;">
          <tr><td style="padding:12px;">ডিভাইস:</td><td style="padding:12px;text-align:right;">${input.deviceInfo ?? 'Unknown'}</td></tr>
          <tr><td style="padding:12px;">সময়:</td><td style="padding:12px;text-align:right;">${input.revokedAt}</td></tr>
          <tr><td style="padding:12px;">কারণ:</td><td style="padding:12px;text-align:right;">${input.reason ?? 'Manual revoke'}</td></tr>
        </table>
        <p>আপনি যদি এই কাজ না করে থাকেন, অবিলম্বে পাসওয়ার্ড পরিবর্তন করুন।</p>
      `,
      ctaButton: {
        label: 'সেশন দেখুন',
        url: 'https://vubon.com.bd/account/sessions',
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Session Revoked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A session on your account has been revoked.</p>
      <table style="width:100%;margin:20px 0;border-collapse:collapse;background:#fef3c7;border-radius:8px;">
        <tr><td style="padding:12px;">Device:</td><td style="padding:12px;text-align:right;">${input.deviceInfo ?? 'Unknown'}</td></tr>
        <tr><td style="padding:12px;">Time:</td><td style="padding:12px;text-align:right;">${input.revokedAt}</td></tr>
        <tr><td style="padding:12px;">Reason:</td><td style="padding:12px;text-align:right;">${input.reason ?? 'Manual revoke'}</td></tr>
      </table>
    `,
    ctaButton: {
      label: 'View Sessions',
      url: 'https://vubon.com.bd/account/sessions',
      variant: 'primary',
    },
  });
}


// ═══════════════════════════════════════════════════════════
// AUTH LOCKED
// ═══════════════════════════════════════════════════════════
// CART CLEARED
// ═══════════════════════════════════════════════════════════
export interface CartClearedEmailInput {
  readonly name: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
  readonly cartId: string;
  readonly itemCount?: number;
  readonly clearedAt: string;
}

export function renderCartClearedEmail(input: CartClearedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট খালি করা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্ট খালি করা হয়েছে।</p>
        ${input.itemCount ? `<p>${input.itemCount}টি পণ্য সরানো হয়েছে।</p>` : ''}
        <p>নতুন করে শপিং শুরু করুন।</p>
      `,
      ctaButton: {
        label: 'শপিং শুরু করুন',
        url: 'https://vubon.com.bd/shop',
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Cart Cleared',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your cart has been cleared.</p>
      ${input.itemCount ? `<p>${input.itemCount} items were removed.</p>` : ''}
    `,
    ctaButton: {
      label: 'Start Shopping',
      url: 'https://vubon.com.bd/shop',
      variant: 'primary',
    },
  });
}


// ═══════════════════════════════════════════════════════════
// GUEST CART ABANDONED
// ═══════════════════════════════════════════════════════════
export interface GuestCartAbandonedEmailInput {
  readonly name: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
  readonly cartId: string;
  readonly itemCount?: number;
  readonly totalAmount?: number;
  readonly currency?: string;
  readonly abandonedAt: string;
}

export function renderGuestCartAbandonedEmail(input: GuestCartAbandonedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmtAmount = isBangla
    ? `৳${(input.totalAmount ?? 0).toLocaleString('bn-BD')}`
    : `৳${(input.totalAmount ?? 0).toLocaleString('en-BD')}`;

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপনার কার্ট অপেক্ষা করছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>🛒 আপনি কিছু পণ্য কার্টে রেখে গেছেন!</p>
        ${input.itemCount ? `<p>${input.itemCount}টি পণ্য অপেক্ষা করছে${input.totalAmount ? ` (মোট: ${fmtAmount})` : ''}।</p>` : ''}
        <p>এখনই অর্ডার সম্পন্ন করুন।</p>
      `,
      ctaButton: {
        label: 'কার্টে ফিরে যান',
        url: `https://vubon.com.bd/cart`,
        variant: 'primary',
      },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'Your Cart is Waiting',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>🛒 You left some items in your cart!</p>
      ${input.itemCount ? `<p>${input.itemCount} items waiting${input.totalAmount ? ` (Total: ${fmtAmount})` : ''}.</p>` : ''}
    `,
    ctaButton: {
      label: 'Return to Cart',
      url: `https://vubon.com.bd/cart`,
      variant: 'primary',
    },
  });
}


// ═══════════════════════════════════════════════════════════
// USER SECURITY EVENT
// ═══════════════════════════════════════════════════════════
// AUTH LOCKED

// ═══════════════════════════════════════════════════════════
// CART ITEM MOVED TO CART (from saved-for-later)
// ═══════════════════════════════════════════════════════════
export interface CartItemMovedToCartEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName: string;
  readonly quantity?: number;
  readonly cartUrl?: string;
}

export function renderCartItemMovedToCartEmail(input: CartItemMovedToCartEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্টে সরানো হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার সেভ করা পণ্য কার্টে সরানো হয়েছে।</p>
        <p><strong>${input.productName}</strong>${input.quantity ? ` (${input.quantity}টি)` : ''} এখন আপনার কার্টে আছে।</p>
      `,
      ctaButton: { label: 'কার্ট দেখুন', url: input.cartUrl ?? 'https://vubon.com.bd/cart', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Moved to Cart',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your saved item has been moved to cart.</p>
      <p><strong>${input.productName}</strong>${input.quantity ? ` (${input.quantity})` : ''} is now in your cart.</p>
    `,
    ctaButton: { label: 'View Cart', url: input.cartUrl ?? 'https://vubon.com.bd/cart', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CART ITEM STATUS CHANGED
// ═══════════════════════════════════════════════════════════
export interface CartItemStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName: string;
  readonly fromStatus?: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export function renderCartItemStatusChangedEmail(input: CartItemStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট আইটেম আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার কার্টে একটি পণ্যের স্ট্যাটাস পরিবর্তন হয়েছে।</p>
        <p><strong>${input.productName}</strong></p>
        <p>নতুন স্ট্যাটাস: <strong>${input.toStatus}</strong>${input.reason ? `<br/>কারণ: ${input.reason}` : ''}</p>
      `,
      ctaButton: { label: 'কার্ট দেখুন', url: 'https://vubon.com.bd/cart', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cart Item Updated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>An item in your cart has changed status.</p>
      <p><strong>${input.productName}</strong></p>
      <p>New status: <strong>${input.toStatus}</strong>${input.reason ? `<br/>Reason: ${input.reason}` : ''}</p>
    `,
    ctaButton: { label: 'View Cart', url: 'https://vubon.com.bd/cart', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// GUEST CART EXPIRED
// ═══════════════════════════════════════════════════════════
export interface GuestCartExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly cartId: string;
  readonly expiredAt: string;
}

export function renderGuestCartExpiredEmail(input: GuestCartExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গেস্ট কার্টের মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার গেস্ট কার্টের মেয়াদ শেষ হয়েছে।</p>
        <p>পণ্যগুলো সংরক্ষণ করতে লগইন করুন।</p>
      `,
      ctaButton: { label: 'লগইন করুন', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Guest Cart Expired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your guest cart has expired.</p>
      <p>Sign in to save your items.</p>
    `,
    ctaButton: { label: 'Sign In', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// GUEST CART STATUS CHANGED
// ═══════════════════════════════════════════════════════════
export interface GuestCartStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly cartId: string;
  readonly toStatus: string;
}

export function renderGuestCartStatusChangedEmail(input: GuestCartStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গেস্ট কার্ট স্ট্যাটাস',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>গেস্ট কার্টের স্ট্যাটাস: <strong>${input.toStatus}</strong></p>`,
      ctaButton: { label: 'কার্ট দেখুন', url: 'https://vubon.com.bd/cart', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Guest Cart Status',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Guest cart status: <strong>${input.toStatus}</strong></p>`,
    ctaButton: { label: 'View Cart', url: 'https://vubon.com.bd/cart', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SAVED FOR LATER REMOVED
// ═══════════════════════════════════════════════════════════
export interface SavedForLaterRemovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName: string;
}

export function renderSavedForLaterRemovedEmail(input: SavedForLaterRemovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেভ লিস্ট আপডেট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p><strong>${input.productName}</strong> আপনার সেভ লিস্ট থেকে সরানো হয়েছে।</p>`,
      ctaButton: { label: 'শপিং করুন', url: 'https://vubon.com.bd/shop', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Saved List Updated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p><strong>${input.productName}</strong> has been removed from your saved list.</p>`,
    ctaButton: { label: 'Shop Now', url: 'https://vubon.com.bd/shop', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SAVED FOR LATER STATUS CHANGED
// ═══════════════════════════════════════════════════════════
export interface SavedForLaterStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName: string;
  readonly toStatus: string;
}

export function renderSavedForLaterStatusChangedEmail(input: SavedForLaterStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেভ লিস্ট স্ট্যাটাস',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p><strong>${input.productName}</strong> — নতুন স্ট্যাটাস: ${input.toStatus}</p>`,
      ctaButton: { label: 'সেভ লিস্ট দেখুন', url: 'https://vubon.com.bd/saved', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Saved List Status',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p><strong>${input.productName}</strong> — New status: ${input.toStatus}</p>`,
    ctaButton: { label: 'View Saved List', url: 'https://vubon.com.bd/saved', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// AUTH ACTIVATED
// ═══════════════════════════════════════════════════════════
export interface AuthActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly activatedAt: string;
}

export function renderAuthActivatedEmail(input: AuthActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট চালু',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার অ্যাকাউন্ট সক্রিয় করা হয়েছে। এখনই শপিং শুরু করুন।</p>`,
      ctaButton: { label: 'শপিং শুরু করুন', url: 'https://vubon.com.bd/shop', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Activated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your account has been activated. Start shopping now!</p>`,
    ctaButton: { label: 'Start Shopping', url: 'https://vubon.com.bd/shop', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// AUTH DEACTIVATED
// ═══════════════════════════════════════════════════════════
export interface AuthDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly reason?: string;
}

export function renderAuthDeactivatedEmail(input: AuthDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট নিষ্ক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে।${input.reason ? `<br/>কারণ: ${input.reason}` : ''}</p>`,
      ctaButton: { label: 'সাপোর্টে যোগাযোগ', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Deactivated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your account has been deactivated.${input.reason ? `<br/>Reason: ${input.reason}` : ''}</p>`,
    ctaButton: { label: 'Contact Support', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// AUTH PHONE VERIFIED
// ═══════════════════════════════════════════════════════════
export interface AuthPhoneVerifiedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly phone: string;
  readonly verifiedAt: string;
}

export function renderAuthPhoneVerifiedEmail(input: AuthPhoneVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ফোন যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার ফোন নম্বর <strong>${input.phone}</strong> সফলভাবে যাচাই করা হয়েছে।</p>`,
      ctaButton: { label: 'অ্যাকাউন্ট দেখুন', url: 'https://vubon.com.bd/account', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Phone Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your phone number <strong>${input.phone}</strong> has been verified successfully.</p>`,
    ctaButton: { label: 'View Account', url: 'https://vubon.com.bd/account', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// BIOMETRIC FAILED
// ═══════════════════════════════════════════════════════════
export interface BiometricFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly attemptCount?: number;
  readonly occurredAt: string;
}

export function renderBiometricFailedEmail(input: BiometricFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বায়োমেট্রিক লগইন ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ আপনার অ্যাকাউন্টে বায়োমেট্রিক লগইন ব্যর্থ হয়েছে।</p>
        ${input.attemptCount ? `<p>প্রচেষ্টা: ${input.attemptCount} বার</p>` : ''}
        <p>সময়: ${input.occurredAt}</p>
        <p>আপনি যদি এই কাজ না করে থাকেন, অবিলম্বে পাসওয়ার্ড পরিবর্তন করুন।</p>
      `,
      ctaButton: { label: 'পাসওয়ার্ড পরিবর্তন', url: 'https://vubon.com.bd/account/password', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Biometric Login Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ A biometric login attempt on your account failed.</p>
      ${input.attemptCount ? `<p>Attempts: ${input.attemptCount}</p>` : ''}
      <p>Time: ${input.occurredAt}</p>
    `,
    ctaButton: { label: 'Change Password', url: 'https://vubon.com.bd/account/password', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// BIOMETRIC VERIFIED
// ═══════════════════════════════════════════════════════════
export interface BiometricVerifiedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly verifiedAt: string;
}

export function renderBiometricVerifiedEmail(input: BiometricVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বায়োমেট্রিক যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ বায়োমেট্রিক লগইন সফলভাবে সম্পন্ন হয়েছে।</p><p>সময়: ${input.verifiedAt}</p>`,
      ctaButton: { label: 'অ্যাকাউন্ট দেখুন', url: 'https://vubon.com.bd/account', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Biometric Verified',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Biometric login successful.</p><p>Time: ${input.verifiedAt}</p>`,
    ctaButton: { label: 'View Account', url: 'https://vubon.com.bd/account', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// DEVICE UNREGISTERED
// ═══════════════════════════════════════════════════════════
export interface DeviceUnregisteredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly deviceName?: string;
  readonly unregisteredAt: string;
}

export function renderDeviceUnregisteredEmail(input: DeviceUnregisteredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডিভাইস সরানো হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্ট থেকে একটি ডিভাইস সরানো হয়েছে।</p>
        ${input.deviceName ? `<p>ডিভাইস: <strong>${input.deviceName}</strong></p>` : ''}
        <p>সময়: ${input.unregisteredAt}</p>
      `,
      ctaButton: { label: 'ডিভাইস দেখুন', url: 'https://vubon.com.bd/account/devices', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Device Removed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>A device has been removed from your account.</p>
      ${input.deviceName ? `<p>Device: <strong>${input.deviceName}</strong></p>` : ''}
      <p>Time: ${input.unregisteredAt}</p>
    `,
    ctaButton: { label: 'View Devices', url: 'https://vubon.com.bd/account/devices', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// KYC REJECTED
// ═══════════════════════════════════════════════════════════
export interface KycRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly reason: string;
  readonly rejectedAt: string;
}

export function renderKycRejectedEmail(input: KycRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'KYC প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>❌ দুঃখিত, আপনার KYC যাচাই প্রত্যাখ্যাত হয়েছে।</p>
        <p><strong>কারণ:</strong> ${input.reason}</p>
        <p>পুনরায় সঠিক তথ্য দিয়ে জমা দিন।</p>
      `,
      ctaButton: { label: 'পুনরায় জমা দিন', url: 'https://vubon.com.bd/account/kyc', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'KYC Rejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>❌ Your KYC verification was rejected.</p>
      <p><strong>Reason:</strong> ${input.reason}</p>
      <p>Please resubmit with correct documents.</p>
    `,
    ctaButton: { label: 'Resubmit', url: 'https://vubon.com.bd/account/kyc', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// KYC SUBMITTED
// ═══════════════════════════════════════════════════════════
export interface KycSubmittedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly submittedAt: string;
}

export function renderKycSubmittedEmail(input: KycSubmittedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'KYC জমা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>✅ আপনার KYC ডকুমেন্ট জমা হয়েছে।</p>
        <p>আমরা ২৪-৪৮ ঘন্টার মধ্যে যাচাই করব।</p>
        <p>জমার সময়: ${input.submittedAt}</p>
      `,
      ctaButton: { label: 'স্ট্যাটাস দেখুন', url: 'https://vubon.com.bd/account/kyc', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'KYC Submitted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>✅ Your KYC documents have been submitted.</p>
      <p>We will verify within 24-48 hours.</p>
      <p>Submitted at: ${input.submittedAt}</p>
    `,
    ctaButton: { label: 'View Status', url: 'https://vubon.com.bd/account/kyc', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// LOGIN ATTEMPT FAILED
// ═══════════════════════════════════════════════════════════
export interface LoginAttemptFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly attemptCount?: number;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly occurredAt: string;
}

export function renderLoginAttemptFailedEmail(input: LoginAttemptFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'লগইন ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ আপনার অ্যাকাউন্টে একটি লগইন প্রচেষ্টা ব্যর্থ হয়েছে।</p>
        ${input.attemptCount ? `<p>প্রচেষ্টা: ${input.attemptCount} বার</p>` : ''}
        ${input.ipAddress ? `<p>IP: <code>${input.ipAddress}</code></p>` : ''}
        <p>সময়: ${input.occurredAt}</p>
        <p><strong>আপনি যদি এই কাজ না করে থাকেন, পাসওয়ার্ড পরিবর্তন করুন।</strong></p>
      `,
      ctaButton: { label: 'পাসওয়ার্ড পরিবর্তন', url: 'https://vubon.com.bd/auth/forgot-password', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Login Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ A login attempt on your account failed.</p>
      ${input.attemptCount ? `<p>Attempts: ${input.attemptCount}</p>` : ''}
      ${input.ipAddress ? `<p>IP: <code>${input.ipAddress}</code></p>` : ''}
      <p>Time: ${input.occurredAt}</p>
    `,
    ctaButton: { label: 'Change Password', url: 'https://vubon.com.bd/auth/forgot-password', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// MFA CHALLENGE CREATED
// ═══════════════════════════════════════════════════════════
export interface MfaChallengeCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly method: string;
  readonly expiresAt?: string;
}

export function renderMfaChallengeCreatedEmail(input: MfaChallengeCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'MFA চ্যালেঞ্জ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টে MFA চ্যালেঞ্জ তৈরি হয়েছে।</p>
        <p>পদ্ধতি: <strong>${input.method}</strong></p>
        ${input.expiresAt ? `<p>মেয়াদ: ${input.expiresAt}</p>` : ''}
      `,
      ctaButton: { label: 'যাচাই করুন', url: 'https://vubon.com.bd/auth/mfa', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'MFA Challenge',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>An MFA challenge has been created on your account.</p>
      <p>Method: <strong>${input.method}</strong></p>
      ${input.expiresAt ? `<p>Expires: ${input.expiresAt}</p>` : ''}
    `,
    ctaButton: { label: 'Verify', url: 'https://vubon.com.bd/auth/mfa', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// MFA CHALLENGE FAILED
// ═══════════════════════════════════════════════════════════
export interface MfaChallengeFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly method: string;
  readonly reason?: string;
  readonly occurredAt: string;
}

export function renderMfaChallengeFailedEmail(input: MfaChallengeFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'MFA চ্যালেঞ্জ ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>⚠️ MFA চ্যালেঞ্জ যাচাই ব্যর্থ হয়েছে।</p>
        <p>পদ্ধতি: ${input.method}</p>
        ${input.reason ? `<p>কারণ: ${input.reason}</p>` : ''}
        <p>সময়: ${input.occurredAt}</p>
      `,
      ctaButton: { label: 'আবার চেষ্টা করুন', url: 'https://vubon.com.bd/auth/mfa', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'MFA Challenge Failed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>⚠️ MFA challenge verification failed.</p>
      <p>Method: ${input.method}</p>
      ${input.reason ? `<p>Reason: ${input.reason}</p>` : ''}
      <p>Time: ${input.occurredAt}</p>
    `,
    ctaButton: { label: 'Try Again', url: 'https://vubon.com.bd/auth/mfa', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SESSION EXPIRED
// ═══════════════════════════════════════════════════════════
export interface SessionExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly expiredAt: string;
  readonly reason?: string;
}

export function renderSessionExpiredEmail(input: SessionExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেশনের মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার সেশনের মেয়াদ শেষ হয়েছে।</p>
        ${input.reason ? `<p>কারণ: ${input.reason}</p>` : ''}
        <p>সময়: ${input.expiredAt}</p>
      `,
      ctaButton: { label: 'পুনরায় লগইন', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Session Expired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>Your session has expired.</p>
      ${input.reason ? `<p>Reason: ${input.reason}</p>` : ''}
      <p>Time: ${input.expiredAt}</p>
    `,
    ctaButton: { label: 'Sign In Again', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// ACCOUNT LOCK EXTENDED
// ═══════════════════════════════════════════════════════════
export interface AccountLockExtendedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly previousLockUntil?: string;
  readonly newLockUntil: string;
  readonly extendedAt: string;
}

export function renderAccountLockExtendedEmail(input: AccountLockExtendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাকাউন্ট লক বাড়ানো হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>🔒 আপনার অ্যাকাউন্টের লক সময় বাড়ানো হয়েছে।</p>
        <p>নতুন লক মুক্তির সময়: <strong>${input.newLockUntil}</strong></p>
        ${input.previousLockUntil ? `<p>আগের সময়: ${input.previousLockUntil}</p>` : ''}
      `,
      ctaButton: { label: 'সাপোর্টে যোগাযোগ', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Account Lock Extended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>🔒 Your account lock period has been extended.</p>
      <p>New unlock time: <strong>${input.newLockUntil}</strong></p>
      ${input.previousLockUntil ? `<p>Previous: ${input.previousLockUntil}</p>` : ''}
    `,
    ctaButton: { label: 'Contact Support', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// AUTH REVOKED
// ═══════════════════════════════════════════════════════════
export interface AuthRevokedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly revokedAt: string;
  readonly reason?: string;
}

export function renderAuthRevokedEmail(input: AuthRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অ্যাক্সেস প্রত্যাহার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>আপনার অ্যাকাউন্টের একটি অ্যাক্সেস প্রত্যাহার করা হয়েছে।</p>
        ${input.reason ? `<p>কারণ: ${input.reason}</p>` : ''}
        <p>সময়: ${input.revokedAt}</p>
      `,
      ctaButton: { label: 'অ্যাকাউন্ট দেখুন', url: 'https://vubon.com.bd/account', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Access Revoked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>An access token on your account has been revoked.</p>
      ${input.reason ? `<p>Reason: ${input.reason}</p>` : ''}
      <p>Time: ${input.revokedAt}</p>
    `,
    ctaButton: { label: 'View Account', url: 'https://vubon.com.bd/account', variant: 'primary' },
  });
}



// ═══════════════════════════════════════════════════════════
// 1. PAYOUT APPROVED
// ═══════════════════════════════════════════════════════════
export interface PayoutApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly amount?: number;
  readonly currency?: string;
  readonly approvedAt?: string;
}

export function renderPayoutApprovedEmail(input: PayoutApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেআউট অনুমোদিত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার পেআউট অনুমোদিত হয়েছে।</p><p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'পেআউট দেখুন', url: 'https://vubon.com.bd/vendor/payouts', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payout Approved',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your payout has been approved.</p><p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Payout', url: 'https://vubon.com.bd/vendor/payouts', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 2. SUBSCRIPTION RENEWED
// ═══════════════════════════════════════════════════════════
export interface SubscriptionRenewedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly planName?: string;
  readonly renewedUntil?: string;
  readonly amount?: number;
}

export function renderSubscriptionRenewedEmail(input: SubscriptionRenewedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সাবস্ক্রিপশন রিনিউ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার সাবস্ক্রিপশন সফলভাবে রিনিউ হয়েছে।</p>
        ${input.planName ? `<p><strong>প্ল্যান:</strong> ${input.planName}</p>` : ''}
        ${input.renewedUntil ? `<p><strong>বৈধতা:</strong> ${input.renewedUntil}</p>` : ''}
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'সাবস্ক্রিপশন দেখুন', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Subscription Renewed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your subscription has been renewed.</p>
      ${input.planName ? `<p><strong>Plan:</strong> ${input.planName}</p>` : ''}
      ${input.renewedUntil ? `<p><strong>Valid until:</strong> ${input.renewedUntil}</p>` : ''}
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Subscription', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 3. USER ADDRESS ADDED
// ═══════════════════════════════════════════════════════════
export interface UserAddressAddedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly addressLabel?: string;
  readonly city?: string;
}

export function renderUserAddressAddedEmail(input: UserAddressAddedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন ঠিকানা যোগ হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার অ্যাকাউন্টে একটি নতুন ঠিকানা যোগ হয়েছে।</p>
        ${input.addressLabel ? `<p><strong>লেবেল:</strong> ${input.addressLabel}</p>` : ''}
        ${input.city ? `<p><strong>শহর:</strong> ${input.city}</p>` : ''}`,
      ctaButton: { label: 'ঠিকানা দেখুন', url: 'https://vubon.com.bd/account/addresses', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Address Added',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ A new address has been added to your account.</p>
      ${input.addressLabel ? `<p><strong>Label:</strong> ${input.addressLabel}</p>` : ''}
      ${input.city ? `<p><strong>City:</strong> ${input.city}</p>` : ''}`,
    ctaButton: { label: 'View Addresses', url: 'https://vubon.com.bd/account/addresses', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 4. USER CONTACT ADDED
// ═══════════════════════════════════════════════════════════
export interface UserContactAddedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly contactType?: string;
  readonly maskedValue?: string;
}

export function renderUserContactAddedEmail(input: UserContactAddedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন যোগাযোগ যোগ হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার অ্যাকাউন্টে নতুন যোগাযোগ যোগ করা হয়েছে।</p>
        ${input.contactType ? `<p><strong>ধরন:</strong> ${input.contactType}</p>` : ''}
        ${input.maskedValue ? `<p><strong>মান:</strong> ${input.maskedValue}</p>` : ''}`,
      ctaButton: { label: 'যোগাযোগ দেখুন', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'New Contact Added',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ A new contact has been added to your account.</p>
      ${input.contactType ? `<p><strong>Type:</strong> ${input.contactType}</p>` : ''}
      ${input.maskedValue ? `<p><strong>Value:</strong> ${input.maskedValue}</p>` : ''}`,
    ctaButton: { label: 'View Contacts', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 5. REFUND REQUESTED
// ═══════════════════════════════════════════════════════════
export interface RefundRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly refundId: string;
  readonly orderId?: string;
  readonly amount?: number;
  readonly reason?: string;
  readonly requestedAt?: string;
}

export function renderRefundRequestedEmail(input: RefundRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড অনুরোধ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার রিফান্ড অনুরোধ গ্রহণ করা হয়েছে।</p>
        <p><strong>রিফান্ড ID:</strong> ${input.refundId}</p>
        ${input.orderId ? `<p><strong>অর্ডার:</strong> #${input.orderId}</p>` : ''}
        <p><strong>পরিমাণ:</strong> ${fmt}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'রিফান্ড দেখুন', url: 'https://vubon.com.bd/refunds', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Requested',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your refund request has been received.</p>
      <p><strong>Refund ID:</strong> ${input.refundId}</p>
      ${input.orderId ? `<p><strong>Order:</strong> #${input.orderId}</p>` : ''}
      <p><strong>Amount:</strong> ${fmt}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'View Refund', url: 'https://vubon.com.bd/refunds', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 6. REFUND APPROVED
// ═══════════════════════════════════════════════════════════
export interface RefundApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly refundId: string;
  readonly amount?: number;
  readonly approvedAt?: string;
}

export function renderRefundApprovedEmail(input: RefundApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড অনুমোদিত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার রিফান্ড অনুমোদিত হয়েছে।</p>
        <p><strong>রিফান্ড ID:</strong> ${input.refundId}</p>
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'রিফান্ড দেখুন', url: 'https://vubon.com.bd/refunds', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Approved',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your refund has been approved.</p>
      <p><strong>Refund ID:</strong> ${input.refundId}</p>
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Refund', url: 'https://vubon.com.bd/refunds', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 7. SUBSCRIPTION EXPIRED
// ═══════════════════════════════════════════════════════════
export interface SubscriptionExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly planName?: string;
  readonly expiredAt?: string;
}

export function renderSubscriptionExpiredEmail(input: SubscriptionExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সাবস্ক্রিপশন মেয়াদ শেষ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>⚠️ আপনার সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে।</p>
        ${input.planName ? `<p><strong>প্ল্যান:</strong> ${input.planName}</p>` : ''}
        ${input.expiredAt ? `<p><strong>মেয়াদ শেষ:</strong> ${input.expiredAt}</p>` : ''}
        <p>পুনরায় সাবস্ক্রাইব করুন।</p>`,
      ctaButton: { label: 'পুনরায় সাবস্ক্রাইব', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Subscription Expired',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>⚠️ Your subscription has expired.</p>
      ${input.planName ? `<p><strong>Plan:</strong> ${input.planName}</p>` : ''}
      ${input.expiredAt ? `<p><strong>Expired:</strong> ${input.expiredAt}</p>` : ''}`,
    ctaButton: { label: 'Resubscribe', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 8. REFUND REJECTED
// ═══════════════════════════════════════════════════════════
export interface RefundRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly refundId: string;
  readonly reason?: string;
  readonly rejectedAt?: string;
}

export function renderRefundRejectedEmail(input: RefundRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিফান্ড প্রত্যাখ্যাত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>❌ দুঃখিত, আপনার রিফান্ড অনুরোধ প্রত্যাখ্যাত হয়েছে।</p>
        <p><strong>রিফান্ড ID:</strong> ${input.refundId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>প্রশ্ন থাকলে সাপোর্টে যোগাযোগ করুন।</p>`,
      ctaButton: { label: 'সাপোর্টে যোগাযোগ', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Refund Rejected',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>❌ Sorry, your refund request has been rejected.</p>
      <p><strong>Refund ID:</strong> ${input.refundId}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'Contact Support', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 9. PAYMENT CANCELLED
// ═══════════════════════════════════════════════════════════
export interface PaymentCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly paymentId: string;
  readonly orderId?: string;
  readonly amount?: number;
  readonly cancelledAt?: string;
}

export function renderPaymentCancelledEmail(input: PaymentCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট বাতিল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার পেমেন্ট বাতিল করা হয়েছে।</p>
        <p><strong>পেমেন্ট ID:</strong> ${input.paymentId}</p>
        ${input.orderId ? `<p><strong>অর্ডার:</strong> #${input.orderId}</p>` : ''}
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'অর্ডার দেখুন', url: `https://vubon.com.bd/orders/${input.orderId ?? ''}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Cancelled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your payment has been cancelled.</p>
      <p><strong>Payment ID:</strong> ${input.paymentId}</p>
      ${input.orderId ? `<p><strong>Order:</strong> #${input.orderId}</p>` : ''}
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Order', url: `https://vubon.com.bd/orders/${input.orderId ?? ''}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 10. APPROVAL APPEALED
// ═══════════════════════════════════════════════════════════
export interface ApprovalAppealedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly appealId?: string;
  readonly reason?: string;
  readonly appealedAt?: string;
}

export function renderApprovalAppealedEmail(input: ApprovalAppealedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপিল জমা হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার আপিল জমা হয়েছে।</p>
        ${input.appealId ? `<p><strong>আপিল ID:</strong> ${input.appealId}</p>` : ''}
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>আমরা ২-৩ কর্মদিবসে সিদ্ধান্ত জানাব।</p>`,
      ctaButton: { label: 'স্ট্যাটাস দেখুন', url: 'https://vubon.com.bd/vendor/appeals', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Appeal Submitted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your appeal has been submitted.</p>
      ${input.appealId ? `<p><strong>Appeal ID:</strong> ${input.appealId}</p>` : ''}
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}
      <p>We will respond within 2-3 business days.</p>`,
    ctaButton: { label: 'View Status', url: 'https://vubon.com.bd/vendor/appeals', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 11. APPROVAL INFO REQUESTED
// ═══════════════════════════════════════════════════════════
export interface ApprovalInfoRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly requestedItems?: string;
  readonly requestedAt?: string;
}

export function renderApprovalInfoRequestedEmail(input: ApprovalInfoRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অতিরিক্ত তথ্য প্রয়োজন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার vendor approval প্রক্রিয়ায় অতিরিক্ত তথ্য প্রয়োজন।</p>
        ${input.requestedItems ? `<p><strong>প্রয়োজন:</strong> ${input.requestedItems}</p>` : ''}
        <p>অনুগ্রহ করে দ্রুত জমা দিন।</p>`,
      ctaButton: { label: 'তথ্য জমা দিন', url: 'https://vubon.com.bd/vendor/approval', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Additional Information Required',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Additional information is required for your vendor approval.</p>
      ${input.requestedItems ? `<p><strong>Required:</strong> ${input.requestedItems}</p>` : ''}
      <p>Please submit promptly.</p>`,
    ctaButton: { label: 'Submit Info', url: 'https://vubon.com.bd/vendor/approval', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 12. COMMISSION CALCULATED
// ═══════════════════════════════════════════════════════════
export interface CommissionCalculatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly period?: string;
  readonly amount?: number;
  readonly calculatedAt?: string;
}

export function renderCommissionCalculatedEmail(input: CommissionCalculatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কমিশন গণনা সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার কমিশন গণনা সম্পন্ন হয়েছে।</p>
        ${input.period ? `<p><strong>সময়কাল:</strong> ${input.period}</p>` : ''}
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'কমিশন দেখুন', url: 'https://vubon.com.bd/vendor/commission', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Commission Calculated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your commission has been calculated.</p>
      ${input.period ? `<p><strong>Period:</strong> ${input.period}</p>` : ''}
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Commission', url: 'https://vubon.com.bd/vendor/commission', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 13. SETTLEMENT COMPLETED
// ═══════════════════════════════════════════════════════════
export interface SettlementCompletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly settlementId: string;
  readonly amount?: number;
  readonly completedAt?: string;
}

export function renderSettlementCompletedEmail(input: SettlementCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেটেলমেন্ট সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার সেটেলমেন্ট সম্পন্ন হয়েছে।</p>
        <p><strong>সেটেলমেন্ট ID:</strong> ${input.settlementId}</p>
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'সেটেলমেন্ট দেখুন', url: 'https://vubon.com.bd/vendor/settlements', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Settlement Completed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your settlement has been completed.</p>
      <p><strong>Settlement ID:</strong> ${input.settlementId}</p>
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Settlement', url: 'https://vubon.com.bd/vendor/settlements', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 14. CART MERGED
// ═══════════════════════════════════════════════════════════
export interface CartMergedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly itemCount?: number;
  readonly mergedAt?: string;
}

export function renderCartMergedEmail(input: CartMergedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'কার্ট একীভূত হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার গেস্ট কার্ট আপনার অ্যাকাউন্টের সাথে একীভূত হয়েছে।</p>
        ${input.itemCount ? `<p><strong>পণ্য সংখ্যা:</strong> ${input.itemCount}টি</p>` : ''}`,
      ctaButton: { label: 'কার্ট দেখুন', url: 'https://vubon.com.bd/cart', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Cart Merged',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your guest cart has been merged with your account cart.</p>
      ${input.itemCount ? `<p><strong>Items:</strong> ${input.itemCount}</p>` : ''}`,
    ctaButton: { label: 'View Cart', url: 'https://vubon.com.bd/cart', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 15. CART ITEM SAVED FOR LATER
// ═══════════════════════════════════════════════════════════
export interface CartItemSavedForLaterEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly quantity?: number;
}

export function renderCartItemSavedForLaterEmail(input: CartItemSavedForLaterEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পরে কেনার জন্য সেভ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ পণ্য সেভ করা হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.quantity ? `<p><strong>পরিমাণ:</strong> ${input.quantity}টি</p>` : ''}
        <p>পরে সেভ লিস্ট থেকে কার্টে যোগ করতে পারবেন।</p>`,
      ctaButton: { label: 'সেভ লিস্ট দেখুন', url: 'https://vubon.com.bd/saved', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Saved for Later',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Item has been saved for later.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.quantity ? `<p><strong>Quantity:</strong> ${input.quantity}</p>` : ''}`,
    ctaButton: { label: 'View Saved List', url: 'https://vubon.com.bd/saved', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 16. REVIEW APPROVED
// ═══════════════════════════════════════════════════════════
export interface ReviewApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly rating?: number;
}

export function renderReviewApprovedEmail(input: ReviewApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিভিউ অনুমোদিত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার রিভিউ অনুমোদিত হয়েছে এবং পাবলিশ হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.rating ? `<p><strong>রেটিং:</strong> ${input.rating}⭐</p>` : ''}
        <p>অন্যান্য গ্রাহকদের সাহায্য করার জন্য ধন্যবাদ!</p>`,
      ctaButton: { label: 'রিভিউ দেখুন', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Review Approved',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your review has been approved and published.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.rating ? `<p><strong>Rating:</strong> ${input.rating}⭐</p>` : ''}
      <p>Thank you for helping other customers!</p>`,
    ctaButton: { label: 'View Review', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 17. REVIEW REPORTED
// ═══════════════════════════════════════════════════════════
export interface ReviewReportedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly reason?: string;
}

export function renderReviewReportedEmail(input: ReviewReportedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিভিউ রিপোর্ট হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>একটি রিভিউ রিপোর্ট করা হয়েছে এবং আমরা পর্যালোচনা করছি।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'রিভিউ দেখুন', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Review Reported',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A review has been reported and is under review.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'View Reviews', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 18. BRAND CREATED
// ═══════════════════════════════════════════════════════════
export interface BrandCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly brandName?: string;
  readonly brandSlug?: string;
}

export function renderBrandCreatedEmail(input: BrandCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নতুন ব্র্যান্ড তৈরি',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ নতুন ব্র্যান্ড তৈরি হয়েছে।</p>
        ${input.brandName ? `<p><strong>ব্র্যান্ড:</strong> ${input.brandName}</p>` : ''}`,
      ctaButton: { label: 'ব্র্যান্ড দেখুন', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Brand Created',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ New brand has been created.</p>
      ${input.brandName ? `<p><strong>Brand:</strong> ${input.brandName}</p>` : ''}`,
    ctaButton: { label: 'View Brand', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 19. BRAND UPDATED
// ═══════════════════════════════════════════════════════════
export interface BrandUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly brandName?: string;
  readonly updatedFields?: string;
}

export function renderBrandUpdatedEmail(input: BrandUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্র্যান্ড আপডেট',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ ব্র্যান্ড তথ্য আপডেট হয়েছে।</p>
        ${input.brandName ? `<p><strong>ব্র্যান্ড:</strong> ${input.brandName}</p>` : ''}
        ${input.updatedFields ? `<p><strong>আপডেট:</strong> ${input.updatedFields}</p>` : ''}`,
      ctaButton: { label: 'ব্র্যান্ড দেখুন', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Brand Updated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Brand has been updated.</p>
      ${input.brandName ? `<p><strong>Brand:</strong> ${input.brandName}</p>` : ''}
      ${input.updatedFields ? `<p><strong>Updated:</strong> ${input.updatedFields}</p>` : ''}`,
    ctaButton: { label: 'View Brand', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 20. BRAND ACTIVATED
// ═══════════════════════════════════════════════════════════
export interface BrandActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly brandName?: string;
  readonly activatedAt?: string;
}

export function renderBrandActivatedEmail(input: BrandActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্র্যান্ড সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ ব্র্যান্ড সক্রিয় করা হয়েছে।</p>
        ${input.brandName ? `<p><strong>ব্র্যান্ড:</strong> ${input.brandName}</p>` : ''}`,
      ctaButton: { label: 'ব্র্যান্ড দেখুন', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Brand Activated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Brand has been activated.</p>
      ${input.brandName ? `<p><strong>Brand:</strong> ${input.brandName}</p>` : ''}`,
    ctaButton: { label: 'View Brand', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
  });
}



// ═══════════════════════════════════════════════════════════
// 21. BRAND DEACTIVATED
// ═══════════════════════════════════════════════════════════
export interface BrandDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly brandName?: string;
  readonly reason?: string;
}

export function renderBrandDeactivatedEmail(input: BrandDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্র্যান্ড নিষ্ক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>ব্র্যান্ড নিষ্ক্রিয় করা হয়েছে।</p>
        ${input.brandName ? `<p><strong>ব্র্যান্ড:</strong> ${input.brandName}</p>` : ''}
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'ব্র্যান্ড দেখুন', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Brand Deactivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Brand has been deactivated.</p>
      ${input.brandName ? `<p><strong>Brand:</strong> ${input.brandName}</p>` : ''}
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'View Brand', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 22. BRAND DELETED
// ═══════════════════════════════════════════════════════════
export interface BrandDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly brandName?: string;
  readonly deletedAt?: string;
}

export function renderBrandDeletedEmail(input: BrandDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্র্যান্ড মুছে ফেলা হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>ব্র্যান্ড মুছে ফেলা হয়েছে।</p>
        ${input.brandName ? `<p><strong>ব্র্যান্ড:</strong> ${input.brandName}</p>` : ''}`,
      ctaButton: { label: 'ব্র্যান্ড দেখুন', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Brand Deleted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Brand has been deleted.</p>
      ${input.brandName ? `<p><strong>Brand:</strong> ${input.brandName}</p>` : ''}`,
    ctaButton: { label: 'View Brands', url: 'https://vubon.com.bd/admin/brands', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 23. CATEGORY DELETED
// ═══════════════════════════════════════════════════════════
export interface CategoryDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly categoryName?: string;
}

export function renderCategoryDeletedEmail(input: CategoryDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ক্যাটাগরি মুছে ফেলা',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>ক্যাটাগরি মুছে ফেলা হয়েছে।</p>
        ${input.categoryName ? `<p><strong>ক্যাটাগরি:</strong> ${input.categoryName}</p>` : ''}`,
      ctaButton: { label: 'ক্যাটাগরি দেখুন', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Category Deleted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Category has been deleted.</p>
      ${input.categoryName ? `<p><strong>Category:</strong> ${input.categoryName}</p>` : ''}`,
    ctaButton: { label: 'View Categories', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 24. CATEGORY ACTIVATED
// ═══════════════════════════════════════════════════════════
export interface CategoryActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly categoryName?: string;
}

export function renderCategoryActivatedEmail(input: CategoryActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ক্যাটাগরি সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ ক্যাটাগরি সক্রিয় করা হয়েছে।</p>
        ${input.categoryName ? `<p><strong>ক্যাটাগরি:</strong> ${input.categoryName}</p>` : ''}`,
      ctaButton: { label: 'ক্যাটাগরি দেখুন', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Category Activated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Category has been activated.</p>
      ${input.categoryName ? `<p><strong>Category:</strong> ${input.categoryName}</p>` : ''}`,
    ctaButton: { label: 'View Category', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 25. CATEGORY DEACTIVATED
// ═══════════════════════════════════════════════════════════
export interface CategoryDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly categoryName?: string;
}

export function renderCategoryDeactivatedEmail(input: CategoryDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ক্যাটাগরি নিষ্ক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>ক্যাটাগরি নিষ্ক্রিয় করা হয়েছে।</p>
        ${input.categoryName ? `<p><strong>ক্যাটাগরি:</strong> ${input.categoryName}</p>` : ''}`,
      ctaButton: { label: 'ক্যাটাগরি দেখুন', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Category Deactivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Category has been deactivated.</p>
      ${input.categoryName ? `<p><strong>Category:</strong> ${input.categoryName}</p>` : ''}`,
    ctaButton: { label: 'View Category', url: 'https://vubon.com.bd/admin/categories', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 26. REVIEW DELETED
// ═══════════════════════════════════════════════════════════
export interface ReviewDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly reason?: string;
}

export function renderReviewDeletedEmail(input: ReviewDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিভিউ মুছে ফেলা',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>একটি রিভিউ মুছে ফেলা হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'রিভিউ দেখুন', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Review Deleted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A review has been deleted.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'View Reviews', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 27. REVIEW UPDATED
// ═══════════════════════════════════════════════════════════
export interface ReviewUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly rating?: number;
}

export function renderReviewUpdatedEmail(input: ReviewUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিভিউ আপডেট',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার রিভিউ আপডেট হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.rating ? `<p><strong>রেটিং:</strong> ${input.rating}⭐</p>` : ''}`,
      ctaButton: { label: 'রিভিউ দেখুন', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Review Updated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your review has been updated.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.rating ? `<p><strong>Rating:</strong> ${input.rating}⭐</p>` : ''}`,
    ctaButton: { label: 'View Review', url: 'https://vubon.com.bd/reviews', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 28. MFA VERIFIED
// ═══════════════════════════════════════════════════════════
export interface MfaVerifiedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly method?: string;
  readonly verifiedAt?: string;
}

export function renderMfaVerifiedEmail(input: MfaVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'MFA যাচাই সফল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ MFA যাচাই সফল হয়েছে।</p>
        ${input.method ? `<p><strong>পদ্ধতি:</strong> ${input.method}</p>` : ''}`,
      ctaButton: { label: 'অ্যাকাউন্ট দেখুন', url: 'https://vubon.com.bd/account', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'MFA Verified',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ MFA verification successful.</p>
      ${input.method ? `<p><strong>Method:</strong> ${input.method}</p>` : ''}`,
    ctaButton: { label: 'View Account', url: 'https://vubon.com.bd/account', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 29. OAUTH CLIENT REGISTERED
// ═══════════════════════════════════════════════════════════
export interface OauthClientRegisteredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly clientName?: string;
  readonly clientId?: string;
}

export function renderOauthClientRegisteredEmail(input: OauthClientRegisteredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'OAuth ক্লায়েন্ট নিবন্ধিত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ নতুন OAuth ক্লায়েন্ট নিবন্ধিত হয়েছে।</p>
        ${input.clientName ? `<p><strong>ক্লায়েন্ট:</strong> ${input.clientName}</p>` : ''}
        ${input.clientId ? `<p><strong>Client ID:</strong> ${input.clientId}</p>` : ''}`,
      ctaButton: { label: 'ক্লায়েন্ট দেখুন', url: 'https://vubon.com.bd/admin/oauth', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'OAuth Client Registered',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ A new OAuth client has been registered.</p>
      ${input.clientName ? `<p><strong>Client:</strong> ${input.clientName}</p>` : ''}
      ${input.clientId ? `<p><strong>Client ID:</strong> ${input.clientId}</p>` : ''}`,
    ctaButton: { label: 'View Clients', url: 'https://vubon.com.bd/admin/oauth', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 30. TOKEN RESET COMPLETED
// ═══════════════════════════════════════════════════════════
export interface TokenResetCompletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly completedAt?: string;
  readonly ipAddress?: string;
}

export function renderTokenResetCompletedEmail(input: TokenResetCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'টোকেন রিসেট সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার টোকেন রিসেট সম্পন্ন হয়েছে।</p>
        ${input.completedAt ? `<p><strong>সময়:</strong> ${input.completedAt}</p>` : ''}
        ${input.ipAddress ? `<p><strong>IP:</strong> <code>${input.ipAddress}</code></p>` : ''}`,
      ctaButton: { label: 'লগইন করুন', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Token Reset Completed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your token reset has been completed.</p>
      ${input.completedAt ? `<p><strong>Time:</strong> ${input.completedAt}</p>` : ''}
      ${input.ipAddress ? `<p><strong>IP:</strong> <code>${input.ipAddress}</code></p>` : ''}`,
    ctaButton: { label: 'Sign In', url: 'https://vubon.com.bd/auth/login', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 31. USER CONTACT DELETED
// ═══════════════════════════════════════════════════════════
export interface UserContactDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly contactType?: string;
}

export function renderUserContactDeletedEmail(input: UserContactDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'যোগাযোগ মুছে ফেলা',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার একটি যোগাযোগ মুছে ফেলা হয়েছে।</p>
        ${input.contactType ? `<p><strong>ধরন:</strong> ${input.contactType}</p>` : ''}`,
      ctaButton: { label: 'যোগাযোগ দেখুন', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Contact Deleted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>A contact has been deleted from your account.</p>
      ${input.contactType ? `<p><strong>Type:</strong> ${input.contactType}</p>` : ''}`,
    ctaButton: { label: 'View Contacts', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 32. USER CONTACT VERIFIED
// ═══════════════════════════════════════════════════════════
export interface UserContactVerifiedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly contactType?: string;
  readonly maskedValue?: string;
}

export function renderUserContactVerifiedEmail(input: UserContactVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'যোগাযোগ যাচাই সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার যোগাযোগ যাচাই সম্পন্ন হয়েছে।</p>
        ${input.contactType ? `<p><strong>ধরন:</strong> ${input.contactType}</p>` : ''}
        ${input.maskedValue ? `<p><strong>মান:</strong> ${input.maskedValue}</p>` : ''}`,
      ctaButton: { label: 'যোগাযোগ দেখুন', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Contact Verified',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your contact has been verified.</p>
      ${input.contactType ? `<p><strong>Type:</strong> ${input.contactType}</p>` : ''}
      ${input.maskedValue ? `<p><strong>Value:</strong> ${input.maskedValue}</p>` : ''}`,
    ctaButton: { label: 'View Contacts', url: 'https://vubon.com.bd/account/contacts', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 33. USER PREFERENCES CREATED
// ═══════════════════════════════════════════════════════════
export interface UserPreferencesCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly createdAt?: string;
}

export function renderUserPreferencesCreatedEmail(input: UserPreferencesCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পছন্দ সেটআপ সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার পছন্দসমূহ সেটআপ করা হয়েছে।</p>
        <p>আপনি চাইলে যেকোনো সময় পরিবর্তন করতে পারবেন।</p>`,
      ctaButton: { label: 'পছন্দ দেখুন', url: 'https://vubon.com.bd/account/preferences', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Preferences Set Up',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your preferences have been set up.</p>
      <p>You can change them anytime.</p>`,
    ctaButton: { label: 'View Preferences', url: 'https://vubon.com.bd/account/preferences', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 34. USER SETTINGS CREATED
// ═══════════════════════════════════════════════════════════
export interface UserSettingsCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
}

export function renderUserSettingsCreatedEmail(input: UserSettingsCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সেটিংস সেটআপ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার অ্যাকাউন্ট সেটিংস সেটআপ করা হয়েছে।</p>`,
      ctaButton: { label: 'সেটিংস দেখুন', url: 'https://vubon.com.bd/account/settings', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Settings Created',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your account settings have been created.</p>`,
    ctaButton: { label: 'View Settings', url: 'https://vubon.com.bd/account/settings', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 35. PRICING RULE ADDED
// ═══════════════════════════════════════════════════════════
export interface PricingRuleAddedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly ruleType?: string;
}

export function renderPricingRuleAddedEmail(input: PricingRuleAddedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রাইসিং রুল যোগ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ নতুন প্রাইসিং রুল যোগ করা হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.ruleType ? `<p><strong>ধরন:</strong> ${input.ruleType}</p>` : ''}`,
      ctaButton: { label: 'প্রাইসিং দেখুন', url: 'https://vubon.com.bd/admin/pricing', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Pricing Rule Added',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ A new pricing rule has been added.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.ruleType ? `<p><strong>Type:</strong> ${input.ruleType}</p>` : ''}`,
    ctaButton: { label: 'View Pricing', url: 'https://vubon.com.bd/admin/pricing', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 36. PRICING RULE REMOVED
// ═══════════════════════════════════════════════════════════
export interface PricingRuleRemovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly productName?: string;
  readonly ruleType?: string;
}

export function renderPricingRuleRemovedEmail(input: PricingRuleRemovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রাইসিং রুল সরানো',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>প্রাইসিং রুল সরানো হয়েছে।</p>
        ${input.productName ? `<p><strong>পণ্য:</strong> ${input.productName}</p>` : ''}
        ${input.ruleType ? `<p><strong>ধরন:</strong> ${input.ruleType}</p>` : ''}`,
      ctaButton: { label: 'প্রাইসিং দেখুন', url: 'https://vubon.com.bd/admin/pricing', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Pricing Rule Removed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Pricing rule has been removed.</p>
      ${input.productName ? `<p><strong>Product:</strong> ${input.productName}</p>` : ''}
      ${input.ruleType ? `<p><strong>Type:</strong> ${input.ruleType}</p>` : ''}`,
    ctaButton: { label: 'View Pricing', url: 'https://vubon.com.bd/admin/pricing', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 37. PAYMENT CREATED
// ═══════════════════════════════════════════════════════════
export interface PaymentCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly paymentId: string;
  readonly orderId?: string;
  readonly amount?: number;
}

export function renderPaymentCreatedEmail(input: PaymentCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পেমেন্ট শুরু হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার পেমেন্ট প্রক্রিয়া শুরু হয়েছে।</p>
        <p><strong>পেমেন্ট ID:</strong> ${input.paymentId}</p>
        ${input.orderId ? `<p><strong>অর্ডার:</strong> #${input.orderId}</p>` : ''}
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'পেমেন্ট সম্পন্ন করুন', url: `https://vubon.com.bd/payments/${input.paymentId}`, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Payment Initiated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your payment has been initiated.</p>
      <p><strong>Payment ID:</strong> ${input.paymentId}</p>
      ${input.orderId ? `<p><strong>Order:</strong> #${input.orderId}</p>` : ''}
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'Complete Payment', url: `https://vubon.com.bd/payments/${input.paymentId}`, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 38. RECURRING CANCELLED
// ═══════════════════════════════════════════════════════════
export interface RecurringCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly recurringId: string;
  readonly cancelledAt?: string;
}

export function renderRecurringCancelledEmail(input: RecurringCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিকারিং পেমেন্ট বাতিল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>আপনার রিকারিং পেমেন্ট বাতিল করা হয়েছে।</p>
        <p><strong>ID:</strong> ${input.recurringId}</p>`,
      ctaButton: { label: 'সাবস্ক্রিপশন দেখুন', url: 'https://vubon.com.bd/account/subscriptions', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Recurring Payment Cancelled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>Your recurring payment has been cancelled.</p>
      <p><strong>ID:</strong> ${input.recurringId}</p>`,
    ctaButton: { label: 'View Subscriptions', url: 'https://vubon.com.bd/account/subscriptions', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 39. RECURRING COMPLETED
// ═══════════════════════════════════════════════════════════
export interface RecurringCompletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly recurringId: string;
  readonly amount?: number;
  readonly completedAt?: string;
}

export function renderRecurringCompletedEmail(input: RecurringCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিকারিং পেমেন্ট সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ রিকারিং পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</p>
        <p><strong>ID:</strong> ${input.recurringId}</p>
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'রিসিট দেখুন', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Recurring Payment Completed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Recurring payment completed successfully.</p>
      <p><strong>ID:</strong> ${input.recurringId}</p>
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Receipt', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 40. RECURRING FAILED
// ═══════════════════════════════════════════════════════════
export interface RecurringFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly recurringId: string;
  readonly reason?: string;
  readonly failedAt?: string;
}

export function renderRecurringFailedEmail(input: RecurringFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'রিকারিং পেমেন্ট ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>⚠️ রিকারিং পেমেন্ট ব্যর্থ হয়েছে।</p>
        <p><strong>ID:</strong> ${input.recurringId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}
        <p>পেমেন্ট পদ্ধতি আপডেট করুন।</p>`,
      ctaButton: { label: 'পেমেন্ট আপডেট', url: 'https://vubon.com.bd/account/payment-methods', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Recurring Payment Failed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>⚠️ Recurring payment failed.</p>
      <p><strong>ID:</strong> ${input.recurringId}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'Update Payment', url: 'https://vubon.com.bd/account/payment-methods', variant: 'primary' },
  });
}


















// ═══════════════════════════════════════════════════════════
// 56. SPLIT CREATED
// ═══════════════════════════════════════════════════════════
export interface SplitCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly splitId: string;
  readonly amount?: number;
}

export function renderSplitCreatedEmail(input: SplitCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্প্লিট পেমেন্ট তৈরি',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ স্প্লিট পেমেন্ট তৈরি হয়েছে।</p>
        <p><strong>ID:</strong> ${input.splitId}</p>
        <p><strong>পরিমাণ:</strong> ${fmt}</p>`,
      ctaButton: { label: 'পেমেন্ট দেখুন', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Split Payment Created',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Split payment created.</p>
      <p><strong>ID:</strong> ${input.splitId}</p>
      <p><strong>Amount:</strong> ${fmt}</p>`,
    ctaButton: { label: 'View Payment', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 57. SPLIT FAILED
// ═══════════════════════════════════════════════════════════
export interface SplitFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly splitId: string;
  readonly reason?: string;
}

export function renderSplitFailedEmail(input: SplitFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্প্লিট পেমেন্ট ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>⚠️ স্প্লিট পেমেন্ট ব্যর্থ হয়েছে।</p>
        <p><strong>ID:</strong> ${input.splitId}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'সাপোর্টে যোগাযোগ', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Split Payment Failed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>⚠️ Split payment failed.</p>
      <p><strong>ID:</strong> ${input.splitId}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'Contact Support', url: 'mailto:support@vubon.com.bd', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 58. SUBSCRIPTION CREATED
// ═══════════════════════════════════════════════════════════
export interface SubscriptionCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly planName?: string;
  readonly startsAt?: string;
  readonly endsAt?: string;
}

export function renderSubscriptionCreatedEmail(input: SubscriptionCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সাবস্ক্রিপশন শুরু',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার সাবস্ক্রিপশন সক্রিয় হয়েছে।</p>
        ${input.planName ? `<p><strong>প্ল্যান:</strong> ${input.planName}</p>` : ''}
        ${input.startsAt ? `<p><strong>শুরু:</strong> ${input.startsAt}</p>` : ''}
        ${input.endsAt ? `<p><strong>শেষ:</strong> ${input.endsAt}</p>` : ''}`,
      ctaButton: { label: 'সাবস্ক্রিপশন দেখুন', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Subscription Created',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Your subscription is active.</p>
      ${input.planName ? `<p><strong>Plan:</strong> ${input.planName}</p>` : ''}
      ${input.startsAt ? `<p><strong>Starts:</strong> ${input.startsAt}</p>` : ''}
      ${input.endsAt ? `<p><strong>Ends:</strong> ${input.endsAt}</p>` : ''}`,
    ctaButton: { label: 'View Subscription', url: 'https://vubon.com.bd/account/subscription', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 59. TRANSACTION FAILED
// ═══════════════════════════════════════════════════════════
export interface TransactionFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly transactionId: string;
  readonly reason?: string;
  readonly amount?: number;
}

export function renderTransactionFailedEmail(input: TransactionFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const fmt = isBangla ? `৳${(input.amount ?? 0).toLocaleString('bn-BD')}` : `৳${(input.amount ?? 0).toLocaleString('en-BD')}`;
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'লেনদেন ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>⚠️ আপনার লেনদেন ব্যর্থ হয়েছে।</p>
        <p><strong>ID:</strong> ${input.transactionId}</p>
        <p><strong>পরিমাণ:</strong> ${fmt}</p>
        ${input.reason ? `<p><strong>কারণ:</strong> ${input.reason}</p>` : ''}`,
      ctaButton: { label: 'আবার চেষ্টা করুন', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Transaction Failed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>⚠️ Your transaction failed.</p>
      <p><strong>ID:</strong> ${input.transactionId}</p>
      <p><strong>Amount:</strong> ${fmt}</p>
      ${input.reason ? `<p><strong>Reason:</strong> ${input.reason}</p>` : ''}`,
    ctaButton: { label: 'Try Again', url: 'https://vubon.com.bd/account/payments', variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// 60. VERIFICATION VERIFIED
// ═══════════════════════════════════════════════════════════
export interface VerificationVerifiedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly method?: string;
  readonly verifiedAt?: string;
}

export function renderVerificationVerifiedEmail(input: VerificationVerifiedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'যাচাই সম্পন্ন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `<p>✅ আপনার যাচাই সম্পন্ন হয়েছে।</p>
        ${input.method ? `<p><strong>পদ্ধতি:</strong> ${input.method}</p>` : ''}`,
      ctaButton: { label: 'অ্যাকাউন্ট দেখুন', url: 'https://vubon.com.bd/account', variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'Verification Completed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `<p>✅ Verification completed.</p>
      ${input.method ? `<p><strong>Method:</strong> ${input.method}</p>` : ''}`,
    ctaButton: { label: 'View Account', url: 'https://vubon.com.bd/account', variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALRESUBMITTED — vendor.approval.resubmitted
// ═══════════════════════════════════════════════════════════
export interface ApprovalResubmittedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalResubmittedEmail(input: ApprovalResubmittedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'vendor.approval.resubmitted'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'ApprovalResubmitted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>ApprovalResubmitted — ${subject ?? 'vendor.approval.resubmitted'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COMMISSIONDEACTIVATED — vendor.commission.deactivated
// ═══════════════════════════════════════════════════════════
export interface CommissionDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionDeactivatedEmail(input: CommissionDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'vendor.commission.deactivated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CommissionDeactivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CommissionDeactivated — ${subject ?? 'vendor.commission.deactivated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PAYOUTCANCELLED — vendor.payout.cancelled
// ═══════════════════════════════════════════════════════════
export interface PayoutCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutCancelledEmail(input: PayoutCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>বাতিল — ${subject ?? 'vendor.payout.cancelled'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PayoutCancelled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PayoutCancelled — ${subject ?? 'vendor.payout.cancelled'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PAYOUTPROCESSING — vendor.payout.processing
// ═══════════════════════════════════════════════════════════
export interface PayoutProcessingEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutProcessingEmail(input: PayoutProcessingEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'vendor.payout.processing'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PayoutProcessing',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PayoutProcessing — ${subject ?? 'vendor.payout.processing'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SETTLEMENTFAILED — vendor.settlement.failed
// ═══════════════════════════════════════════════════════════
export interface SettlementFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementFailedEmail(input: SettlementFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ব্যর্থ — ${subject ?? 'vendor.settlement.failed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SettlementFailed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SettlementFailed — ${subject ?? 'vendor.settlement.failed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONPAYMENTFAILED — vendor.subscription.payment_failed
// ═══════════════════════════════════════════════════════════
export interface SubscriptionPaymentFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionPaymentFailedEmail(input: SubscriptionPaymentFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ব্যর্থ — ${subject ?? 'vendor.subscription.payment_failed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionPaymentFailed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionPaymentFailed — ${subject ?? 'vendor.subscription.payment_failed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUSPENSIONAPPEALAPPROVED — vendor.suspension.appeal_approved
// ═══════════════════════════════════════════════════════════
export interface SuspensionAppealApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionAppealApprovedEmail(input: SuspensionAppealApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>অনুমোদিত — ${subject ?? 'vendor.suspension.appeal_approved'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SuspensionAppealApproved',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SuspensionAppealApproved — ${subject ?? 'vendor.suspension.appeal_approved'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUSPENSIONAPPEALREJECTED — vendor.suspension.appeal_rejected
// ═══════════════════════════════════════════════════════════
export interface SuspensionAppealRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionAppealRejectedEmail(input: SuspensionAppealRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>প্রত্যাখ্যাত — ${subject ?? 'vendor.suspension.appeal_rejected'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SuspensionAppealRejected',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SuspensionAppealRejected — ${subject ?? 'vendor.suspension.appeal_rejected'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUSPENSIONCREATED — vendor.suspension.created
// ═══════════════════════════════════════════════════════════
export interface SuspensionCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionCreatedEmail(input: SuspensionCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>তৈরি হয়েছে — ${subject ?? 'vendor.suspension.created'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SuspensionCreated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SuspensionCreated — ${subject ?? 'vendor.suspension.created'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// TEAMINVITECANCELLED — vendor.team.invite_cancelled
// ═══════════════════════════════════════════════════════════
export interface TeamInviteCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteCancelledEmail(input: TeamInviteCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>বাতিল — ${subject ?? 'vendor.team.invite_cancelled'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'TeamInviteCancelled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>TeamInviteCancelled — ${subject ?? 'vendor.team.invite_cancelled'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// TEAMINVITEREJECTED — vendor.team.invite_rejected
// ═══════════════════════════════════════════════════════════
export interface TeamInviteRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteRejectedEmail(input: TeamInviteRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>প্রত্যাখ্যাত — ${subject ?? 'vendor.team.invite_rejected'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'TeamInviteRejected',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>TeamInviteRejected — ${subject ?? 'vendor.team.invite_rejected'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// TEAMREACTIVATED — vendor.team.reactivated
// ═══════════════════════════════════════════════════════════
export interface TeamReactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamReactivatedEmail(input: TeamReactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'vendor.team.reactivated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'TeamReactivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>TeamReactivated — ${subject ?? 'vendor.team.reactivated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VERIFICATIONREJECTED — vendor.verification.rejected
// ═══════════════════════════════════════════════════════════
export interface VerificationRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationRejectedEmail(input: VerificationRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>প্রত্যাখ্যাত — ${subject ?? 'vendor.verification.rejected'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'VerificationRejected',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>VerificationRejected — ${subject ?? 'vendor.verification.rejected'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VERIFICATIONOTPSENT — identity.verification.otp_sent
// ═══════════════════════════════════════════════════════════
export interface VerificationOtpSentEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationOtpSentEmail(input: VerificationOtpSentEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পাঠানো হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>পাঠানো হয়েছে — ${subject ?? 'identity.verification.otp_sent'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'VerificationOtpSent',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>VerificationOtpSent — ${subject ?? 'identity.verification.otp_sent'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// USERACTIVITYRECORDED — identity.user.activity_recorded
// ═══════════════════════════════════════════════════════════
export interface UserActivityRecordedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserActivityRecordedEmail(input: UserActivityRecordedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'identity.user.activity_recorded'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'UserActivityRecorded',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>UserActivityRecorded — ${subject ?? 'identity.user.activity_recorded'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PERMISSIONGRANTED — identity.permission.granted
// ═══════════════════════════════════════════════════════════
export interface PermissionGrantedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPermissionGrantedEmail(input: PermissionGrantedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'identity.permission.granted'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PermissionGranted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PermissionGranted — ${subject ?? 'identity.permission.granted'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PERMISSIONREVOKED — identity.permission.revoked
// ═══════════════════════════════════════════════════════════
export interface PermissionRevokedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPermissionRevokedEmail(input: PermissionRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'identity.permission.revoked'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PermissionRevoked',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PermissionRevoked — ${subject ?? 'identity.permission.revoked'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// REVIEWREJECTED — product.review.rejected
// ═══════════════════════════════════════════════════════════
export interface ReviewRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderReviewRejectedEmail(input: ReviewRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>প্রত্যাখ্যাত — ${subject ?? 'product.review.rejected'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'ReviewRejected',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>ReviewRejected — ${subject ?? 'product.review.rejected'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CATEGORYCREATED — product.category.created
// ═══════════════════════════════════════════════════════════
export interface CategoryCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCategoryCreatedEmail(input: CategoryCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>তৈরি হয়েছে — ${subject ?? 'product.category.created'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CategoryCreated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CategoryCreated — ${subject ?? 'product.category.created'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COLLECTIONCREATED — product.collection.created
// ═══════════════════════════════════════════════════════════
export interface CollectionCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionCreatedEmail(input: CollectionCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>তৈরি হয়েছে — ${subject ?? 'product.collection.created'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CollectionCreated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CollectionCreated — ${subject ?? 'product.collection.created'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COLLECTIONDELETED — product.collection.deleted
// ═══════════════════════════════════════════════════════════
export interface CollectionDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionDeletedEmail(input: CollectionDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>মুছে ফেলা হয়েছে — ${subject ?? 'product.collection.deleted'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CollectionDeleted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CollectionDeleted — ${subject ?? 'product.collection.deleted'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COLLECTIONACTIVATED — product.collection.activated
// ═══════════════════════════════════════════════════════════
export interface CollectionActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionActivatedEmail(input: CollectionActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'product.collection.activated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CollectionActivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CollectionActivated — ${subject ?? 'product.collection.activated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// COLLECTIONDEACTIVATED — product.collection.deactivated
// ═══════════════════════════════════════════════════════════
export interface CollectionDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionDeactivatedEmail(input: CollectionDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'product.collection.deactivated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CollectionDeactivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CollectionDeactivated — ${subject ?? 'product.collection.deactivated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// CARTACTIVATED — cart.cart.activated
// ═══════════════════════════════════════════════════════════
export interface CartActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCartActivatedEmail(input: CartActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'cart.cart.activated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'CartActivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>CartActivated — ${subject ?? 'cart.cart.activated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SPLITEXECUTED — payment.split.executed
// ═══════════════════════════════════════════════════════════
export interface SplitExecutedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSplitExecutedEmail(input: SplitExecutedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.split.executed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SplitExecuted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SplitExecuted — ${subject ?? 'payment.split.executed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONACTIVATED — payment.subscription.activated
// ═══════════════════════════════════════════════════════════
export interface SubscriptionActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionActivatedEmail(input: SubscriptionActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>সক্রিয় — ${subject ?? 'payment.subscription.activated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionActivated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionActivated — ${subject ?? 'payment.subscription.activated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONCANCELLED — payment.subscription.cancelled
// ═══════════════════════════════════════════════════════════
export interface SubscriptionCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionCancelledEmail(input: SubscriptionCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>বাতিল — ${subject ?? 'payment.subscription.cancelled'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionCancelled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionCancelled — ${subject ?? 'payment.subscription.cancelled'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONPAUSED — payment.subscription.paused
// ═══════════════════════════════════════════════════════════
export interface SubscriptionPausedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionPausedEmail(input: SubscriptionPausedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.subscription.paused'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionPaused',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionPaused — ${subject ?? 'payment.subscription.paused'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONRESUMED — payment.subscription.resumed
// ═══════════════════════════════════════════════════════════
export interface SubscriptionResumedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionResumedEmail(input: SubscriptionResumedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.subscription.resumed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionResumed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionResumed — ${subject ?? 'payment.subscription.resumed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONTRIALSTARTED — payment.subscription.trial_started
// ═══════════════════════════════════════════════════════════
export interface SubscriptionTrialStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionTrialStartedEmail(input: SubscriptionTrialStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.subscription.trial_started'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionTrialStarted',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionTrialStarted — ${subject ?? 'payment.subscription.trial_started'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONPASTDUE — payment.subscription.past_due
// ═══════════════════════════════════════════════════════════
export interface SubscriptionPastDueEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionPastDueEmail(input: SubscriptionPastDueEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.subscription.past_due'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'SubscriptionPastDue',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>SubscriptionPastDue — ${subject ?? 'payment.subscription.past_due'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// TRANSACTIONSETTLED — payment.transaction.settled
// ═══════════════════════════════════════════════════════════
export interface TransactionSettledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTransactionSettledEmail(input: TransactionSettledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.transaction.settled'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'TransactionSettled',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>TransactionSettled — ${subject ?? 'payment.transaction.settled'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// TRANSACTIONSUCCEEDED — payment.transaction.succeeded
// ═══════════════════════════════════════════════════════════
export interface TransactionSucceededEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTransactionSucceededEmail(input: TransactionSucceededEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.transaction.succeeded'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'TransactionSucceeded',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>TransactionSucceeded — ${subject ?? 'payment.transaction.succeeded'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VERIFICATIONFAILED — payment.verification.failed
// ═══════════════════════════════════════════════════════════
export interface VerificationFailedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationFailedEmail(input: VerificationFailedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্যর্থ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>ব্যর্থ — ${subject ?? 'payment.verification.failed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'VerificationFailed',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>VerificationFailed — ${subject ?? 'payment.verification.failed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VERIFICATIONEXPIRED — payment.verification.expired
// ═══════════════════════════════════════════════════════════
export interface VerificationExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationExpiredEmail(input: VerificationExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>মেয়াদ শেষ — ${subject ?? 'payment.verification.expired'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'VerificationExpired',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>VerificationExpired — ${subject ?? 'payment.verification.expired'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// VERIFICATIONINITIATED — payment.verification.initiated
// ═══════════════════════════════════════════════════════════
export interface VerificationInitiatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationInitiatedEmail(input: VerificationInitiatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.verification.initiated'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'VerificationInitiated',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>VerificationInitiated — ${subject ?? 'payment.verification.initiated'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// INVOICEISSUED — payment.invoice.issued
// ═══════════════════════════════════════════════════════════
export interface InvoiceIssuedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderInvoiceIssuedEmail(input: InvoiceIssuedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'payment.invoice.issued'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'InvoiceIssued',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>InvoiceIssued — ${subject ?? 'payment.invoice.issued'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PRODUCTUNPUBLISHED — product.product.unpublished
// ═══════════════════════════════════════════════════════════
export interface ProductUnpublishedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderProductUnpublishedEmail(input: ProductUnpublishedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'product.product.unpublished'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'ProductUnpublished',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>ProductUnpublished — ${subject ?? 'product.product.unpublished'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PRICINGDISCOUNTAPPLIED — product.pricing.discount_applied
// ═══════════════════════════════════════════════════════════
export interface PricingDiscountAppliedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPricingDiscountAppliedEmail(input: PricingDiscountAppliedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'product.pricing.discount_applied'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PricingDiscountApplied',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PricingDiscountApplied — ${subject ?? 'product.pricing.discount_applied'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}

// ═══════════════════════════════════════════════════════════
// PRICINGDISCOUNTREMOVED — product.pricing.discount_removed
// ═══════════════════════════════════════════════════════════
export interface PricingDiscountRemovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPricingDiscountRemovedEmail(input: PricingDiscountRemovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const subject = (input.subject as string | undefined) ?? undefined;
  const message = (input.message as string | undefined) ?? undefined;
  const actionUrl = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn', greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>নোটিফিকেশন — ${subject ?? 'product.pricing.discount_removed'}</p>
        ${message ? `<p>${message}</p>` : ''}
        <p>বিস্তারিত দেখতে নিচের বাটনে ক্লিক করুন।</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url: actionUrl, variant: 'primary' },
    });
  }
  return BanglaEmailTemplate.render({
    title: 'PricingDiscountRemoved',
    locale: 'en', greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>PricingDiscountRemoved — ${subject ?? 'product.pricing.discount_removed'}</p>
      ${message ? `<p>${message}</p>` : ''}
      <p>Click below for details.</p>
    `,
    ctaButton: { label: 'View Details', url: actionUrl, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCANCELLEDUSER — payment.payment.cancelled
// ═══════════════════════════════════════════════════════════
export interface PaymentCancelledUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCancelledUserEmail(input: PaymentCancelledUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.cancelled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCancelledUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCREATEDUSER — payment.payment.created
// ═══════════════════════════════════════════════════════════
export interface PaymentCreatedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCreatedUserEmail(input: PaymentCreatedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCreatedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCAPTUREDUSER — payment.payment.captured
// ═══════════════════════════════════════════════════════════
export interface PaymentCapturedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCapturedUserEmail(input: PaymentCapturedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.captured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCapturedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCOMPLETEDUSER — payment.payment.completed
// ═══════════════════════════════════════════════════════════
export interface PaymentCompletedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCompletedUserEmail(input: PaymentCompletedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.completed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCompletedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTAUTHORIZEDUSER — payment.payment.authorized
// ═══════════════════════════════════════════════════════════
export interface PaymentAuthorizedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentAuthorizedUserEmail(input: PaymentAuthorizedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.authorized';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentAuthorizedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTSTATUSCHANGED — payment.payment.status_changed
// ═══════════════════════════════════════════════════════════
export interface PaymentStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentStatusChangedEmail(input: PaymentStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentStatusChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// RECURRINGACTIVATED — payment.recurring.activated
// ═══════════════════════════════════════════════════════════
export interface RecurringActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRecurringActivatedEmail(input: RecurringActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.recurring.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RecurringActivated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// RECURRINGRUN — payment.recurring.run
// ═══════════════════════════════════════════════════════════
export interface RecurringRunEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRecurringRunEmail(input: RecurringRunEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.recurring.run';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RecurringRun',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// RECURRINGSCHEDULED — payment.recurring.scheduled
// ═══════════════════════════════════════════════════════════
export interface RecurringScheduledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRecurringScheduledEmail(input: RecurringScheduledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.recurring.scheduled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RecurringScheduled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// RECURRINGPAUSED — payment.recurring.paused
// ═══════════════════════════════════════════════════════════
export interface RecurringPausedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRecurringPausedEmail(input: RecurringPausedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.recurring.paused';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বিরত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RecurringPaused',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// RECURRINGRESUMED — payment.recurring.resumed
// ═══════════════════════════════════════════════════════════
export interface RecurringResumedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRecurringResumedEmail(input: RecurringResumedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.recurring.resumed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পুনরায় শুরু',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RecurringResumed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// REFUNDSTATUSCHANGED — payment.refund.status_changed
// ═══════════════════════════════════════════════════════════
export interface RefundStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRefundStatusChangedEmail(input: RefundStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.refund.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RefundStatusChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TRANSACTIONCREATED — payment.transaction.created
// ═══════════════════════════════════════════════════════════
export interface TransactionCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTransactionCreatedEmail(input: TransactionCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.transaction.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TransactionCreated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TRANSACTIONSTATUSCHANGED — payment.transaction.status_changed
// ═══════════════════════════════════════════════════════════
export interface TransactionStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTransactionStatusChangedEmail(input: TransactionStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.transaction.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TransactionStatusChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// CARTMERGEDUSER — cart.cart.merged
// ═══════════════════════════════════════════════════════════
export interface CartMergedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCartMergedUserEmail(input: CartMergedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'cart.cart.merged';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/cart';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CartMergedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// CARTACTIVATEDUSER — cart.cart.activated
// ═══════════════════════════════════════════════════════════
export interface CartActivatedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCartActivatedUserEmail(input: CartActivatedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'cart.cart.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/cart';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CartActivatedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SSOCONFIGCREATED — identity.sso_config.created
// ═══════════════════════════════════════════════════════════
export interface SsoConfigCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSsoConfigCreatedEmail(input: SsoConfigCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.sso_config.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SsoConfigCreated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENVERIFYCOMPLETED — identity.token.verify_completed
// ═══════════════════════════════════════════════════════════
export interface TokenVerifyCompletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenVerifyCompletedEmail(input: TokenVerifyCompletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.verify_completed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenVerifyCompleted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERADDRESSDELETED — identity.user.address_deleted
// ═══════════════════════════════════════════════════════════
export interface UserAddressDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserAddressDeletedEmail(input: UserAddressDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.address_deleted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserAddressDeleted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERDELETED — identity.user.deleted
// ═══════════════════════════════════════════════════════════
export interface UserDeletedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserDeletedEmail(input: UserDeletedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.deleted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserDeleted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPROFILECREATED — identity.user.profile_created
// ═══════════════════════════════════════════════════════════
export interface UserProfileCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserProfileCreatedEmail(input: UserProfileCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.profile_created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserProfileCreated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPROFILEUPDATED — identity.user.profile_updated
// ═══════════════════════════════════════════════════════════
export interface UserProfileUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserProfileUpdatedEmail(input: UserProfileUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.profile_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserProfileUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPROFILEAVATARUPDATED — identity.user.profile_avatar_updated
// ═══════════════════════════════════════════════════════════
export interface UserProfileAvatarUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserProfileAvatarUpdatedEmail(input: UserProfileAvatarUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.profile_avatar_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserProfileAvatarUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPROFILEBIOUPDATED — identity.user.profile_bio_updated
// ═══════════════════════════════════════════════════════════
export interface UserProfileBioUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserProfileBioUpdatedEmail(input: UserProfileBioUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.profile_bio_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserProfileBioUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPROFILEVISIBILITYCHANGED — identity.user.profile_visibility_changed
// ═══════════════════════════════════════════════════════════
export interface UserProfileVisibilityChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserProfileVisibilityChangedEmail(input: UserProfileVisibilityChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.profile_visibility_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserProfileVisibilityChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERADDRESSUPDATED — identity.user.address_updated
// ═══════════════════════════════════════════════════════════
export interface UserAddressUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserAddressUpdatedEmail(input: UserAddressUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.address_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserAddressUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERADDRESSSETDEFAULT — identity.user.address_set_default
// ═══════════════════════════════════════════════════════════
export interface UserAddressSetDefaultEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserAddressSetDefaultEmail(input: UserAddressSetDefaultEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.address_set_default';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserAddressSetDefault',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERCONTACTUPDATED — identity.user.contact_updated
// ═══════════════════════════════════════════════════════════
export interface UserContactUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserContactUpdatedEmail(input: UserContactUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.contact_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserContactUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERCONTACTSETPRIMARY — identity.user.contact_set_primary
// ═══════════════════════════════════════════════════════════
export interface UserContactSetPrimaryEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserContactSetPrimaryEmail(input: UserContactSetPrimaryEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.contact_set_primary';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserContactSetPrimary',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPREFERENCESUPDATED — identity.user.preferences_updated
// ═══════════════════════════════════════════════════════════
export interface UserPreferencesUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserPreferencesUpdatedEmail(input: UserPreferencesUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.preferences_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserPreferencesUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPREFERENCESUNSUBSCRIBED — identity.user.preferences_unsubscribed
// ═══════════════════════════════════════════════════════════
export interface UserPreferencesUnsubscribedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserPreferencesUnsubscribedEmail(input: UserPreferencesUnsubscribedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.preferences_unsubscribed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserPreferencesUnsubscribed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERPREFERENCESRESUBSCRIBED — identity.user.preferences_resubscribed
// ═══════════════════════════════════════════════════════════
export interface UserPreferencesResubscribedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserPreferencesResubscribedEmail(input: UserPreferencesResubscribedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.preferences_resubscribed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserPreferencesResubscribed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERSETTINGSUPDATED — identity.user.settings_updated
// ═══════════════════════════════════════════════════════════
export interface UserSettingsUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserSettingsUpdatedEmail(input: UserSettingsUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.settings_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserSettingsUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERSETTINGSLANGUAGECHANGED — identity.user.settings_language_changed
// ═══════════════════════════════════════════════════════════
export interface UserSettingsLanguageChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserSettingsLanguageChangedEmail(input: UserSettingsLanguageChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.settings_language_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserSettingsLanguageChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// USERSETTINGSTHEMECHANGED — identity.user.settings_theme_changed
// ═══════════════════════════════════════════════════════════
export interface UserSettingsThemeChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderUserSettingsThemeChangedEmail(input: UserSettingsThemeChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.user.settings_theme_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'UserSettingsThemeChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VERIFICATIONREQUESTED — identity.verification.requested
// ═══════════════════════════════════════════════════════════
export interface VerificationRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationRequestedEmail(input: VerificationRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.verification.requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VerificationRequested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VERIFICATIONOTPRESENT — identity.verification.otp_resent
// ═══════════════════════════════════════════════════════════
export interface VerificationOtpResentEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationOtpResentEmail(input: VerificationOtpResentEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.verification.otp_resent';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VerificationOtpResent',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// ROLEASSIGNEDUSER — identity.role.assigned
// ═══════════════════════════════════════════════════════════
export interface RoleAssignedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRoleAssignedUserEmail(input: RoleAssignedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.role.assigned';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RoleAssignedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// ROLEREVOKEDUSER — identity.role.revoked
// ═══════════════════════════════════════════════════════════
export interface RoleRevokedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderRoleRevokedUserEmail(input: RoleRevokedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.role.revoked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাহৃত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'RoleRevokedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SESSIONIDLETIMEOUT — identity.session.idle_timeout
// ═══════════════════════════════════════════════════════════
export interface SessionIdleTimeoutEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSessionIdleTimeoutEmail(input: SessionIdleTimeoutEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.session.idle_timeout';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SessionIdleTimeout',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SESSIONLOGOUT — identity.session.logout
// ═══════════════════════════════════════════════════════════
export interface SessionLogoutEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSessionLogoutEmail(input: SessionLogoutEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.session.logout';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'লগআউট',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SessionLogout',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SESSIONREFRESHED — identity.session.refreshed
// ═══════════════════════════════════════════════════════════
export interface SessionRefreshedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSessionRefreshedEmail(input: SessionRefreshedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.session.refreshed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SessionRefreshed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SOCIALACCOUNTLINKED — identity.social_account.linked
// ═══════════════════════════════════════════════════════════
export interface SocialAccountLinkedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSocialAccountLinkedEmail(input: SocialAccountLinkedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.social_account.linked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সংযুক্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SocialAccountLinked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SOCIALACCOUNTUNLINKED — identity.social_account.unlinked
// ═══════════════════════════════════════════════════════════
export interface SocialAccountUnlinkedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSocialAccountUnlinkedEmail(input: SocialAccountUnlinkedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.social_account.unlinked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সংযুক্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SocialAccountUnlinked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SOCIALLOGINSUCCEEDED — identity.social_account.login_succeeded
// ═══════════════════════════════════════════════════════════
export interface SocialLoginSucceededEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSocialLoginSucceededEmail(input: SocialLoginSucceededEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.social_account.login_succeeded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সফল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SocialLoginSucceeded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SSOLOGINSUCCEEDED — identity.sso.login_succeeded
// ═══════════════════════════════════════════════════════════
export interface SsoLoginSucceededEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSsoLoginSucceededEmail(input: SsoLoginSucceededEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.sso.login_succeeded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সফল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SsoLoginSucceeded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENISSUED — identity.token.issued
// ═══════════════════════════════════════════════════════════
export interface TokenIssuedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenIssuedEmail(input: TokenIssuedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.issued';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জারি',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenIssued',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENREFRESHED — identity.token.refreshed
// ═══════════════════════════════════════════════════════════
export interface TokenRefreshedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenRefreshedEmail(input: TokenRefreshedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.refreshed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenRefreshed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENRESETREQUESTED — identity.token.reset_requested
// ═══════════════════════════════════════════════════════════
export interface TokenResetRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenResetRequestedEmail(input: TokenResetRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.reset_requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenResetRequested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENREUSED — identity.token.reused
// ═══════════════════════════════════════════════════════════
export interface TokenReusedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenReusedEmail(input: TokenReusedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.reused';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পুনঃব্যবহৃত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenReused',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENREVOKED — identity.token.revoked
// ═══════════════════════════════════════════════════════════
export interface TokenRevokedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenRevokedEmail(input: TokenRevokedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.revoked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাহৃত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenRevoked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENEXPIRED — identity.token.expired
// ═══════════════════════════════════════════════════════════
export interface TokenExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenExpiredEmail(input: TokenExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TOKENVERIFYREQUESTED — identity.token.verify_requested
// ═══════════════════════════════════════════════════════════
export interface TokenVerifyRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTokenVerifyRequestedEmail(input: TokenVerifyRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.token.verify_requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TokenVerifyRequested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// LOGINATTEMPTBLOCKED — identity.login_attempt.blocked
// ═══════════════════════════════════════════════════════════
export interface LoginAttemptBlockedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderLoginAttemptBlockedEmail(input: LoginAttemptBlockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.login_attempt.blocked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্লকড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'LoginAttemptBlocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// LOGINATTEMPTSUCCEEDED — identity.login_attempt.succeeded
// ═══════════════════════════════════════════════════════════
export interface LoginAttemptSucceededEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderLoginAttemptSucceededEmail(input: LoginAttemptSucceededEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.login_attempt.succeeded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সফল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'LoginAttemptSucceeded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFABACKUPCODEUSED — identity.mfa.backup_code_used
// ═══════════════════════════════════════════════════════════
export interface MfaBackupCodeUsedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaBackupCodeUsedEmail(input: MfaBackupCodeUsedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.backup_code_used';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaBackupCodeUsed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFABACKUPCODESEXHAUSTED — identity.mfa.backup_codes_exhausted
// ═══════════════════════════════════════════════════════════
export interface MfaBackupCodesExhaustedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaBackupCodesExhaustedEmail(input: MfaBackupCodesExhaustedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.backup_codes_exhausted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaBackupCodesExhausted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFABACKUPCODESGENERATED — identity.mfa.backup_codes_generated
// ═══════════════════════════════════════════════════════════
export interface MfaBackupCodesGeneratedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaBackupCodesGeneratedEmail(input: MfaBackupCodesGeneratedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.backup_codes_generated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaBackupCodesGenerated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFADISABLEDUSER — identity.mfa.disabled
// ═══════════════════════════════════════════════════════════
export interface MfaDisabledUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaDisabledUserEmail(input: MfaDisabledUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.disabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নিষ্ক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaDisabledUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFAENABLEDUSER — identity.mfa.enabled
// ═══════════════════════════════════════════════════════════
export interface MfaEnabledUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaEnabledUserEmail(input: MfaEnabledUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.enabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaEnabledUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// MFASETUPSTARTED — identity.mfa.setup_started
// ═══════════════════════════════════════════════════════════
export interface MfaSetupStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderMfaSetupStartedEmail(input: MfaSetupStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.mfa.setup_started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'MfaSetupStarted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// DEVICESEEN — identity.device.seen
// ═══════════════════════════════════════════════════════════
export interface DeviceSeenEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderDeviceSeenEmail(input: DeviceSeenEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.device.seen';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'দেখা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'DeviceSeen',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// DEVICETRUSTED — identity.device.trusted
// ═══════════════════════════════════════════════════════════
export interface DeviceTrustedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderDeviceTrustedEmail(input: DeviceTrustedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.device.trusted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বিশ্বস্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'DeviceTrusted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// DEVICEUNTRUSTED — identity.device.untrusted
// ═══════════════════════════════════════════════════════════
export interface DeviceUntrustedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderDeviceUntrustedEmail(input: DeviceUntrustedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.device.untrusted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বিশ্বস্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'DeviceUntrusted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// AUTHCREATED — identity.auth.created
// ═══════════════════════════════════════════════════════════
export interface AuthCreatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAuthCreatedEmail(input: AuthCreatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.auth.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AuthCreated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// AUTHEXPIRED — identity.auth.expired
// ═══════════════════════════════════════════════════════════
export interface AuthExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAuthExpiredEmail(input: AuthExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.auth.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AuthExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// AUTHSTATUSCHANGED — identity.auth.status_changed
// ═══════════════════════════════════════════════════════════
export interface AuthStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAuthStatusChangedEmail(input: AuthStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.auth.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AuthStatusChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// AUTHUNLOCKED — identity.auth.unlocked
// ═══════════════════════════════════════════════════════════
export interface AuthUnlockedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAuthUnlockedEmail(input: AuthUnlockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.auth.unlocked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AuthUnlocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// ACCOUNTLOCKLOCKED — identity.account_lock.locked
// ═══════════════════════════════════════════════════════════
export interface AccountLockLockedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAccountLockLockedEmail(input: AccountLockLockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.account_lock.locked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AccountLockLocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// ACCOUNTLOCKUNLOCKED — identity.account_lock.unlocked
// ═══════════════════════════════════════════════════════════
export interface AccountLockUnlockedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderAccountLockUnlockedEmail(input: AccountLockUnlockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.account_lock.unlocked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'AccountLockUnlocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// BIOMETRICDISABLED — identity.biometric.disabled
// ═══════════════════════════════════════════════════════════
export interface BiometricDisabledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderBiometricDisabledEmail(input: BiometricDisabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.biometric.disabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নিষ্ক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'BiometricDisabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// BIOMETRICENABLED — identity.biometric.enabled
// ═══════════════════════════════════════════════════════════
export interface BiometricEnabledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderBiometricEnabledEmail(input: BiometricEnabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'identity.biometric.enabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'BiometricEnabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PRODUCTUNPUBLISHEDUSER — product.product.unpublished
// ═══════════════════════════════════════════════════════════
export interface ProductUnpublishedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderProductUnpublishedUserEmail(input: ProductUnpublishedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.product.unpublished';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ProductUnpublishedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// CATEGORYCREATEDUSER — product.category.created
// ═══════════════════════════════════════════════════════════
export interface CategoryCreatedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCategoryCreatedUserEmail(input: CategoryCreatedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.category.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CategoryCreatedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COLLECTIONCREATEDUSER — product.collection.created
// ═══════════════════════════════════════════════════════════
export interface CollectionCreatedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionCreatedUserEmail(input: CollectionCreatedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.collection.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CollectionCreatedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COLLECTIONDELETEDUSER — product.collection.deleted
// ═══════════════════════════════════════════════════════════
export interface CollectionDeletedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCollectionDeletedUserEmail(input: CollectionDeletedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.collection.deleted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CollectionDeletedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// REVIEWREJECTEDUSER — product.review.rejected
// ═══════════════════════════════════════════════════════════
export interface ReviewRejectedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderReviewRejectedUserEmail(input: ReviewRejectedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.review.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ReviewRejectedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONACTIVATED — vendor.commission.activated
// ═══════════════════════════════════════════════════════════
export interface CommissionActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionActivatedEmail(input: CommissionActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionActivated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTPAID — vendor.payout.paid
// ═══════════════════════════════════════════════════════════
export interface PayoutPaidEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutPaidEmail(input: PayoutPaidEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.paid';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পরিশোধিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutPaid',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTREJECTED — vendor.payout.rejected
// ═══════════════════════════════════════════════════════════
export interface PayoutRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutRejectedEmail(input: PayoutRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutRejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWSUBMITTED — vendor.review.submitted
// ═══════════════════════════════════════════════════════════
export interface VendorReviewSubmittedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewSubmittedEmail(input: VendorReviewSubmittedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.submitted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জমা দেওয়া হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewSubmitted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWAPPROVED — vendor.review.approved
// ═══════════════════════════════════════════════════════════
export interface VendorReviewApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewApprovedEmail(input: VendorReviewApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.approved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewApproved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWREJECTED — vendor.review.rejected
// ═══════════════════════════════════════════════════════════
export interface VendorReviewRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewRejectedEmail(input: VendorReviewRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewRejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWREPLIED — vendor.review.replied
// ═══════════════════════════════════════════════════════════
export interface VendorReviewRepliedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewRepliedEmail(input: VendorReviewRepliedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.replied';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewReplied',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWFLAGGED — vendor.review.flagged
// ═══════════════════════════════════════════════════════════
export interface VendorReviewFlaggedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewFlaggedEmail(input: VendorReviewFlaggedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.flagged';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewFlagged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWHIDDEN — vendor.review.hidden
// ═══════════════════════════════════════════════════════════
export interface VendorReviewHiddenEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewHiddenEmail(input: VendorReviewHiddenEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.hidden';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewHidden',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// REVIEWHELPFULMARKED — vendor.review.helpful_marked
// ═══════════════════════════════════════════════════════════
export interface ReviewHelpfulMarkedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderReviewHelpfulMarkedEmail(input: ReviewHelpfulMarkedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.helpful_marked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ReviewHelpfulMarked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTCANCELLED — vendor.settlement.cancelled
// ═══════════════════════════════════════════════════════════
export interface SettlementCancelledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementCancelledEmail(input: SettlementCancelledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.cancelled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementCancelled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTPROCESSING — vendor.settlement.processing
// ═══════════════════════════════════════════════════════════
export interface SettlementProcessingEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementProcessingEmail(input: SettlementProcessingEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.processing';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রসেস হচ্ছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementProcessing',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTINITIATED — vendor.settlement.initiated
// ═══════════════════════════════════════════════════════════
export interface SettlementInitiatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementInitiatedEmail(input: SettlementInitiatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.initiated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementInitiated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTONHOLD — vendor.settlement.on_hold
// ═══════════════════════════════════════════════════════════
export interface SettlementOnHoldEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementOnHoldEmail(input: SettlementOnHoldEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.on_hold';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementOnHold',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONSUSPENDED — vendor.subscription.suspended
// ═══════════════════════════════════════════════════════════
export interface SubscriptionSuspendedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionSuspendedEmail(input: SubscriptionSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.suspended';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SubscriptionSuspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONRENEWED — vendor.subscription.renewed
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionRenewedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionRenewedEmail(input: VendorSubscriptionRenewedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.renewed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionRenewed',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONSTARTED — vendor.subscription.started
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionStartedEmail(input: VendorSubscriptionStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionStarted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONUPGRADED — vendor.subscription.upgraded
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionUpgradedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionUpgradedEmail(input: VendorSubscriptionUpgradedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.upgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionUpgraded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONDOWNGRADED — vendor.subscription.downgraded
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionDowngradedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionDowngradedEmail(input: VendorSubscriptionDowngradedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.downgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডাউনগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionDowngraded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONEXPIRED — vendor.subscription.expired
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionExpiredEmail(input: VendorSubscriptionExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONTRIALSTARTED — vendor.subscription.trial_started
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionTrialStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionTrialStartedEmail(input: VendorSubscriptionTrialStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.trial_started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionTrialStarted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONTRIALENDED — vendor.subscription.trial_ended
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionTrialEndedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionTrialEndedEmail(input: VendorSubscriptionTrialEndedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.trial_ended';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionTrialEnded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONFEATUREENABLED — vendor.subscription.feature_enabled
// ═══════════════════════════════════════════════════════════
export interface SubscriptionFeatureEnabledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionFeatureEnabledEmail(input: SubscriptionFeatureEnabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.feature_enabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SubscriptionFeatureEnabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONFEATUREDISABLED — vendor.subscription.feature_disabled
// ═══════════════════════════════════════════════════════════
export interface SubscriptionFeatureDisabledEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionFeatureDisabledEmail(input: SubscriptionFeatureDisabledEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.feature_disabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নিষ্ক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SubscriptionFeatureDisabled',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMSUSPENDED — vendor.team.suspended
// ═══════════════════════════════════════════════════════════
export interface TeamSuspendedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamSuspendedEmail(input: TeamSuspendedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.suspended';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'স্থগিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamSuspended',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMREMOVED — vendor.team.removed
// ═══════════════════════════════════════════════════════════
export interface TeamRemovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamRemovedEmail(input: TeamRemovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.removed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamRemoved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMROLECHANGED — vendor.team.role_changed
// ═══════════════════════════════════════════════════════════
export interface TeamRoleChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamRoleChangedEmail(input: TeamRoleChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.role_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamRoleChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMPERMISSIONSUPDATED — vendor.team.permissions_updated
// ═══════════════════════════════════════════════════════════
export interface TeamPermissionsUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamPermissionsUpdatedEmail(input: TeamPermissionsUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.permissions_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamPermissionsUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITED — vendor.team.invited
// ═══════════════════════════════════════════════════════════
export interface TeamInvitedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInvitedEmail(input: TeamInvitedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invited';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInvited',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITEACCEPTED — vendor.team.invite_accepted
// ═══════════════════════════════════════════════════════════
export interface TeamInviteAcceptedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteAcceptedEmail(input: TeamInviteAcceptedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invite_accepted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInviteAccepted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITEEXPIRED — vendor.team.invite_expired
// ═══════════════════════════════════════════════════════════
export interface TeamInviteExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteExpiredEmail(input: TeamInviteExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invite_expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInviteExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORACTIVATED — vendor.vendor.activated
// ═══════════════════════════════════════════════════════════
export interface VendorActivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorActivatedEmail(input: VendorActivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorActivated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORDEACTIVATED — vendor.vendor.deactivated
// ═══════════════════════════════════════════════════════════
export interface VendorDeactivatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorDeactivatedEmail(input: VendorDeactivatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.deactivated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorDeactivated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREACTIVATED2 — vendor.vendor.reactivated
// ═══════════════════════════════════════════════════════════
export interface VendorReactivated2EmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReactivated2Email(input: VendorReactivated2EmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.reactivated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReactivated2',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORPROFILEUPDATED — vendor.vendor.profile_updated
// ═══════════════════════════════════════════════════════════
export interface VendorProfileUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorProfileUpdatedEmail(input: VendorProfileUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.profile_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorProfileUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORBUSINESSUPDATED — vendor.vendor.business_updated
// ═══════════════════════════════════════════════════════════
export interface VendorBusinessUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorBusinessUpdatedEmail(input: VendorBusinessUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.business_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorBusinessUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSTATUSCHANGED — vendor.vendor.status_changed
// ═══════════════════════════════════════════════════════════
export interface VendorStatusChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorStatusChangedEmail(input: VendorStatusChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorStatusChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORUPDATED — vendor.vendor.updated
// ═══════════════════════════════════════════════════════════
export interface VendorUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorUpdatedEmail(input: VendorUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFIEDUSER — vendor.vendor.verified
// ═══════════════════════════════════════════════════════════
export interface VendorVerifiedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerifiedUserEmail(input: VendorVerifiedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.verified';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerifiedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORFEATURED — vendor.vendor.featured
// ═══════════════════════════════════════════════════════════
export interface VendorFeaturedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorFeaturedEmail(input: VendorFeaturedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.featured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ফিচার্ড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorFeatured',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORUNFEATURED — vendor.vendor.unfeatured
// ═══════════════════════════════════════════════════════════
export interface VendorUnfeaturedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorUnfeaturedEmail(input: VendorUnfeaturedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.unfeatured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ফিচার্ড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorUnfeatured',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORBLOCKED — vendor.vendor.blocked
// ═══════════════════════════════════════════════════════════
export interface VendorBlockedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorBlockedEmail(input: VendorBlockedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.blocked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্লকড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorBlocked',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORDELETEDUSER — vendor.vendor.deleted
// ═══════════════════════════════════════════════════════════
export interface VendorDeletedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorDeletedUserEmail(input: VendorDeletedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.deleted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorDeletedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VERIFICATIONRESUBMITTED — vendor.verification.resubmitted
// ═══════════════════════════════════════════════════════════
export interface VerificationResubmittedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVerificationResubmittedEmail(input: VerificationResubmittedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.resubmitted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জমা দেওয়া হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VerificationResubmitted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONSUBMITTED — vendor.verification.submitted
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationSubmittedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationSubmittedEmail(input: VendorVerificationSubmittedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.submitted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জমা দেওয়া হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationSubmitted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONSTARTED — vendor.verification.started
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationStartedEmail(input: VendorVerificationStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationStarted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONEXPIRED — vendor.verification.expired
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationExpiredEmail(input: VendorVerificationExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONREVIEWSTARTED — vendor.verification.review_started
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationReviewStartedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationReviewStartedEmail(input: VendorVerificationReviewStartedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.review_started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationReviewStarted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALAPPEALRESOLVED — vendor.approval.appeal_resolved
// ═══════════════════════════════════════════════════════════
export interface ApprovalAppealResolvedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalAppealResolvedEmail(input: ApprovalAppealResolvedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.appeal_resolved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalAppealResolved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALREQUESTED — vendor.approval.requested
// ═══════════════════════════════════════════════════════════
export interface ApprovalRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalRequestedEmail(input: ApprovalRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalRequested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALREJECTED — vendor.approval.rejected
// ═══════════════════════════════════════════════════════════
export interface ApprovalRejectedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalRejectedEmail(input: ApprovalRejectedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalRejected',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALAPPROVED — vendor.approval.approved
// ═══════════════════════════════════════════════════════════
export interface ApprovalApprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalApprovedEmail(input: ApprovalApprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.approved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalApproved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEIMPROVED — vendor.performance.improved
// ═══════════════════════════════════════════════════════════
export interface PerformanceImprovedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceImprovedEmail(input: PerformanceImprovedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.improved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'উন্নত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceImproved',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEDECLINED — vendor.performance.declined
// ═══════════════════════════════════════════════════════════
export interface PerformanceDeclinedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceDeclinedEmail(input: PerformanceDeclinedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.declined';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অবনতি',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceDeclined',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEWARNINGISSUED — vendor.performance.warning_issued
// ═══════════════════════════════════════════════════════════
export interface PerformanceWarningIssuedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceWarningIssuedEmail(input: PerformanceWarningIssuedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.warning_issued';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জারি',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceWarningIssued',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEGRADECHANGED — vendor.performance.grade_changed
// ═══════════════════════════════════════════════════════════
export interface PerformanceGradeChangedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceGradeChangedEmail(input: PerformanceGradeChangedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.grade_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceGradeChanged',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEAUTOSUSPEND — vendor.performance.auto_suspend_triggered
// ═══════════════════════════════════════════════════════════
export interface PerformanceAutoSuspendEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceAutoSuspendEmail(input: PerformanceAutoSuspendEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.auto_suspend_triggered';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceAutoSuspend',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEEVALUATED — vendor.performance.evaluated
// ═══════════════════════════════════════════════════════════
export interface PerformanceEvaluatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceEvaluatedEmail(input: PerformanceEvaluatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.evaluated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceEvaluated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERELIGIBLEFORUPGRADE — vendor.tier.eligible_for_upgrade
// ═══════════════════════════════════════════════════════════
export interface TierEligibleForUpgradeEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierEligibleForUpgradeEmail(input: TierEligibleForUpgradeEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.eligible_for_upgrade';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierEligibleForUpgrade',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERUPGRADED — vendor.tier.upgraded
// ═══════════════════════════════════════════════════════════
export interface TierUpgradedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierUpgradedEmail(input: TierUpgradedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.upgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierUpgraded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERDOWNGRADED — vendor.tier.downgraded
// ═══════════════════════════════════════════════════════════
export interface TierDowngradedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierDowngradedEmail(input: TierDowngradedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.downgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডাউনগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierDowngraded',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERBENEFITAPPLIED — vendor.tier.benefit_applied
// ═══════════════════════════════════════════════════════════
export interface TierBenefitAppliedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierBenefitAppliedEmail(input: TierBenefitAppliedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.benefit_applied';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'টিয়ার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierBenefitApplied',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUSPENSIONEXPIRED — vendor.suspension.expired
// ═══════════════════════════════════════════════════════════
export interface SuspensionExpiredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionExpiredEmail(input: SuspensionExpiredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.suspension.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SuspensionExpired',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUSPENSIONLIFTED — vendor.suspension.lifted
// ═══════════════════════════════════════════════════════════
export interface SuspensionLiftedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionLiftedEmail(input: SuspensionLiftedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.suspension.lifted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SuspensionLifted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONCONFIGURED — vendor.commission.configured
// ═══════════════════════════════════════════════════════════
export interface CommissionConfiguredEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionConfiguredEmail(input: CommissionConfiguredEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.configured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionConfigured',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONADJUSTED — vendor.commission.adjusted
// ═══════════════════════════════════════════════════════════
export interface CommissionAdjustedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionAdjustedEmail(input: CommissionAdjustedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.adjusted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionAdjusted',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONUPDATED — vendor.commission.updated
// ═══════════════════════════════════════════════════════════
export interface CommissionUpdatedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionUpdatedEmail(input: CommissionUpdatedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionUpdated',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTREQUESTED — vendor.payout.requested
// ═══════════════════════════════════════════════════════════
export interface PayoutRequestedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutRequestedEmail(input: PayoutRequestedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutRequested',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTRELEASED — vendor.payout.released
// ═══════════════════════════════════════════════════════════
export interface PayoutReleasedEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutReleasedEmail(input: PayoutReleasedEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.released';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutReleased',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTFAILEDUSER — vendor.payout.failed
// ═══════════════════════════════════════════════════════════
export interface PayoutFailedUserEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutFailedUserEmail(input: PayoutFailedUserEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.failed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutFailedUser',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTONHOLD — vendor.payout.on_hold
// ═══════════════════════════════════════════════════════════
export interface PayoutOnHoldEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutOnHoldEmail(input: PayoutOnHoldEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.on_hold';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? `<p>${message}</p>` : ''}</p>
        <p>এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutOnHold',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      ${message ? `<p>${message}</p>` : ''}
      <p>This event has been processed successfully. Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCANCELLEDDIRECT — payment.payment.cancelled
// ═══════════════════════════════════════════════════════════
export interface PaymentCancelledDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCancelledDirectEmail(input: PaymentCancelledDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.cancelled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCancelledDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// CARTMERGEDDIRECT — cart.cart.merged
// ═══════════════════════════════════════════════════════════
export interface CartMergedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCartMergedDirectEmail(input: CartMergedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'cart.cart.merged';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/cart';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CartMergedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYMENTCREATEDDIRECT — payment.payment.created
// ═══════════════════════════════════════════════════════════
export interface PaymentCreatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPaymentCreatedDirectEmail(input: PaymentCreatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'payment.payment.created';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/account/payments';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'তৈরি হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PaymentCreatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PRODUCTUNPUBLISHEDDIRECT — product.product.unpublished
// ═══════════════════════════════════════════════════════════
export interface ProductUnpublishedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderProductUnpublishedDirectEmail(input: ProductUnpublishedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'product.product.unpublished';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/shop';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ProductUnpublishedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWSUBMITTEDDIRECT — vendor.review.submitted
// ═══════════════════════════════════════════════════════════
export interface VendorReviewSubmittedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewSubmittedDirectEmail(input: VendorReviewSubmittedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.submitted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জমা দেওয়া হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewSubmittedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORACTIVATEDDIRECT — vendor.vendor.activated
// ═══════════════════════════════════════════════════════════
export interface VendorActivatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorActivatedDirectEmail(input: VendorActivatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorActivatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORDEACTIVATEDDIRECT — vendor.vendor.deactivated
// ═══════════════════════════════════════════════════════════
export interface VendorDeactivatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorDeactivatedDirectEmail(input: VendorDeactivatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.deactivated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorDeactivatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREACTIVATEDDIRECT — vendor.vendor.reactivated
// ═══════════════════════════════════════════════════════════
export interface VendorReactivatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReactivatedDirectEmail(input: VendorReactivatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.reactivated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReactivatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONSUBMITTEDDIRECT — vendor.verification.submitted
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationSubmittedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationSubmittedDirectEmail(input: VendorVerificationSubmittedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.submitted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'জমা দেওয়া হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationSubmittedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORPROFILEUPDATEDDIRECT — vendor.vendor.profile_updated
// ═══════════════════════════════════════════════════════════
export interface VendorProfileUpdatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorProfileUpdatedDirectEmail(input: VendorProfileUpdatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.profile_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorProfileUpdatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORUNFEATUREDDIRECT — vendor.vendor.unfeatured
// ═══════════════════════════════════════════════════════════
export interface VendorUnfeaturedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorUnfeaturedDirectEmail(input: VendorUnfeaturedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.unfeatured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorUnfeaturedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORUPDATEDDIRECT — vendor.vendor.updated
// ═══════════════════════════════════════════════════════════
export interface VendorUpdatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorUpdatedDirectEmail(input: VendorUpdatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorUpdatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONSTARTEDDIRECT — vendor.subscription.started
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionStartedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionStartedDirectEmail(input: VendorSubscriptionStartedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionStartedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONUPGRADEDDIRECT — vendor.subscription.upgraded
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionUpgradedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionUpgradedDirectEmail(input: VendorSubscriptionUpgradedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.upgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionUpgradedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONDOWNGRADEDDIRECT — vendor.subscription.downgraded
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionDowngradedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionDowngradedDirectEmail(input: VendorSubscriptionDowngradedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.downgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডাউনগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionDowngradedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONEXPIREDDIRECT — vendor.subscription.expired
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionExpiredDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionExpiredDirectEmail(input: VendorSubscriptionExpiredDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionExpiredDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONRENEWEDDIRECT — vendor.subscription.renewed
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionRenewedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionRenewedDirectEmail(input: VendorSubscriptionRenewedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.renewed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionRenewedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONTRIALENDEDDIRECT — vendor.subscription.trial_ended
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionTrialEndedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionTrialEndedDirectEmail(input: VendorSubscriptionTrialEndedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.trial_ended';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionTrialEndedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSUBSCRIPTIONTRIALSTARTEDDIRECT — vendor.subscription.trial_started
// ═══════════════════════════════════════════════════════════
export interface VendorSubscriptionTrialStartedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorSubscriptionTrialStartedDirectEmail(input: VendorSubscriptionTrialStartedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.trial_started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorSubscriptionTrialStartedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONFEATUREENABLEDDIRECT — vendor.subscription.feature_enabled
// ═══════════════════════════════════════════════════════════
export interface SubscriptionFeatureEnabledDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionFeatureEnabledDirectEmail(input: SubscriptionFeatureEnabledDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.feature_enabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SubscriptionFeatureEnabledDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUBSCRIPTIONFEATUREDISABLEDDIRECT — vendor.subscription.feature_disabled
// ═══════════════════════════════════════════════════════════
export interface SubscriptionFeatureDisabledDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSubscriptionFeatureDisabledDirectEmail(input: SubscriptionFeatureDisabledDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.subscription.feature_disabled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নিষ্ক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SubscriptionFeatureDisabledDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITEDDIRECT — vendor.team.invited
// ═══════════════════════════════════════════════════════════
export interface TeamInvitedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInvitedDirectEmail(input: TeamInvitedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invited';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আমন্ত্রিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInvitedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMREMOVEDDIRECT — vendor.team.removed
// ═══════════════════════════════════════════════════════════
export interface TeamRemovedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamRemovedDirectEmail(input: TeamRemovedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.removed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সরানো হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamRemovedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMROLECHANGEDDIRECT — vendor.team.role_changed
// ═══════════════════════════════════════════════════════════
export interface TeamRoleChangedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamRoleChangedDirectEmail(input: TeamRoleChangedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.role_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamRoleChangedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITEACCEPTEDDIRECT — vendor.team.invite_accepted
// ═══════════════════════════════════════════════════════════
export interface TeamInviteAcceptedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteAcceptedDirectEmail(input: TeamInviteAcceptedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invite_accepted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInviteAcceptedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMINVITEEXPIREDDIRECT — vendor.team.invite_expired
// ═══════════════════════════════════════════════════════════
export interface TeamInviteExpiredDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamInviteExpiredDirectEmail(input: TeamInviteExpiredDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.invite_expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamInviteExpiredDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TEAMPERMISSIONSUPDATEDDIRECT — vendor.team.permissions_updated
// ═══════════════════════════════════════════════════════════
export interface TeamPermissionsUpdatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTeamPermissionsUpdatedDirectEmail(input: TeamPermissionsUpdatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.team.permissions_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TeamPermissionsUpdatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEIMPROVEDDIRECT — vendor.performance.improved
// ═══════════════════════════════════════════════════════════
export interface PerformanceImprovedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceImprovedDirectEmail(input: PerformanceImprovedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.improved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'উন্নত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceImprovedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEGRADECHANGEDDIRECT — vendor.performance.grade_changed
// ═══════════════════════════════════════════════════════════
export interface PerformanceGradeChangedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceGradeChangedDirectEmail(input: PerformanceGradeChangedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.grade_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceGradeChangedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEWARNINGISSUEDDIRECT — vendor.performance.warning_issued
// ═══════════════════════════════════════════════════════════
export interface PerformanceWarningIssuedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceWarningIssuedDirectEmail(input: PerformanceWarningIssuedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.warning_issued';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সতর্কতা',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceWarningIssuedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEDECLINEDDIRECT — vendor.performance.declined
// ═══════════════════════════════════════════════════════════
export interface PerformanceDeclinedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceDeclinedDirectEmail(input: PerformanceDeclinedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.declined';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অবনতি',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceDeclinedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERUPGRADEDDIRECT — vendor.tier.upgraded
// ═══════════════════════════════════════════════════════════
export interface TierUpgradedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierUpgradedDirectEmail(input: TierUpgradedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.upgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierUpgradedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERDOWNGRADEDDIRECT — vendor.tier.downgraded
// ═══════════════════════════════════════════════════════════
export interface TierDowngradedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierDowngradedDirectEmail(input: TierDowngradedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.downgraded';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ডাউনগ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierDowngradedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERELIGIBLEFORUPGRADEDIRECT — vendor.tier.eligible_for_upgrade
// ═══════════════════════════════════════════════════════════
export interface TierEligibleForUpgradeDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierEligibleForUpgradeDirectEmail(input: TierEligibleForUpgradeDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.eligible_for_upgrade';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'গ্রেড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierEligibleForUpgradeDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// TIERBENEFITAPPLIEDDIRECT — vendor.tier.benefit_applied
// ═══════════════════════════════════════════════════════════
export interface TierBenefitAppliedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderTierBenefitAppliedDirectEmail(input: TierBenefitAppliedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.tier.benefit_applied';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'টিয়ার',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'TierBenefitAppliedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUSPENSIONEXPIREDDIRECT — vendor.suspension.expired
// ═══════════════════════════════════════════════════════════
export interface SuspensionExpiredDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionExpiredDirectEmail(input: SuspensionExpiredDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.suspension.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SuspensionExpiredDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SUSPENSIONLIFTEDDIRECT — vendor.suspension.lifted
// ═══════════════════════════════════════════════════════════
export interface SuspensionLiftedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSuspensionLiftedDirectEmail(input: SuspensionLiftedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.suspension.lifted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'উত্তোলিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SuspensionLiftedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTPAIDDIRECT — vendor.payout.paid
// ═══════════════════════════════════════════════════════════
export interface PayoutPaidDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutPaidDirectEmail(input: PayoutPaidDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.paid';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'পরিশোধিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutPaidDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTREJECTEDDIRECT — vendor.payout.rejected
// ═══════════════════════════════════════════════════════════
export interface PayoutRejectedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutRejectedDirectEmail(input: PayoutRejectedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutRejectedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTREQUESTEDDIRECT — vendor.payout.requested
// ═══════════════════════════════════════════════════════════
export interface PayoutRequestedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutRequestedDirectEmail(input: PayoutRequestedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutRequestedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTRELEASEDDIRECT — vendor.payout.released
// ═══════════════════════════════════════════════════════════
export interface PayoutReleasedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutReleasedDirectEmail(input: PayoutReleasedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.released';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুক্ত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutReleasedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTFAILEDDIRECT — vendor.payout.failed
// ═══════════════════════════════════════════════════════════
export interface PayoutFailedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutFailedDirectEmail(input: PayoutFailedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.failed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্যর্থ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutFailedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PAYOUTONHOLDDIRECT — vendor.payout.on_hold
// ═══════════════════════════════════════════════════════════
export interface PayoutOnHoldDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPayoutOnHoldDirectEmail(input: PayoutOnHoldDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.payout.on_hold';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PayoutOnHoldDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTCANCELLEDDIRECT — vendor.settlement.cancelled
// ═══════════════════════════════════════════════════════════
export interface SettlementCancelledDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementCancelledDirectEmail(input: SettlementCancelledDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.cancelled';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'বাতিল',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementCancelledDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTPROCESSINGDIRECT — vendor.settlement.processing
// ═══════════════════════════════════════════════════════════
export interface SettlementProcessingDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementProcessingDirectEmail(input: SettlementProcessingDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.processing';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রসেস হচ্ছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementProcessingDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTINITIATEDDIRECT — vendor.settlement.initiated
// ═══════════════════════════════════════════════════════════
export interface SettlementInitiatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementInitiatedDirectEmail(input: SettlementInitiatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.initiated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementInitiatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// SETTLEMENTONHOLDDIRECT — vendor.settlement.on_hold
// ═══════════════════════════════════════════════════════════
export interface SettlementOnHoldDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderSettlementOnHoldDirectEmail(input: SettlementOnHoldDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.settlement.on_hold';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'SettlementOnHoldDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONACTIVATEDDIRECT — vendor.commission.activated
// ═══════════════════════════════════════════════════════════
export interface CommissionActivatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionActivatedDirectEmail(input: CommissionActivatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.activated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'সক্রিয়',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionActivatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONCONFIGUREDDIRECT — vendor.commission.configured
// ═══════════════════════════════════════════════════════════
export interface CommissionConfiguredDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionConfiguredDirectEmail(input: CommissionConfiguredDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.configured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionConfiguredDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONADJUSTEDDIRECT — vendor.commission.adjusted
// ═══════════════════════════════════════════════════════════
export interface CommissionAdjustedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionAdjustedDirectEmail(input: CommissionAdjustedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.adjusted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionAdjustedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// COMMISSIONUPDATEDDIRECT — vendor.commission.updated
// ═══════════════════════════════════════════════════════════
export interface CommissionUpdatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderCommissionUpdatedDirectEmail(input: CommissionUpdatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.commission.updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'CommissionUpdatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALREQUESTEDDIRECT — vendor.approval.requested
// ═══════════════════════════════════════════════════════════
export interface ApprovalRequestedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalRequestedDirectEmail(input: ApprovalRequestedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.requested';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুরোধ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalRequestedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALAPPROVEDDIRECT — vendor.approval.approved
// ═══════════════════════════════════════════════════════════
export interface ApprovalApprovedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalApprovedDirectEmail(input: ApprovalApprovedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.approved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalApprovedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALREJECTEDDIRECT — vendor.approval.rejected
// ═══════════════════════════════════════════════════════════
export interface ApprovalRejectedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalRejectedDirectEmail(input: ApprovalRejectedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalRejectedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// APPROVALAPPEALRESOLVEDDIRECT — vendor.approval.appeal_resolved
// ═══════════════════════════════════════════════════════════
export interface ApprovalAppealResolvedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderApprovalAppealResolvedDirectEmail(input: ApprovalAppealResolvedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.approval.appeal_resolved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ApprovalAppealResolvedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONSTARTEDDIRECT — vendor.verification.started
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationStartedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationStartedDirectEmail(input: VendorVerificationStartedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.started';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'শুরু হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationStartedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONAPPROVEDDIRECT — vendor.verification.approved
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationApprovedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationApprovedDirectEmail(input: VendorVerificationApprovedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.approved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationApprovedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFICATIONEXPIREDDIRECT — vendor.verification.expired
// ═══════════════════════════════════════════════════════════
export interface VendorVerificationExpiredDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerificationExpiredDirectEmail(input: VendorVerificationExpiredDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.verification.expired';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মেয়াদ শেষ',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerificationExpiredDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWAPPROVEDDIRECT — vendor.review.approved
// ═══════════════════════════════════════════════════════════
export interface VendorReviewApprovedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewApprovedDirectEmail(input: VendorReviewApprovedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.approved';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'অনুমোদিত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewApprovedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWREJECTEDDIRECT — vendor.review.rejected
// ═══════════════════════════════════════════════════════════
export interface VendorReviewRejectedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewRejectedDirectEmail(input: VendorReviewRejectedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.rejected';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'প্রত্যাখ্যাত',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewRejectedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWREPLIEDDIRECT — vendor.review.replied
// ═══════════════════════════════════════════════════════════
export interface VendorReviewRepliedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewRepliedDirectEmail(input: VendorReviewRepliedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.replied';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewRepliedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWFLAGGEDDIRECT — vendor.review.flagged
// ═══════════════════════════════════════════════════════════
export interface VendorReviewFlaggedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewFlaggedDirectEmail(input: VendorReviewFlaggedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.flagged';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewFlaggedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORREVIEWHIDDENDIRECT — vendor.review.hidden
// ═══════════════════════════════════════════════════════════
export interface VendorReviewHiddenDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorReviewHiddenDirectEmail(input: VendorReviewHiddenDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.hidden';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorReviewHiddenDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// REVIEWHELPFULMARKEDDIRECT — vendor.review.helpful_marked
// ═══════════════════════════════════════════════════════════
export interface ReviewHelpfulMarkedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderReviewHelpfulMarkedDirectEmail(input: ReviewHelpfulMarkedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.review.helpful_marked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'ReviewHelpfulMarkedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORSTATUSCHANGEDDIRECT — vendor.vendor.status_changed
// ═══════════════════════════════════════════════════════════
export interface VendorStatusChangedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorStatusChangedDirectEmail(input: VendorStatusChangedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.status_changed';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorStatusChangedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORBUSINESSUPDATEDDIRECT — vendor.vendor.business_updated
// ═══════════════════════════════════════════════════════════
export interface VendorBusinessUpdatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorBusinessUpdatedDirectEmail(input: VendorBusinessUpdatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.business_updated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'আপডেট হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorBusinessUpdatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORVERIFIEDDIRECT — vendor.vendor.verified
// ═══════════════════════════════════════════════════════════
export interface VendorVerifiedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorVerifiedDirectEmail(input: VendorVerifiedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.verified';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'যাচাই সম্পন্ন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorVerifiedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORFEATUREDDIRECT — vendor.vendor.featured
// ═══════════════════════════════════════════════════════════
export interface VendorFeaturedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorFeaturedDirectEmail(input: VendorFeaturedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.featured';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorFeaturedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORBLOCKEDDIRECT — vendor.vendor.blocked
// ═══════════════════════════════════════════════════════════
export interface VendorBlockedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorBlockedDirectEmail(input: VendorBlockedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.blocked';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'ব্লকড',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorBlockedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// VENDORDELETEDDIRECT — vendor.vendor.deleted
// ═══════════════════════════════════════════════════════════
export interface VendorDeletedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderVendorDeletedDirectEmail(input: VendorDeletedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.vendor.deleted';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'মুছে ফেলা হয়েছে',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'VendorDeletedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEAUTOSUSPENDDIRECT — vendor.performance.auto_suspend_triggered
// ═══════════════════════════════════════════════════════════
export interface PerformanceAutoSuspendDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceAutoSuspendDirectEmail(input: PerformanceAutoSuspendDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.auto_suspend_triggered';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceAutoSuspendDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}


// ═══════════════════════════════════════════════════════════
// PERFORMANCEEVALUATEDDIRECT — vendor.performance.evaluated
// ═══════════════════════════════════════════════════════════
export interface PerformanceEvaluatedDirectEmailInput {
  readonly name: string;
  readonly locale?: 'en' | 'bn';
  readonly [key: string]: unknown;
}

export function renderPerformanceEvaluatedDirectEmail(input: PerformanceEvaluatedDirectEmailInput): string {
  const isBangla = (input.locale ?? 'bn') === 'bn';
  const eventSubject = (input.subject as string | undefined) ?? 'vendor.performance.evaluated';
  const message = (input.message as string | undefined);
  const url = (input.actionUrl as string | undefined) ?? 'https://vubon.com.bd/vendor';

  if (isBangla) {
    return BanglaEmailTemplate.render({
      title: 'নোটিফিকেশন',
      locale: 'bn',
      greeting: `প্রিয় ${input.name},`,
      bodyHtml: `
        <p>${message ? message : 'এই ইভেন্টটি সফলভাবে সম্পন্ন হয়েছে।'}</p>
        <p>বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">ইভেন্ট: ${eventSubject}</p>
      `,
      ctaButton: { label: 'বিস্তারিত দেখুন', url, variant: 'primary' },
    });
  }

  return BanglaEmailTemplate.render({
    title: 'PerformanceEvaluatedDirect',
    locale: 'en',
    greeting: `Hi ${input.name},`,
    bodyHtml: `
      <p>${message ? message : 'This event has been processed successfully.'}</p>
      <p>Click below for details.</p>
      <p style="color:#6b7280;font-size:12px;margin-top:20px;">Event: ${eventSubject}</p>
    `,
    ctaButton: { label: 'View Details', url, variant: 'primary' },
  });
}

export function renderProductBrandLogoUpdatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ব্র্যান্ড লোগো আপডেট হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Brand Logo Updated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার ব্র্যান্ডের লোগো সফলভাবে আপডেট করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Your brand logo has been updated successfully.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductCategoryMovedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ক্যাটাগরি সরানো হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Category Moved</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">ক্যাটাগরিটি নতুন প্যারেন্ট ক্যাটাগরিতে সরানো হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Category has been moved to a new parent.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductCategoryUpdatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ক্যাটাগরি আপডেট হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Category Updated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">ক্যাটাগরির তথ্য সফলভাবে আপডেট করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Category details have been updated.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductCollectionProductAddedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কালেকশনে পণ্য যোগ হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Product Added to Collection</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কালেকশনে নতুন পণ্য যোগ করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">A new product has been added to the collection.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductCollectionProductRemovedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কালেকশন থেকে পণ্য সরানো হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Product Removed from Collection</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">কালেকশন থেকে পণ্যটি সরানো হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product removed from the collection.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductCollectionUpdatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কালেকশন আপডেট হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Collection Updated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">কালেকশনের তথ্য আপডেট করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Collection details have been updated.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductInventoryAdjustedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ইনভেন্টরি সামঞ্জস্য করা হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Inventory Adjusted</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যের ইনভেন্টরি ম্যানুয়ালি সামঞ্জস্য করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product inventory has been manually adjusted.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductInventoryReleasedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ইনভেন্টরি রিলিজ হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Inventory Released</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">রিজার্ভ করা ইনভেন্টরি রিলিজ করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Reserved inventory has been released.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductInventoryReservedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ইনভেন্টরি রিজার্ভ হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Inventory Reserved</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">অর্ডারের জন্য ইনভেন্টরি রিজার্ভ করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Inventory has been reserved for your order.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductInventoryRestockedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ইনভেন্টরি রিস্টক হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Inventory Restocked</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যের ইনভেন্টরি আবার স্টকে যোগ করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product inventory has been restocked.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductProductStatusChangedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">পণ্যের স্ট্যাটাস পরিবর্তিত হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Product Status Changed</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যের স্ট্যাটাস পরিবর্তন করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product status has changed.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductProductStockChangedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">পণ্যের স্টক পরিবর্তিত হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Product Stock Changed</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যের স্টক লেভেল পরিবর্তিত হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product stock level has changed.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductProductUpdatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">পণ্য আপডেট হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Product Updated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যের তথ্য সফলভাবে আপডেট করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Product details have been updated.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductReviewMarkedHelpfulEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">রিভিউ সহায়ক হিসেবে চিহ্নিত</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Review Marked Helpful</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">একটি রিভিউ সহায়ক হিসেবে চিহ্নিত হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">A review has been marked as helpful.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductVariantAddedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">নতুন ভ্যারিয়েন্ট যোগ হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Variant Added</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্যে নতুন ভ্যারিয়েন্ট যোগ করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">A new variant has been added to the product.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductVariantRemovedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ভ্যারিয়েন্ট সরানো হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Variant Removed</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">পণ্য থেকে ভ্যারিয়েন্টটি সরানো হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">The variant has been removed from the product.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductVariantStockChangedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ভ্যারিয়েন্ট স্টক পরিবর্তিত</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Variant Stock Changed</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">ভ্যারিয়েন্টের স্টক লেভেল পরিবর্তিত হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Variant stock level has changed.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderProductVariantUpdatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">ভ্যারিয়েন্ট আপডেট হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Variant Updated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">ভ্যারিয়েন্টের তথ্য আপডেট করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">The variant details have been updated.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartTotalsRecalculatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কার্টের মোট পুনঃগণনা হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Cart Totals Recalculated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কার্টের মোট মূল্য পুনরায় গণনা করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Your cart totals have been recalculated.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartMergerConflictResolvedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কার্ট মার্জ দ্বন্দ্ব সমাধান হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Cart Merger Conflict Resolved</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">কার্ট মার্জের দ্বন্দ্বগুলো সমাধান করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Cart merger conflicts have been resolved.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartMergerStartedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কার্ট মার্জ শুরু হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Cart Merger Started</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কার্টগুলো একসাথে মার্জ করা হচ্ছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Your carts are being merged together.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartTaxCalculatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কার্টের ট্যাক্স গণনা হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Cart Tax Calculated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কার্টের জন্য ট্যাক্স গণনা করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Tax has been calculated for your cart.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartTaxRemovedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কার্ট থেকে ট্যাক্স সরানো হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Cart Tax Removed</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কার্ট থেকে ট্যাক্স সরানো হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Tax has been removed from your cart.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderCartCouponValidatedEmail(p: Record<string, unknown>): string {
  const name = String(p['name'] ?? 'গ্রাহক');
  return `
    <html>
      <body style="font-family: 'Noto Sans Bengali', Arial, sans-serif; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">কুপন যাচাই সফল হয়েছে</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Coupon Validated</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">প্রিয় ${name},</p>
            <p style="font-size: 16px; line-height: 1.6;">আপনার কুপন সফলভাবে যাচাই করা হয়েছে।</p>
            <p style="font-size: 14px; color: #666; line-height: 1.5; border-top: 1px dashed #ddd; padding-top: 16px; margin-top: 20px;">Your coupon has been validated successfully.</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            <p>Vubon.com.bd — Your Trusted Marketplace</p>
            <p style="margin: 5px 0 0 0;">© Vubon. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}