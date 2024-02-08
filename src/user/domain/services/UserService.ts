export interface AuthService {
    generateToken(userId: string): string;
    verifyToken(token: string): boolean;
}

export interface EncryptService {
    execute(data: any): Promise<any>
    compare(data: any, hash: any): Promise<boolean>
}

export interface EmailService {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}