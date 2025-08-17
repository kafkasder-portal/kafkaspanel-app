/**
 * Two-Factor Authentication System
 * TypeScript best practices ile 2FA implementasyonu
 */

// Types
export interface TwoFactorSecret {
  readonly secret: string;
  readonly uri: string;
  readonly qrCode: string;
  readonly backupCodes: readonly string[];
}

export interface TwoFactorSetupData {
  readonly secret: string;
  readonly qrCodeUrl: string;
  readonly manualEntryCode: string;
  readonly backupCodes: readonly string[];
}

export interface TwoFactorVerificationResult {
  readonly isValid: boolean;
  readonly error?: string;
  readonly remainingAttempts?: number;
}

export interface BackupCode {
  readonly code: string;
  readonly used: boolean;
  readonly usedAt?: Date;
}

export interface TwoFactorConfig {
  readonly enabled: boolean;
  readonly secret?: string;
  readonly backupCodes: readonly BackupCode[];
  readonly lastUsed?: Date;
  readonly setupAt?: Date;
}

// Mock TOTP library functions (in real implementation, use speakeasy or similar)
class MockTOTP {
  static generateSecret(): { secret: string; uri: string } {
    const secret = this.generateBase32Secret();
    const uri = `otpauth://totp/NGO%20Management:user@example.com?secret=${secret}&issuer=NGO%20Management`;
    return { secret, uri };
  }

  static verify(token: string, secret: string): boolean {
    // Mock verification - in real app, use actual TOTP verification
    if (!token || !secret || token.length !== 6) {
      return false;
    }
    
    // For demo purposes, accept "123456" or current time-based token simulation
    if (token === '123456') {
      return true;
    }
    
    // Simulate time-based token (very simplified)
    const timeWindow = Math.floor(Date.now() / 30000);
    const expectedToken = (timeWindow % 1000000).toString().padStart(6, '0');
    return token === expectedToken;
  }

  private static generateBase32Secret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }
}

