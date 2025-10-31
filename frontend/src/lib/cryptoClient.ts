// Client-side crypto utilities for face embeddings
// Note: In production, use Web Crypto API or proper cryptographic libraries

export class CryptoClient {
  private static algorithm = 'AES-GCM';
  private static key: CryptoKey | null = null;

  /**
   * Initialize with dynamic key derivation
   * Uses session-specific material that changes per login
   */
  static async initialize(serverKeyMaterial?: string): Promise<void> {
    if (this.key) return; // Already initialized

    const encoder = new TextEncoder();
    
    // Get key material from session storage (set by backend after login)
    // Or use provided parameter
    const keyString = serverKeyMaterial || this.getSessionKeyMaterial();
    
    if (!keyString) {
      console.error('❌ No key material available for crypto initialization');
      throw new Error('Crypto initialization failed: No key material');
    }
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(keyString),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Use dynamic salt based on session
    const sessionSalt = this.getSessionSalt();
    
    this.key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(sessionSalt),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: this.algorithm, length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    
    console.log('✅ Client-side crypto initialized');
  }

  /**
   * Get session-specific key material
   * This should ideally come from the server after authentication
   */
  private static getSessionKeyMaterial(): string | null {
    // Try to get from session storage (set by server after login)
    const sessionKey = sessionStorage.getItem('_kyc_km');
    
    if (sessionKey) {
      return sessionKey;
    }
    
    // Fallback: Generate a temporary key for this session
    // WARNING: This is still not ideal for production
    // In real production, you should:
    // 1. Get key from server after authentication
    // 2. Use ECDH key exchange
    // 3. Implement proper key rotation
    
    console.warn('⚠️  No server key material found, generating temporary key');
    console.warn('    For production, implement server-side key exchange');
    
    const tempKey = crypto.getRandomValues(new Uint8Array(32));
    const base64Key = btoa(String.fromCharCode(...tempKey));
    sessionStorage.setItem('_kyc_km', base64Key);
    
    return base64Key;
  }

  /**
   * Get or generate session-specific salt
   */
  private static getSessionSalt(): string {
    let salt = sessionStorage.getItem('_kyc_salt');
    
    if (!salt) {
      const saltBytes = crypto.getRandomValues(new Uint8Array(16));
      salt = btoa(String.fromCharCode(...saltBytes));
      sessionStorage.setItem('_kyc_salt', salt);
    }
    
    return salt;
  }

  /**
   * Clear session crypto data (call on logout)
   */
  static clearSession(): void {
    sessionStorage.removeItem('_kyc_km');
    sessionStorage.removeItem('_kyc_salt');
    this.key = null;
    console.log('✅ Client-side crypto session cleared');
  }

  static async encrypt(data: ArrayBuffer): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
    await this.initialize();
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv,
      },
      this.key!,
      data
    );

    return { encrypted, iv };
  }

  static async decrypt(encrypted: ArrayBuffer, iv: Uint8Array): Promise<ArrayBuffer> {
    await this.initialize();
    
    return await crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv,
      },
      this.key!,
      encrypted
    );
  }

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static async encryptEmbedding(embedding: number[]): Promise<{ enc: string; iv: string; dims: number }> {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(embedding));
    const { encrypted, iv } = await this.encrypt(data);
    
    return {
      enc: this.arrayBufferToBase64(encrypted),
      iv: this.arrayBufferToBase64(iv.buffer),
      dims: embedding.length,
    };
  }

  /**
   * Generate face embedding (deprecated - use faceDetection.ts)
   * @deprecated Use detectFaceAndExtractEmbedding from utils/faceDetection instead
   */
  static async generateFaceEmbedding(faceImage: ImageData): Promise<number[]> {
    console.warn('⚠️  generateFaceEmbedding is deprecated. Use faceDetection.ts instead');
    
    // Fallback to mock for backwards compatibility (128-d to match face-api.js)
    const embedding = new Array(128).fill(0).map(() => Math.random() * 2 - 1);
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }
}

// Utility function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Utility function to format date
export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

// Utility function to format relative time
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now.getTime() - target.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(date);
};

// Utility function to debounce API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Utility function to validate NNI
export const validateNNI = (nni: string): { isValid: boolean; error?: string } => {
  if (!nni) {
    return { isValid: false, error: 'NNI is required' };
  }
  
  if (!/^\d+$/.test(nni)) {
    return { isValid: false, error: 'NNI must contain only digits' };
  }
  
  if (nni.length < 8 || nni.length > 12) {
    return { isValid: false, error: 'NNI must be between 8 and 12 digits' };
  }
  
  return { isValid: true };
};

// Utility function to mask NNI
export const maskNNI = (nni: string): string => {
  if (nni.length < 8) return nni;
  
  const firstFour = nni.slice(0, 4);
  const lastTwo = nni.slice(-2);
  const masked = '*'.repeat(nni.length - 6);
  
  return `${firstFour}${masked}${lastTwo}`;
};

export default CryptoClient;
