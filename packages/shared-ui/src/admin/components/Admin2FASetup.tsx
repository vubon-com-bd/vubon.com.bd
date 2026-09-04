/**
 * Admin2FASetup Component
 * অ্যাডমিন 2FA সেটআপ কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';

export interface Admin2FASetupResult {
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
}

export interface Admin2FASetupProps {
  onSetup: (data: any) => Promise<Admin2FASetupResult>;
  onVerify: (data: any) => Promise<boolean>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const Admin2FASetup: React.FC<Admin2FASetupProps> = ({
  onSetup,
  onVerify,
  onSuccess,
  onError,
  className = '',
}) => {
  const [method, setMethod] = useState<'totp' | 'sms' | 'email'>('totp');
  const [code, setCode] = useState('');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [isLoading, setIsLoading] = useState(false);

  const handleSetup = async () => {
    setIsLoading(true);
    try {
      const result = await onSetup({ method });
      if (result) {
        setSecret(result.secret || '');
        setQrCode(result.qrCode || '');
        setBackupCodes(result.backupCodes || []);
        setStep('verify');
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const verified = await onVerify({ code, method });
      if (verified) {
        setStep('complete');
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'complete') {
    return (
      <Card className={`p-6 text-center ${className}`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">2FA Enabled!</h3>
        <p className="text-sm text-gray-500">Two-factor authentication has been set up successfully.</p>
        {backupCodes.length > 0 && (
          <div className="mt-4 rounded-md bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-700">Backup Codes</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {backupCodes.map((code, index) => (
                <code key={index} className="text-sm text-gray-600">{code}</code>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">
        {step === 'setup' ? 'Set up 2FA' : 'Verify 2FA'}
      </h3>
      <p className="text-sm text-gray-500">
        {step === 'setup'
          ? 'Choose a method for two-factor authentication.'
          : 'Enter the verification code from your authenticator app.'}
      </p>

      {step === 'setup' ? (
        <div className="mt-4 space-y-4">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'totp' | 'sms' | 'email')}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="totp">Authenticator App</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
          <Button variant="primary" fullWidth onClick={handleSetup} loading={isLoading}>
            Continue
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
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
            fullWidth
          />
          <Button
            variant="primary"
            fullWidth
            onClick={handleVerify}
            loading={isLoading}
            disabled={code.length !== 6}
          >
            Verify
          </Button>
        </div>
      )}
    </Card>
  );
};
