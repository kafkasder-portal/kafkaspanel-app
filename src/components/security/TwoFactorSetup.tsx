/**
 * Two-Factor Authentication Setup Component
 * TypeScript best practices ile 2FA kurulum komponenti
 */

import React, { useState } from 'react';
import { 
  Smartphone, 
  Shield, 
  Copy, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Key,
  QrCode
} from 'lucide-react';
import { useTwoFactorSetup } from '@/hooks/useTwoFactorAuth';

interface TwoFactorSetupProps {
  readonly userId: string;
  readonly onComplete?: () => void;
  readonly onCancel?: () => void;
  readonly className?: string;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  userId,
  onComplete,
  onCancel,
  className = ''
}) => {
  const {
    currentStep,
    verificationCode,
    setVerificationCode,
    backupCodes,
    setupData,
    isLoading,
    error,
    startSetup,
    completeSetup,
    resetSetup
  } = useTwoFactorSetup();

  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [backupCodesDownloaded, setBackupCodesDownloaded] = useState(false);

  const handleStartSetup = () => {
    startSetup(userId);
  };

  const handleCompleteSetup = async () => {
    const success = await completeSetup(userId);
    if (success && onComplete) {
      onComplete();
    }
  };

  const handleCancel = () => {
    resetSetup();
    if (onCancel) {
      onCancel();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = '2fa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setBackupCodesDownloaded(true);
  };

  const renderInitialStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Enable Two-Factor Authentication
        </h2>
        <p className="text-gray-600">
          Add an extra layer of security to your account by enabling 2FA.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">What you'll need:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            An authenticator app (Google Authenticator, Authy, etc.)
          </li>
          <li className="flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            Ability to scan QR codes or manually enter codes
          </li>
          <li className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            A secure place to store backup codes
          </li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleStartSetup}
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Setting up...' : 'Start Setup'}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderSetupStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Scan QR Code
        </h2>
        <p className="text-gray-600">
          Use your authenticator app to scan this QR code.
        </p>
      </div>

      {setupData && (
        <div className="space-y-4">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg border">
              <img 
                src={setupData.qrCodeUrl} 
                alt="2FA QR Code"
                className="w-48 h-48"
              />
            </div>
          </div>

          {/* Manual Entry */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              Can't scan? Enter manually:
            </h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border rounded px-3 py-2 text-sm font-mono">
                {setupData.manualEntryCode}
              </code>
              <button
                onClick={() => copyToClipboard(setupData.secret)}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setShowBackupCodes(true)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Verify Setup
        </h2>
        <p className="text-gray-600">
          Enter the 6-digit code from your authenticator app to complete setup.
        </p>
      </div>

      {/* Backup Codes Section */}
      {showBackupCodes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium text-yellow-900">Backup Codes</h3>
          </div>
          <p className="text-yellow-800 text-sm mb-3">
            Save these backup codes in a secure location. You can use them to access your account if you lose your device.
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {backupCodes.map((code, index) => (
              <code key={index} className="bg-white border rounded px-2 py-1 text-sm font-mono">
                {code}
              </code>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={downloadBackupCodes}
              className="flex items-center gap-2 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => copyToClipboard(backupCodes.join('\n'))}
              className="flex items-center gap-2 border border-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm hover:bg-yellow-100"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </button>
          </div>

          {backupCodesDownloaded && (
            <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              Backup codes downloaded successfully
            </div>
          )}
        </div>
      )}

      {/* Verification Code Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Verification Code
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="000000"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono"
          maxLength={6}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleCompleteSetup}
          disabled={isLoading || verificationCode.length !== 6 || (!backupCodesDownloaded && showBackupCodes)}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Complete Setup'}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>

      {showBackupCodes && !backupCodesDownloaded && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">
              Please download your backup codes before completing setup
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderCompleteStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          2FA Enabled Successfully!
        </h2>
        <p className="text-gray-600">
          Your account is now protected with two-factor authentication.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2">Important reminders:</h3>
        <ul className="text-sm text-green-800 space-y-1 text-left">
          <li>• Keep your backup codes in a secure location</li>
          <li>• Don't share your authenticator app or codes with anyone</li>
          <li>• You can regenerate backup codes anytime from security settings</li>
        </ul>
      </div>

      <button
        onClick={onComplete}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Done
      </button>
    </div>
  );

  return (
    <div className={`max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 ${className}`}>
      {currentStep === 'initial' && renderInitialStep()}
      {currentStep === 'setup' && renderSetupStep()}
      {currentStep === 'verification' && renderVerificationStep()}
      {currentStep === 'complete' && renderCompleteStep()}
    </div>
  );
};
