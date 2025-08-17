/**
 * Security Dashboard Component
 * TypeScript best practices ile güvenlik dashboard'u
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Download,
  RotateCcw,
  Lock,
  UserX,
  Activity
} from 'lucide-react';
import { useTwoFactorAuth } from '@/hooks/useTwoFactorAuth';
import { TwoFactorSetup } from './TwoFactorSetup';

interface SecurityDashboardProps {
  readonly userId: string;
  readonly className?: string;
}

interface SecurityLog {
  readonly id: string;
  readonly type: 'login' | '2fa_enabled' | '2fa_disabled' | 'backup_codes_regenerated' | 'failed_login' | 'password_changed';
  readonly description: string;
  readonly timestamp: Date;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly location?: string;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  userId,
  className = ''
}) => {
  const {
    isEnabled,
    status,
    disableTwoFactor,
    regenerateBackupCodes,
    refreshStatus,
    isLoading,
    error
  } = useTwoFactorAuth(userId);

  const [showSetup, setShowSetup] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [disableVerificationCode, setDisableVerificationCode] = useState('');
  const [regenerateVerificationCode, setRegenerateVerificationCode] = useState('');
  const [showRegenerateForm, setShowRegenerateForm] = useState(false);
  const [newBackupCodes, setNewBackupCodes] = useState<readonly string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      type: 'login',
      description: 'Successful login',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100',
      location: 'Istanbul, Turkey'
    },
    {
      id: '2',
      type: '2fa_enabled',
      description: '2FA was enabled',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100'
    },
    {
      id: '3',
      type: 'failed_login',
      description: 'Failed login attempt',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      ipAddress: '203.0.113.1',
      location: 'Unknown location'
    }
  ]);

  useEffect(() => {
    refreshStatus(userId);
  }, [userId, refreshStatus]);

  const handleDisable2FA = async () => {
    if (!disableVerificationCode.trim()) {
      return;
    }

    const success = await disableTwoFactor(userId, disableVerificationCode.trim());
    if (success) {
      setShowDisableConfirm(false);
      setDisableVerificationCode('');
    }
  };

  const handleRegenerateBackupCodes = async () => {
    if (!regenerateVerificationCode.trim()) {
      return;
    }

    const codes = await regenerateBackupCodes(userId, regenerateVerificationCode.trim());
    if (codes.length > 0) {
      setNewBackupCodes(codes);
      setShowRegenerateForm(false);
      setRegenerateVerificationCode('');
      setShowBackupCodes(true);
    }
  };

  const downloadBackupCodes = () => {
    const codesText = newBackupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = '2fa-backup-codes-new.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(newBackupCodes.join('\n'));
  };

  const getLogIcon = (type: SecurityLog['type']) => {
    switch (type) {
      case 'login':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case '2fa_enabled':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case '2fa_disabled':
        return <Shield className="w-4 h-4 text-orange-600" />;
      case 'backup_codes_regenerated':
        return <Key className="w-4 h-4 text-blue-600" />;
      case 'failed_login':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'password_changed':
        return <Lock className="w-4 h-4 text-green-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLogColor = (type: SecurityLog['type']) => {
    switch (type) {
      case 'login':
      case 'password_changed':
        return 'border-green-200 bg-green-50';
      case '2fa_enabled':
      case 'backup_codes_regenerated':
        return 'border-blue-200 bg-blue-50';
      case '2fa_disabled':
        return 'border-orange-200 bg-orange-50';
      case 'failed_login':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (showSetup) {
    return (
      <TwoFactorSetup
        userId={userId}
        onComplete={() => {
          setShowSetup(false);
          refreshStatus(userId);
        }}
        onCancel={() => setShowSetup(false)}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        </div>
        <p className="text-gray-600">
          Manage your account security settings and monitor security activity.
        </p>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isEnabled ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Smartphone className={`w-5 h-5 ${isEnabled ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">
                {isEnabled ? 'Enabled' : 'Disabled'} • Add an extra layer of security
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isEnabled ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Inactive</span>
              </div>
            )}
          </div>
        </div>

        {isEnabled && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Setup Date:</span>
                <div className="font-medium">
                  {status.setupAt?.toLocaleDateString() || 'Unknown'}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Last Used:</span>
                <div className="font-medium">
                  {status.lastUsed?.toLocaleDateString() || 'Never'}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Backup Codes:</span>
                <div className="font-medium">
                  {status.remainingBackupCodes} remaining
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {!isEnabled ? (
            <button
              onClick={() => setShowSetup(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enable 2FA
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowRegenerateForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <RotateCcw className="w-4 h-4" />
                Regenerate Backup Codes
              </button>
              <button
                onClick={() => setShowDisableConfirm(true)}
                className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded hover:bg-red-50"
              >
                <UserX className="w-4 h-4" />
                Disable 2FA
              </button>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Disable 2FA Confirmation */}
      {showDisableConfirm && (
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900">Disable Two-Factor Authentication</h3>
              <p className="text-sm text-red-700">
                This will reduce your account security. Are you sure?
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter 2FA Code to Confirm
              </label>
              <input
                type="text"
                value={disableVerificationCode}
                onChange={(e) => setDisableVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDisable2FA}
                disabled={isLoading || disableVerificationCode.length !== 6}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? 'Disabling...' : 'Disable 2FA'}
              </button>
              <button
                onClick={() => {
                  setShowDisableConfirm(false);
                  setDisableVerificationCode('');
                }}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Backup Codes */}
      {showRegenerateForm && (
        <div className="bg-white border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Regenerate Backup Codes</h3>
              <p className="text-sm text-blue-700">
                This will invalidate your current backup codes and create new ones.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter 2FA Code to Confirm
              </label>
              <input
                type="text"
                value={regenerateVerificationCode}
                onChange={(e) => setRegenerateVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRegenerateBackupCodes}
                disabled={isLoading || regenerateVerificationCode.length !== 6}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Regenerating...' : 'Regenerate Codes'}
              </button>
              <button
                onClick={() => {
                  setShowRegenerateForm(false);
                  setRegenerateVerificationCode('');
                }}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Backup Codes */}
      {showBackupCodes && newBackupCodes.length > 0 && (
        <div className="bg-white border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">New Backup Codes Generated</h3>
              <p className="text-sm text-green-700">
                Save these codes in a secure location. They can only be viewed once.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-2">
              {newBackupCodes.map((code, index) => (
                <code key={index} className="bg-white border rounded px-2 py-1 text-sm font-mono">
                  {code}
                </code>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadBackupCodes}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={copyBackupCodes}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={() => {
                setShowBackupCodes(false);
                setNewBackupCodes([]);
              }}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Security Activity Log */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Security Activity</h3>
        </div>
        
        <div className="space-y-3">
          {securityLogs.map((log) => (
            <div key={log.id} className={`border rounded-lg p-4 ${getLogColor(log.type)}`}>
              <div className="flex items-start gap-3">
                {getLogIcon(log.type)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{log.description}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.timestamp.toLocaleString()}
                      </span>
                      {log.ipAddress && (
                        <span>IP: {log.ipAddress}</span>
                      )}
                      {log.location && (
                        <span>{log.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Security Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Security Recommendations</h3>
        </div>
        
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <span>Use a strong, unique password for your account</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <span>Enable two-factor authentication for enhanced security</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <span>Regularly review your security activity</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <span>Keep your backup codes in a secure location</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
