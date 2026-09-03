/**
 * Auth MFASetup Component
 * প্রমীকরণ MFA সেটআপ কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useMFA } from '@vubon/shared-auth';
import { AuthMFAEndpoints } from '@vubon/shared-api';
import { AuthMFAType, AuthMFAMethod, AuthMFASetupResponse } from '@vubon/shared-types';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';
import { Input } from '../common/components/Input';

export interface AuthMFASetupProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  userId?: string;
  className?: string;
}

// Available MFA methods - AuthMFAMethod টাইপের সাথে মিলিয়ে
const AVAILABLE_METHODS: AuthMFAMethod[] = [
  'authenticator_app' as AuthMFAMethod,
  'sms_otp' as AuthMFAMethod,
  'email_otp' as AuthMFAMethod,
];

export const AuthMFASetup: React.FC<AuthMFASetupProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const [method, setMethod] = useState<AuthMFAMethod>(AVAILABLE_METHODS[0]);
  const [code, setCode] = useState('');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');

  const mfaEndpoints = new AuthMFAEndpoints({} as any);
  const { setupMFA, verifyMFA, generateBackupCodes } = useMFA(mfaEndpoints);

  const handleSetup = async () => {
    try {
      // setupMFA expects (type: AuthMFAType, method: AuthMFAMethod)
      const result = await setupMFA('totp' as AuthMFAType, method);
      const mfaResult = result as unknown as AuthMFASetupResponse;
      setSecret(mfaResult.secret || '');
      setQrCode(mfaResult.qrCode || '');
      setBackupCodes(mfaResult.backupCodes || []);
      setStep('verify');
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleVerify = async () => {
    try {
      const verified = await verifyMFA(code, method);
      if (verified) {
        const codes = await generateBackupCodes();
        setBackupCodes(codes);
        setStep('complete');
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AuthMFAMethod;
    if (AVAILABLE_METHODS.includes(value)) {
      setMethod(value);
    }
  };

  if (step === 'complete') {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">MFA Enabled!</h2>
          <p className="text-sm text-gray-500">
            Multi-factor authentication has been set up successfully.
          </p>
          {backupCodes.length > 0 && (
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-700">Backup Codes</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {backupCodes.map((code, index) => (
                  <code key={index} className="text-sm text-gray-600">
                    {code}
                  </code>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Save these codes in a secure place.
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'setup' ? 'Set up MFA' : 'Verify MFA'}
          </h2>
          <p className="text-sm text-gray-500">
            {step === 'setup'
              ? 'Choose a method for two-factor authentication.'
              : 'Enter the code from your authenticator app.'}
          </p>
        </div>

        {step === 'setup' ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Method</label>
              <select
                value={method}
                onChange={handleMethodChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="authenticator_app">Authenticator App (TOTP)</option>
                <option value="sms_otp">SMS</option>
                <option value="email_otp">Email</option>
              </select>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleSetup}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            {qrCode && (
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="h-48 w-48" />
              </div>
            )}
            {secret && (
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">Secret Key</p>
                <code className="text-sm font-mono text-gray-700">{secret}</code>
              </div>
            )}
            <Input
              label="Verification Code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              fullWidth
            />
            <Button
              variant="primary"
              fullWidth
              onClick={handleVerify}
              disabled={code.length !== 6}
            >
              Verify
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