export class TwoFactorAuthManager {
  private static instance: TwoFactorAuthManager;
  private userConfigs = new Map<string, TwoFactorConfig>();
  private verificationAttempts = new Map<string, number>();

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): TwoFactorAuthManager {
    if (!TwoFactorAuthManager.instance) {
      TwoFactorAuthManager.instance = new TwoFactorAuthManager();
    }
    return TwoFactorAuthManager.instance;
  }

  /**
   * 2FA kurulumunu başlat
   */
  async setupTwoFactor(userId: string): Promise<TwoFactorSetupData> {
    const { secret, uri } = MockTOTP.generateSecret();
    const backupCodes = this.generateBackupCodes();

    // QR code URL'ini oluştur (gerçek uygulamada QR kod kütüphanesi kullanılır)
    const qrCodeUrl = this.generateQRCodeUrl(uri);

    // Geçici olarak sakla (kullanıcı doğrulayana kadar)
    const tempConfig: TwoFactorConfig = {
      enabled: false,
      secret,
      backupCodes: backupCodes.map(code => ({ code, used: false })),
      setupAt: new Date()
    };

    // Geçici konfigürasyonu sakla
    this.userConfigs.set(`temp_${userId}`, tempConfig);

    return {
      secret,
      qrCodeUrl,
      manualEntryCode: this.formatSecretForManualEntry(secret),
      backupCodes
    };
  }

  /**
   * 2FA kurulumunu tamamla
   */
  async completeTwoFactorSetup(userId: string, verificationCode: string): Promise<TwoFactorVerificationResult> {
    const tempConfig = this.userConfigs.get(`temp_${userId}`);
    
    if (!tempConfig || !tempConfig.secret) {
      return {
        isValid: false,
        error: 'Setup not found or expired'
      };
    }

    // Kodu doğrula
    const isValid = MockTOTP.verify(verificationCode, tempConfig.secret);
    
    if (!isValid) {
      return {
        isValid: false,
        error: 'Invalid verification code'
      };
    }

    // 2FA'yı etkinleştir
    const config: TwoFactorConfig = {
      ...tempConfig,
      enabled: true,
      setupAt: new Date()
    };

    this.userConfigs.set(userId, config);
    this.userConfigs.delete(`temp_${userId}`);
    this.saveToStorage();

    return { isValid: true };
  }

  /**
   * 2FA kodunu doğrula
   */
  async verifyTwoFactor(userId: string, code: string, isBackupCode = false): Promise<TwoFactorVerificationResult> {
    const config = this.userConfigs.get(userId);
    
    if (!config || !config.enabled) {
      return {
        isValid: false,
        error: '2FA not enabled for this user'
      };
    }

    // Rate limiting kontrolü
    const attempts = this.verificationAttempts.get(userId) || 0;
    if (attempts >= 5) {
      return {
        isValid: false,
        error: 'Too many failed attempts. Try again later.',
        remainingAttempts: 0
      };
    }

    let isValid = false;

    if (isBackupCode) {
      // Backup kod kontrolü
      const backupCode = config.backupCodes.find(bc => bc.code === code && !bc.used);
      if (backupCode) {
        isValid = true;
        // Backup kodu kullanıldı olarak işaretle
        const updatedBackupCodes = config.backupCodes.map(bc =>
          bc.code === code ? { ...bc, used: true, usedAt: new Date() } : bc
        );
        
        const updatedConfig: TwoFactorConfig = {
          ...config,
          backupCodes: updatedBackupCodes,
          lastUsed: new Date()
        };
        
        this.userConfigs.set(userId, updatedConfig);
        this.saveToStorage();
      }
    } else {
      // TOTP kod kontrolü
      if (config.secret) {
        isValid = MockTOTP.verify(code, config.secret);
        
        if (isValid) {
          const updatedConfig: TwoFactorConfig = {
            ...config,
            lastUsed: new Date()
          };
          this.userConfigs.set(userId, updatedConfig);
          this.saveToStorage();
        }
      }
    }

    if (!isValid) {
      // Başarısız deneme sayısını artır
      this.verificationAttempts.set(userId, attempts + 1);
      
      // 5 dakika sonra sıfırla
      setTimeout(() => {
        this.verificationAttempts.delete(userId);
      }, 5 * 60 * 1000);

      return {
        isValid: false,
        error: 'Invalid verification code',
        remainingAttempts: Math.max(0, 4 - attempts)
      };
    }

    // Başarılı doğrulama
    this.verificationAttempts.delete(userId);
    
    return { isValid: true };
  }

  /**
   * 2FA'yı devre dışı bırak
   */
  async disableTwoFactor(userId: string, verificationCode: string): Promise<TwoFactorVerificationResult> {
    const verificationResult = await this.verifyTwoFactor(userId, verificationCode);
    
    if (!verificationResult.isValid) {
      return verificationResult;
    }

    // 2FA'yı devre dışı bırak
    this.userConfigs.delete(userId);
    this.saveToStorage();

    return { isValid: true };
  }

  /**
   * Yeni backup kodları oluştur
   */
  async regenerateBackupCodes(userId: string, verificationCode: string): Promise<{ codes: readonly string[]; error?: string }> {
    const verificationResult = await this.verifyTwoFactor(userId, verificationCode);
    
    if (!verificationResult.isValid) {
      return {
        codes: [],
        error: verificationResult.error
      };
    }

    const config = this.userConfigs.get(userId);
    if (!config) {
      return {
        codes: [],
        error: '2FA not configured'
      };
    }

    const newBackupCodes = this.generateBackupCodes();
    const updatedConfig: TwoFactorConfig = {
      ...config,
      backupCodes: newBackupCodes.map(code => ({ code, used: false }))
    };

    this.userConfigs.set(userId, updatedConfig);
    this.saveToStorage();

    return { codes: newBackupCodes };
  }

  /**
   * Kullanıcının 2FA durumunu al
   */
  getTwoFactorStatus(userId: string): {
    readonly enabled: boolean;
    readonly setupAt?: Date;
    readonly lastUsed?: Date;
    readonly remainingBackupCodes: number;
  } {
    const config = this.userConfigs.get(userId);
    
    if (!config) {
      return {
        enabled: false,
        remainingBackupCodes: 0
      };
    }

    const remainingBackupCodes = config.backupCodes.filter(bc => !bc.used).length;

    return {
      enabled: config.enabled,
      setupAt: config.setupAt,
      lastUsed: config.lastUsed,
      remainingBackupCodes
    };
  }

  /**
   * Kullanıcının backup kodlarını al (sadece kullanılmayanlar)
   */
  getBackupCodes(userId: string): readonly string[] {
    const config = this.userConfigs.get(userId);
    
    if (!config) {
      return [];
    }

    return config.backupCodes
      .filter(bc => !bc.used)
      .map(bc => bc.code);
  }

  // Private helper methods
  private generateBackupCodes(): readonly string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < 10; i++) {
      // 8 haneli backup kod oluştur
      let code = '';
      for (let j = 0; j < 8; j++) {
        code += Math.floor(Math.random() * 10).toString();
      }
      codes.push(code);
    }
    
    return codes;
  }

  private generateQRCodeUrl(uri: string): string {
    // Gerçek uygulamada QR kod kütüphanesi kullanılır
    // Şimdilik Google Charts API kullanıyoruz (demo için)
    const encodedUri = encodeURIComponent(uri);
    return `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${encodedUri}`;
  }

  private formatSecretForManualEntry(secret: string): string {
    // 4'lü gruplar halinde formatla
    return secret.match(/.{1,4}/g)?.join(' ') || secret;
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('twoFactorConfigs');
      if (stored) {
        const configs = JSON.parse(stored);
        
        // Date objelerini restore et
        Object.entries(configs).forEach(([userId, config]: [string, any]) => {
          const restoredConfig: TwoFactorConfig = {
            ...config,
            setupAt: config.setupAt ? new Date(config.setupAt) : undefined,
            lastUsed: config.lastUsed ? new Date(config.lastUsed) : undefined,
            backupCodes: config.backupCodes?.map((bc: any) => ({
              ...bc,
              usedAt: bc.usedAt ? new Date(bc.usedAt) : undefined
            })) || []
          };
          
          this.userConfigs.set(userId, restoredConfig);
        });
      }
    } catch (error) {
      console.error('Failed to load 2FA configs from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const configs: Record<string, TwoFactorConfig> = {};
      
      this.userConfigs.forEach((config, userId) => {
        configs[userId] = config;
      });
      
      localStorage.setItem('twoFactorConfigs', JSON.stringify(configs));
    } catch (error) {
      console.error('Failed to save 2FA configs to storage:', error);
    }
  }

  /**
   * Development/testing için 2FA'yı bypass et
   */
  bypassTwoFactor(userId: string): void {
    if (process.env.NODE_ENV === 'development') {
      const config: TwoFactorConfig = {
        enabled: true,
        secret: 'DEVELOPMENT_SECRET',
        backupCodes: [],
        setupAt: new Date()
      };
      this.userConfigs.set(userId, config);
    }
  }
}

// Singleton instance export
export const twoFactorAuthManager = TwoFactorAuthManager.getInstance();
