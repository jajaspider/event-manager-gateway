import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    user?: {
        sub: string;
        user_id: string;
        role: string;
        iat: number;
        exp: number;
    };
} 