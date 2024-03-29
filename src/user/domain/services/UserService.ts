export interface AuthService {
    generateToken(userId: string): string;
    verifyToken(token: string): boolean;
    addToBlacklist(token: string): Promise<void>;
    isTokenRevoked(token: string): Promise<boolean>;
}

export interface EncryptService {
    execute(data: any): Promise<any>
    compare(data: any, hash: any): Promise<boolean>
}

export interface EmailService {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}